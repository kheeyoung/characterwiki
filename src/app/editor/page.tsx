'use client';
import { useEffect, useState } from 'react';
import { EditPage } from "./editPage"; // ✅ 중괄호 import 주의
import {
  getIdbyUid,
  getCharacter,
  getEtc,
  getPersonality,
  getPersonalWiki,
  makeCharacterDoc
} from '@/service/profileService';
import Loading from '../components/loading';
import profileDTO from '@/dto/profileDTO';
import DocDTO from '@/dto/DocDTO';
import BaiscDTO from '@/dto/baiscDTO';

interface EditorProps {
  user: any;
}

export default function Editor({ user }: EditorProps) {
  console.log('User state :', user);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');
  const [data, setData] = useState<any>(null);


  useEffect(() => {
    const fetchData = async () => {
      console.log(user);
      const uid = user.uid;
      const id = await getIdbyUid(uid);
      if (id === "") {
        await makeCharacterDoc(user);
        const [pd, per, Epd, Ppd, Pper, PEpd, bd] = [
          new profileDTO(),
          [new DocDTO()],
          [new DocDTO()],
          new profileDTO(),
          [new DocDTO()],
          [new DocDTO()],
          new BaiscDTO(),
        ];
        setData({ pd, per, Epd, Ppd, Pper, PEpd, bd });
      }
      else {
        const [pd, per, Epd, Ppd, Pper, PEpd, bd] = await Promise.all([
          getCharacter(id, true),
          getPersonality(id, true),
          getEtc(id, true),
          getCharacter(id, false),
          getPersonality(id, false),
          getEtc(id, false),
          getPersonalWiki(id),
        ]);
        setData({ pd, per, Epd, Ppd, Pper, PEpd, bd });
      }


      setId(id);

      setLoading(false);

    };
    fetchData();
  }, [user]);



  
  if (loading || !data) {
    console.log('No data');
    return <Loading />;
  }
  

  return (
    <EditPage
      id={id}
      pd={data.pd}
      per={data.per}
      Epd={data.Epd}
      Ppd={data.Ppd}
      Pper={data.Pper}
      PEpd={data.PEpd}
      bd={data.bd}
    />
  );
}
