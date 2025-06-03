'use client';

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../lib/firebase';
import LoginFirebase from "./loginFirebase";
import MyPage from "./myPage";
import type { User } from "firebase/auth";
import '../style/main.css';
import Loading from "../components/loading";

export default function Login() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 로그인 상태 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);



  if (loading) return <Loading/>;

  if (!user) {
    return (
      <div className="document-header">
        <main className="content">
          <LoginFirebase />
        </main>
      </div>
    );
  }

  return (
    <div className="document-header">
      <main className="content">
        <MyPage user={user}/>
      </main>
    </div>
  );
}
