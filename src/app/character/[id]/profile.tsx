
import { getCharacter } from "@/service/profileService";
import Loading from "../../components/loading";
import Image from 'next/image';

interface PageProps {
  params: string;
  isPublic: boolean;
}

export default async function PublicProfile({ params, isPublic }: PageProps) {
    const id = await params;
    const isP = await isPublic;
    
    const pd = await getCharacter(id,isP);
   
    if (!pd) {
        return <div><Loading /></div>;
    }
  return (

    <div className="container">
      <div className="box">
        <table className="mainSum">
          <tbody>
            <tr>
              <td colSpan={2} className="main-header">
                <div>
                  <span>
                    <div className="header-line">〈초세계급 {pd.talent}〉</div>
                    <div className="header-line bold large">{pd.name}</div>
                    <div className="header-line">{pd.originName}</div>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="image-cell">
                <Image
                  className="profile-image"
                  src={pd.bodyImage ?? "/default-profile.png"}
                  alt={pd.bodyImage ?? "profile image"}
                  loading="lazy"
                />
              </td>
            </tr>
            <tr>
              <td className="label">원어</td>
              <td className="value">{pd.originName}</td>
            </tr>
            <tr>
              <td className="label">나이</td>
              <td className="value">{pd.age}</td>
            </tr>
            <tr>
              <td className="label">신체 사이즈</td>
              <td className="value">
                <div>신장 - {pd.height}</div>
                <div>체중 - {pd.weight}</div>
              </td>
            </tr>
            <tr>
              <td className="label">생일</td>
              <td className="value">{pd.birth}</td>
            </tr>
            <tr>
              <td className="label">소지품</td>
              <td className="value">
                <div>{pd.belongings1}</div>
                <div>{pd.belongings2}</div>
                <div>{pd.belongings3}</div>
              </td>
            </tr>
            
            <tr>
              <td className="label">관계</td>
              <td className="value">
                <div>{pd.relationship}<a href="#tagGet-1">[1]</a></div>
              </td>
            </tr>
            <tr>
              <td className="label">인지도</td>
              <td className="value">{pd.awareness}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="box">
        <div className="section-nav">
          <span><a href="#s-0">0</a>. 개요</span><br />
          <span><a href="#s-1">1</a>. 성격</span><br />
          <span><a href="#s-2">2</a>. 기타사항</span><br />
          
        </div>
      </div>
    </div>

    
  );
}
