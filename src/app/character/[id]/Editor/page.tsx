'use server';

import '../profile.css';
import PublicProfileEd from './publicProfileEd';
import { getCharacter, getPersonality } from "@/service/profileService";
import Loading from "../loading";
import { PerTextWindow } from "../../../components/textWindow";
import personalityDTO from '@/dto/personalityDTO';
import PublicDocEd from './publicDocEd';

type Props = {
  searchParams: {
    id?: string; // 쿼리 파라미터에서 id를 받음
  };
};

export default async function Editor({ searchParams }: Props) {
  const id = (await searchParams).id; // 쿼리 파라미터에서 id 가져오기

  if (!id) {
    return <div><Loading /></div>;
  }
  
  //데이터 받아오기
  const PDRawData = await getCharacter(id, 0);
  const PerRawData = await getPersonality(id, 1);
  if (!PDRawData || !PerRawData) {
    return <div><Loading /></div>;
  }

  // JSON 직렬화 가능한 형태로 변환
  const pd = JSON.parse(JSON.stringify(PDRawData));
  const per = JSON.parse(JSON.stringify(PerRawData));


  return (
    <div className="document-header">
      <main className="content">
        <PublicProfileEd pd={pd} id={id} />
        <PublicDocEd per={per} id={id} />
        
      </main>
    </div>
  );
}

