#!/usr/bin/env node
/* Check every link in src/content/: links between pages against the pages the
 * section files publish, external links over the network.
 *
 *     node scripts/check-links.mjs
 *
 * A dated reference that links to a moved page is worse than one that links
 * nowhere, so this runs in CI. HEAD first, GET on anything that answers 403,
 * 404 or 405: a few documentation hosts refuse HEAD or refuse a bare client.
 */
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('../src/content/', import.meta.url))
/* One level of balanced parentheses, for URLs like .../wiki/Foo_(bar). */
const LINK = /\]\((https?:\/\/(?:[^()\s]|\([^()\s]*\))+)\)/g
/* A site-relative link, less any #fragment. */
const PAGE = /\]\((\/[^)\s#]*)(?:#[^)\s]*)?\)/g
const CONCURRENCY = 8
const TIMEOUT_MS = 20_000
const UA = 'Mozilla/5.0 (compatible; link-check/1.0; +https://axelsundqvist.se)'
/* Hosts that answer a non-browser client with a block page or a redirect to
 * their own root. The link is fine; the check is what is being refused, so
 * these are reported and not counted as failures. */
const REFUSES_ROBOTS = new Set(['wiki.gnuradio.org', 'finnhub.io', 'openai.com'])

async function markdown(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, e.name)
    if (e.isDirectory()) out.push(...(await markdown(path)))
    else if (e.name.endsWith('.md')) out.push(path)
  }
  return out
}

/* The paths the router builds from file names: /<blog> and /<blog>/<slug>. */
function published(files) {
  const paths = new Set(['/'])
  for (const file of files) {
    const [blog, name] = file.slice(ROOT.length).split('/')
    paths.add(`/${blog}`)
    const slug = /^\d+-(.+)\.md$/.exec(name)?.[1]
    if (slug) paths.add(`/${blog}/${slug}`)
  }
  return paths
}

function unpublished(texts) {
  const paths = published([...texts.keys()])
  const broken = []
  for (const [file, text] of texts) {
    for (const [, path] of text.matchAll(PAGE)) {
      if (!paths.has(path.replace(/(.)\/$/, '$1'))) broken.push(`404\t${path}\t${file.slice(ROOT.length)}`)
    }
  }
  return broken
}

async function collect(texts) {
  const links = new Map() /* url -> [file, ...] */
  for (const [file, text] of texts) {
    for (const [, url] of text.matchAll(LINK)) {
      const seen = links.get(url)
      if (seen) seen.push(file)
      else links.set(url, [file])
    }
  }
  return links
}

async function status(url, method) {
  const signal = AbortSignal.timeout(TIMEOUT_MS)
  const res = await fetch(url, { method, redirect: 'follow', headers: { 'user-agent': UA }, signal })
  return res.status
}

async function check(url) {
  const skipped = REFUSES_ROBOTS.has(new URL(url).hostname)
  try {
    let code = await status(url, 'HEAD')
    if (code === 403 || code === 405 || code === 404) code = await status(url, 'GET')
    return { url, code, ok: skipped || code < 400, skipped }
  } catch (err) {
    const code = err.name === 'TimeoutError' ? 'timeout' : err.message
    return { url, code, ok: skipped, skipped }
  }
}

const texts = new Map()
for (const file of await markdown(ROOT)) texts.set(file, await readFile(file, 'utf8'))
const broken = unpublished(texts)
for (const line of broken) console.log(line)

const links = await collect(texts)
const urls = [...links.keys()]
const results = []
let next = 0
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (next < urls.length) results.push(await check(urls[next++]))
  }),
)

const report = results.filter((r) => !r.ok || r.skipped)
for (const { url, code, skipped } of report.sort((a, b) => a.url.localeCompare(b.url))) {
  const tag = skipped ? `${code} (not checked)` : code
  for (const file of links.get(url)) console.log(`${tag}\t${url}\t${file.slice(ROOT.length)}`)
}
const bad = results.filter((r) => !r.ok)
console.log(`${results.length} links, ${bad.length} failing, ${results.filter((r) => r.skipped).length} not checked`)
console.log(`${broken.length} links between pages to a page that does not exist`)
process.exit(bad.length || broken.length ? 1 : 0)
