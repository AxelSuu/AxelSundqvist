#!/usr/bin/env python3
"""Render python-2026.md into the standalone article page.

    python3 scripts/article.py

The article is a second Vite entry rather than a route inside the app: it is
static HTML, so it needs no router, no SPA rewrite and no prerender step, and
a crawler gets the prose on the first request. Styling lives in
scripts/article.template.html; this file only turns Markdown into elements.

Markdown support is deliberately partial. The input is one document in this
repository, so the subset it uses is closed: headings, paragraphs, bullets,
pipe tables, fenced code, rules, and inline code/bold/italic/links.
"""
import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'python-2026.md'
TEMPLATE = Path(__file__).resolve().parent / 'article.template.html'
OUT = ROOT / 'python-2026.html'

CODE_SPAN = re.compile(r'`([^`]+)`')
LINK = re.compile(r'\[([^\]]+)\]\(([^)]+)\)')
BOLD = re.compile(r'\*\*([^*]+)\*\*')
EM = re.compile(r'(?<!\*)\*([^*\n]+)\*(?!\*)')


def slug(text: str) -> str:
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', text.lower())).strip('-')


def inline(text: str) -> str:
    """Escape, then format everything except the inside of a code span.

    Code spans are cut out before the other rules run: `except*` and
    `def f[T](...)` would otherwise be read as emphasis and a link.
    """
    parts = CODE_SPAN.split(html.escape(text, quote=False))
    for i, part in enumerate(parts):
        if i % 2:                                   # odd indices are code spans
            parts[i] = f'<code>{part}</code>'
            continue
        part = LINK.sub(r'<a href="\2">\1</a>', part)
        part = BOLD.sub(r'<strong>\1</strong>', part)
        parts[i] = EM.sub(r'<em>\1</em>', part)
    return ''.join(parts)


def render_table(rows: list[str]) -> str:
    """A pipe table, wrapped so it scrolls itself instead of the page."""
    cells = [[c.strip() for c in r.strip().strip('|').split('|')] for r in rows]
    head, body = cells[0], cells[2:]                # cells[1] is the --- rule
    out = ['<div class="scroll"><table><thead><tr>']
    out += [f'<th>{inline(c)}</th>' for c in head]
    out.append('</tr></thead><tbody>')
    for row in body:
        out.append('<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in row) + '</tr>')
    out.append('</tbody></table></div>')
    return ''.join(out)


def convert(md: str) -> tuple[str, str, list]:
    """Return (title, body HTML, table of contents).

    The ToC is a list of (part, [(id, heading)]) so the sidebar can group
    sections under the part they belong to.
    """
    lines = md.split('\n')
    title, body, toc = '', [], []
    para: list[str] = []
    table: list[str] = []
    i = 0

    def flush_para():
        if para:
            body.append(f'<p>{inline(" ".join(para))}</p>')
            para.clear()

    def flush_table():
        if table:
            body.append(render_table(table))
            table.clear()

    while i < len(lines):
        line = lines[i]

        if line.startswith('```'):
            flush_para(), flush_table()
            lang = line[3:].strip()
            block = []
            i += 1
            while i < len(lines) and not lines[i].startswith('```'):
                block.append(lines[i])
                i += 1
            code = html.escape('\n'.join(block), quote=False)
            cls = f' class="lang-{lang}"' if lang else ''
            body.append(f'<div class="scroll"><pre><code{cls}>{code}</code></pre></div>')
            i += 1
            continue

        if line.startswith('|'):
            flush_para()
            table.append(line)
            i += 1
            continue
        flush_table()

        if line.startswith('# '):
            flush_para()
            text = line[2:].strip()
            if not title:                           # the first h1 is the page title
                title = text
            else:
                toc.append((text, []))
                body.append(f'<h2 class="part" id="{slug(text)}">{inline(text)}</h2>')
        elif line.startswith('## '):
            flush_para()
            text = line[3:].strip()
            if not toc:                             # a section before any part heading
                toc.append(('', []))
            toc[-1][1].append((slug(text), text))
            body.append(f'<h3 id="{slug(text)}">{inline(text)}</h3>')
        elif line.startswith('* '):
            flush_para()
            items = []
            while i < len(lines) and lines[i].startswith('* '):
                items.append(f'<li>{inline(lines[i][2:].strip())}</li>')
                i += 1
            body.append('<ul>' + ''.join(items) + '</ul>')
            continue
        elif line.strip() == '---':
            flush_para()
            body.append('<hr>')
        elif not line.strip():
            flush_para()
        else:
            para.append(line.strip())
        i += 1

    flush_para(), flush_table()
    return title, '\n'.join(body), toc


def render_toc(toc: list) -> str:
    out = ['<nav class="toc" aria-label="Contents"><p class="toc-head">Contents</p>']
    for part, sections in toc:
        if part:
            out.append(f'<p class="toc-part"><a href="#{slug(part)}">{html.escape(part)}</a></p>')
        out.append('<ul>')
        out += [f'<li><a href="#{i}">{html.escape(t)}</a></li>' for i, t in sections]
        out.append('</ul>')
    out.append('</nav>')
    return '\n'.join(out)


def main() -> int:
    if not SRC.exists():
        print(f'no source: {SRC}', file=sys.stderr)
        return 1
    title, content, toc = convert(SRC.read_text(encoding='utf-8'))
    page = (TEMPLATE.read_text(encoding='utf-8')
            .replace('{{TITLE}}', html.escape(title))
            .replace('{{TOC}}', render_toc(toc))
            .replace('{{CONTENT}}', content))
    OUT.write_text(page, encoding='utf-8')
    sections = sum(len(s) for _, s in toc)
    print(f'{SRC.name} -> {OUT.name}  ({sections} sections, {len(page):,} bytes)')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
