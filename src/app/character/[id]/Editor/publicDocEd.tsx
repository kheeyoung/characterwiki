"use client";

import React, { useState } from 'react';
import personalityDTO from '@/dto/personalityDTO';
import { PerTextWindow } from "../../../components/textWindow";
import { savePersonality, deletePersonality } from "@/service/profileService";

export default function PublicDocEd({ per: initialPer, id }: { per: personalityDTO[]; id: string }) {
  const [per, setPer] = useState<personalityDTO[]>(initialPer);

  const addNewPersonality = () => {
    setPer([...per, new personalityDTO(crypto.randomUUID(), "성격키워드", "한마디", "설명")]);
  };

  const removePersonality = (idToRemove: string) => {
    setPer(per.filter((pd) => pd.id !== idToRemove));
  };

  return (
    <div className="container">
      <div className="box">
        {per.map((pd) => (
          <div key={pd.id} style={{ marginTop: "16px", marginBottom: "16px", paddingTop: "10px" }}>
            <button className='btn btn-dark btn-sm' style={{ float: 'inline-end',margin: '10px' }} onClick={() => {
              removePersonality(pd.id);
              deletePersonality(id, "public", pd.id); // 서버에서 삭제
            }}>삭제</button>
            <PerTextWindow id={id} dto={pd} />
          </div>
        ))}


        <button className='btn btn-dark' onClick={addNewPersonality} style={{ marginTop: '16px' }}>
          항목 추가
        </button>
      </div>
    </div>
  );
}
