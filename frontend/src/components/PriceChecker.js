import React, { useState } from 'react';
import axios from 'axios';

function PriceChecker() {
  const [weapon, setWeapon] = useState('');
  const [skin, setSkin] = useState('');
  const [quality, setQuality] = useState('');
  const [prices, setPrices] = useState(null);

  const checkPrice = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/get_prices', {
        weapon,
        skin,
        quality,
      });
      setPrices(response.data);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  return (
    <div>
      <form onSubmit={checkPrice}>
        <input
          type="text"
          value={weapon}
          onChange={(e) => setWeapon(e.target.value)}
          placeholder="Weapon"
        />
        <input
          type="text"
          value={skin}
          onChange={(e) => setSkin(e.target.value)}
          placeholder="Skin"
        />
        <input
          type="text"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          placeholder="Quality"
        />
        <button type="submit">Check Price</button>
      </form>
      {prices && (
        <div>
          <div>URL: {prices.url}</div>
          <div>Prices:</div>
          <ul>
            {Object.entries(prices.prices).map(([market, price]) => (
              <li key={market}>
                {market}: {price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PriceChecker;
