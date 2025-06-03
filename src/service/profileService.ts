
import { doc, getDoc, collection, query, getDocs, setDoc, deleteDoc, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import pd from '../dto/profileDTO';
import { db } from '../lib/firebase';
import personalityDTO from "../dto/DocDTO";
import DocDTO from "../dto/DocDTO";
import BaiscDTO from "../dto/baiscDTO";


export async function getwiki() {
  const q = query(collection(db, 'wiki'));
  const result: string[][] = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    result.push([
      doc.data().name,
      doc.data().talent,
      doc.data().color,
      doc.id]);

  });

  return result;
}

export async function getCharacter(id: string, isPublic: boolean) {
  console.log("getCharacter called with id:", id, "isPublic:", isPublic);
  const result = new pd();
  if (!id || typeof id !== "string") {
    return result;
  }

  const docRef = isPublic ? doc(db, "wiki", id, "public", "profile") :
    doc(db, "wiki", id, "private", "profile");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const c = docSnap.data();
    const result = new pd(
      c.name,
      c.originName,
      c.talent,
      c.oneWord,
      c.height,
      c.weight,
      c.age,
      c.awareness,
      c.birth,
      c.bodyImage,
      c.relationship,
      c.belongings1,
      c.belongings2,
      c.belongings3
    );
    return result;
  }
  return new pd();


}

export async function getPersonality(id: string, isPublic: boolean) {
  console.log("getPersonality called with id:", id, "isPublic:", isPublic);
  const result: personalityDTO[] = [];
  if (!id || typeof id !== "string") {
    return result;
  }
  const q = isPublic ? query(collection(db, "wiki", id, "public", "document", "personality")) :
    query(collection(db, "wiki", id, "private", "document", "personality"));


  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    result.push(new personalityDTO(
      doc.id,
      doc.data().title,
      doc.data().content,
    ));
  });

  return result;

}

export async function getEtc(id: string, isPublic: boolean) {
  console.log("getEtc called with id:", id, "isPublic:", isPublic);
  const result: DocDTO[] = [];
  if (!id || typeof id !== "string") {
    return result;
  }
  const q = isPublic ? query(collection(db, "wiki", id, "public", "document", "etc")) :
    query(collection(db, "wiki", id, "private", "document", "etc"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    result.push(new DocDTO(
      doc.id,
      doc.data().title,
      doc.data().content)
    );

  });

  return result;

}

export async function saveDoc(id: string, isPublic: string, pd: personalityDTO, type: string) {
  try {
    if (!pd.id) {
      throw new Error("Document id (pd.id) is required.");
    }
    const docRef = doc(db, "wiki", id, isPublic, "document", type, pd.id);
    await setDoc(docRef, {
      title: pd.title? pd.title : "???",
      content: pd.content? pd.content : "???"
    });

    alert('저장 성공!');
  } catch (err) {
    alert('저장에 실패했습니다.');
    console.error("Error saving document: ", err);
  }
}

export async function deleteWikiDoc(id: string, isPublic: string, pdID: string, type: string) {

  const docRef = doc(db, "wiki", id, isPublic, "document", type, pdID);

  try {
    await deleteDoc(docRef);
    alert("삭제 성공!");
  } catch (err) {
    alert("삭제에 실패했습니다.");
    console.error("Error deleting document: ", err);
  }
}

//이미지 선택
export async function handleImageUpload(e: ChangeEvent<HTMLInputElement>, path: string, onSuccess: (url: string) => void) {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    const url = await uploadImage(file, path);
    onSuccess(url);
  } catch (error) {
    alert("이미지 업로드에 실패했습니다.");
    console.error("Error uploading image: ", error);
  }
}

//파이어베이스에 이미지 업로드
export async function uploadImage(file: File, path: string) {
  const storage = getStorage();
  const fileRef = ref(storage, `wikiImage/${path}/${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
}




//프로필 저장
import profileDTO from '../dto/profileDTO';
import { User } from "firebase/auth";
import { ChangeEvent } from "react";

export async function saveProfile(id: string, isPublic: string, pd: profileDTO) {
  if (!id) return;
  try {
    const docRef = doc(db, "wiki", id, isPublic, "profile");
    await setDoc(docRef, {
      name: pd.name? pd.name : "???",
      originName: pd.originName? pd.originName : "???",
      talent: pd.talent? pd.talent : "???",
      oneWord: pd.oneWord? pd.oneWord : "???",
      height: pd.height? pd.height : 0,
      weight: pd.weight? pd.weight : 0,
      age: pd.age? pd.age : 0,
      awareness: pd.awareness? pd.awareness : "???",
      birth: pd.birth? pd.birth : "???",
      bodyImage: pd.bodyImage? pd.bodyImage : "...",
      relationship: pd.relationship? pd.relationship : "???",
      belongings1: pd.belongings1? pd.belongings1 : "???",
      belongings2: pd.belongings2? pd.belongings2 : "???",
      belongings3: pd.belongings3? pd.belongings3 : "???"
    });
    alert('저장 성공!');
  } catch (err) {
    console.error("Error saving profile: ", err);
    alert('저장에 실패했습니다.');
  }
}

//기본 프로필 
export async function getPersonalWiki(id: string) {
  const docRef = doc(db, 'wiki', id);

  try {
    const docSnap = await getDoc(docRef);


    if (docSnap.exists()) {
      return new BaiscDTO(
        docSnap.data().color,
        docSnap.data().name,
        docSnap.data().talent,
        docSnap.data().private
      );
    } else {
      return new BaiscDTO();
    }
  } catch (error) {
    console.error("Error getting personal wiki: ", error);
    return new BaiscDTO();
  }

}

export async function getisOpen(id: string) {

  const docRef = doc(db, 'wiki', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().private;
  } else {
    throw new Error('Document does not exist');
  }
}
// on/off
export async function onOffPrivate(id: string, state: boolean) {
  try {
    const docRef = doc(db, "wiki", id);
    await setDoc(docRef, {
      private: !state
    }, { merge: true });
    alert(state ? '비공개로 설정되었습니다.' : '공개로 설정되었습니다.');
  }
  catch (err) {
    alert('저장에 실패했습니다.');
    console.error("Error updating privacy setting: ", err);
  }
}

export async function saveBaisc(id: string, bd: BaiscDTO) {
  try {
    const docRef = doc(db, "wiki", id);
    await setDoc(docRef, {
      color: bd.color? bd.color : "FFFFFF",
      name: bd.name? bd.name : "???",
      talent: bd.talent? bd.talent : "???",
    }, { merge: true });
    alert('저장 성공!');
  }
  catch (err) {
    console.error("Error saving basic info: ", err);
    alert('저장에 실패했습니다.');
  }
}

export async function deleteBaisc(id: string) {
  try {
    const docRef = doc(db, "wiki", id);
    await deleteDoc(docRef);
    alert("삭제 성공!");
  } catch (err) {
    alert("삭제에 실패했습니다.");
    console.error("Error deleting document: ", err);
  }
}

export async function getIdbyUid(uid: string) {
  const q = query(collection(db, "wiki"), where("uid", "==", uid));

  try {
    const querySnapshot = await getDocs(q);
    const doc = querySnapshot.docs[0];
    return doc.id;
  } catch (error) {
    console.error("Error getting document by UID: ", error);
 
    return "";
  }
}

export async function makeCharacterDoc(user: User) {
  
  try {
    //id 값 생성하기 
    const id = await makeId()+1;
    await setDoc(doc(db, "wiki", String(id)), {
      color: "FFFFFF",
      name: "???",
      talent: "???",
      uid : user.uid
    });
    
    alert('생성 성공!');
  }
  catch (err) {
    console.error(err);
    alert('생성에 실패했습니다.');
  }
}

export async function makeId() {
  const q = query(collection(db, "wiki"));
  const querySnapshot = await getDocs(q);

  let maxId = 0;
  querySnapshot.forEach((doc) => {
    const docId = doc.id;
    // Check if docId is a number string
    if (/^\d+$/.test(docId)) {
      const numId = Number(docId);
      if (maxId === null || numId > maxId) {
        maxId = numId;
      }
    }
  });
  return maxId;
}

