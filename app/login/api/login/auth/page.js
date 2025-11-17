"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    alert(data.message);

    if (data.success) {
      window.location.href = "/";
    }
  }

  return (
    <div className="login-container">
      <h2>Đăng nhập</h2>

      <input 
        type="email" 
        placeholder="Email..." 
        onChange={e => setEmail(e.target.value)}
      />

      <input 
        type="password" 
        placeholder="Mật khẩu..." 
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
}
