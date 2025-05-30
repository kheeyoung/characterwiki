
import ToggleSection from "../components/toggle";
import BasicOption from "./basicOption";
import DocEd from "./DocEd";
import ProfileEd from "./ProfileEd";
import "@/app/style/doc.css";
import "@/app/style/profile.css";

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
  pd: any;
  per: any;
  Epd: any;
  Ppd: any;
  Pper: any;
  PEpd: any;
  bd: any;
}) {
  console.log('EditPage')
    return (
    <div className="document-header">
      <main className="content">
        <ToggleSection title={'기본 설정'} num={'0'} children={
          <div>
            <div style={{ marginTop: "16px", marginBottom: "16px" }}>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <BasicOption id={id} bd={bd} />
              </div>
            </div>
          </div>
        } />
        <ToggleSection title={'공개 설정 수정'} num={'1'} children={
          <div>
            <div style={{ marginTop: "16px", marginBottom: "16px" }}>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <ToggleSection title={'공개 프로필 수정'} num={'1.0'} children={
                  <ProfileEd pd={pd} id={id} isPublic='public' />
                } />
              </div>
            </div>

            <div style={{ marginTop: "16px", marginBottom: "16px" }}>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <ToggleSection title={'공개 성격 수정'} num={'1.1'} children={
                  <DocEd per={per} id={id} isPublic='public' type='personality' />
                } />
              </div>
            </div>

            <div style={{ marginTop: "16px", marginBottom: "16px" }}>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <ToggleSection title={'공개 기타설정 수정'} num={'1.3'} children={
                  <DocEd per={Epd} id={id} isPublic='public' type='etc' />
                } />
              </div>
            </div>
          </div>
        } />

        <ToggleSection title={'비공개 설정 수정'} num={'2'} children={
          <div>
            <div style={{ marginTop: "16px", marginBottom: "16px" }}>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <ToggleSection title={'비공개 프로필 수정'} num={'2.0'} children={
                  <ProfileEd pd={Ppd} id={id} isPublic='private' />
                } />
              </div>
            </div>

            <div style={{ marginTop: "16px", marginBottom: "16px" }}>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <ToggleSection title={'비공개 성격 수정'} num={'2.1'} children={
                  <DocEd per={Pper} id={id} isPublic='private' type='personality' />
                } />
              </div>
            </div>

            <div style={{ marginTop: "16px", marginBottom: "16px" }}>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <ToggleSection title={'비공개 기타설정 수정'} num={'2.2'} children={
                  <DocEd per={PEpd} id={id} isPublic='private' type='etc' />
                } />
              </div>
            </div>

          </div>
        } />
      </main>
    </div>
  );
}