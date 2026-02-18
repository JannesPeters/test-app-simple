import { useState, useEffect } from 'react';

export default function ConceptB() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Neon grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-400 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-pink-400 rounded-full blur-[100px] opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="text-center space-y-12 p-8 relative z-10">
        <div className="inline-block px-6 py-2 bg-black border-2 border-cyan-400 text-cyan-400 font-mono text-sm shadow-[0_0_15px_rgba(0,255,255,0.5)] mb-4">
          {'>'} CONCEPT B: NEON DREAMS {'<'}
        </div>

        <div className="relative">
          <h1 className={`text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 transition-all duration-500 ${pulse ? 'scale-105' : 'scale-100'}`}>
            HELLO<br/>WORLD
          </h1>
          <div className="absolute inset-0 text-8xl font-black text-cyan-400 opacity-30 blur-xl">
            HELLO<br/>WORLD
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(0,255,255,0.8)]"></div>
          <p className="text-2xl font-mono text-pink-400 tracking-wider">
            {'[ INITIALIZING ]'}
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-pink-400 to-transparent shadow-[0_0_10px_rgba(255,0,255,0.8)]"></div>
        </div>

        <div className="flex gap-6 justify-center mt-12">
          <button className="px-8 py-3 bg-black border-2 border-cyan-400 text-cyan-400 font-mono hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,1)]">
            {'> ENTER <'}
          </button>
          <button className="px-8 py-3 bg-black border-2 border-pink-500 text-pink-500 font-mono hover:bg-pink-500 hover:text-black transition-all shadow-[0_0_20px_rgba(255,0,255,0.5)] hover:shadow-[0_0_30px_rgba(255,0,255,1)]">
            {'> EXIT <'}
          </button>
        </div>
      </div>
    </main>
  );
}
