
import BaiscDTO from "../../dto/baiscDTO";
import ToggleSection from "../components/toggle";
import BasicOption from "./basicOption";
import DocEd from "./DocEd";
import ProfileEd from "./ProfileEd";
import "../../app/style/doc.css";
import "../../app/style/profile.css";
import profileDTO from "@/dto/profileDTO";
import DocDTO from "../../dto/DocDTO";

export function EditPage({
  id,
  pd,
  per,
  Epd,
  Ppd,
  Pper,
  PEpd,
  bd,
}: {
  id: string;
  pd: profileDTO;
  per: DocDTO[];
  Epd: DocDTO[];
  Ppd: profileDTO;
  Pper: DocDTO[];
  PEpd: DocDTO[];
  bd: BaiscDTO;
}) {
  console.log('EditPage')
    return (
    <div className="document-header">
      <main className="content">
        <ToggleSection title={'기본 설정'} num={'0'}> 
          <div>
            <div style={{ marginTop: "16px", marginBottom: "16px" }}>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <BasicOption id={id} bd={bd} ></BasicOption>
              </div>
            </div>
          </div>
        </ToggleSection>
        <ToggleSection title={'공개 설정 수정'} num={'1'} >
          <div>
            <div style={{ marginTop: "16px", marginBottom: "16px" }}>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <ToggleSection title={'공개 프로필 수정'} num={'1.0'}>
                  <ProfileEd pd={pd} id={id} isPublic='public'></ProfileEd>
                </ToggleSection>
              </div>
            </div>
            

            <div style={{ marginTop: "16px", marginBottom: "16px" }}>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <ToggleSection title={'공개 성격 수정'} num={'1.1'}>
                  <DocEd per={per} id={id} isPublic='public' type='personality' ></DocEd>
                </ToggleSection>
              </div>
            </div>

            <div style={{ marginTop: "16px", marginBottom: "16px" }}>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <ToggleSection title={'공개 기타설정 수정'} num={'1.3'} >
                  <DocEd per={Epd} id={id} isPublic='public' type='etc' ></DocEd>
                </ToggleSection>
              </div>
            </div>
          </div>
        </ToggleSection>

        <ToggleSection title={'비공개 설정 수정'} num={'2'} >
          <div>
            <div style={{ marginTop: "16px", marginBottom: "16px" }}>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <ToggleSection title={'비공개 프로필 수정'} num={'2.0'} >
                  <ProfileEd pd={Ppd} id={id} isPublic='private' ></ProfileEd>
                </ToggleSection>
              </div>
            </div>

            <div style={{ marginTop: "16px", marginBottom: "16px" }}>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <ToggleSection title={'비공개 성격 수정'} num={'2.1'}>
                  <DocEd per={Pper} id={id} isPublic='private' type='personality' ></DocEd>
                </ToggleSection>
              </div>
            </div>

            <div style={{ marginTop: "16px", marginBottom: "16px" }}>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <ToggleSection title={'비공개 기타설정 수정'} num={'2.2'}>
                  <DocEd per={PEpd} id={id} isPublic='private' type='etc' ></DocEd>
                </ToggleSection>
              </div>
            </div>

          </div>
       </ToggleSection>
      </main>
    </div>
  );
}