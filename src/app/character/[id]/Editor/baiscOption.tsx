'use client';

import { useEffect, useState } from 'react';
import { onOffPrivate, saveBaisc } from "@/service/profileService";
import BaiscDTO from '@/dto/baiscDTO';
import { useEditor } from '@tiptap/react';

interface BaiscOptionProps {
  id: string;
  state: boolean;
  bd : BaiscDTO
}

export default function BaiscOption({ id, state, bd }: BaiscOptionProps) {
   const [BaiscData, setBaiscData] = useState<BaiscDTO>(bd);
  const [isOpen, setIsOpen] = useState(state);

  useEffect(() => {
    const fetchData = async () => {
      const data = bd;
      if (data) {
        setBaiscData(data);
      }
    };

    fetchData();
  }, [id]); 

  const handleInputChange = (field: keyof BaiscDTO, value: string) => {
    setBaiscData(prev => ({
      ...prev,
      [field]: value,
    }));
  };


  return (
    <div>
      <table className="mainSum">
        <tbody>
          
            <tr>
            <td className="label">이름</td>
            <td className="value">
              <input className="form-control"
                type="text"
                value={BaiscData.name}
                onChange={(e) =>
                  handleInputChange("name", e.target.value)
                }
              />
            </td>
          </tr>
          <tr>
            <td className="label">재능</td>
            <td className="value">
              <input className="form-control"
                type="text"
                value={BaiscData.talent}
                onChange={(e) =>
                  handleInputChange("talent", e.target.value)
                }
              />
            </td>
          </tr>
          
          <tr>
            <td className="label">색상</td>
            <td className="value">
              <input className="form-control"
                type="text"
                value={BaiscData.color}
                onChange={(e) =>
                  handleInputChange("color", e.target.value)
                }
              />
            </td>
          </tr>
          <tr>
            <td className="label">비밀설정</td>
            <td className="value">
              <button className="btn btn-dark" onClick={() =>{ 
                onOffPrivate(id, isOpen); 
                setIsOpen(prev => !prev);   
                }}>
                비공개 설정 {isOpen ? 'Off' : 'On'}
              </button>
            </td>
          </tr>
          
        </tbody>
      </table>
      <button
        className="btn btn-dark"
        onClick={() => {saveBaisc(id, BaiscData);} }
      >
        기본 프로필 저장
      </button>

    </div>


  );
}
