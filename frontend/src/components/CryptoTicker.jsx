import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const CryptoTicker = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 text-white py-3">
      <Marquee gradient={false} speed={50}>
        {cryptoData.map((coin) => (
          <div key={coin.id} className="mx-6 flex items-center">
            <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
            <p className="font-semibold">
              {coin.name} (${coin.current_price})
            </p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default CryptoTicker;