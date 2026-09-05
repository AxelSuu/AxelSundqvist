import { defineHastPlugin } from 'satteri'

/* Tables and code blocks are the two things in this prose that cannot reflow.
 * Each goes in its own scroll box so the page body never scrolls sideways on
 * a phone — the wrapper the stylesheet expects around both. */
export const scrollPlugin = defineHastPlugin({
  name: 'scroll-wrap',
  element: {
    filter: ['table', 'pre'],
    visit(node, ctx) {
      ctx.wrapNode(node, {
        type: 'element',
        tagName: 'div',
        properties: { className: ['scroll'] },
        children: [],
      })
    },
  },
})
