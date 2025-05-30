import React, { useState } from 'react';
import Editor from '../editor/page';
import LoginFirebase from './loginFirebase';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface MyPageProps {
    user: any;
}

export default function MyPage({ user }: MyPageProps) {
    const [showEditor, setShowEditor] = useState(false);

    if (user === null) { return <LoginFirebase />; }

    if (showEditor) {
        return <Editor user={user}/>;
    }

    return (
        <div className="document-header">
            <main className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                {user ? `Welcome, ${user.email}` : '로그인하지 않았습니다.'}
                <button className='btn btn-dark' onClick={async () => {
                    await signOut(auth);
                    alert('로그아웃 성공');
                    window.location.href = '/';
                }}>LogOut</button>
                <button
                    className="tool-button"
                    onClick={() => setShowEditor(true)}
                >
                    ✏️ 편집
                </button>
            </main>
        </div>
    );
}