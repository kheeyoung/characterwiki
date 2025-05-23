"use server";

import Link from "next/link";
import { Personality, Etc } from "./document";
import PublicProfile from "./profile";
import { getPersonalWiki } from "@/service/profileService";


type Props = {
  params: {
    id: string;
  };
};

const CharacterPage = async ({ params }: Props) => {
  const { id } = await params;
  const pd = await getPersonalWiki(id);



  return (
    <div>
      <div className="document-header">

        <main className="content">
          <div className="title-section">
            <h1 className="document-title"><strong>{pd?.name}</strong></h1>
          </div>
          <div className="document-tools">
            <a title="내 문서함에 추가" className="tool-button">⭐ <span>15</span></a>
            <Link className="tool-button" href={{
              pathname: `/character/${id}/Editor`,
              query: {
                id: id
              }
            }}>✏️ 편집</Link>

            <button className="tool-button more-button" title="더 보기">⋮</button>

          </div>

          <div className="document-category">
            <span className="category-label">분류</span>
            <ul className="category-list">
              <li className="category-item">
                <a href="">Blooming Days/등장인물</a>
              </li>
            </ul>
          </div>
          <PublicProfile params={id as string} isPublic={true} />
          <Personality params={id as string} isPublic={true} num="1" />
          <Etc params={id as string} isPublic={true} num="1" />

          {pd?.privateOnOff && (
            <div>

              <PublicProfile params={id as string} isPublic={false} />
              <Personality params={id as string} isPublic={false} num="2" />
              <Etc params={id as string} isPublic={false} num="2" />
            </div>
          )}

        </main>

      </div>

    </div>

  );
};

export default CharacterPage;
