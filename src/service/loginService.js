import { signInWithEmailAndPassword, onAuthStateChanged, getAuth,setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth } from '../lib/firebase';
export async function login(id, pw) {
  const auth = getAuth();
  await setPersistence(auth, browserLocalPersistence);
  signInWithEmailAndPassword(auth, id, pw)
    .then(() => { 
      window.location.href = '/';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + " " + errorMessage);
    });
}

export async function logout() {
  try {
    await auth.signOut();
    // 로그아웃 성공 → 원하는 페이지로 이동
    window.location.href = '/';
  } catch (err) {
    alert(err.message);
    console.log(err.message);
  }
}

export function getUser() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      return uid;
    } else {
      return null;
    }
  });
}