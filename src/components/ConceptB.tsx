import { useState, useEffect } from 'react';

export default function ConceptB() {
  const [glitchText, setGlitchText] = useState('HELLO_WORLD');
  const [matrixRain, setMatrixRain] = useState<number[]>([]);

  useEffect(() => {
    // Matrix rain effect
    setMatrixRain(Array(15).fill(0).map(() => Math.random() * 100));

    // Glitch effect
    const glitchInterval = setInterval(() => {
      const chars = 'HELLO_WORLD!@#$%^&*()';
      const glitch = Array(11).fill(0).map(() => 
        chars[Math.floor(Math.random() * chars.length)]
      ).join('');
      setGlitchText(glitch);
      
      setTimeout(() => setGlitchText('HELLO_WORLD'), 100);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_2px,transparent_2px),linear-gradient(90deg,rgba(0,255,255,0.1)_2px,transparent_2px)] bg-[size:50px_50px] [perspective:500px] [transform:rotateX(60deg)]"></div>
      
      {/* Matrix rain effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {matrixRain.map((offset, i) => (
          <div
            key={i}
            className="absolute text-cyan-400 text-xs font-mono animate-[fall_3s_linear_infinite]"
            style={{
              left: `${i * 6.5}%`,
              top: `-${offset}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            {Array(20).fill(0).map((_, j) => (
              <div key={j}>01</div>
            ))}
          </div>
        ))}
      </div>

      {/* Neon scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.03)_50%)] bg-[size:100%_4px] pointer-events-none"></div>

      <div className="text-center space-y-8 p-8 relative z-10">
        {/* Neon badge */}
        <div className="inline-block px-6 py-2 bg-black border-2 border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5),inset_0_0_10px_rgba(0,255,255,0.2)] font-mono text-cyan-400 mb-4 animate-pulse">
          {'>'} CONCEPT B: CYBERPUNK 2077 {'<'}
        </div>

        {/* Glitchy title with neon glow */}
        <div className="relative">
          <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 filter drop-shadow-[0_0_30px_rgba(0,255,255,0.8)]">
            {glitchText}
          </h1>
          {/* Neon outline effect */}
          <div className="absolute inset-0 text-8xl font-black text-cyan-400 opacity-50 blur-sm animate-pulse">
            {glitchText}
          </div>
        </div>

        {/* Cyberpunk subtitle */}
        <div className="relative">
          <p className="text-3xl font-mono text-pink-400 tracking-wider">
            {'[ '}<span className="text-cyan-400">INITIALIZING</span>{' ]'}
          </p>
          <div className="h-1 w-64 mx-auto mt-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(0,255,255,0.8)]"></div>
        </div>

        {/* Stats panel */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
          <div className="bg-black border border-cyan-400 p-4 shadow-[0_0_10px_rgba(0,255,255,0.3)]">
            <div className="text-cyan-400 font-mono text-sm">STREET_CRED</div>
            <div className="text-pink-500 font-bold text-2xl mt-1">MAX</div>
          </div>
          <div className="bg-black border border-pink-500 p-4 shadow-[0_0_10px_rgba(255,0,255,0.3)]">
            <div className="text-pink-500 font-mono text-sm">NETWORK_STATUS</div>
            <div className="text-cyan-400 font-bold text-2xl mt-1">ONLINE</div>
          </div>
          <div className="bg-black border border-purple-500 p-4 shadow-[0_0_10px_rgba(128,0,255,0.3)]">
            <div className="text-purple-400 font-mono text-sm">VIBE_LEVEL</div>
            <div className="text-yellow-400 font-bold text-2xl mt-1">9999</div>
          </div>
        </div>

        {/* Neon buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <button className="px-8 py-3 bg-black border-2 border-cyan-400 text-cyan-400 font-mono font-bold hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,1)]">
            {'>'} JACK_IN {'<'}
          </button>
          <button className="px-8 py-3 bg-black border-2 border-pink-500 text-pink-500 font-mono font-bold hover:bg-pink-500 hover:text-black transition-all shadow-[0_0_20px_rgba(255,0,255,0.5)] hover:shadow-[0_0_30px_rgba(255,0,255,1)]">
            {'>'} DISCONNECT {'<'}
          </button>
        </div>

        {/* Terminal output */}
        <div className="max-w-xl mx-auto bg-black border border-green-500 p-4 text-left font-mono text-sm text-green-400 shadow-[0_0_20px_rgba(0,255,0,0.3)] mt-8">
          <div>root@localhost:~# <span className="animate-pulse">_</span></div>
          <div className="mt-2 text-cyan-400">&gt; Welcome, Netrunner...</div>
          <div className="text-pink-400">&gt; System fully operational</div>
          <div className="text-purple-400">&gt; All protocols: ACTIVE</div>
          <div className="mt-2 text-yellow-400">[WARNING] Vibes critically high</div>
        </div>

        {/* Warning banner */}
        <div className="mt-8 border-t-2 border-b-2 border-yellow-400 py-2 bg-black">
          <p className="text-yellow-400 font-mono text-xs animate-pulse">
            ⚠️ CAUTION: EXCESSIVE COOLNESS LEVELS DETECTED ⚠️
          </p>
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </main>
  );
}
