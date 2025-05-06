"use client"
//Tiptap.tsx
import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import ToolBar from './toolbar';

//tiptap
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';

import personalityDTO from '@/dto/personalityDTO';
import etcDTO from '@/dto/etcDTO';
import { savePersonality } from "@/service/profileService";



interface TiptapProps<T> {
  id: string;
  dto: T;
}

export const PerTextWindow = ({ id, dto }: TiptapProps<personalityDTO>) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Image.configure({ inline: true, allowBase64: true }),
    ],
  });

  const [oneWord, setOneword] = useState(dto.oneWord);
  const [keyWord, setKeyword] = useState(dto.keyWord);
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
      <input type="text" className="form-control" id="keywordInput" placeholder="KeyWord" 
      value={keyWord} onChange={(e) => setKeyword(e.target.value)}></input>
      </div>

      <div style={{ marginTop: '16px' }}>
      <label htmlFor="exampleFormControlInput1" className="form-label"><strong>한마디</strong></label>
      <input type="text" className="form-control" id="keywordInput" placeholder="KeyWord" 
      value={oneWord} onChange={(e) => setOneword(e.target.value)}></input>
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
          const updatedPersonality = new personalityDTO(dto.id, keyWord, oneWord, editorContent);
          await savePersonality(id, "public", updatedPersonality)
        }}>저장</button>
    </div>
  );
};


export const etcTextWindow = ({ id, dto }: TiptapProps<etcDTO>) => {
  const editor = useEditor({
    extensions: [
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


  return (
    <div style={{ width: '80%', height: '100%', margin: '10px auto' }}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
        style={{ width: '99%', marginBottom: '5px', border: '1px solid black' }}/>


        <ToolBar editor={editor} />
        <EditorContent id="content" editor={editor} 
            onClick={() => editor?.commands.focus()}
            style={{ height: '100%', overflowY: 'auto', border: '1px solid black'}}
        />

        <button
            onClick={() => {
                alert(editor?.getHTML());
                alert(id);
            }}
            style={{ marginTop: '10px' }}
        >저장</button>
    </div>
  );
};
