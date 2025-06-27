import React from 'react';

function About() {
  const s = 20;                               // side length
  const hexWidth = 2 * s;                     // 80
  const hexHeight = Math.sqrt(3) * s;         // ≈69.28
  const horizSpacing = 1.5 * s;               // 60
  const patternWidth = 3 * s;                 // 120
  const patternHeight = hexHeight;            // ≈69.28

  // flat-top hexagon points in a 2s×h box
  const hexPoints = [
    `${s / 2},0`,
    `${3 * s / 2},0`,
    `${2 * s},${hexHeight / 2}`,
    `${3 * s / 2},${hexHeight}`,
    `${s / 2},${hexHeight}`,
    `0,${hexHeight / 2}`,
  ].join(" ");

  // 30 random small hexes
  const randomHexes = Array.from({ length: 0 }).map((_, i) => {
    const x = Math.random() * 1200;
    const y = Math.random() * 800;
    const scale = 0.2 + Math.random() * 0.6;           // 0.2×–0.8×
    return (
      <polygon
        key={i}
        points="50,0 100,25 100,75 50,100 0,75 0,25"
        transform={`translate(${x} ${y}) scale(${scale})`}
        fill="rgba(59,130,246,0.25)"
        stroke="none"
      />
    );
  });

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-base-200 text-white">
      {/* Hexagon Background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="hexPattern"
            patternUnits="userSpaceOnUse"
            width={patternWidth}
            height={patternHeight}
          >
            {/* even-row hex */}
            <polygon
              points={hexPoints}
              stroke="rgb(59,130,246)"
              strokeWidth="2"
              fill="none"
            />
            {/* repeat even-row at tile edge */}
            <polygon
              points={hexPoints}
              transform={`translate(${patternWidth} 0)`}
              stroke="rgb(59,130,246)"
              strokeWidth="2"
              fill="none"
            />
            {/* odd-row hex */}
            <polygon
              points={hexPoints}
              transform={`translate(${horizSpacing} ${patternHeight / 2})`}
              stroke="rgb(59,130,246)"
              strokeWidth="2"
              fill="none"
            />
          </pattern>
        </defs>

        {/* tessellated honeycomb */}
        <rect width="100%" height="100%" fill="url(#hexPattern)" />

        {/* scattered random hexes */}
        {randomHexes}
      </svg>

      {/* Content */}
      <div className="relative z-10 p-8">
        
        <div className="max-w-4xl mx-auto bg-base-100 bg-opacity-80 p-8 rounded-lg shadow-xl">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="mb-8 text-lg">Learn more about the Gielinor Improvement Project and our mission.</p>
          
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="mb-4">
              The Gielinor Improvement Project aims to create a collaborative platform where players can suggest improvements, 
              report bugs, and track official responses from Jagex for RuneScape and Old School RuneScape.
            </p>
            <p className="mb-4">
              We believe that by organizing community feedback in a structured and accessible way, we can help 
              bridge the gap between players and developers, making Gielinor better for everyone.
            </p>
          </div>
          
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Transparency in all community interactions</li>
              <li>Constructive feedback over negativity</li>
              <li>Inclusive representation of all player communities</li>
              <li>Data-driven decision making</li>
              <li>Respect for Jagex developers and their vision</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About; 