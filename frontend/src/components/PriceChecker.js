import React, { useState, useEffect } from 'react';
import axios from 'axios';
import data from './data.json'; // Replace with the actual path to your JSON file

function PriceChecker() {
  const [weapon, setWeapon] = useState('');
  const [skin, setSkin] = useState('');
  const [wear, setWear] = useState('');
  const [prices, setPrices] = useState(null);
  const [availableSkins, setAvailableSkins] = useState([]);

  // Update available skins based on the weapon selected
  useEffect(() => {
    const selectedWeaponSkins = data.flatMap(collection =>
      collection.items.filter(item => item.weapon === weapon)
    );
    setAvailableSkins(selectedWeaponSkins);
  }, [weapon]);

  const checkPrice = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/get_prices', {
        weapon,
        skin,
        wear, // Send the selected wear as part of the request
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
        
        {/* Wear Dropdown */}
        <select
          value={wear}
          onChange={(e) => setWear(e.target.value)}
        >
          <option value="">Select Wear</option>
          <option value="Factory New">Factory New</option>
            <option value="Minimal Wear">Minimal Wear</option>
            <option value="Field-Tested">Field-Tested</option>
            <option value="Well-Worn">Well-Worn</option>
            <option value="Battle-Scarred">Battle-Scarred</option>
            <option value="Stattrak Factory New">Stattrak Factory New</option>
            <option value="Stattrak Minimal Wear">Stattrak Minimal Wear</option>
            <option value="Stattrak Field-Tested">Stattrak Field-Tested</option>
            <option value="Stattrak Well-Worn">Stattrak Well-Worn</option>
            <option value="Stattrak Battle-Scarred">Stattrak Battle-Scarred</option>
            <option value="Souvenir Factory New">Souvenir Factory New</option>
            <option value="Souvenir Minimal Wear">Souvenir Minimal Wear</option>
            <option value="Souvenir Field-Tested">Souvenir Field-Tested</option>
            <option value="Souvenir Well-Worn">Souvenir Well-Worn</option>
          <option value="Souvenir Battle-Scarred">Souvenir Battle-Scarred</option>
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
