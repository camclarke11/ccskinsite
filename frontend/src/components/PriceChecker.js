import React, { useState, useEffect } from 'react';
import axios from 'axios';
import data from './weapons.json'; // assuming the JSON data is in the same directory

function PriceChecker() {
  const [weapon, setWeapon] = useState('');
  const [skin, setSkin] = useState('');
  const [quality, setQuality] = useState('');
  const [prices, setPrices] = useState(null);
  const [availableSkins, setAvailableSkins] = useState([]);

  // When the weapon is selected, update the available skins
  useEffect(() => {
    const selectedWeapon = data.flatMap(collection => 
      collection.items.filter(item => item.weapon === weapon)
    );
    setAvailableSkins(selectedWeapon);
  }, [weapon]);

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
        {/* Weapon Selection */}
        <select
          value={weapon}
          onChange={(e) => setWeapon(e.target.value)}
        >
          <option value="">Select Weapon</option>
          {data.flatMap(collection => collection.items)
               .map(item => item.weapon)
               .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
               .map(weapon => (
                 <option key={weapon} value={weapon}>{weapon}</option>
               ))
          }
        </select>
        
        {/* Skin Selection based on Weapon */}
        <select
          value={skin}
          onChange={(e) => setSkin(e.target.value)}
          disabled={!weapon} // Disable until a weapon is selected
        >
          <option value="">Select Skin</option>
          {availableSkins.map(item => (
            <option key={item.skin} value={item.skin}>{item.skin}</option>
          ))}
        </select>
        
        {/* Quality Selection */}
        <select
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
        >
          <option value="">Select Quality</option>
          {/* You can populate quality options similarly, based on selected weapon and skin */}
        </select>
        
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
