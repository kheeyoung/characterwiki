import { getwiki } from '../service/profileService';
import './main.css';
import Link from 'next/link';


export default async function Home() {
  const wiki = await getwiki();
  return (
    <div className='mainBody'>
        <div className="wiki-box">
          <table className="character-table">
            <tbody>
              <tr>
                <td className="table-header">
                  <div className="title">
                    <strong>
                      Blooming Days에 등장하는<br/>
                      재능강화 프로젝트의 초세계급 참가자들
                    </strong>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="character-cells">
                  <div className="character-list">
                    {wiki.map(([name, talent, color, id]) => (
                      <div className="character" key={id}>
                      <div className="role" style={{ backgroundColor: color }}>{talent}</div>
                      <div className="name">
                        <Link href={`/character/${id}`}>{name}</Link>
                      </div>
                     
                    </div>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
  );
}
