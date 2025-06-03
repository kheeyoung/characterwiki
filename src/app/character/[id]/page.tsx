"use server";

import { Personality, Etc } from "./document";
import PublicProfile from "./profile";
import { getPersonalWiki } from "@/service/profileService";
import '../../style/profile.css';
type PageParams = Promise<{ id: string }>;

export default async function CharacterPage({ params }: {params : PageParams}) {

  const { id } =await params;
  const pd = await getPersonalWiki(id);




  return (
    <div>
      <div className="document-header">

        <main className="content">
          <div className="title-section">
            <h1 className="document-title"><strong>{pd?.name}</strong></h1>
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


