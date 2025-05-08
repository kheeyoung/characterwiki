import { Node, RawCommands, mergeAttributes } from '@tiptap/core'
import { CommandProps } from '@tiptap/core'

export const TextBox = Node.create({
  name: 'textBox',

  group: 'block',
  content: 'inline*',
  defining: true,

  parseHTML() {
    return [
      {
        tag: 'blockquote',
        getAttrs: element => {
          const el = element as HTMLElement;
          return el.classList.contains('textBox') ? {} : false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['blockquote', mergeAttributes(HTMLAttributes, { class: 'textBox' }), ['div', 0]]
  },

  addCommands() {
    return {
      insertTextBox:
        () =>
        ({ commands }: CommandProps) => {
          return commands.insertContent({
            type: this.name,
            content: [
              {
                type: 'text',
                text: '강조하고 싶은말',
              },
            ],
          });
        },
    } as Partial<RawCommands>;
  },
  addKeyboardShortcuts() {
    return {
      Backspace: ({ editor }) => {
        const { state } = editor;
        const { selection } = state;
        const { $from } = selection;
  
        // 커서가 블록 시작점에 없으면 아무 일도 안 함
        if ($from.parentOffset > 0) return false;
  
        const beforePos = $from.before();
  
        // 최상단이면 무시 (더 앞에 노드 없음)
        if (beforePos === undefined || beforePos === 0) return false;
  
        const posBefore = state.doc.resolve(beforePos);
        const nodeBefore = posBefore.nodeBefore;
  
        if (nodeBefore?.type.name === 'textBox') {
          return editor.commands.command(({ tr }) => {
            const from = beforePos - nodeBefore.nodeSize;
            const to = beforePos;
  
            // from이 0보다 작으면 방지
            if (from < 0) return false;
  
            tr.delete(from, to);
            return true;
          });
        }
  
        return false;
      },
    };
  }
  
})
