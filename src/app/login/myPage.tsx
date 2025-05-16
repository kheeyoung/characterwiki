'use client';

import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase"; // 당신의 firebase 초기화 파일

interface MyPageProps {
    user: any;
}

export default function MyPage({ user }: MyPageProps) {
    return (
        <div className="document-header">
            <main className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                {user ? `Welcome, ${user.email}` : 'fhrmdls tjdrhd'}
                <button className='btn btn-dark' onClick={async () => {
                    await signOut(auth);
                    alert('로그아웃 성공');
                    window.location.href = '/';
                }}>LogOut</button>
            </main>
        </div>
    );
}