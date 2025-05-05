"use client";

import { useState } from "react";
import { saveProfile, handleImageUpload } from "@/service/profileService";

export default function PublicProfileEd({ pd, id }: { pd: any; id: string }) {
  // 상태 관리: pd 데이터를 초기값으로 설정
  const [profileData, setProfileData] = useState(pd);

  // 입력값 변경 핸들러
  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="container">
      <div className="box">
        <h2>기본 프로필 수정</h2>
        <table className="mainSum">
          <tbody>
            <tr>
              <td colSpan={2} className="main-header">
                <div>
                  <span>
                    <div className="header-line">
                      〈초세계급{" "}
                      <input
                        type="text"
                        value={profileData.talent}
                        onChange={(e) =>
                          handleInputChange("talent", e.target.value)
                        }
                      />
                      〉
                    </div>
                    <div className="header-line bold large">
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                      />
                    </div>
                    <div className="header-line">{profileData.originName}</div>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="label">공개전신</td>
              <td className="value">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) =>
                    handleImageUpload(e, "publicbody", (url: string) => {
                        handleInputChange("bodyImage", url);                     
                    })} />

              </td>
            </tr>
            <tr>
              <td className="label">원어</td>
              <td className="value">
                <input
                  type="text"
                  value={profileData.originName}
                  onChange={(e) =>
                    handleInputChange("originName", e.target.value)
                  }
                />
              </td>
            </tr>
            <tr>
              <td className="label">나이</td>
              <td className="value">
                <input
                  type="text"
                  value={profileData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="label">신체 사이즈</td>
              <td className="value">
                <div>
                  신장 -{" "}
                  <input
                    type="text"
                    value={profileData.height}
                    onChange={(e) =>
                      handleInputChange("height", e.target.value)
                    }
                  />
                </div>
                <div>
                  체중 -{" "}
                  <input
                    type="text"
                    value={profileData.weight}
                    onChange={(e) =>
                      handleInputChange("weight", e.target.value)
                    }
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="label">생일</td>
              <td className="value">
                <input
                  type="text"
                  value={profileData.birth}
                  onChange={(e) => handleInputChange("birth", e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="label">소지품</td>
              <td className="value">
                <div>
                  <input
                    type="text"
                    value={profileData.belongings1}
                    onChange={(e) =>
                      handleInputChange("belongings1", e.target.value)
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={profileData.belongings2}
                    onChange={(e) =>
                      handleInputChange("belongings2", e.target.value)
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={profileData.belongings3}
                    onChange={(e) =>
                      handleInputChange("belongings3", e.target.value)
                    }
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="label">관계</td>
              <td className="value">
                <div>
                  <input
                    type="text"
                    value={profileData.relationship}
                    onChange={(e) =>
                      handleInputChange("relationship", e.target.value)
                    }
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="label">인지도</td>
              <td className="value">
                <input
                  type="text"
                  value={profileData.awareness}
                  onChange={(e) =>
                    handleInputChange("awareness", e.target.value)
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="save-button"
          onClick={() => saveProfile(id, "public", profileData)}
        >
          공개 프로필 저장
        </button>
        
        
      </div>
    </div>
  );
}