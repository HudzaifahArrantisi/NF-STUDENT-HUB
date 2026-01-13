import React, { useState, useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth'; // Sesuaikan path jika perlu
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Login = () => {
  // --- FUNCTIONAL STATE (Sama seperti Login.jsx asli) ---
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // --- ANIMATION REFS & STATE ---
  const containerRef = useRef(null);
  // Kita simpan referensi ke timeline GSAP agar bisa dikontrol dari React State
  const animRefs = useRef({
    gearsTls: [],
    emailTl: null, // Ini sekarang untuk Password
    pullTl: null,
    updateName: null, // Fungsi update identifier
    updateEmail: null, // Fungsi update password
    sprayRepeatCounter: 0,
    state: {
      handClosed: false,
      sumbitBtnOnPlace: false,
      sumbitBtnTextOpacity: 0,
      pullProgress: 0
    }
  });

  // --- HANDLERS (Digabungkan) ---

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // 1. Update React State (Fungsional)
    if (type === 'checkbox') {
        setRememberMe(checked);
        // Trigger animasi checkbox
        if (animRefs.current.createPullingTimeline) {
            animRefs.current.createPullingTimeline(animRefs.current.state.handClosed, checked);
        }
    } else {
        setFormData({ ...formData, [name]: value });
        
        // 2. Trigger Animasi (Visual)
        if (name === 'identifier' && animRefs.current.updateName) {
            animRefs.current.updateName(value);
        }
        if (name === 'password' && animRefs.current.updateEmail) {
            animRefs.current.updateEmail(value);
        }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Animasi Submit (jika valid secara visual)
    const { sprayRepeatCounter } = animRefs.current;
    // Validasi sederhana untuk animasi (minimal panjang 3 untuk identifier & password)
    const visualValid = formData.identifier.length > 3 && formData.password.length > 3 && rememberMe && sprayRepeatCounter > 1;

    if (visualValid) {
         gsap.to(containerRef.current.querySelectorAll("svg > *"), {
            duration: .1,
            opacity: 0,
            stagger: { each: 0.03, from: 'random', ease: 'none' }
        });
        gsap.to(containerRef.current.querySelectorAll(".form-row"), {
            delay: .4,
            duration: .1,
            opacity: 0,
            stagger: .1
        });
    }

    // Logika Login Asli
    setLoading(true);
    setError('');

    const result = await login(formData.identifier, formData.password);
    if (result.success) {
      navigate(result.redirect || '/');
    } else {
      setError(result.message);
      // Reset animasi loading jika error
       gsap.to(containerRef.current.querySelectorAll("svg > *"), { duration: 0.5, opacity: 1 });
       gsap.to(containerRef.current.querySelectorAll(".form-row"), { duration: 0.5, opacity: 1 });
    }
    setLoading(false);
  };

  // --- GSAP SETUP (useEffect) ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scoped Selector Helper
    const q = (selector) => container.querySelector(selector);
    const qa = (selector) => Array.from(container.querySelectorAll(selector));

    // Elements
    const submitBtn = q('input[type="submit"]');
    const sprayer = q('.sprayer');
    const sprayHandContainer = q('.spray-hand-container');
    const sprayLines = qa('.spray-line');
    const sprayBubbles = qa('.spray-bubble');
    const pushingHand = q('.pushing-hand');
    const sprayerHead = q('.sprayer-head');
    const gearsContainer = q('.gears');
    const gearConnector = q('.gear-connector');
    const pullSystemContainer = q('.pull-system');
    const checkboxPullLine = q('.checkbox-pull-line');
    const checkboxPullCircle = q('.checkbox-pull-circle');
    const spiralContainer = q('.spiral-container');
    const weightBigContainer = q('.weight-big-container');
    const scalesContainer = q('.scales-container');
    const scalesLine = q('.scales-moving-line');
    const weightBig = q('.weight-big');
    const spiralPath = q('.spiral-path');
    const carContainer = q('.car-container');
    const car = q('.car');
    const carInclineWrapper = q('.car-container g');
    const timingChains = qa('.timing-chain');
    const reelsConnector = q('.reels-connector');
    const carWeightConnector = q('.car-weight-connector');
    const grabbingHand = q('.grabbing-hand');
    const grabbingHandOpenFingers = qa('.grabbing-hand-finger-open');
    const grabbingHandClosedFingers = qa('.grabbing-hand-finger-closed');

    // --- HELPER FUNCTIONS ---
    
    function layoutPreparation() {
        gsap.set(pullSystemContainer, { x: 375, y: 646 });
        gsap.set(sprayHandContainer, { x: 700, y: 621 });
        gsap.set(sprayer, { x: -59.5, y: 53 });
        gsap.set(carContainer, { x: 190, y: 802 });
        gsap.set(scalesContainer, { x: 170, y: 710 });
        gsap.set(grabbingHand, { x: 297, y: 830 });
        gsap.set(grabbingHandClosedFingers, { opacity: 0 });
        gsap.set(spiralContainer, { x: 305, y: 435, svgOrigin: "14 14", scaleX: -1 });
        gsap.set(weightBigContainer, { x: 305, y: 435 });
        gsap.set(submitBtn, { color: "rgba(0, 0, 0, 0)" });
        gsap.set([sprayLines, sprayBubbles], { opacity: 0 });
        gsap.set(timingChains[0], { attr: { "stroke-width": "5", "stroke-dasharray": "0 12" } });
        gsap.set(timingChains[1], { attr: { "stroke-width": "5", "stroke-dasharray": "0 12" } });
        gsap.set(checkboxPullLine, { attr: { y1: -105, y2: 44 } });
        gsap.set(submitBtn, { transformOrigin: "100% 0%", rotation: -90 });
        gsap.set(checkboxPullCircle, { y: 44 });
    }

    function updateSpiralPath(centerX, centerY, radius, coils, points, offset) {
        let path = "";
        let thetaMax = coils * 2 * Math.PI;
        const awayStep = radius / thetaMax;
        const chord = 2 * Math.PI / points;
        thetaMax -= offset * points * chord;

        for (let theta = 0; theta <= thetaMax; theta += chord) {
            const away = awayStep * theta;
            const x = centerX + Math.cos(theta) * away;
            const y = centerY + Math.sin(theta) * away;
            if (theta === 0) {
                path += `M${x},${y}`;
            } else {
                const prevAway = awayStep * (theta - chord);
                const arcRadius = (away + prevAway) / 2;
                path += ` A${arcRadius},${arcRadius} 0 0,1 ${x},${y}`;
            }
        }
        const outerAngle = thetaMax + .5 * Math.PI;
        const outerLength = 50 + 25 * offset;
        const endPoint = [Math.cos(outerAngle) * outerLength, Math.sin(outerAngle) * outerLength];
        path += (' l' + endPoint[0] + ',' + endPoint[1]);

        gsap.set(spiralPath, { attr: { d: path } });
        gsap.set(weightBig, { x: -47 + 3 * offset, y: 12 + outerLength });
    }

    function createEmailTl() {
        const spiralTurnsNumber = 8;
        const spiralProgress = { v: 0 };
        const hammerTimeStart = 1.85;
        const fingersDelay = .5;
        const fingersTimeDelta = .03;
        const tl = gsap.timeline({
            paused: true,
            defaults: { ease: "none", duration: 2 },
            onUpdate: () => {
                updateSpiralPath(14, 14, 45, 17, 200, spiralTurnsNumber * spiralProgress.v);
            },
        })
        .to(spiralProgress, { v: 1 }, 0)
        .to(spiralContainer, { rotation: -spiralTurnsNumber * 360 }, 0)
        .fromTo(scalesLine, { rotation: -20, svgOrigin: "92 20" }, { duration: .15, rotation: -1, svgOrigin: "92 20" }, hammerTimeStart)
        .fromTo(timingChains[0], { attr: { "stroke-dashoffset": 2 } }, { duration: .15, attr: { "stroke-dashoffset": 20 } }, hammerTimeStart)
        .fromTo(timingChains[1], { attr: { "stroke-dashoffset": 24 } }, { duration: .15, attr: { "stroke-dashoffset": 6 } }, hammerTimeStart)
        .to(reelsConnector, { duration: .15, y: 18 }, hammerTimeStart)
        .to(carWeightConnector, { duration: .15, y: -18 }, hammerTimeStart)
        .to(carInclineWrapper, { duration: .15, rotation: 6, svgOrigin: "120 93" }, hammerTimeStart)
        .fromTo(car, { x: -50 }, { duration: .6, x: 95, ease: "power2.in" }, hammerTimeStart);

        for (let i = 0; i < 5; i++) {
            tl.set(grabbingHandOpenFingers[i], { opacity: 0 }, hammerTimeStart + fingersDelay + fingersTimeDelta * (i + 1))
              .set(grabbingHandClosedFingers[i], { opacity: 1 }, hammerTimeStart + fingersDelay + fingersTimeDelta * (i + 1));
        }
        tl.fromTo(animRefs.current.state, { handClosed: false }, { duration: .01, handClosed: true }, ">")
          .to(grabbingHand, { duration: fingersTimeDelta * 5, x: "+=20" }, hammerTimeStart + fingersDelay);
        
        tl.progress(0.001);
        return tl;
    }

    function createGearsTimelines() {
        const tls = [];
        const params = { baseSize: 15, pitch: 11, teethCurve: .6, startPos: { x: 634, y: 389 }, speed: .2 };
        const data = [{ angle: 0, teethNumber: 10, hasHole: true }, { angle: -.5, teethNumber: 32, hasHole: true }, { angle: 1.65, teethNumber: 12, hasHole: false }];
        const handleRadius = 14;
        const gears = [];

        // Clear existing gears just in case
        gearsContainer.innerHTML = '';

        data.forEach((d, dIdx) => {
            const radius = (d.teethNumber * params.baseSize) / (2 * Math.PI);
            let x, y, startAngle;

            if (dIdx === 0) {
                startAngle = 0;
                x = params.startPos.x;
                y = params.startPos.y;
            } else {
                const parent = gears[dIdx - 1];
                const size = parent.teethNumber / d.teethNumber;
                x = parent.center.x + Math.cos(d.angle) * (parent.radius + radius);
                y = parent.center.y + Math.sin(d.angle) * (parent.radius + radius);
                startAngle = (1 + size) * d.angle - size * parent.angle;
            }

            const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            gearsContainer.appendChild(group);
            group.appendChild(path);

            const gear = { idx: dIdx, center: { x, y }, radius, angle: startAngle, teethNumber: d.teethNumber, hasHole: d.hasHole, toothAngle: 2 * Math.PI / d.teethNumber, toothCurveAngle: params.teethCurve / d.teethNumber, group };

            const rOut = gear.radius + .25 * params.pitch;
            const rIn = rOut - .75 * params.pitch;
            let pathD = "M" + (gear.center.x + Math.cos(gear.angle - gear.toothAngle + gear.toothCurveAngle) * rOut) + ", " + (gear.center.y + Math.sin(gear.angle - gear.toothAngle + gear.toothCurveAngle) * rOut) + " ";
            for (let a = gear.angle; a < (gear.angle + 2 * Math.PI - .5 * gear.toothAngle); a += gear.toothAngle) {
                const pa = (a - .5 * gear.toothAngle);
                pathD += ("L" + (gear.center.x + Math.cos(pa - gear.toothCurveAngle) * rOut) + ", " + (gear.center.y + Math.sin(pa - gear.toothCurveAngle) * rOut) + " ");
                pathD += ("L" + (gear.center.x + Math.cos(pa) * rIn) + ", " + (gear.center.y + Math.sin(pa) * rIn) + " ");
                pathD += ("L" + (gear.center.x + Math.cos(a) * rIn) + ", " + (gear.center.y + Math.sin(a) * rIn) + " ");
                pathD += ("L" + (gear.center.x + Math.cos(a + gear.toothCurveAngle) * rOut) + ", " + (gear.center.y + Math.sin(a + gear.toothCurveAngle) * rOut) + " ");
            }

            if (gear.hasHole) {
                const holeRadius = .5 * rIn;
                pathD += ("M" + (gear.center.x - holeRadius) + ", " + (gear.center.y) + " ");
                pathD += `A ${holeRadius} ${holeRadius} 1 1 0 ${gear.center.x + holeRadius} ${gear.center.y}`;
                pathD += `A ${holeRadius} ${holeRadius} 1 1 0 ${gear.center.x - holeRadius} ${gear.center.y}`;
            }

            if (dIdx === 0) {
                 const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                 gsap.set(circle, { attr: { cx: gear.center.x, cy: gear.center.y, r: 5, fill: "#000000" } });
                 gearsContainer.appendChild(circle);
                 gsap.set(path, { attr: { fill: "#000000", "fill-opacity": .25 } });
            } else if (dIdx === (data.length - 1)) {
                gsap.set(path, { attr: { fill: "#000000", "fill-opacity": .25 } });
                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                gsap.set(circle, { attr: { cx: gear.center.x + handleRadius, cy: gear.center.y, r: 5, fill: "#000000" } });
                gear.group.appendChild(circle);
            }
            path.setAttribute("d", pathD);

            const tl = gsap.timeline({ repeat: -1, paused: true })
                .to(group, { duration: params.speed * gear.teethNumber, rotation: 360 * (gear.idx % 2 ? -1 : 1), svgOrigin: gear.center.x + " " + gear.center.y, ease: "none" });

            if (dIdx === (data.length - 1)) {
                tl.eventCallback("onUpdate", () => {
                    const angle = tl.progress() * 2 * Math.PI;
                    const deltaY = Math.sin(angle) * handleRadius;
                    gsap.set(pushingHand, { y: deltaY });
                    if (deltaY > 8) {
                        const d = Math.max(0, deltaY - 8);
                        gsap.set(sprayerHead, { y: d });
                        let sprayProgress = Math.max(0, tl.progress() - .1);
                        sprayProgress *= (1 / .2);
                        let bubblesOpacity = (sprayProgress > 1) ? 0 : sprayProgress;
                        bubblesOpacity *= (1 - Math.pow(bubblesOpacity, 8));
                        const textProgress = Math.pow(sprayProgress / 1.5, 6);
                        
                        if (!animRefs.current.state.sumbitBtnOnPlace) {
                            animRefs.current.state.sumbitBtnTextOpacity = (animRefs.current.sprayRepeatCounter - 1) * .3 + .3 * textProgress;
                            animRefs.current.state.sumbitBtnTextOpacity = Math.pow(animRefs.current.state.sumbitBtnTextOpacity, 2);
                        }
                        gsap.set(submitBtn, { color: "rgba(0, 0, 0, " + animRefs.current.state.sumbitBtnTextOpacity + ")" });
                        gsap.set(sprayLines, { attr: { "stroke-dashoffset": 70 * sprayProgress }, opacity: Math.pow(bubblesOpacity, 2) });
                        sprayBubbles.forEach((b, bIdx) => {
                            gsap.set(b, { x: 25 * (1 - sprayProgress) * (1 + .1 * bIdx), scale: .5 + 1.4 * Math.pow(sprayProgress, 2), transformOrigin: "center center", opacity: bubblesOpacity });
                        })
                    }
                    gsap.set(gearConnector, { attr: { x1: gear.center.x + handleRadius * Math.cos(angle), y1: gear.center.y + handleRadius * Math.sin(angle), x2: 700 + 18, y2: 646 - 100 + deltaY } });
                });
                tl.eventCallback("onRepeat", () => {
                    if (!animRefs.current.state.sumbitBtnOnPlace) {
                        animRefs.current.sprayRepeatCounter++;
                    }
                });
            }
            tl.progress(0.6);
            tls.push(tl);
            gears.push(gear);
        });
        return tls;
    }

    function createPullingTimeline(isFixed, BtnPulled) {
        // Kill previous pulling timeline if exists to avoid conflict
        if (animRefs.current.pullTl) animRefs.current.pullTl.kill();

        let tl = gsap.timeline({ defaults: { ease: "power1.inOut", duration: 1 }, onUpdate: animatePullingLine });

        // Logic simplifikasi dari kode asli
        if (isFixed && BtnPulled) {
             tl.to(animRefs.current.state, { pullProgress: 1 }, 0)
               .to(submitBtn, { rotation: 0 }, 0)
               .to(animRefs.current.state, { duration: .1, sumbitBtnOnPlace: 1 }, .9)
               .to(checkboxPullLine, { attr: { y2: 44 - 130 } }, 0)
               .to(checkboxPullCircle, { y: 44 - 130 }, 0);
        } else if (!isFixed && BtnPulled) {
            tl.to(animRefs.current.state, { pullProgress: 1 }, 0)
              .to(checkboxPullLine, { attr: { y2: 44 - 130 } }, 0)
              .to(checkboxPullCircle, { y: 44 - 130 }, 0);
        } else if (isFixed && !BtnPulled) {
            tl.to(animRefs.current.state, { pullProgress: 0 }, 0)
              .to(submitBtn, { rotation: -90 }, 0)
              .to(animRefs.current.state, { duration: .1, sumbitBtnOnPlace: 0 }, 0)
              .to(checkboxPullLine, { attr: { y2: 44 } }, 0)
              .to(checkboxPullCircle, { y: 44 }, 0);
        } else if (!isFixed && !BtnPulled) {
             tl.to(animRefs.current.state, { pullProgress: 0 }, 0)
               .to(checkboxPullLine, { attr: { y2: 44 } }, 0)
               .to(checkboxPullCircle, { y: 44 }, 0);
        }
        
        animRefs.current.pullTl = tl;

        function animatePullingLine() {
             // Logic line drawing (simplified for brevity as exact coords depend on layout)
             // This was mostly aesthetic in the original
        }
    }

    // --- INITIALIZATION ---
    layoutPreparation();
    
    // Create Timelines
    const gearsTls = createGearsTimelines();
    const emailTl = createEmailTl();
    
    // Store in refs for handlers
    animRefs.current.gearsTls = gearsTls;
    animRefs.current.emailTl = emailTl;
    
    // Define logic for inputs
    animRefs.current.updateName = (val) => {
        const isValid = val.length > 3;
        const inputEl = q('input[name="identifier"]');
        if (isValid) {
            inputEl.classList.add("valid");
            gearsTls.forEach(tl => {
                if (tl.paused()) { tl.play(); gsap.fromTo(tl, { timeScale: 0 }, { timeScale: 1 }); }
            });
        } else {
            inputEl.classList.remove("valid");
            gearsTls.forEach(tl => {
                if (!tl.paused()) { gsap.to(tl, { timeScale: 0, onComplete: () => tl.pause() }); }
            });
            animRefs.current.sprayRepeatCounter = 0;
            gsap.to(submitBtn, { duration: .3, color: "rgba(0, 0, 0, 0)" });
        }
    };

    animRefs.current.updateEmail = (val) => {
        // Simple length check instead of regex for password animation
        const isValid = val.length > 3; 
        const inputEl = q('input[name="password"]');
        if (isValid) {
            emailTl.play();
            inputEl.classList.add("valid");
        } else {
            emailTl.reverse();
            inputEl.classList.remove("valid");
        }
    };
    
    animRefs.current.createPullingTimeline = createPullingTimeline;
    createPullingTimeline(animRefs.current.state.handClosed, false); // Initial state

    // Scale to Fit Window
    const handleResize = () => {
        const h = 800;
        if (window.innerHeight < h) {
             gsap.set(container, { scale: window.innerHeight / h, transformOrigin: "50% 75%" });
        }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        gearsTls.forEach(tl => tl.kill());
        if(emailTl) emailTl.kill();
        if(animRefs.current.pullTl) animRefs.current.pullTl.kill();
    }
  }, []);

  return (
    <div className="login-animation-wrapper">
      {/* Styles inline agar sesuai dengan request "single file" structure */}
      <style>{`
        .login-animation-wrapper {
            padding: 0;
            margin: 0;
            font-family: sans-serif;
            background-color: #FAF9F6;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            position: relative;
        }
        .container-anim {
            position: fixed;
            top: 38%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 1000px; 
            height: 800px;
        }
        .login-animation-wrapper svg,
        .form-container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .form-container {
            width: 270px;
            z-index: 10;
        }
        .login-animation-wrapper svg {
            width: 1000px;
            pointer-events: none;
        }
        .form-container .form-row {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: relative;
            background: transparent;
        }
        .form-container .form-row input:not([type="checkbox"]):not([type="submit"]) {
            width: 100%;
            height: 30px;
            margin: 0;
            padding: 5px;
            outline: none;
            border: 2px solid #dddddd;
            background: rgba(255,255,255,0.8);
        }
        .form-container .form-row input.valid {
            border-color: #000000;
        }
        .form-container .form-row input[type="checkbox"] {
            width: 20px;
            height: 20px;
            margin: 0 10px 0 0;
            padding: 0;
            border: 2px solid #dddddd;
            cursor: pointer;
        }
        .form-container .form-row input[type="submit"] {
            height: 40px;
            cursor: pointer;
            border: none;
            background-color: #eeeeee;
            width: 100%;
            font-weight: bold;
            transition: color 0.3s;
        }
        .form-container input[type="submit"]:hover {
            background-color: #dddddd;
        }
        .form-container label,
        .form-container input,
        .form-container input::placeholder {
            font-size: 15px;
            font-family: inherit;
        }
        .login-animation-wrapper svg {
            stroke-width: 1.2px;
            stroke: #000000;
            fill: none;
        }
        .error-msg {
            position: absolute;
            top: -50px;
            left: 0;
            width: 100%;
            color: red;
            text-align: center;
            font-size: 14px;
        }
        .back-btn {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 100;
            cursor: pointer;
            color: #333;
            text-decoration: none;
            font-weight: bold;
        }
      `}</style>

      {/* Back Button */}
      <button onClick={() => navigate('/')} className="back-btn">
          &larr; Back to Home
      </button>

      <div className="container-anim" ref={containerRef}>
        <div className="form-container">
            {error && <div className="error-msg">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                {/* IDENTIFIER / "NAME" SLOT */}
                <div className="form-row">
                    <input 
                        autoComplete="off" 
                        type="text" 
                        name="identifier" 
                        placeholder="Email / Identifier" 
                        value={formData.identifier}
                        onChange={handleChange}
                        required 
                    />
                </div>
                
                {/* PASSWORD / "EMAIL" SLOT */}
                <div className="form-row">
                    <input 
                        autoComplete="off" 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password}
                        onChange={handleChange}
                        required 
                    />
                </div>
                
                {/* REMEMBER ME / "SUBSCRIBE" SLOT */}
                <label className="form-row">
                    <input 
                        type="checkbox" 
                        name="remember" 
                        checked={rememberMe}
                        onChange={handleChange}
                    />
                    <span>Klik ini dulu</span>
                </label>
                
                {/* SUBMIT */}
                <div className="form-row">
                    <input 
                        type="submit" 
                        value={loading ? "Loading..." : "Submit"} 
                        disabled={loading}
                    />
                </div>
                
                <div className="text-center mt-2 text-xs">
                     <a href="/register" className="text-gray-500 hover:underline">Register</a>
                     {" | "}
                     <a href="/forgot-password" className="text-gray-500 hover:underline">Forgot?</a>
                </div>
            </form>
        </div>
    
        <svg viewBox="0 0 1000 1000" strokeLinecap="round" strokeLinejoin="round">
    
            <rect x="710" y="527" width="16" height="47" rx="10" ry="10"></rect>
    
            <g className="grabbing-hand">
                <path d="M48.89,54.39c-3.51.76-15.72,3-22.83-.68a14,14,0,0,0-6.41-1.52h0A3.79,3.79,0,0,1,17,51.09a3.7,3.7,0,0,1-1.1-2.64V27.75A3.75,3.75,0,0,1,19.63,24H24.1"/>
                <path className="grabbing-hand-finger-open" d="M57.05,29.76l24.82,0a4.07,4.07,0,0,0,4.11-4h0a4.07,4.07,0,0,0-4-4.11L48.69,21.3"/>
                <path className="grabbing-hand-finger-open" d="M59.34,37.74l28.81.61a4.06,4.06,0,0,0,4.14-4h0a4.06,4.06,0,0,0-4-4.15L57,29.64"/>
                <path className="grabbing-hand-finger-open" d="M57.13,45.9l26.94.78a4.07,4.07,0,0,0,4.15-4h0a4.07,4.07,0,0,0-4-4.14l-24.84-.8"/>
                <path className="grabbing-hand-finger-open" d="M48.89,54.39l27.82.36a4.06,4.06,0,0,0,4.2-3.93h0A4.06,4.06,0,0,0,77,46.62l-19.88-.78"/>
                <path className="grabbing-hand-finger-open" d="M40.78,28c5.75-5.85,12.66-22,10.5-25.88-2.25-4.09-6,.1-14.73,8.66C30.84,16.36,30.91,17.1,24.32,24"/>
            </g>
    
            <g className="pull-system">
                <line className="checkbox-pull-line" x1="0" y1="0" x2="0" y2="0"/>
                <g className="checkbox-pull-circle">
                    <circle cx="0" cy="0" r="10"/>
                    <circle cx="0" cy="0" r="4" fill="#000000"/>
                </g>
                <circle className="submit-btn-circle" cx="0" cy="0" r="3" stroke="none" fill="#000" />
                <path className="submit-btn-connector" d=""></path>
            </g>
    
            <g className="spray-hand-container">
                <g className="pushing-hand">
                    <circle cx="18" cy="0" r="5" fill="#000000"/>
                    <circle cx="18" cy="-70" r="5" fill="#000000"/>
                    <path d="M18,-70 v70" strokeWidth="4"/>
                    <g>
                        <path d="M25.3,32.9V60.2a4.2,4.2,0,0,0,4.2,4.2h0a4.2,4.2,0,0,0,4.2-4.2V26.7"/>
                        <rect x="3.9" y="18.4" width="8.4" height="21.47" rx="3.7" transform="translate(10.2 -1) rotate(19.4)"/>
                        <path d="M20.9,24a3.4,3.4,0,0,0-1.7-1.1h0a4.2,4.2,0,0,0-5.4,2.5L9.1,38.8a4.3,4.3,0,0,0,2.6,5.4h0a4.3,4.3,0,0,0,5.4-2.6l1.8-5.1"/>
                        <path d="M18.4,37.9,17.3,43a4.2,4.2,0,0,0,3.4,4.9h0a4.3,4.3,0,0,0,4.5-2.3"/>
                        <path fill="white" d="M29,16.8c-6.4,5-15,13.2-12.8,17.8s6,.7,15.8-6.7c6.4-4.8,7.4-12.6.5-19.2V4.2A3.8,3.8,0,0,0,28.7.5H8A3.5,3.5,0,0,0,5.4,1.6,3.7,3.7,0,0,0,4.3,4.2V8.7"/>
                        <path d="M4.3,8.7c-5.8,6.4-3.6,20-2.2,24.8"/>
                    </g>
                </g>
                <g className="sprayer">
                    <g className="sprayer-head">
                        <defs>
                            <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="100%" fy="50%">
                                <stop offset="0%" stopColor="#777777" stopOpacity="0"/>
                                <stop offset="100%" stopColor="#777777" stopOpacity="1"/>
                            </radialGradient>
                        </defs>
                        <rect x="82.39" y="19.85" width="13.06" height="16.79" rx="1.46"/>
                        <rect x="74.55" y="22.56" width="7.84" height="6.1" rx="1.13"/>
    
                        <line className="spray-line" stroke="#777777" strokeDasharray="8 5" x1="22.4" y1="14.76" x2="74.27" y2="25.2" />
                        <line className="spray-line" stroke="#777777" strokeDasharray="8 5" x1="21.51" y1="21.12" x2="74.27" y2="25.2" />
                        <line className="spray-line" stroke="#777777" strokeDasharray="8 5" x1="21.44" y1="28.26" x2="74.27" y2="25.2" />
                        <line className="spray-line" stroke="#777777" strokeDasharray="8 5" x1="22.37" y1="35.54" x2="74.27" y2="25.2" />
                        <line className="spray-line" stroke="#777777" strokeDasharray="8 5" x1="24.21" y1="42.36" x2="74.27" y2="25.2" />
                        <line className="spray-line" stroke="#777777" strokeDasharray="8 5" x1="24.31" y1="7.78" x2="74.27" y2="25.2" />
    
                        <circle fill="url(#grad1)" stroke="none" className="spray-bubble" cx="25.43" cy="12.97" r="12.47" />
                        <circle fill="url(#grad1)" stroke="none" className="spray-bubble" cx="15.6" cy="25.43" r="15.1" />
                        <circle fill="url(#grad1)" stroke="none" className="spray-bubble" cx="33.24" cy="37.13" r="9.21" />
                        <circle fill="url(#grad1)" stroke="none" className="spray-bubble" cx="35.92" cy="19.5" r="11.89" />
                        <circle fill="url(#grad1)" stroke="none" className="spray-bubble" cx="18.82" cy="34.45" r="11.89" />
                    </g>
                    <path d="M89,42h0a21.3,21.3,0,0,1,21.3,21.3v56.48a5.06,5.06,0,0,1-5.06,5.06H72.6a5.06,5.06,0,0,1-5.06-5.06V63.4A21.45,21.45,0,0,1,89,42Z" fill="#fff"/>
                    <rect x="78.3" y="36.64" width="21.24" height="6.15" rx="1.93" fill="#fff"/>
                    <rect x="76.33" y="71.46" width="33.96" height="23.23" fill="#cccccc"/>
                </g>
            </g>
    
            <g>
                <line className="gear-connector" x1="0" x2="0" y1="0" y2="0"/>
                <g className="gears">
                </g>
            </g>
    
            <g className="grabbing-hand">
                <g fill="#ffffff">
                    <rect className="grabbing-hand-finger-closed" x="44.79" y="13.38" width="8.42" height="22.15" rx="3.67" transform="translate(20.57 71.26) rotate(-85.25)"/>
                    <rect className="grabbing-hand-finger-closed" x="44.08" y="39.17" width="8.42" height="21.47" rx="3.67" transform="translate(-5.44 93.9) rotate(-85.25)"/>
                    <rect className="grabbing-hand-finger-closed" x="45.68" y="30.71" width="8.42" height="22.57" rx="3.67" transform="matrix(0.08, -1, 1, 0.08, 3.91, 88.24)"/>
                    <rect className="grabbing-hand-finger-closed" x="44.98" y="22.21" width="8.42" height="22.57" rx="3.67" transform="matrix(0.08, -1, 1, 0.08, 11.74, 79.74)"/>
                    <path className="grabbing-hand-finger-closed" d="M32.18,27.42c5,6.46,13.22,15.06,17.76,12.81,4.18-2.07.69-6-6.66-15.74C38.46,18.1,30.69,17.1,24.1,24"/>
                </g>
            </g>
    
            <g className="spiral-container">
                <path strokeWidth=".8" className="spiral-path" d=""/>
            </g>
    
            <g className="weight-big-container">
                <line x1="14" x2="60" y1="14" y2="14"></line>
                <line x1="14" x2="60" y1="14" y2="55"></line>
                <circle cx="14" cy="14" r="5" fill="#000000" stroke="none"/>
    
                <g className="weight-big" stroke="none">
                    <path d="M25.5,16.7c.2-.6.5-1.3.7-2C31.1,3.1,23.2,0,14.3,0S-1.6,4.2,2.4,14.7a22.5,22.5,0,0,1,.8,2.4A14.4,14.4,0,0,0,0,26.2c0,8,6.5,11.6,14.5,11.6S29,34.2,29,26.2A14.6,14.6,0,0,0,25.5,16.7ZM14.4,5c5.6,0,9.3,1.9,7.1,8.5a13.5,13.5,0,0,0-7-1.8,14.6,14.6,0,0,0-7.2,1.9C5.5,7.5,8.8,5,14.4,5Z" fill="#231f20"/>
                    <path d="M15.1,15.6l-1.8-.2a9.2,9.2,0,0,0-9.1,9.2,6.2,6.2,0,0,0,.2,1.9A13.3,13.3,0,0,1,15.1,15.6Z" fill="#fff"/>
                </g>
            </g>
    
    
            <g className="scales-container">
    
                <defs>
                    <marker
                            id="ball"
                            viewBox="0 0 10 10"
                            refX="5"
                            refY="5"
                            markerUnits="strokeWidth"
                            markerWidth="5"
                            markerHeight="5"
                            orient="auto">
                        <circle cx="5" cy="5" r="3" fill="#000"/>
                    </marker>
                </defs>
    
    
                <rect x="10" y="-19" width="30" height="90" rx="15" ry="15" strokeWidth="10" stroke="#ccc" />
                <rect className="timing-chain" x="10" y="-19" width="30" height="90" rx="15" ry="15" stroke="#fff" />
    
                <rect x="-31" y="-19" width="30" height="144" rx="15" ry="15" strokeWidth="10" stroke="#ccc"/>
                <rect className="timing-chain" x="-31" y="-19" width="30" height="144" rx="15" ry="15" stroke="#fff"/>
    
                <g className="reels-connector">
                    <rect x="-8" y="3.2" width="25" height="10" rx="5" ry="5" />
                    <circle cx="-1" cy="8.5" r="3" fill="#000" stroke="none"/>
                    <circle cx="9.9" cy="8.5" r="3" fill="#000" stroke="none"/>
                </g>
    
                <g className="car-weight-connector">
                    <rect x="-36" y="97" width="10" height="95" rx="5" ry="5" />
                    <circle cx="-31" cy="103" r="3" fill="#000" stroke="none"/>
                    <circle cx="-31" cy="186" r="3" fill="#000" stroke="none"/>
                </g>
    
    
                <line className="scales-moving-line" x1="147.6" y1="30.52" x2="40" y2="12" strokeWidth="2" markerStart="url(#ball)" markerEnd="url(#ball)"/>
                <path fill="#000000" d="M102.45,30.68,92,20.26c-9.89,9.9-9.89,10.47-9.89,10.47Z" />
    
            </g>
    
            <g className="car-container">
                <g>
                    <g className="car">
                        <circle cx="17" cy="88" r="5" />
                        <circle cx="17" cy="88" r="2" fill="#000" />
                        <circle cx="32" cy="88" r="5" />
                        <circle cx="32" cy="88" r="2" fill="#000" />
    
                        <path d="M10,65 h30 l-5,15 h-20 l-5,-15 " fill="#000" />
                    </g>
    
                    <line x1="-51" y1="95" x2="145" y2="95"/>
                </g>
            </g>
    
        </svg>
      </div>
    </div>
  )
}

export default Login