"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ==== MENU ==== */}
      <nav className="navbar">
        <div className="container">
          <div className="logo">☰ Menu</div>

          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li><a href="#home">Trang chủ</a></li>
            <li><a href="#about">Giới thiệu cá nhân</a></li>
            <li><a href="#projects">Dự án</a></li>
            <li><a href="#weather">Thời tiết</a></li>
            <li><a href="#currency">Chuyển đổi tiền tệ</a></li>
            <li><a href="#contact">Liên hệ</a></li>
          </ul>

          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
        </div>
      </nav>

      {/* ==== TRANG CHỦ ==== */}
      <header className="hero-split" id="home">
        <div className="hero-left">
          <Image src="/anhcanhan.jpg" width={600} height={800} alt="Ảnh trái"/>
        </div>

        <div className="hero-right">
          <Image src="/anhphai.jpg" width={600} height={800} alt="Ảnh phải"/>
          <div className="hero-text">
            <h1>Words can be weapons more powerful than guns</h1>
            <a href="#about" className="btn">View More</a>
          </div>
        </div>
      </header>

      {/* ==== ABOUT ==== */}
      <section id="about" className="section">
        <h2>Chào mừng đến với trang web cá nhân của tôi!</h2>
        <p>Tôi là sinh viên ngành Vật lý Tin học...</p>
      </section>

      {/* ==== PROJECTS ==== */}
      <section id="projects" className="section">
        <h2>Dự án nổi bật</h2>
        <p>📡 <b>Phân tích dữ liệu dân số</b></p>
        <p>🌡️ <b>Đồng hồ đo nhiệt độ PIC</b></p>
        <p>🚰 <b>Hệ thống bơm nước IoT</b></p>
      </section>

      {/* ==== CONTACT ==== */}
      <section id="contact" className="section">
        <h2>Liên hệ</h2>
        <p>Email: <a href="mailto:luongmy039@gmail.com">luongmy039@gmail.com</a></p>
      </section>

      <footer>
        <p>© 2025 My — All Rights Reserved</p>
      </footer>
    </>
  );
}
