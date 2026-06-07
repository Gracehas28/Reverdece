import React, { useState, useRef } from 'react';
import { Waves, Award, UserCheck, ChevronDown, Sparkles, Volume2, VolumeX, Play } from 'lucide-react';
import { HERO_IMAGE } from '../data';

interface HeroProps {
  onLearnMoreClick: () => void;
}

export default function Hero({ onLearnMoreClick }: HeroProps) {
  const [rotateX, setRotateX] = useState<number>(8);
  const [rotateY, setRotateY] = useState<number>(-12);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Garantizar reproducción automática robusta al cargar la página
  React.useEffect(() => {
    if (videoRef.current) {
      // Forzar valores en el elemento real para saltarse restricciones de navegadores
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Autoplay bloqueado inicialmente por política del navegador. Esperando interacción:", error);
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const box = container.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Tilt degrees based on mouse position within the container bounds
    const maxTilt = 15;
    const tiltX = -(y / (box.height / 2)) * maxTilt;
    const tiltY = (x / (box.width / 2)) * maxTilt;
    
    setRotateX(tiltX);
    setRotateY(tiltY);
  };

  const handleMouseLeave = () => {
    // Return to elegant passive default 3D angle
    setRotateX(8);
    setRotateY(-12);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering play/pause
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 lg:py-24">
      {/* Background Banner with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-scale duration-1000 scale-105"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-900/60 to-gray-950/85" />
      </div>

      {/* Decorative Wave Design / Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(85,107,47,0.2),transparent_50%)]" />

      {/* Floating Sparkles and Background Accents */}
      <div className="absolute top-1/4 left-10 text-white/5 animate-pulse hidden xl:block">
        <Waves className="h-40 w-40" />
      </div>

      {/* Dynamic Two Column Responsive Grid Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Column 1: Left Text & CTAs & Badges */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-widest text-[#99B882] mb-3 bg-white/5 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 text-yellow-400 animate-pulse" />
              <span>ALQUILER PARADISÍACO EN CARTAGENA</span>
            </span>

            <h1 
              id="hero-headline"
              className="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-6"
            >
              Vive Cartagena <span className="text-[#99B882]">Como un Local</span>: Cómodos apartamentos cerca al mar.
            </h1>

            <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-8 max-w-2xl font-sans font-normal leading-relaxed">
              Arriendos vacacionales con acabados de lujo, ubicaciones estratégicas a unos pasos de la playa y todos los servicios premium que necesitas para una estancia inolvidable.
            </p>

            {/* Actions / CTA group */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:max-w-md lg:max-w-none mb-12">
              <button
                id="hero-cta-apartments"
                onClick={onLearnMoreClick}
                className="w-full sm:w-auto bg-[#556B2F] hover:bg-[#6b8243] hover:scale-105 active:scale-95 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg transition-all duration-300 transform cursor-pointer"
              >
                VER APARTAMENTOS DISPONIBLES
              </button>
              
              <button
                id="hero-cta-secondary"
                onClick={() => {
                  const el = document.getElementById('contacto');
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 backdrop-blur-md border border-white/20 text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-md transition-all duration-300 transform cursor-pointer"
              >
                Consultar Disponibilidad
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
              <div className="bg-white/5 backdrop-blur-md hover:bg-white/10 border border-white/10 p-3 rounded-2xl flex items-center space-x-3 text-left transition-colors duration-300">
                <div className="p-2 bg-[#556B2F]/30 rounded-xl text-yellow-400">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <span className="block font-bold text-base text-white leading-none">4 Años</span>
                  <span className="block text-[11px] text-gray-300 mt-0.5">de Operación Local</span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md hover:bg-white/10 border border-white/10 p-3 rounded-2xl flex items-center space-x-3 text-left transition-colors duration-300">
                <div className="p-2 bg-[#556B2F]/30 rounded-xl text-yellow-400">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <span className="block font-bold text-base text-white leading-none">+2,000</span>
                  <span className="block text-[11px] text-gray-300 mt-0.5">Huéspedes Felices</span>
                </div>
              </div>

              <div className="col-span-2 md:col-span-1 bg-white/5 backdrop-blur-md hover:bg-white/10 border border-white/10 p-3 rounded-2xl flex items-center space-x-3 justify-center md:justify-start text-left transition-colors duration-300">
                <div className="p-2 bg-[#556B2F]/30 rounded-xl text-yellow-400">
                  <span className="font-bold text-xs">⭐️⭐️⭐️⭐️⭐️</span>
                </div>
                <div>
                  <span className="block font-bold text-base text-white leading-none">9.8/10</span>
                  <span className="block text-[11px] text-gray-300 mt-0.5 font-mono">Airbnb & Booking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: 3D Interactive Smartphone with Native Zero-Redirect HTML5 Loop Player */}
          <div 
            className="lg:col-span-5 flex flex-col items-center justify-center relative py-8"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* 3D Tilted Perspective Wrapper */}
            <div 
              className="relative w-[285px] sm:w-[310px] aspect-[9/16] bg-gradient-to-b from-stone-900 via-neutral-950 to-black rounded-[48px] p-3 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden group select-none cursor-pointer"
              style={{ 
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
                transition: 'transform 0.15s ease-out, shadow 0.15s ease-out',
                transformStyle: 'preserve-3d'
              }}
              onClick={togglePlay}
            >
              {/* Screen Inner Glare / Reflect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 z-20 pointer-events-none rounded-[36px]" />

              {/* Dynamic Neon ambient backing aura */}
              <div 
                className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(153,184,130,0.15)_0%,transparent_60%)] opacity-80 blur-2xl z-0 pointer-events-none transition-transform duration-500 group-hover:scale-110"
                style={{
                  transform: `translate3d(${rotateY * 0.8}px, ${-rotateX * 0.8}px, 0)`
                }}
              />

              {/* High-Tech Bezel & Dynamic Island Notch */}
              <div 
                className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-30 flex items-center justify-between px-3.5 border border-white/5 transition-transform duration-300 group-hover:scale-95"
                style={{ transform: 'translateZ(25px)' }}
              >
                {/* Speaker slit */}
                <div className="w-10 h-1 bg-zinc-800 rounded-full" />
                {/* Camera lens */}
                <div className="w-3 h-3 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-700">
                  <div className="w-1.5 h-1.5 bg-blue-900/50 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Bottom Home Indicator Line */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full z-30 mix-blend-difference" />

              {/* Video Wrapper (HTML5 Native zero-redirect player) */}
              <div className="w-full h-full rounded-[36px] overflow-hidden bg-neutral-950 relative">
                <video
                  ref={videoRef}
                  src="https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-with-a-swimming-pool-and-palm-trees-41804-large.mp4"
                  className="w-full h-full object-cover transition-transform duration-500 scale-100 group-hover:scale-[1.02]"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                />

                {/* Instant Action Play/Pause Center Indicator (Fade on play state) */}
                <div 
                  className={`absolute inset-0 bg-black/35 backdrop-blur-[1px] transition-all duration-300 flex items-center justify-center z-10 ${
                    isPlaying ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
                  }`}
                >
                  <div className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl animate-pulse">
                    <Play className="h-8 w-8 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Left/Right Floating High-End UI elements inside the Reel */}
                <div className="absolute left-4 bottom-8 z-20 text-white text-left font-sans drop-shadow-md pointer-events-none">
                  <p className="text-sm font-bold tracking-tight mb-0.5">@reverdece.co</p>
                  <p className="text-[10px] text-white/80 line-clamp-1">Sumérgete en el paraíso tropical • Cartagena</p>
                </div>

                {/* Right Floating Quick Action Tools in Phone (Mute + Unmute control) */}
                <div className="absolute right-4 bottom-8 z-20 flex flex-col items-center space-y-4">
                  <button
                    onClick={toggleMute}
                    className="p-3 bg-black/60 hover:bg-[#556B2F] border border-white/20 hover:border-[#99B882]/40 rounded-full text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto"
                    title={isMuted ? "Activar Sonido" : "Silenciar"}
                  >
                    {isMuted ? (
                      <VolumeX className="h-4.5 w-4.5 text-red-300" />
                    ) : (
                      <Volume2 className="h-4.5 w-4.5 text-[#99B882] animate-bounce" />
                    )}
                  </button>

                  <div className="flex flex-col items-center">
                    <span className="p-2.5 bg-black/40 rounded-full text-white backdrop-blur-xs">
                      🔥
                    </span>
                    <span className="text-[8px] text-white/90 font-bold mt-1 shadow-xs">Reel</span>
                  </div>
                </div>

                {/* Active Live Indicator Bar */}
                <div className="absolute left-4 top-14 z-20 flex items-center space-x-1.5 bg-[#556B2F]/90 backdrop-blur-md text-[10px] text-white py-1 px-2.5 rounded-full font-serif font-semibold tracking-wider border border-[#99B882]/20 pointer-events-none shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                  <span>VIDEO INTERACTIVO</span>
                </div>
              </div>

              {/* Dynamic 3D depth shadows overlay */}
              <div 
                className="absolute inset-0 rounded-[48px] ring-1 ring-white/10 group-hover:ring-white/25 transition-all duration-500 pointer-events-none"
                style={{ transform: 'translateZ(10px)' }}
              />
            </div>
          </div>

        </div>

        {/* Scroll down indicator */}
        <div className="flex justify-center mt-8 lg:-mt-4">
          <button
            onClick={onLearnMoreClick}
            className="flex flex-col items-center text-white/40 hover:text-white transition-colors cursor-pointer animate-bounce group"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase mb-1">Descubrir espacios</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
