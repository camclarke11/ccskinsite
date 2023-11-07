import React from 'react';

function SkinItem({ skin }) {
  // Render a single skin item. For example:
  return (
    <li>
      <img src={skin.imageUrl} alt={skin.name} />
      <p>{skin.name}</p>
    </li>
  );
}

export default SkinItem;
