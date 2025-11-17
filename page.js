"use client";

import { useState, useEffect } from "react";

function WeatherCard({ hour, icon, temp, rain }) {
  return (
    <div className={`card ${rain ? "rain" : ""}`}>
      <div className="hour">{hour}</div>
      <div className="icon">{icon}</div>
      <div className="temp">{temp}</div>
    </div>
  );
}

export default function Home() {
  const [usdAmount, setUsdAmount] = useState("");
  const [vndAmount, setVndAmount] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(25400); // fallback
  const [loadingWeather, setLoadingWeather] = useState(true);

  const handleConvertUSDtoVND = () => {
    if (usdAmount) {
      const result = parseFloat(usdAmount) * exchangeRate;
      setVndAmount(result.toLocaleString("vi-VN"));
    } else {
      setVndAmount("");
    }
  };

  const handleConvertVNDtoUSD = () => {
    if (vndAmount) {
      const rawVnd = vndAmount.replace(/[^0-9]/g, "");
      const result = parseFloat(rawVnd) / exchangeRate;
      setUsdAmount(result.toFixed(2));
    } else {
      setUsdAmount("");
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      setLoadingWeather(true);
      try {
        const latitude = 10.7769;
        const longitude = 106.7009;
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&timezone=Asia%2FBangkok`
        );
        const data = await res.json();

        const hourlyTemp = data.hourly.temperature_2m.slice(0, 24);
        const hourlyCode = data.hourly.weathercode.slice(0, 24);

        const codeToIcon = (code) => {
          if (code === 0) return "☀️";
          if (code === 1 || code === 2 || code === 3) return "🌤️";
          if (code >= 45 && code <= 48) return "🌫️";
          if (code >= 51 && code <= 67) return "🌦️";
          if (code >= 71 && code <= 86) return "❄️";
          if (code >= 95 && code <= 99) return "⛈️";
          return "🌙";
        };

        const newWeatherData = hourlyTemp.map((temp, i) => ({
          hour: `${i}h`,
          temp: `${temp.toFixed(1)}°C`,
          icon: codeToIcon(hourlyCode[i]),
          rain: hourlyCode[i] >= 51 && hourlyCode[i] <= 99,
        }));

        setWeatherData(newWeatherData);
      } catch (err) {
        console.error("Lỗi fetch weather:", err);
      } finally {
        setLoadingWeather(false);
      }
    };

    const fetchRate = async () => {
      try {
        const res = await fetch(
          "https://api.exchangerate.host/latest?base=USD&symbols=VND"
        );
        const data = await res.json();
        if (data?.rates?.VND) {
          setExchangeRate(data.rates.VND);
        } else {
          setExchangeRate(26355);
        }
      } catch (err) {
        console.error("Lỗi fetch rate:", err);
        setExchangeRate(26355);
      }
    };

    fetchWeather();
    fetchRate();
  }, []);

  return (
    <>
      <style>{`
        body { margin:0; font-family: Arial, sans-serif; }
        .container { max-width:1600px; margin:0 auto; padding:1.5rem; }
        .navbar { display:flex; justify-content:flex-end; align-items:center; padding:1rem 0; border-bottom:1px solid #eee; background-color:#fffaf7; position:relative; }
        .menuButton { background:none; border:1px solid #ccc; padding:0.5rem 1rem; border-radius:5px; cursor:pointer; position:absolute; left:1.5rem; top:50%; transform:translateY(-50%); }
        .navLinks a { margin-left:1.5rem; text-decoration:none; color:#333; font-weight:500; }
        .mainContent { display:flex; flex-direction:row; gap:2rem; margin-top:0; }
        @media (max-width:1024px){ .mainContent { flex-direction:column; } .menuButton { left:1rem; } .navLinks{margin-right:1rem;} }
        .leftColumn { flex:1; position:relative; overflow:hidden; min-height:300px; }
        .centerColumn { flex:1.5; display:flex; flex-direction:column; gap:1.5rem; overflow-y:auto; padding-bottom:2rem; }
        .profileImage { position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; }
        .widget { background:#fff; border:1px solid #e0e0e0; border-radius:12px; padding:1.5rem; box-shadow:0 2px 8px rgba(0,0,0,0.05); }
        .widget h2 { margin-top:0; font-size:1.25rem; }
        .currencyBox { background:#fffaf0; border:1px dashed #fdd888; padding:1rem; border-radius:8px; margin:1rem 0; }
        .refreshButton { background:#ffc800; border:none; padding:0.5rem 1rem; border-radius:5px; cursor:pointer; font-weight:bold; }
        .converterInputs { display:flex; gap:0.5rem; margin-bottom:0.5rem; }
        .converterInputs input { flex:1; padding:0.75rem; border:1px solid #ccc; border-radius:5px; }
        .converterInputs button { padding:0 1.5rem; border:none; background:#007bff; color:white; border-radius:5px; cursor:pointer; }
        .weatherGrid { display:flex; overflow-x:auto; gap:10px; padding-bottom:10px; }
        .card { display:flex; flex-direction:column; align-items:center; gap:5px; padding:12px 8px; border:1px solid #eee; border-radius:8px; min-width:60px; background:#f9f9f9; }
        .card.rain { background:#e0f7fa; }
        .hour { font-size:0.85rem; color:#555; }
        .icon { font-size:1.5rem; }
        .temp { font-size:1rem; font-weight:bold; color:#333; }
      `}</style>

      <div className="container">
        <nav className="navbar">
          <button className="menuButton">☰ Menu</button>
          <div className="navLinks">
            <a href="#">Trang chủ</a>
            <a href="#">Giới thiệu cá nhân</a>
            <a href="#">Dự án</a>
            <a href="#">Thời tiết</a>
            <a href="#">Chuyển đổi tiền tệ</a>
            <a href="#">Liên hệ</a>
          </div>
        </nav>

        <main className="mainContent">
          <section className="leftColumn">
            <img src="/anhcanhan.jpg" alt="Ảnh cá nhân" className="profileImage" />
          </section>

          <section className="centerColumn">
            {/* Widget Chuyển đổi tiền tệ */}
            <div className="widget">
              <h2>💱 Currency Converter</h2>
              <p>Tỷ giá USD → VND cập nhật tự động</p>
              <div className="currencyBox">
                <h3>💵 1 USD ≈ {exchangeRate.toLocaleString("vi-VN")} VND</h3>
                <button className="refreshButton" onClick={() => window.location.reload()}>
                  🔄 Làm mới
                </button>
              </div>
              <div className="converterInputs">
                <input type="text" placeholder="Nhập số tiền USD" value={usdAmount} onChange={(e) => setUsdAmount(e.target.value)} />
                <button onClick={handleConvertUSDtoVND}>→ VND</button>
              </div>
              <div className="converterInputs">
                <input type="text" placeholder="Nhập số tiền VND" value={vndAmount} onChange={(e) => setVndAmount(e.target.value)} />
                <button onClick={handleConvertVNDtoUSD}>→ USD</button>
              </div>
            </div>

            {/* Widget Giới thiệu */}
            <div className="widget">
              <h2>Chào mừng đến với trang web cá nhân của tôi!</h2>
              <p>Tôi là sinh viên ngành Vật lý Tin học, đam mê lập trình nhúng, IoT, và phát triển hệ thống tự động.</p>
              <h3>Giới thiệu</h3>
              <ul>
                <li>IoT & Tự động hóa</li>
                <li>Xử lý tín hiệu số (EEG, ECG)</li>
                <li>Lập trình vi điều khiển (PIC, ESP32)</li>
                <li>Phát triển web và giao diện điều khiển Node-RED Dashboard</li>
                <li>Phân tích dữ liệu</li>
              </ul>
            </div>

            {/* Widget Dự án */}
            <div className="widget">
              <h2>Dự án nổi bật</h2>
              <p>📡 <b>Phân tích dữ liệu dân số các thành phố</b> – Giám sát dữ liệu dân số, mật độ giới tính, độ tuổi.</p>
              <p>🌡️ <b>Đồng hồ đo nhiệt độ & cảnh báo bằng PIC16F877A</b> – Lưu log nhiệt độ, cảnh báo vượt ngưỡng.</p>
              <p>🚰 <b>Hệ thống bơm nước IoT</b> – Điều khiển bơm từ xa qua Internet, theo dõi dữ liệu mực nước.</p>
            </div>

            {/* Widget Thời tiết */}
            <div className="widget">
              <h2>🌤️ Dự báo thời tiết (TP.HCM)</h2>
              <div className="weatherGrid">
                {loadingWeather ? "Đang tải dữ liệu..." : weatherData.map((data) => (
                  <WeatherCard key={data.hour} hour={data.hour} icon={data.icon} temp={data.temp} rain={data.rain} />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
