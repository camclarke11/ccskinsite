import React from 'react';
import SkinItem from './SkinItem';

function SkinList({ skins }) {
  return (
    <ul>
      {skins.map((skin) => (
        <SkinItem key={skin.id} skin={skin} />
      ))}
    </ul>
  );
}

export default SkinList;
