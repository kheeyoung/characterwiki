
import { doc, getDoc, collection, query, getDocs,setDoc, deleteDoc } from "firebase/firestore";
import { getStorage,ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Editor } from '@tiptap/react';

import pd from '../dto/profileDTO';
import { db } from '../lib/firebase';
import personalityDTO from "@/dto/personalityDTO";


export async function getwiki() {
  const q = query( collection(db, 'wiki'));
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

export async function getCharacter(id, num) {
  if (!id || typeof id !== "string") {
    return null; 
  }

  const docRef = num==0 ? doc(db, "wiki", id, "public", "profile") :
  doc(db, "wiki", id, "private", "profile");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const c =docSnap.data();
    const result =new pd(
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
    console.log("No such document!");
  }

}


export async function getPersonality(id, num) {
  if (!id || typeof id !== "string") {
    return null; 
  }
  const q = num==1 ? query( collection(db, "wiki", id, "public", "document", "personality")):
  query( collection(db, "wiki", id, "private", "document", "personality"));
  const result = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    result.push(new personalityDTO(
      doc.id,
      doc.data().keyword,
      doc.data().oneWord,
      doc.data().content, 
    ));
  });

  return result;

}

export async function savePersonality (id, isPublic, pd) {
    try {
    
      const docRef = doc(db, "wiki", id, isPublic, "document", "personality", pd.id);
      await setDoc(docRef, { 
        keyword: pd.keyWord,
        oneWord: pd.oneWord,
        content: pd.content
       });
      
      alert('저장 성공!');
    } catch (err) {
      console.error('저장 실패:', err);
      alert('저장에 실패했습니다.'+pd.keyword);
    }
}

export async function deletePersonality(id, isPublic, pdID) {
  try{
    const docRef = doc(db, "wiki", id, isPublic, "document", "personality", pdID);
    await deleteDoc(docRef);
    alert('삭제 성공!');
  }
  catch (err) {
    console.error('삭제 실패:', err);
    alert('삭제에 실패했습니다.');
  }
}


export async function getEtc(id, num) {
  if (!id || typeof id !== "string") {
    return null; 
  }
  const q = num==2 ? query( collection(db, "wiki", id, "public", "document", "etc")):
  query( collection(db, "wiki", id, "private", "document", "etc"));
  const result = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.data);
    result.push([
      doc.data().title,
      doc.data().content,
    ]
    );
   
  });

  return result;

}

//이미지 선택
export async function handleImageUpload(e,path,onSuccess){
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    const url = await uploadImage(file, path);
    onSuccess(url);
    console.log("업로드 성공:", url);
  } catch (error) {
    console.error("업로드 실패:", error);
    if (onError) onError(error);
  }
}


//파이어베이스에 이미지 업로드
export async function uploadImage(file,path) {
  const storage = getStorage();
  const fileRef = ref(storage, `wikiImage/${path}/${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
}




//프로필 저장
export async function saveProfile (id, isPublic, pd) {
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
      console.error('저장 실패:', err);
      alert('저장에 실패했습니다.');
    }
}

//수정한 거 저장
export async function saveDocumentContent(id, htmlContent, isPublic, p1, p2 ) {
  const docRef = doc(db, "wiki", id, isPublic, "document", p1, p2);
  await setDoc(docRef, { content: htmlContent }, { merge: true });
}

export async function handleSave (id, editor) {
  if (!editor || !id) return;
    const html = editor.getHTML();
    try {
      await saveDocumentContent(id, html);
      alert('저장 성공!');
    } catch (err) {
      console.error('저장 실패:', err);
      alert('저장에 실패했습니다.');
    }
}