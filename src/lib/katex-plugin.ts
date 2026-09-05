import katex from 'katex'
import { defineMdastPlugin } from 'satteri'

/* Sätteri parses `$…$` and `$$…$$` into math nodes but does not render them.
 * Render at build time, so a page with equations ships HTML rather than a
 * megabyte of JavaScript that lays them out after paint.
 *
 * `mdxExpressions: false` keeps KaTeX's own braces from being read as MDX
 * expressions. Blogs opt in with `math: true` in _meta.yaml, which is what
 * loads the stylesheet these class names need. */
function render(value: string, displayMode: boolean) {
  return {
    raw: katex.renderToString(value, {
      displayMode,
      throwOnError: false,
      strict: 'ignore' as const,
    }),
    mdxExpressions: false,
  }
}

export const katexPlugin = defineMdastPlugin({
  name: 'katex',
  math(node, ctx) {
    ctx.replaceNode(node, render(node.value, true))
  },
  inlineMath(node, ctx) {
    ctx.replaceNode(node, render(node.value, false))
  },
})
