"use client";

import { useEffect, useState } from "react";

export default function Currency() {
  const [rate, setRate] = useState(null);
  const [usd, setUsd] = useState("");
  const [vnd, setVnd] = useState("");

  async function fetchRate() {
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/USD");
      const json = await res.json();
      setRate(json.rates.VND);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchRate();
  }, []);

  function convertUSD() {
    if (!rate) return;
    setVnd((usd * rate).toFixed(0));
  }

  function convertVND() {
    if (!rate) return;
    setUsd((vnd / rate).toFixed(2));
  }

  return (
    <div className="currency-box">
      <h2>Tỷ giá USD / VND</h2>
      {rate && <p>1 USD = {rate} VND</p>}

      <input
        type="number"
        placeholder="USD"
        value={usd}
        onChange={(e) => setUsd(e.target.value)}
      />
      <button onClick={convertUSD}>→ VND</button>

      <input
        type="number"
        placeholder="VND"
        value={vnd}
        onChange={(e) => setVnd(e.target.value)}
      />
      <button onClick={convertVND}>→ USD</button>
    </div>
  );
}
