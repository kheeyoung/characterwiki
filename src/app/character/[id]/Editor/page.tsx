'use server';

import '../profile.css';
import ProfileEd from './ProfileEd';
import { getCharacter, getPersonality,getEtc } from "@/service/profileService";
import Loading from "../loading";
import DocEd from './DocEd';
import ToggleSection from '@/app/components/toggle';

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
  const EtcRawData = await getEtc(id, 2);
  const PrivatePDRawData = await getCharacter(id, 1);
  const PrivatePerRawData = await getPersonality(id, 2);
  const PrivateEtcRawData = await getEtc(id, 1);
  

  // JSON 직렬화 가능한 형태로 변환
  const pd = JSON.parse(JSON.stringify(PDRawData));
  const per = JSON.parse(JSON.stringify(PerRawData));
  const Epd=JSON.parse(JSON.stringify(EtcRawData));
  const Ppd = JSON.parse(JSON.stringify(PrivatePDRawData));
  const Pper = JSON.parse(JSON.stringify(PrivatePerRawData));
  const PEpd=JSON.parse(JSON.stringify(PrivateEtcRawData));


  return (
    <div className="document-header">
      <main className="content">
        <div style={{ marginTop: "16px", marginBottom: "16px" }}>
          <div style={{ marginLeft: "10px", marginRight: "10px" }}>
            <ToggleSection title={'공개 프로필 수정'} num={'0'} children={
              <ProfileEd pd={pd} id={id} isPublic='public'/>
            }  />
          </div>
        </div>

        <div style={{ marginTop: "16px", marginBottom: "16px" }}>
          <div style={{ marginLeft: "10px", marginRight: "10px" }}>
            <ToggleSection title={'공개 성격 수정'} num={'1'} children={
              <DocEd per={per} id={id} isPublic='public' type='personality'/>
            }  />
          </div>
        </div>

        <div style={{ marginTop: "16px", marginBottom: "16px" }}>
          <div style={{ marginLeft: "10px", marginRight: "10px" }}>
            <ToggleSection title={'공개 기타설정 수정'} num={'2'} children={
              <DocEd per={Epd} id={id} isPublic='public' type='etc'/>
            }  />
          </div>
        </div>
        
        <div style={{ marginTop: "16px", marginBottom: "16px" }}>
          <div style={{ marginLeft: "10px", marginRight: "10px" }}>
            <ToggleSection title={'비공개 프로필 수정'} num={'3'} children={
              <ProfileEd pd={Ppd} id={id} isPublic='private'/>
            }  />
          </div>
        </div>

        <div style={{ marginTop: "16px", marginBottom: "16px" }}>
          <div style={{ marginLeft: "10px", marginRight: "10px" }}>
            <ToggleSection title={'비공개 성격 수정'} num={'4'} children={
              <DocEd per={Pper} id={id} isPublic='private' type='personality'/>
            }  />
          </div>
        </div>

        <div style={{ marginTop: "16px", marginBottom: "16px" }}>
          <div style={{ marginLeft: "10px", marginRight: "10px" }}>
            <ToggleSection title={'비공개 기타설정 수정'} num={'5'} children={
              <DocEd per={PEpd} id={id} isPublic='private' type='etc'/>
            }  />
          </div>
        </div>
      </main>
    </div>
  );
}

