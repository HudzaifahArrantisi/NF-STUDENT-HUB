import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import Flip from 'gsap/Flip';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip, ScrollTrigger);
}

const ThreeFlipSection = () => {
  // Refs
  const mainContainerRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const secondMarkerRef = useRef(null);
  const thirdMarkerRef = useRef(null);
  
  // Three.js objects
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const canvasElRef = useRef(null);
  
  // Animation context
  const animationContextRef = useRef(null);
  const isInitialized = useRef(false);

  // State untuk kontrol UI
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPosition, setCurrentPosition] = useState('initial');

  // Fungsi untuk membuat gradient noise texture
  const makeGradientNoiseTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 230, 384);
    gradient.addColorStop(0, '#fec5fb');
    gradient.addColorStop(1, '#00bae2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    // Add subtle grain for texture
    for (let i = 0; i < 4000; i++) {
      const x = Math.floor(gsap.utils.random(0, 256));
      const y = Math.floor(gsap.utils.random(0, 256));
      const alpha = gsap.utils.random(0.02, 0.1);
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      ctx.fillRect(x, y, 3, 3);
    }

    const texture = new THREE.CanvasTexture(canvas);
    // Support multiple Three.js versions: use colorSpace where available, otherwise encoding
    if ('colorSpace' in texture && typeof THREE.SRGBColorSpace !== 'undefined') {
      texture.colorSpace = THREE.SRGBColorSpace;
    } else if ('encoding' in texture && typeof THREE.sRGBEncoding !== 'undefined') {
      texture.encoding = THREE.sRGBEncoding;
    }
    texture.anisotropy = 4;
    return texture;
  };

  // Initialize Three.js scene
  const initThree = (canvas) => {
    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    // Set output color/encoding with feature detection to support different Three.js versions
    if ('outputColorSpace' in renderer && typeof THREE.SRGBColorSpace !== 'undefined') {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    } else if ('outputEncoding' in renderer && typeof THREE.sRGBEncoding !== 'undefined') {
      renderer.outputEncoding = THREE.sRGBEncoding;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 3);
    cameraRef.current = camera;

    // Create cube with gradient texture
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      map: makeGradientNoiseTexture(),
      transparent: true,
      opacity: 0.95
    });
    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    // Add subtle ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Add directional light for better shading
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Handle resize
    const handleResize = () => {
      if (!canvas || !renderer || !camera) return;
      
      const container = canvas.parentElement;
      if (!container) return;
      
      const { width, height } = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      
      renderer.setSize(width * dpr, height * dpr, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      // Update renderer size
      renderer.setSize(width, height);
    };

    // Initial resize
    setTimeout(handleResize, 100);

    // Animation loop
    const animate = () => {
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    // Add to GSAP ticker for smooth animations
    gsap.ticker.add(animate);

    return { handleResize };
  };

  // Build GSAP timeline with Flip animations
  const buildTimeline = () => {
    // Cleanup previous timeline
    if (animationContextRef.current) {
      animationContextRef.current.revert();
    }

    // Create new context
    animationContextRef.current = gsap.context(() => {
      if (!canvasElRef.current || !meshRef.current) return;

      const secondMarker = secondMarkerRef.current;
      const thirdMarker = thirdMarkerRef.current;

      if (!secondMarker || !thirdMarker) return;

      // Get initial states
      const state2 = Flip.getState(secondMarker);
      const state3 = Flip.getState(thirdMarker);

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
          onUpdate: (self) => {
            setIsAnimating(true);
            
            // Update position based on progress
            const progress = self.progress;
            if (progress < 0.33) {
              setCurrentPosition('initial');
            } else if (progress < 0.66) {
              setCurrentPosition('second');
            } else {
              setCurrentPosition('third');
            }
          },
          onLeave: () => setIsAnimating(false),
          onEnterBack: () => setIsAnimating(true)
        }
      });

      // First animation to second marker
      tl.add(
        Flip.fit(canvasElRef.current, state2, {
          duration: 1,
          ease: 'none',
          scale: true,
          absolute: true,
          onStart: () => {
            gsap.to(canvasElRef.current, {
              borderColor: '#fec5fb',
              duration: 0.3
            });
          }
        }),
        0
      )
      .to(
        meshRef.current.rotation,
        {
          x: `+=${Math.PI}`,
          y: `+=${Math.PI}`,
          duration: 1,
          ease: 'none'
        },
        '<'
      )

      // Add pause between animations
      .addLabel('mid', '+=0.3')

      // Second animation to third marker
      .add(
        Flip.fit(canvasElRef.current, state3, {
          duration: 1,
          ease: 'none',
          scale: true,
          absolute: true,
          onStart: () => {
            gsap.to(canvasElRef.current, {
              borderColor: '#00bae2',
              duration: 0.3
            });
          }
        }),
        'mid'
      )
      .to(
        meshRef.current.rotation,
        {
          x: `+=${Math.PI}`,
          y: `+=${Math.PI}`,
          duration: 1,
          ease: 'none'
        },
        '<'
      );

      // Return to initial color
      tl.to(
        canvasElRef.current,
        {
          borderColor: '#d2ceff',
          duration: 0.3
        },
        '+=0.5'
      );
    });
  };

  // Initialize everything
  useEffect(() => {
    if (isInitialized.current) return;

    const initialize = () => {
      // Create canvas element
      const canvas = document.createElement('canvas');
      canvas.className = 'three-canvas';
      canvas.style.cssText = `
        position: absolute;
        width: 200px;
        height: 200px;
        border: 1px dashed #d2ceff;
        border-radius: 12px;
        background: transparent;
        z-index: 10;
        pointer-events: none;
      `;
      
      canvasContainerRef.current.appendChild(canvas);
      canvasElRef.current = canvas;

      // Initialize Three.js
      const { handleResize } = initThree(canvas);

      // Build timeline
      setTimeout(() => {
        buildTimeline();
      }, 500);

      // Handle window resize
      const resizeHandler = () => {
        handleResize();
        buildTimeline();
      };

      window.addEventListener('resize', resizeHandler);
      isInitialized.current = true;

      // Cleanup function
      return () => {
        window.removeEventListener('resize', resizeHandler);
      };
    };

    // Initialize with slight delay to ensure DOM is ready
    const timeoutId = setTimeout(initialize, 300);

    return () => {
      clearTimeout(timeoutId);
      
      // Cleanup Three.js
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (meshRef.current && meshRef.current.material) {
        meshRef.current.material.dispose();
      }
      
      if (meshRef.current && meshRef.current.geometry) {
        meshRef.current.geometry.dispose();
      }
      
      // Cleanup GSAP
      if (animationContextRef.current) {
        animationContextRef.current.revert();
      }
      
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // CSS untuk animasi dan styling
  const styles = `
    .three-flip-section {
      --grid-line: rgba(255, 255, 255, 0.08);
      --box-border: rgba(255, 255, 255, 0.25);
    }

    .grid-background {
      background-image: 
        linear-gradient(rgba(255, 255, 255, 0.05) 2px, transparent 2px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 2px, transparent 2px),
        linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
      background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
      background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px) rotate(0deg);
      }
      50% {
        transform: translateY(-10px) rotate(5deg);
      }
    }

    .floating {
      animation: float 6s ease-in-out infinite;
    }

    .pulse-glow {
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 0.6;
      }
      50% {
        opacity: 1;
      }
    }
  `;

  return (
    <section className="three-flip-section relative min-h-[300vh] bg-black text-white overflow-hidden">
      <style>{styles}</style>
      
      {/* Background Grid */}
      <div className="grid-background absolute inset-0 opacity-20" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white/5 rounded-full floating"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${8 + Math.random() * 8}s`
            }}
          />
        ))}
      </div>


      {/* Main container dengan markers */}
      <div 
        ref={mainContainerRef}
        className="main relative h-[200vh]"
      >
        {/* Initial container */}
        <div 
          className="container initial absolute w-[200px] h-[200px] grid place-items-center"
          style={{ left: '60%', top: '10%' }}
        >
          <div className="absolute inset-0 border-2 border-dashed border-white/25 rounded-xl" />
          <div 
            ref={canvasContainerRef}
            className="relative w-full h-full"
          />
          
          {/* Position indicator */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-gray-700">
              <span className="text-xs text-gray-300 font-mono">Modern Look</span>
            </div>
          </div>
        </div>

        {/* Second marker */}
        <div 
          ref={secondMarkerRef}
          className="container second absolute w-[100px] h-[100px] grid place-items-center"
          style={{ left: '10%', top: '50%' }}
        >
          <div className="marker w-full h-full rounded-lg outline outline-1 outline-dashed outline-white/20 outline-offset-[-6px] opacity-70" />
          
          {/* Position indicator */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="px-2 py-1 bg-black/80 backdrop-blur-md rounded-full border border-gray-700">
              <span className="text-xs text-gray-300 font-mono">Simple</span>
            </div>
          </div>
        </div>

        {/* Third marker */}
        <div 
          ref={thirdMarkerRef}
          className="container third absolute w-[200px] h-[200px] grid place-items-center"
          style={{ right: '10%', bottom: '5rem' }}
        >
          <div className="marker w-full h-full rounded-lg outline outline-1 outline-dashed outline-white/20 outline-offset-[-6px] opacity-70" />
          
          {/* Position indicator */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-gray-700">
              <span className="text-xs text-gray-300 font-mono">Have fun</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer bawah */}
      <div className="spacer final h-[15vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-gray-400 tracking-widest uppercase font-mono mb-2">
            Animation complete
          </div>
          <div className="text-xs text-gray-500">
            Powered by Three.js & GSAP Flip
          </div>
        </div>
      </div>

    

      {/* Title Section */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center z-10">
        <div className="inline-block mb-6">
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-gray-800">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" />
            <span className="text-sm text-gray-300 tracking-wider uppercase font-mono">
              Tampilan lebih modern dan interaktif
            </span>
          </div>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
            Nf Student HUB 3D Flip
          </span>
        </h2>
        
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Watch the 3D cube transform and move between markers as you scroll.
          Experience seamless transitions powered by GSAP Flip and real-time 3D rendering.
        </p>
        
        {/* Tech badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <div className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            <span className="text-sm text-cyan-400">Three.js</span>
          </div>
          <div className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">
            <span className="text-sm text-purple-400">GSAP Flip</span>
          </div>
          <div className="px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30">
            <span className="text-sm text-pink-400">WebGL</span>
          </div>
          <div className="px-4 py-2 rounded-full bg-gray-800 border border-gray-700">
            <span className="text-sm text-gray-300">ScrollTrigger</span>
          </div>
        </div>

      </div>

      {/* Connection Lines (Visual Guide) */}
      <svg className="absolute inset-0 pointer-events-none z-0" style={{ height: '200vh' }}>
        {/* Line from initial to second */}
        <path
          d="M60% 10% L10% 50%"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
          strokeDasharray="5,5"
          fill="none"
        />
        
        {/* Line from second to third */}
        <path
          d="M10% 50% L90% 85%"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
          strokeDasharray="5,5"
          fill="none"
        />
        
        {/* Animated progress line */}
        <path
          id="progress-line"
          d="M60% 10% L10% 50% L90% 85%"
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          style={{
            strokeDashoffset: isAnimating ? '0' : '1000',
            transition: 'stroke-dashoffset 0.5s ease'
          }}
        />
        
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fec5fb" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#00bae2" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
};

export default ThreeFlipSection;