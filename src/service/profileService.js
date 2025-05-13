
import { doc, getDoc, collection, query, getDocs, setDoc, deleteDoc, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import pd from '../dto/profileDTO';
import { db } from '../lib/firebase';
import personalityDTO from "@/dto/DocDTO";
import DocDTO from "@/dto/DocDTO";
import BaiscDTO from "@/dto/baiscDTO";


export async function getwiki() {
  const q = query(collection(db, 'wiki'));
  const result = [];

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

export async function getCharacter(id, isPublic) {
  if (!id || typeof id !== "string") {
    return null;
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
  } else {
    return new pd("", "", "", "", "", "", "", "", "", "", "", "", "", "");
  }

}

export async function getPersonality(id, isPublic) {
  if (!id || typeof id !== "string") {
    return null;
  }
  const q = isPublic ? query(collection(db, "wiki", id, "public", "document", "personality")) :
    query(collection(db, "wiki", id, "private", "document", "personality"));
  const result = [];

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

export async function getEtc(id, isPublic) {
  if (!id || typeof id !== "string") {
    return null;
  }
  const q = isPublic ? query(collection(db, "wiki", id, "public", "document", "etc")) :
    query(collection(db, "wiki", id, "private", "document", "etc"));
  const result = [];

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

export async function saveDoc(id, isPublic, pd, type) {
  try {
    const docRef = doc(db, "wiki", id, isPublic, "document", type, pd.id);
    await setDoc(docRef, {
      title: pd.title,
      content: pd.content
    });

    alert('저장 성공!');
  } catch (err) {
    alert('저장에 실패했습니다.' + pd.title);
  }
}

export async function deleteWikiDoc(id, isPublic, pdID, type) {
  try {
    const docRef = doc(db, "wiki", id, isPublic, "document", type, pdID);
    await deleteDoc(docRef);
    alert('삭제 성공!');
  }
  catch (err) {
    alert('삭제에 실패했습니다.');
  }
}

//이미지 선택
export async function handleImageUpload(e, path, onSuccess) {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    const url = await uploadImage(file, path);
    onSuccess(url);
  } catch (error) {
    if (onError) onError(error);
  }
}

//파이어베이스에 이미지 업로드
export async function uploadImage(file, path) {
  const storage = getStorage();
  const fileRef = ref(storage, `wikiImage/${path}/${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
}




//프로필 저장
export async function saveProfile(id, isPublic, pd) {
  if (!id) return;
  try {
    const docRef = doc(db, "wiki", id, isPublic, "profile");
    await setDoc(docRef, {
      name: pd.name,
      originName: pd.originName,
      talent: pd.talent,
      oneWord: pd.oneWord,
      height: pd.height,
      weight: pd.weight,
      age: pd.age,
      awareness: pd.awareness,
      birth: pd.birth,
      bodyImage: pd.bodyImage,
      relationship: pd.relationship,
      belongings1: pd.belongings1,
      belongings2: pd.belongings2,
      belongings3: pd.belongings3
    });
    alert('저장 성공!');
  } catch (err) {
    alert('저장에 실패했습니다.');
  }
}

//기본 프로필 
export async function getPersonalWiki(id) {
  const docRef = doc(db, 'wiki', id); 

  try{
    const docSnap = await getDoc(docRef);
    console.log(docSnap.color);
    return new BaiscDTO(
      docSnap.data().color,
      docSnap.data().name,
      docSnap.data().talent,
      docSnap.data().privateOnOff
    );
  }catch (error) {}
 
}

export async function getisOpen(id) {
  const docRef = doc(db, 'wiki', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().private;
  } else {
    throw new Error('Document does not exist');
  }
}
// on/off
export async function onOffPrivate(id, state) {
  try {
    const docRef = doc(db, "wiki", id);
    await setDoc(docRef, {
      private: !state
    }, { merge: true });
    alert(state ? '비공개로 설정되었습니다.' : '공개로 설정되었습니다.');
  }
  catch (err) {
    alert('저장에 실패했습니다.');
  }
} 

export async function saveBaisc(id, bd) {
  try {
    const docRef = doc(db, "wiki", id);
    await setDoc(docRef, {
      color: bd.color,
      name: bd.name,
      talent: bd.talent, 
    }, { merge: true });
    alert('저장 성공!');
  }
  catch (err) {
    alert('저장에 실패했습니다.');
  }
} 