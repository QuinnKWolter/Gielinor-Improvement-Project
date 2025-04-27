import React from 'react';

function Support() {
  return (
    <div className="p-8">
      <h1 className="text-5xl font-bold mb-4">Support the Gielinor Improvement Project</h1>
      <p className="mb-8 text-lg">Thank you for using our platform! Your support helps us continue to improve and expand.</p>
      
      <h2 className="text-3xl font-bold mb-4">Community Initiatives</h2>
      <ul className="list-disc list-inside mb-8">
        <li><a href="https://runelite.net" target="_blank" rel="noopener noreferrer" className="text-blue-500">RuneLite</a></li>
        <li><a href="https://oldschool.runescape.wiki" target="_blank" rel="noopener noreferrer" className="text-blue-500">OSRS Wiki</a></li>
        <li><a href="https://wiseoldman.net" target="_blank" rel="noopener noreferrer" className="text-blue-500">Wise Old Man</a></li>
        <li><a href="https://templeosrs.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">Temple OSRS</a></li>
        <li><a href="https://osrsportal.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">OSRS Portal</a></li>
        <li><a href="https://colosim.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">ColoSim</a></li>
      </ul>

      <p className="mb-8 text-lg">
        Please support us by spreading the word about this utility in-game. If you are financially capable, consider contributing a few dollars to help with running the project.
      </p>

      <button className="btn btn-primary">Contribute</button>
    </div>
  );
}

export default Support; 