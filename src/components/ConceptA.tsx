import { useState, useEffect } from 'react';

export default function ConceptA() {
  const [time, setTime] = useState(new Date());
  const [visitorCount] = useState(Math.floor(Math.random() * 999999));

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-300 via-purple-300 to-pink-300 flex items-center justify-center relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-400 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            ⭐
          </div>
        ))}
      </div>

      <div className="text-center space-y-6 p-8 relative z-10">
        {/* 90s Badge */}
        <div className="inline-block px-6 py-2 bg-yellow-400 text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold mb-4 transform -rotate-2">
          🎨 CONCEPT A: 90s NOSTALGIA 🎨
        </div>

        {/* Marquee-style title */}
        <div className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 p-4 border-4 border-dashed border-purple-500 shadow-2xl">
          <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-pulse">
            🌟 HELLO WORLD! 🌟
          </h1>
        </div>

        {/* Under construction GIF vibes */}
        <div className="flex justify-center items-center gap-4">
          <span className="text-4xl animate-bounce">🚧</span>
          <p className="text-2xl font-bold text-purple-900 bg-yellow-300 px-4 py-2 border-2 border-black transform rotate-1">
            Welcome to the COOLEST site on the web!
          </p>
          <span className="text-4xl animate-bounce delay-100">🚧</span>
        </div>

        {/* Visitor counter */}
        <div className="bg-black text-lime-400 px-6 py-3 border-4 border-lime-400 font-mono text-xl shadow-[0_0_10px_rgba(0,255,0,0.5)]">
          👁️ Visitor #{visitorCount.toString().padStart(6, '0')} 👁️
        </div>

        {/* Current time */}
        <div className="bg-blue-500 text-white px-6 py-3 border-4 border-yellow-300 font-bold text-lg shadow-xl transform -rotate-1">
          ⏰ {time.toLocaleTimeString()} ⏰
        </div>

        {/* Animated buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            🎵 MIDI MUSIC 🎵
          </button>
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            📼 GUESTBOOK 📼
          </button>
        </div>

        {/* Best viewed badge */}
        <div className="mt-8">
          <p className="text-sm font-mono bg-white px-4 py-2 border-2 border-black inline-block">
            🖥️ Best viewed in Netscape Navigator at 800x600 🖥️
          </p>
        </div>

        {/* Scrolling marquee text */}
        <div className="overflow-hidden bg-red-500 text-white py-2 border-y-4 border-yellow-300">
          <div className="animate-[scroll_10s_linear_infinite] whitespace-nowrap">
            ⚡ THIS SITE IS TOO COOL FOR SCHOOL ⚡ UNDER CONSTRUCTION SINCE 1999 ⚡ WEBMASTER@GEOCITIES.COM ⚡ 
          </div>
        </div>
      </div>

      {/* CSS for marquee animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </main>
  );
}
