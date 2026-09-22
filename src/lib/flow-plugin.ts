import { defineMdastPlugin } from 'satteri'

/* A paragraph that is nothing but `A → B → C` is a design's data flow. As an
 * ordered list of stages it wraps between stages rather than mid-name, and a
 * screen reader announces it as steps rather than reading out each arrow. */
export const flowPlugin = defineMdastPlugin({
  name: 'flow',
  paragraph(node, ctx) {
    const [only, ...rest] = node.children
    if (rest.length || only?.type !== 'inlineCode' || !only.value.includes('→')) return
    ctx.replaceNode(node, {
      type: 'flow',
      data: { hName: 'ol', hProperties: { className: ['flow'] } },
      children: only.value.split('→').map((stage) => ({
        type: 'flowStage',
        data: { hName: 'li' },
        children: [{ type: 'text', value: stage.trim() }],
      })),
    })
  },
})
