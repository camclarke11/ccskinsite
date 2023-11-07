import React, { useState, useEffect } from 'react';
import axios from 'axios';
import data from './data.json'; // Replace with the actual path to your JSON file
// Import Tailwind CSS file if you have a custom one, otherwise it's included globally



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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <form onSubmit={checkPrice} className="grid grid-cols-1 gap-4">
        {/* Weapon Selection */}
        <select
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
          className="mt-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
        
        <button
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          type="submit"
        >
          Check Price
        </button>
      </form>
      
      {prices && (
  <div>
    <div>URL: {prices.url}</div>
    <div>Prices:</div>
    <ul>
  {Object.entries(prices.prices).map(([market, price]) => (
    <li key={market} className="flex items-center space-x-2">
      <img 
      /* public/{market}.png etc. */
        src={`${process.env.PUBLIC_URL}/${market}.png`}
        alt={`${market} logo`} 
        className="market-logo"
      />
      <span>{market}: {price}</span>
    </li>
  ))}
</ul>

  </div>
)}

    </div>
  );
}

export default PriceChecker;
