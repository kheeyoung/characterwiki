'use client';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/lib/firebase';
import LoginFirebase from "./loginFirebase";
import MyPage from "./myPage";



import type { User } from "firebase/auth";

export default function Login() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
            console.log("Login : ",user?.email);
        });

        return () => unsubscribe();
    }, []);

    
    if (loading) return <div>로딩 중...</div>;

    return (
        <div className="document-header">
            <main className="content">
                {user ? <MyPage user={user} /> : <LoginFirebase />}
            </main>
        </div>
    );
}