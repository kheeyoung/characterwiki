"use client";

import React, { useState } from 'react';
import personalityDTO from '@/dto/personalityDTO';
import { PerTextWindow } from "../../../components/textWindow";
import { savePersonality, deletePersonality } from "@/service/profileService";

export default function PublicDocEd({ per: initialPer, id }: { per: personalityDTO[]; id: string }) {
  const [per, setPer] = useState<personalityDTO[]>(initialPer);

  const addNewPersonality = () => {
    setPer([...per, new personalityDTO(crypto.randomUUID(),"성격키워드", "한마디", "설명")]);
  };

  const removePersonality = (idToRemove: string) => {
    setPer(per.filter((pd) => pd.id !== idToRemove));
  };

  return (
    <div className="container">
      <div className="box">
      {per.map((pd) => (
  <div key={pd.id} className="text-window">
    <PerTextWindow id={id} dto={pd} />
    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
      
      <button onClick={() => {
        removePersonality(pd.id);
        deletePersonality(id, "public", pd.id); // 서버에서 삭제
      }}>항목 삭제</button>
    </div>
  </div>
))}


        <button onClick={addNewPersonality} style={{ marginTop: '16px' }}>
          항목 추가
        </button>
      </div>
    </div>
  );
}
