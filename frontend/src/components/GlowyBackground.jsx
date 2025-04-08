import React from 'react';

function GlowyBackground() {
  const dots = Array.from({ length: 20 }, (_, index) => {
    const size = Math.random() * 8 + 3;
    const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
    const position = {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    };
    const blur = Math.random() * 6 + 3;
    const boxShadowSize = blur * 1.5;

    return (
      <div
        key={index}
        className="absolute rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          top: position.top,
          left: position.left,
          boxShadow: `0 0 ${boxShadowSize}px ${blur / 2}px ${color}`,
          filter: `blur(${blur}px)`,
        }}
      ></div>
    );
  });

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black  overflow-hidden">
      {dots}
    </div>
  );
}

export default GlowyBackground;