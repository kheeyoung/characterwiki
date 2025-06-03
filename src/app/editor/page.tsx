'use client';
import { useEffect, useState } from 'react';
import { EditPage } from "./editPage"; 
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
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

type CharacterData = {
  pd: profileDTO;
  per: DocDTO[];
  Epd: DocDTO[];
  Ppd: profileDTO;
  Pper: DocDTO[];
  PEpd: DocDTO[];
  bd: BaiscDTO;
};

export default function  Editor() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
    });

    return () => unsub();
  }, []);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');
  const [data, setData] = useState<CharacterData | null>(null);


  useEffect(() => {
    const fetchData = async () => {

      const uid = user!.uid;
      const id = await getIdbyUid(uid);
      if (id === "") {
        await makeCharacterDoc(user!);
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
