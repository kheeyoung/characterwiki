"use client"
//Tiptap.tsx
import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import ToolBar from './toolbar';

//tiptap
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import DocDTO from '@/dto/DocDTO';
import { saveDoc } from "@/service/profileService";
import { TextBox } from "@/app/components/extensions/TextBox";



interface TiptapProps<T> {
  id: string;
  dto: T;
  isPublic: string;
  type: string;
}

export const TextWindow = ({ id, dto, isPublic, type }: TiptapProps<DocDTO>) => {
  const editor = useEditor({
    extensions: [
      TextBox,
      StarterKit,
      Highlight,
      Image.configure({ inline: true, allowBase64: true }),
      
    ],
  });

  const [title, setTitle] = useState(dto.title);
  const [editorContent, setEditorContent] = useState(dto.content);


  useEffect(() => {
    if (!editor) return;
  
    editor.on('update', () => {
      setEditorContent(editor.getHTML());
    });
  }, [editor]);
  
  useEffect(() => {
    if (editor && dto.content) {
      editor.commands.setContent(dto.content);
    }
  }, [editor, dto.content]);
  


  return (
    <div style={{ padding: "10px",backgroundColor: '#eee' }}>
      <div>
      <label htmlFor="exampleFormControlInput1" className="form-label"><strong>성격 키워드</strong></label>
      <input type="text" className="form-control" id="TitleInput" placeholder="Title" 
      value={title} onChange={(e) => setTitle(e.target.value)}></input>
      </div>
      
      <div style={{ marginTop: '16px' }} >
      <label htmlFor="exampleFormControlTextarea1" className="form-label"><strong>설명</strong></label>
      <div className="editor-wrapper">
      <ToolBar editor={editor} />
        <EditorContent id="content" editor={editor} 
            onClick={() => editor?.commands.focus()}
            className="editor-area"
        />
      </div>
      
      </div>

        <button className='btn btn-dark' style = {{ marginTop:"10px" }}onClick={async () => {
          const updatedDoc = new DocDTO(dto.id, title, editorContent);
          await saveDoc(id, isPublic, updatedDoc, type);
        }}>저장</button>
    </div>
  );
};


