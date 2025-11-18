// "use client";

// import { useEffect, useState } from "react";

// export default function Weather() {
//   const [data, setData] = useState(null);

//   async function fetchWeather() {
//     try {
//       const res = await fetch(
//         "https://api.open-meteo.com/v1/forecast?latitude=21&longitude=105&hourly=temperature_2m"
//       );
//       const json = await res.json();
//       setData(json);
//     } catch (err) {
//       console.error("Weather error:", err);
//     }
//   }

//   useEffect(() => {
//     fetchWeather();
//   }, []);

//   return (
//     <div className="weather-container">
//       <h2>Thời tiết hôm nay</h2>

//       {!data && <p>Đang tải dữ liệu...</p>}

//       {data && (
//         <p>Nhiệt độ hiện tại: {data.hourly.temperature_2m[0]}°C</p>
//       )}
//     </div>
//   );
// }
// app/components/WeatherCard.js
// app/components/WeatherCard.js
export default function WeatherCard({ hour, icon, temp, rain }) {
  // Thêm class 'rain' nếu trời mưa
  // SỬA LẠI DÒNG NÀY:
  const cardClasses = `card ${rain ? 'rain' : ''}`;

  return (
    // SỬA LẠI CÁC DÒNG NÀY:
    <div className={cardClasses}>
      <div className="hour">{hour}</div>
      <div className="icon">{icon}</div>
      <div className="temp">{temp}</div>
    </div>
  );
}