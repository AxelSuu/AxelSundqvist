#!/usr/bin/env python3
"""Render python-2026.md into one page per section.

    python3 scripts/article.py

The article is too long to read in one scroll, so each section is its own
static page under /python-2026/, with an index at the root of that path and a
contents sidebar carried across all of them. Pages are plain HTML: no router,
no SPA rewrite, no prerender step, and a crawler gets the prose on the first
request. Styling lives in scripts/article.template.html.

Markdown support is deliberately partial. The input is one document in this
repository, so the subset it uses is closed: headings, paragraphs, bullets,
pipe tables, fenced code, rules, and inline code/bold/italic/links.
"""
import html
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'python-2026.md'
TEMPLATE = Path(__file__).resolve().parent / 'article.template.html'
OUT = ROOT / 'python-2026'
BASE = '/python-2026'
SITE = 'https://axelsundqvist.se'

# One line per section: the index listing needs it and so does each page's
# meta description. Keyed by slug, so renaming a heading in the Markdown
# reports a miss here rather than silently shipping an empty description.
BLURBS = {
    'the-baseline': 'The whole recommendation in fifteen lines.',
    'environments-and-dependencies': 'uv in place of pip, pyenv, pipx and Poetry, and why the interpreter belongs to the repository.',
    'linting-and-formatting': 'One binary for both roles, and a rule set wider than the default.',
    'python-versions': 'What is supported, what each recent release added, and how the policy differs for applications and libraries.',
    'project-configuration-and-layout': 'pyproject.toml, dependency groups, the src layout, and what the lockfile is for.',
    'type-checking': 'Four checkers compared, the annotations worth knowing, and how to migrate a codebase that has none.',
    'validation-and-data-models': 'Pydantic at the boundary, plain objects inside, and configuration that fails at startup.',
    'errors': 'Exception groups, and the conventions that keep a package’s errors its own.',
    'logging': 'Configured once at the entry point, structured as fields, and never from inside a library.',
    'concurrency': 'Five models and what each is actually for, plus where free-threading stands.',
    'testing': 'Fixtures, parametrization, property-based tests, and why mocking a driver tests the mock.',
    'command-line-interfaces-and-single-file-scripts': 'Typer and Click, and the inline metadata that makes a single file runnable anywhere.',
    'documentation': 'Generators, and the part of an interface that annotations cannot state.',
    'continuous-integration': 'A working pipeline, and the six things usually left out of one.',
    'packaging-and-distribution': 'Build backends, wheels, and the full shape of a published library.',
    'profiling-and-optimization': 'The tools, and the order of work that makes them unnecessary.',
    'backends-databases-and-apis': 'Frameworks, drivers and queues, with a multi-tenant API and a webhook ingester.',
    'data-engineering': 'Arrow and Parquet as the common formats, with a single-node stack and a lakehouse.',
    'data-science': 'The array and dataframe stack, with a reproducible analysis repository and sensor time series.',
    'scientific-computing-and-signal-processing': 'Instruments, SDR and RF, with an automated measurement rig and a receive chain.',
    'machine-learning': 'Training and serving, with a tabular prediction service and a vision pipeline.',
    'markets-and-financial-data': 'Vendors and backtesting, and the timestamps without which no result can be trusted.',
    'llms-agents-and-retrieval': 'Provider SDKs, agent frameworks and vector stores, with document QA and typed extraction.',
    'part-iii-python-around-another-language': 'Python as the test and tooling layer around a codebase written in C or Rust.',
}

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


def render(lines: list[str]) -> str:
    """Markdown blocks to HTML. Headings are consumed by split() first."""
    body, para, table = [], [], []
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

        if line.startswith('* '):
            flush_para()
            items = []
            while i < len(lines) and lines[i].startswith('* '):
                items.append(f'<li>{inline(lines[i][2:].strip())}</li>')
                i += 1
            body.append('<ul>' + ''.join(items) + '</ul>')
            continue
        if line.strip() == '---':
            flush_para()
            body.append('<hr>')
        elif not line.strip():
            flush_para()
        else:
            para.append(line.strip())
        i += 1

    flush_para(), flush_table()
    return '\n'.join(body)


def split(md: str) -> tuple[str, list[str], list[dict]]:
    """Return (title, intro lines, sections).

    A `#` heading after the title opens a part; a `##` heading opens a
    section. A part carrying prose but no `##` of its own — Part III — becomes
    a single section named after the part, but only once real content arrives:
    the blank line and rule that follow every part heading are not content.
    """
    title, intro, sections = '', [], []
    part, part_has_section = '', False
    fenced = False

    for line in md.split('\n'):
        if line.startswith('```'):
            fenced = not fenced
        # A PEP 723 block opens with `# /// script`, which is not a heading.
        if fenced:
            (sections[-1]['lines'] if sections else intro).append(line)
            continue
        if line.startswith('# '):
            text = line[2:].strip()
            if not title:
                title = text
            else:
                part, part_has_section = text, False
            continue
        if line.startswith('## '):
            text = line[3:].strip()
            sections.append({'part': part, 'heading': text, 'slug': slug(text), 'lines': []})
            part_has_section = True
            continue
        if part and not part_has_section:
            if not line.strip() or line.strip() == '---':
                continue
            sections.append({'part': part, 'heading': part, 'slug': slug(part), 'lines': []})
            part_has_section = True
        (sections[-1]['lines'] if sections else intro).append(line)

    for s in sections:                              # drop the rule between parts
        while s['lines'] and s['lines'][-1].strip() in ('', '---'):
            s['lines'].pop()
    return title, intro, sections


def render_toc(sections: list[dict], here: str) -> str:
    """The contents sidebar, identical on every page bar the current mark."""
    out = [f'<nav class="toc" aria-label="Contents">'
           f'<p class="toc-head"><a href="{BASE}/">Contents</a></p>']
    part = None
    open_list = False
    for s in sections:
        if s['part'] != part:
            if open_list:
                out.append('</ul>')
            part = s['part']
            if part and part != s['heading']:
                out.append(f'<p class="toc-part">{html.escape(part)}</p>')
            out.append('<ul>')
            open_list = True
        cls = ' class="here"' if s['slug'] == here else ''
        aria = ' aria-current="page"' if s['slug'] == here else ''
        out.append(f'<li{cls}><a href="{BASE}/{s["slug"]}"{aria}>{html.escape(s["heading"])}</a></li>')
    if open_list:
        out.append('</ul>')
    out.append('</nav>')
    return '\n'.join(out)


def page(template: str, **kw) -> str:
    for key, value in kw.items():
        template = template.replace('{{%s}}' % key.upper(), value)
    return template


def build_index(template: str, title: str, intro: list[str], sections: list[dict]) -> str:
    listing, part = [], None
    for s in sections:
        if s['part'] != part:
            part = s['part']
            if part and part != s['heading']:
                listing.append(f'<h2 class="part">{html.escape(part)}</h2>')
        blurb = BLURBS.get(s['slug'], '')
        listing.append(
            f'<a class="entry" href="{BASE}/{s["slug"]}">'
            f'<span class="entry-title">{html.escape(s["heading"])}</span>'
            f'<span class="entry-blurb">{html.escape(blurb)}</span></a>')
    return page(
        template,
        title=html.escape(title),
        page_title=html.escape(title),
        heading=html.escape(title),
        kicker='',
        description='A reference for Python project practices, libraries per domain, and system '
                    'designs, written from the position of using Python to test and build systems '
                    'in other languages. Reviewed September 2026.',
        canonical=f'{SITE}{BASE}/',
        bodyclass='index',
        toc=render_toc(sections, ''),
        content=render(intro) + '<div class="index-list">' + '\n'.join(listing) + '</div>',
        nav='',
    )


def build_section(template: str, title: str, s: dict, sections: list[dict], i: int) -> str:
    prev_s = sections[i - 1] if i else None
    next_s = sections[i + 1] if i + 1 < len(sections) else None
    nav = ['<nav class="pager">']
    if prev_s:
        nav.append(f'<a class="prev" href="{BASE}/{prev_s["slug"]}">'
                   f'<span>Previous</span>{html.escape(prev_s["heading"])}</a>')
    if next_s:
        nav.append(f'<a class="next" href="{BASE}/{next_s["slug"]}">'
                   f'<span>Next</span>{html.escape(next_s["heading"])}</a>')
    nav.append('</nav>')
    kicker = s['part'] if s['part'] and s['part'] != s['heading'] else ''
    return page(
        template,
        title=html.escape(s['heading']),
        page_title=f'{html.escape(s["heading"])} — {html.escape(title)}',
        heading=html.escape(s['heading']),
        kicker=f'<p class="kicker">{html.escape(kicker)}</p>' if kicker else '',
        description=html.escape(BLURBS.get(s['slug'], s['heading']), quote=True),
        canonical=f'{SITE}{BASE}/{s["slug"]}',
        bodyclass='section',
        toc=render_toc(sections, s['slug']),
        content=render(s['lines']),
        nav='\n'.join(nav),
    )


def main() -> int:
    if not SRC.exists():
        print(f'no source: {SRC}', file=sys.stderr)
        return 1
    template = TEMPLATE.read_text(encoding='utf-8')
    title, intro, sections = split(SRC.read_text(encoding='utf-8'))

    missing = [s['slug'] for s in sections if s['slug'] not in BLURBS]
    if missing:
        print(f'warning: no blurb for {", ".join(missing)}', file=sys.stderr)

    if OUT.exists():
        shutil.rmtree(OUT)                          # stale slugs must not linger
    OUT.mkdir()
    (OUT / 'index.html').write_text(build_index(template, title, intro, sections), encoding='utf-8')
    for i, s in enumerate(sections):
        (OUT / f'{s["slug"]}.html').write_text(
            build_section(template, title, s, sections, i), encoding='utf-8')

    total = sum((OUT / f).stat().st_size for f in [p.name for p in OUT.iterdir()])
    print(f'{SRC.name} -> {OUT.name}/  ({len(sections)} sections + index, {total:,} bytes)')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
