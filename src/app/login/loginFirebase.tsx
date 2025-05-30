"use client";

import React from 'react';
import {login} from "@/service/loginService";
import '../style/globals.css'

export default function LoginFirebase() {
    const [id, setId] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // ← 이거 중요
        await login(id, password);
    };

    return (
        <div className="document-header">
            <main className="content">
                <form onSubmit={handleSubmit}>
                    <h3><strong>Login</strong></h3>
                    <div style={{ marginTop: '20px', marginBottom: '20px', gap: '100px' }}>
                        <div style={{ marginTop: "10px" }}>
                            <input className="form-control"
                                type="text"
                                value={id}
                                onChange={e => setId(e.target.value)}
                                placeholder="ID"
                            />
                        </div>
                        <div style={{ marginTop: "10px", marginBottom: '20px' }}>
                            <input className="form-control"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>

                </form>
            </main>
        </div>
    );
}