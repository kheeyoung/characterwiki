import React from 'react';
import { Editor } from '@tiptap/react';
import { Icon } from './icons';

interface ToolBarProps {
  editor: Editor | null;
}
function ToolBar({ editor }: ToolBarProps) {
  if (!editor) return null;

  return (
    
    <div className="toolbar" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Icon.Bold editor={editor} />
      <Icon.Italic editor={editor} />
      <Icon.Strikethrough editor={editor} />
      <Icon.AddPhoto editor={editor} />
      <Icon.AddBox editor={editor} />
    </div>

  );
}

export default ToolBar;