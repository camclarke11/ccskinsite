// src/App.js
import React from 'react';
import './App.css';
import PriceChecker from './components/PriceChecker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Other components or content */}
        <PriceChecker />
      </header>
    </div>
  );
}

export default App;
