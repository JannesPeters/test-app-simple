import { useState, useEffect } from 'react';

export default function ConceptA() {
  const [flames, setFlames] = useState('🔥');

  useEffect(() => {
    const interval = setInterval(() => {
      setFlames(prev => prev === '🔥' ? '🔥🔥' : '🔥');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-red-400 flex items-center justify-center relative overflow-hidden">
      {/* Floating emojis */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            {['⭐', '✨', '💫', '🌟'][i % 4]}
          </div>
        ))}
      </div>

      <div className="text-center space-y-8 p-8 relative z-10">
        <div className="inline-block px-6 py-2 bg-yellow-400 text-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-black text-sm mb-4 transform -rotate-2">
          CONCEPT A: RETRO VIBES
        </div>

        <h1 className="text-8xl font-black text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] animate-pulse">
          HELLO<br/>WORLD! {flames}
        </h1>

        <p className="text-3xl font-bold text-black bg-yellow-300 inline-block px-6 py-3 border-4 border-black transform rotate-1 shadow-xl">
          Let's get this party started! 🎊
        </p>

        <div className="flex gap-6 justify-center mt-12">
          <button className="px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-black text-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
            TAP HERE!
          </button>
          <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-black text-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
            OR HERE!
          </button>
        </div>
      </div>
    </main>
  );
}
