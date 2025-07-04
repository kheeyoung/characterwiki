"use client";

import React, { useState } from 'react';
import DocDTO from '../../dto/DocDTO';
import { TextWindow } from "../components/textWindow";
import { deleteWikiDoc } from "../../service/profileService";

export default function DocEd({ per: initialPer, id, isPublic, type }: { per: DocDTO[]; id: string, isPublic: string, type: string }) {
  const [per, setPer] = useState<DocDTO[]>(initialPer);

  const makeID = () => {
    return Date.now().toString(); 
  }

  const addNewDoc = () => {
    setPer([...per, new DocDTO(makeID(), "키워드", "설명")]);
  };

  const removeDoc = (idToRemove: string) => {
    setPer(per.filter((pd) => pd.id !== idToRemove));
  };


  return (
    <div className="container">
      <div className="box">
        {per.length > 0 && (
          <>
            {per.map((pd) => (
              <div key={pd.id} style={{ marginTop: "16px", marginBottom: "16px", paddingTop: "10px" }}>
          <button className='btn btn-dark btn-sm' style={{ float: 'inline-end',margin: '10px' }} onClick={() => {
            if (pd.id) {
              removeDoc(pd.id);
              deleteWikiDoc(id, isPublic, pd.id, type); // 서버에서 삭제
            }
          }}>삭제</button>
          <TextWindow id={id} dto={pd} isPublic={isPublic} type={type}/>
              </div>
            ))}
          </>
        )}
        
        <button className='btn btn-dark' onClick={addNewDoc} style={{ marginTop: '16px' }}>
          항목 추가
        </button>
      </div>
    </div>
  );
}

