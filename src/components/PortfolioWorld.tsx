/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function PortfolioWorld() {
  const [threeReady, setThreeReady] = useState(false);

  useEffect(() => {
    if (!threeReady || !window.THREE) return;
    const THREE = window.THREE;

    const holder = document.getElementById('bg');
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(50, 2, 0.1, 100);
    cam.position.set(0, 0, 7.4);
    const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    holder.appendChild(renderer.domElement);

    const accent = 0xb8501f, ink = 0x201b15, reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function track(group, base){ group.userData.base = base; group.userData.op = 0; return group; }
    function setGroupOpacity(g, mult){
      g.traverse(o=>{ if(o.material){ o.material.opacity = (o.userData.bo !== undefined ? o.userData.bo : 1) * mult; } });
    }
    function remember(group){ group.traverse(o=>{ if(o.material){ o.userData.bo = o.material.opacity; o.material.transparent = true; } }); }

    /* ---- chapter 0: torus knot + particle field ---- */
    const g0 = track(new THREE.Group(), 1);
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.45, 0.42, 220, 36),
      new THREE.MeshBasicMaterial({color:accent, wireframe:true, transparent:true, opacity:0.55}));
    const knotInner = new THREE.Mesh(new THREE.TorusKnotGeometry(1.45, 0.40, 110, 18),
      new THREE.MeshBasicMaterial({color:ink, wireframe:true, transparent:true, opacity:0.10}));
    g0.add(knot, knotInner);
    const N = 320, pos = new Float32Array(N*3);
    for(let i=0;i<N;i++){
      const r = 3.4 + Math.random()*3, th = Math.random()*Math.PI*2, ph = Math.acos(2*Math.random()-1);
      pos[i*3]=r*Math.sin(ph)*Math.cos(th); pos[i*3+1]=r*Math.sin(ph)*Math.sin(th); pos[i*3+2]=r*Math.cos(ph);
    }
    const stars = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos,3)),
      new THREE.PointsMaterial({color:accent, size:0.035, transparent:true, opacity:0.55}));
    g0.add(stars); remember(g0); scene.add(g0);

    /* ---- chapter 1: project constellation (11 nodes) ---- */
    const g1 = track(new THREE.Group(), 1);
    const nodes = [];
    const ringR = 2.5;
    for(let i=0;i<11;i++){
      const a = (i/11)*Math.PI*2;
      const feat = i===0;
      const m = new THREE.Mesh(new THREE.OctahedronGeometry(feat?0.42:0.3, 0),
        new THREE.MeshBasicMaterial({color: feat?accent:ink, wireframe:true, transparent:true, opacity: feat?0.9:0.4}));
      m.position.set(Math.cos(a)*ringR - 2.2, Math.sin(a)*1.7, Math.sin(a*2)*0.8);
      m.userData.spin = 0.4 + Math.random()*0.6;
      m.userData.target = 1;
      nodes.push(m); g1.add(m);
    }
    const linePts = [];
    for(let i=0;i<11;i++){ linePts.push(nodes[i].position, nodes[(i+1)%11].position); }
    const links = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(linePts),
      new THREE.LineBasicMaterial({color:accent, transparent:true, opacity:0.25}));
    g1.add(links); remember(g1); scene.add(g1);

    /* ---- chapter 2: stacked experience tower ---- */
    const g2 = track(new THREE.Group(), 1);
    const boxes = [];
    [[2.2, 1.7, 0.5], [1.7, 0, 0.4], [1.2, -1.7, 0.3]].forEach(([s,y,o],i)=>{
      const b = new THREE.Mesh(new THREE.BoxGeometry(s,s,s),
        new THREE.MeshBasicMaterial({color: i===1?accent:ink, wireframe:true, transparent:true, opacity: i===1?0.5:0.22}));
      b.position.set(2.3, y, 0); b.rotation.set(o,o*1.3,0);
      boxes.push(b); g2.add(b);
    });
    remember(g2); scene.add(g2);

    /* ---- chapter 3: floating credential tiles ---- */
    const g3 = track(new THREE.Group(), 1);
    const tiles = [];
    for(let i=0;i<7;i++){
      const t = new THREE.Mesh(new THREE.CylinderGeometry(0.52,0.52,0.09,28),
        new THREE.MeshBasicMaterial({color:accent, wireframe:true, transparent:true, opacity:0.5}));
      const col = i%2, row = Math.floor(i/2);
      t.position.set(-2.6 + col*1.5 + (row%2)*0.5, 1.7 - row*1.05, (i%3)*0.4 - 0.4);
      t.rotation.set(1.1, 0.35*col, 0.05*i);
      t.userData.ph = i*0.9;
      tiles.push(t); g3.add(t);
    }
    remember(g3); scene.add(g3);

    /* ---- chapter 4: contact icosahedron ---- */
    const g4 = track(new THREE.Group(), 1);
    const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 1),
      new THREE.MeshBasicMaterial({color:accent, wireframe:true, transparent:true, opacity:0.5}));
    const icoIn = new THREE.Mesh(new THREE.IcosahedronGeometry(0.85, 0),
      new THREE.MeshBasicMaterial({color:ink, wireframe:true, transparent:true, opacity:0.16}));
    g4.add(ico, icoIn); remember(g4); scene.add(g4);

    /* ---- scene 5: the studio ---- */
    scene.add(new THREE.AmbientLight(0xfff4e0, 0.85));
    const sun = new THREE.DirectionalLight(0xffe9cf, 1.0); sun.position.set(4, 6, 5); scene.add(sun);
    const SY = -1.35;
    const SM = {
      wood: new THREE.MeshStandardMaterial({color:0xb98a5e, roughness:0.75}),
      woodDark: new THREE.MeshStandardMaterial({color:0x8a5a33, roughness:0.7}),
      floor: new THREE.MeshStandardMaterial({color:0xdfd0aa, roughness:0.95}),
      wall: new THREE.MeshStandardMaterial({color:0xeee0c2, roughness:1}),
      guitarBody: new THREE.MeshStandardMaterial({color:0xc14a12, roughness:0.35}),
      guitarNeck: new THREE.MeshStandardMaterial({color:0x5a3a22, roughness:0.5}),
      dark: new THREE.MeshStandardMaterial({color:0x2b241c, roughness:0.6}),
      consoleTop: new THREE.MeshStandardMaterial({color:0x37414f, roughness:0.45, metalness:0.25}),
      knob: new THREE.MeshStandardMaterial({color:0xe8e2d4, roughness:0.4}),
      accentm: new THREE.MeshStandardMaterial({color:0xc14a12, roughness:0.4}),
      record: new THREE.MeshStandardMaterial({color:0x1d1a16, roughness:0.35}),
      rlabel: new THREE.MeshStandardMaterial({color:0xd97a4e, roughness:0.6}),
      metal: new THREE.MeshStandardMaterial({color:0xcdc5b2, roughness:0.35, metalness:0.7}),
    };
    const g5 = track(new THREE.Group(), 1);
    const sFloor = new THREE.Mesh(new THREE.PlaneGeometry(30,30), SM.floor);
    sFloor.rotation.x = -Math.PI/2; sFloor.position.y = SY; g5.add(sFloor);
    const sWall = new THREE.Mesh(new THREE.PlaneGeometry(30,10), SM.wall);
    sWall.position.set(0, SY+5, -3.2); g5.add(sWall);
    const sBase = new THREE.Mesh(new THREE.BoxGeometry(30,0.14,0.05), new THREE.MeshStandardMaterial({color:0xe0d2b4, roughness:1}));
    sBase.position.set(0, SY+0.07, -3.17); g5.add(sBase);
    const sRug = new THREE.Mesh(new THREE.CircleGeometry(2.1,48), new THREE.MeshStandardMaterial({color:0xdcc79c, roughness:1}));
    sRug.rotation.x = -Math.PI/2; sRug.position.y = SY+0.005; g5.add(sRug);
    const deskTop = new THREE.Mesh(new THREE.BoxGeometry(3.4,0.12,1.3), SM.wood);
    deskTop.position.set(0.35, SY+0.92, -1.1); g5.add(deskTop);
    [[-1.2,-1.65],[1.9,-1.65],[-1.2,-0.55],[1.9,-0.55]].forEach(([x,z])=>{
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.045,0.045,0.92), SM.woodDark);
      leg.position.set(x, SY+0.46, z); g5.add(leg);
    });
    const consoleG = new THREE.Group();
    const cbody = new THREE.Mesh(new THREE.BoxGeometry(1.5,0.16,0.9), SM.consoleTop);
    consoleG.add(cbody);
    for (let i=0;i<8;i++){
      const x = -0.63 + i*0.18;
      const knob1 = new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.05,20), SM.knob);
      knob1.position.set(x, 0.105, -0.28); consoleG.add(knob1);
      const knob2 = knob1.clone(); knob2.position.z = -0.13; consoleG.add(knob2);
      const trk = new THREE.Mesh(new THREE.BoxGeometry(0.02,0.012,0.3), SM.dark);
      trk.position.set(x, 0.085, 0.16); consoleG.add(trk);
      const hnd = new THREE.Mesh(new THREE.BoxGeometry(0.07,0.045,0.04), SM.accentm);
      hnd.position.set(x, 0.1, 0.16 + (Math.sin(i*2.3)*0.11)); consoleG.add(hnd);
    }
    const vu = new THREE.Mesh(new THREE.PlaneGeometry(0.5,0.1), new THREE.MeshBasicMaterial({color:0xffb35c}));
    vu.rotation.x = -Math.PI/2; vu.position.set(0, 0.081, -0.38); consoleG.add(vu);
    consoleG.position.set(0.9, SY+1.06, -1.05);
    consoleG.rotation.y = -0.08;
    consoleG.userData.studio = {key:'experience', label:'Experience', sound:'click'};
    g5.add(consoleG);
    const guitarG = new THREE.Group();
    const bodyShape = new THREE.Shape();
    bodyShape.moveTo(0, -0.80);
    bodyShape.bezierCurveTo( 0.42,-0.82,  0.50,-0.48,  0.36,-0.20);
    bodyShape.bezierCurveTo( 0.28,-0.04,  0.20, 0.02,  0.26, 0.14);
    bodyShape.bezierCurveTo( 0.36, 0.34,  0.30, 0.58,  0.00, 0.58);
    bodyShape.bezierCurveTo(-0.30, 0.58, -0.36, 0.34, -0.26, 0.14);
    bodyShape.bezierCurveTo(-0.20, 0.02, -0.28,-0.04, -0.36,-0.20);
    bodyShape.bezierCurveTo(-0.50,-0.48, -0.42,-0.82,  0.00,-0.80);
    const guitarBodyGeo = new THREE.ExtrudeGeometry(bodyShape, {depth:0.14, bevelEnabled:true, bevelThickness:0.03, bevelSize:0.03, bevelSegments:3, curveSegments:24});
    const guitarBody = new THREE.Mesh(guitarBodyGeo, SM.guitarBody);
    guitarBody.position.z = -0.07; guitarG.add(guitarBody);
    const ghole = new THREE.Mesh(new THREE.CylinderGeometry(0.115,0.115,0.02,24), SM.dark);
    ghole.rotation.x = Math.PI/2; ghole.position.set(0, -0.05, 0.12); guitarG.add(ghole);
    const rosette = new THREE.Mesh(new THREE.TorusGeometry(0.135, 0.012, 8, 32), SM.rlabel);
    rosette.position.set(0, -0.05, 0.12); guitarG.add(rosette);
    const gbridge = new THREE.Mesh(new THREE.BoxGeometry(0.28,0.05,0.03), SM.dark);
    gbridge.position.set(0,-0.55,0.115); guitarG.add(gbridge);
    const gneck = new THREE.Mesh(new THREE.BoxGeometry(0.075,1.15,0.06), SM.guitarNeck);
    gneck.position.set(0, 1.06, 0.06); guitarG.add(gneck);
    const gfretb = new THREE.Mesh(new THREE.BoxGeometry(0.085,1.15,0.02), SM.dark);
    gfretb.position.set(0, 1.06, 0.115); guitarG.add(gfretb);
    for (let i=0;i<6;i++){
      const fret = new THREE.Mesh(new THREE.BoxGeometry(0.085,0.008,0.005), SM.metal);
      fret.position.set(0, 0.62+i*0.16, 0.127); guitarG.add(fret);
    }
    const ghead = new THREE.Mesh(new THREE.BoxGeometry(0.11,0.34,0.05), SM.guitarNeck);
    ghead.position.set(0, 1.78, 0.06); ghead.rotation.z = 0.06; guitarG.add(ghead);
    for (let i=0;i<3;i++){
      const pegL = new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.05,10), SM.metal);
      pegL.rotation.z = Math.PI/2; pegL.position.set(-0.085, 1.68+i*0.11, 0.06); guitarG.add(pegL);
      const pegR = pegL.clone(); pegR.position.x = 0.085; guitarG.add(pegR);
    }
    for (let i=0;i<4;i++){
      const str = new THREE.Mesh(new THREE.CylinderGeometry(0.0035,0.0035,1.35,6), SM.metal);
      str.position.set(-0.024+i*0.016, 1.02, 0.125); guitarG.add(str);
    }
    guitarG.scale.setScalar(0.72);
    guitarG.position.set(-1.35, SY+0.62, 0.35);
    guitarG.rotation.z = 0.3; guitarG.rotation.y = 0.5;
    guitarG.userData.studio = {key:'projects', label:'Projects', sound:'pluck'};
    g5.add(guitarG);
    const recordsG = new THREE.Group();
    const recLabels = [];
    [[2.15,2.35],[3.0,2.0],[2.5,2.95]].forEach(([x,y],i)=>{
      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.82,0.82,0.04), SM.woodDark);
      frame.position.set(x, SY+y, -3.18); recordsG.add(frame);
      const mat = new THREE.Mesh(new THREE.PlaneGeometry(0.72,0.72), new THREE.MeshStandardMaterial({color:0xf1e7cf, roughness:1}));
      mat.position.set(x, SY+y, -3.155); recordsG.add(mat);
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.3,0.02,40), SM.record);
      disc.rotation.x = Math.PI/2; disc.position.set(x, SY+y+0.04, -3.13); recordsG.add(disc);
      const lab = new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,0.024,24), i===1 ? SM.accentm : SM.rlabel);
      lab.rotation.x = Math.PI/2; lab.position.set(x, SY+y+0.04, -3.12); recordsG.add(lab); recLabels.push(lab);
      const strip = new THREE.Mesh(new THREE.PlaneGeometry(0.5,0.09), new THREE.MeshStandardMaterial({color:0xdccfb2, roughness:1}));
      strip.position.set(x, SY+y-0.28, -3.155); recordsG.add(strip);
    });
    recordsG.userData.studio = {key:'credentials', label:'Credentials', sound:'spin'};
    g5.add(recordsG);
    const amp = new THREE.Mesh(new THREE.BoxGeometry(0.7,0.55,0.4), SM.dark);
    amp.position.set(2.6, SY+0.28, -1.3); g5.add(amp);
    const ampGrill = new THREE.Mesh(new THREE.PlaneGeometry(0.58,0.4), new THREE.MeshStandardMaterial({color:0x9a8a68, roughness:1}));
    ampGrill.position.set(2.6, SY+0.28, -1.095); g5.add(ampGrill);
    remember(g5); scene.add(g5);
    const studioTargets = [guitarG, consoleG, recordsG];

    const groups = [g0, g1, g2, g3, g4, g5];
    const camTargets = [
      {x:0, y:0, z:7.4}, {x:0, y:0, z:8}, {x:0, y:0, z:8.4}, {x:0, y:0, z:8}, {x:0, y:0, z:7.4}, {x:0, y:-0.1, z:7.6}
    ];
    const groupOffsets = [{x:3.15,y:0},{x:-1.2,y:0},{x:0.6,y:0},{x:-0.7,y:0.1},{x:0,y:0},{x:1.6,y:0}];
    function layout3D(){
      if(mobile()){ g0.position.set(0.3,-1.6,-1.2); g0.scale.setScalar(0.75); }
      else { g0.position.set(groupOffsets[0].x, groupOffsets[0].y, 0); g0.scale.setScalar(0.82); }
      for(let i=1;i<groups.length;i++) groups[i].position.set(groupOffsets[i].x, groupOffsets[i].y, 0);
      if(mobile()){ g5.position.set(0,1.6,0); g5.scale.setScalar(0.5); } else { g5.scale.setScalar(0.78); }
    }

    /* ---- chapter tracking ---- */
    const chapters = [...document.querySelectorAll('.chapter')];
    const tabs = [...document.querySelectorAll('.tab')];
    let active = 0;
    function currentChapter(){
      const y = window.scrollY + window.innerHeight*0.42;
      let idx = 0;
      chapters.forEach((c,i)=>{ if(c.offsetTop <= y) idx = i; });
      return idx;
    }
    const onScroll = ()=>{
      const idx = currentChapter();
      if(idx !== active){ active = idx; tabs.forEach((t,i)=>t.classList.toggle('active', i===idx)); }
    };
    window.addEventListener('scroll', onScroll, {passive:true});

    /* ---- project card to node sync ---- */
    document.querySelectorAll('.proj').forEach(card=>{
      const i = +card.dataset.node;
      card.addEventListener('mouseenter', ()=>{ nodes[i].userData.target = 2.1; card.classList.add('lit'); });
      card.addEventListener('mouseleave', ()=>{ nodes[i].userData.target = 1; card.classList.remove('lit'); });
    });

    /* ---- studio interactivity ---- */
    const stag = document.getElementById('studiotag');
    const spanel = document.getElementById('studiopanel');
    const spanelBody = document.getElementById('studiopanel-body');
    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2(-2,-2);
    let hoveredStudio = null;
    let soundOn = true;
    let actx = null;
    function playSound(kind){
      if (!soundOn) return;
      try {
        actx = actx || new (window.AudioContext||window.webkitAudioContext)();
        const t = actx.currentTime;
        if (kind === 'pluck'){
          [329.6, 246.9, 196.0].forEach((f,i)=>{
            const o = actx.createOscillator(), g = actx.createGain();
            o.type='triangle'; o.frequency.value=f;
            g.gain.setValueAtTime(0.0001, t+i*0.07);
            g.gain.exponentialRampToValueAtTime(0.18, t+i*0.07+0.012);
            g.gain.exponentialRampToValueAtTime(0.0001, t+i*0.07+0.5);
            o.connect(g).connect(actx.destination); o.start(t+i*0.07); o.stop(t+i*0.07+0.55);
          });
        } else if (kind === 'click'){
          const o = actx.createOscillator(), g = actx.createGain();
          o.type='square'; o.frequency.setValueAtTime(1200,t); o.frequency.exponentialRampToValueAtTime(300,t+0.06);
          g.gain.setValueAtTime(0.12,t); g.gain.exponentialRampToValueAtTime(0.0001,t+0.08);
          o.connect(g).connect(actx.destination); o.start(t); o.stop(t+0.1);
        } else {
          const o = actx.createOscillator(), g = actx.createGain();
          o.type='sine'; o.frequency.setValueAtTime(140,t); o.frequency.exponentialRampToValueAtTime(60,t+0.35);
          g.gain.setValueAtTime(0.2,t); g.gain.exponentialRampToValueAtTime(0.0001,t+0.4);
          o.connect(g).connect(actx.destination); o.start(t); o.stop(t+0.45);
        }
      } catch {}
    }
    const STUDIO_CONTENT = {
      projects: `<div class="kicker">The guitar</div><h2>Projects</h2>
        <div class="scard"><h3>Aletheia</h3><div class="meta">Won the KnotAPI track, HackPrinceton 2026</div><p>Matches people with class-action settlements from SKU-level purchase data, with an AI pipeline from ingestion to automated filing.</p><div class="links"><a href="https://devpost.com/software/a-j4w2lc" target="_blank" rel="noreferrer">View on Devpost</a><a href="https://github.com/haoranxu88/hackprinceton26" target="_blank" rel="noreferrer">Code</a></div></div>
        <div class="scard"><h3>SentinelStream</h3><div class="meta">Intrusion detection pipeline</div><p>XGBoost over 2.8M network flows with SHAP explanations, drift monitoring, and FastAPI serving. 166 tests, 92% coverage.</p><div class="links"><a href="https://github.com/anish-yen/sentinelstream-ml" target="_blank" rel="noreferrer">Code</a></div></div>
        <div class="scard"><h3>SubletMatching</h3><div class="meta">In progress</div><p>A sublet marketplace for Rutgers students with verified .edu sign-up, listings, favorites, and messaging, plus an Expo app.</p><div class="links"><a href="https://sublet-matching.vercel.app" target="_blank" rel="noreferrer">Live site</a><a href="https://github.com/Trian27/SubletMatching" target="_blank" rel="noreferrer">Code</a></div></div>
        <div class="scard"><h3>LemonLens</h3><div class="meta">Morgan Stanley Code to Give</div><p>Food access analytics for the Lemontree nonprofit; FastAPI backend and the issue classification pipeline behind the dashboard KPIs.</p><div class="links"><a href="https://lemonlens.vercel.app/" target="_blank" rel="noreferrer">Live site</a><a href="https://github.com/ishratarshad/trackb_team7_code_to_give" target="_blank" rel="noreferrer">Code</a></div></div>
        <div class="scard"><h3>AI Visibility Auditor</h3><div class="meta">Rutgers IEEE ML/AI</div><p>Simulates AI-answer visibility for companies and produces prioritized recommendations and content briefs.</p><div class="links"><a href="https://ieee.rutgers.edu/divisions/mlai/projects" target="_blank" rel="noreferrer">Rutgers IEEE</a><a href="https://github.com/anish-yen/visibility-next" target="_blank" rel="noreferrer">Code</a></div></div>
        <div class="scard"><h3>Song Recommendation Platform</h3><div class="meta">In progress</div><p>ML-driven music retrieval and recommendations over dense embeddings and a vector index, served through a full-stack app.</p><div class="links"><a href="https://github.com/anish-yen/song-recommender" target="_blank" rel="noreferrer">Code</a></div></div>
        <div class="scard"><h3>NBA Win Prediction</h3><div class="meta">Data / ML</div><p>Win percentage prediction over 24 seasons (716 team-seasons) with time-aware splits, R2 about 0.90 on held-out seasons.</p><div class="links"><a href="https://github.com/anish-yen/nba-win-prediction-project" target="_blank" rel="noreferrer">Code</a></div></div>`,
      experience: `<div class="kicker">The console</div><h2>Experience</h2>
        <div class="scard"><h3>IBM</h3><div class="meta">Full-Stack Software Engineer Intern, May 2026 to Aug 2026</div><p>Architected a cloud deployment service for 10+ products across 100 environments on IBM's MultiCloud SaaS platform. Built a thread-safe IAM caching service and replaced a 6-step issue template with one automated form.</p></div>
        <div class="scard"><h3>Pacific Northwest National Laboratory</h3><div class="meta">Software Engineering Intern, Oct 2024 to Present</div><p>65+ Jira tickets across the DOE C2M2 web platform used by 2,400+ organizations. Named author on the Sol-ReMM Primary User Guide covering 350+ cybersecurity practices.</p><div class="links"><a href="https://sol-remm.pnnl.gov/Documentation-Resources/Sol-ReMM_Primary_User-Guide--Dec_2024--Release-1.pdf" target="_blank" rel="noreferrer">Read the Sol-ReMM guide</a></div></div>
        <div class="scard"><h3>Hackathons</h3><div class="meta">2026</div><p>Aletheia won the KnotAPI track at HackPrinceton. LemonLens was built for the Lemontree nonprofit at Morgan Stanley's Code to Give.</p></div>`,
      credentials: `<div class="kicker">The records</div><h2>Credentials</h2><ul class="slist">
        <li>CompTIA Security+</li><li>GFACT / GIAC Cybersecurity Essentials ($3,000 scholarship)</li><li>NJCCIC cyber consortium membership</li><li>Agentic AI (AutoGen, MCP, workflow automation)</li><li>National Cyber Scholar</li><li>Best Written Brief, Cyber 9/12</li><li>Outstanding Performance Award, PNNL</li><li>Dean's Scholarship, Rutgers Honors College</li><li>Dean's List, all semesters</li></ul>`
    };
    function openStudioPanel(key){
      if (!spanel || !spanelBody) return;
      spanelBody.innerHTML = STUDIO_CONTENT[key];
      spanel.classList.add('open');
    }
    const spClose = document.getElementById('studiopanel-close');
    if (spClose) spClose.addEventListener('click', ()=>spanel.classList.remove('open'));
    document.querySelectorAll('[data-studio-open]').forEach(b=>b.addEventListener('click', ()=>{
      playSound(b.getAttribute('data-sound') || 'click');
      openStudioPanel(b.getAttribute('data-studio-open'));
    }));
    const sbtn = document.getElementById('soundbtn');
    if (sbtn) sbtn.addEventListener('click', ()=>{ soundOn = !soundOn; sbtn.textContent = 'Sound: ' + (soundOn ? 'on' : 'off'); });
    function setStudioHighlight(hit){
      studioTargets.forEach(t2=>t2.traverse(o=>{ if(o.isMesh && o.material.emissive) o.material.emissive.setHex(t2===hit ? 0x3a1c08 : 0x000000); }));
    }
    const onStudioClick = (e)=>{
      if (active !== 5) return;
      if (e.target.closest('#studiopanel') || e.target.closest('nav') || e.target.closest('[data-studio-open]') || e.target.closest('#soundbtn')) return;
      if (hoveredStudio){
        playSound(hoveredStudio.userData.studio.sound);
        openStudioPanel(hoveredStudio.userData.studio.key);
      }
    };
    window.addEventListener('click', onStudioClick);

    /* ---- pointer parallax ---- */
    let tx=0, ty=0;
    const onPointerMove = (e)=>{ tx=(e.clientX/window.innerWidth-0.5)*0.5; ty=(e.clientY/window.innerHeight-0.5)*0.35; ndc.x=(e.clientX/window.innerWidth)*2-1; ndc.y=-(e.clientY/window.innerHeight)*2+1; if(stag){ stag.style.left=e.clientX+'px'; stag.style.top=e.clientY+'px'; } };
    window.addEventListener('pointermove', onPointerMove);

    function size(){ renderer.setSize(holder.clientWidth, holder.clientHeight); cam.aspect=holder.clientWidth/holder.clientHeight; cam.updateProjectionMatrix(); }
    size(); layout3D(); const onResize = ()=>{ size(); layout3D(); };
    window.addEventListener('resize', onResize);

    function mobile(){ return holder.clientWidth <= 760; }
    let time = 0;
    let rafId = 0;
    function tick(){
      time += 0.016;
      const dim = mobile() ? 0.42 : 1;
      groups.forEach((g,i)=>{
        const target = (i===active ? 1 : 0) * dim;
        g.userData.op += (target - g.userData.op) * 0.16;
        setGroupOpacity(g, g.userData.op);
        g.visible = g.userData.op > 0.02;
      });
      if(!reduced){
        knot.rotation.y += 0.0022; knot.rotation.x += 0.0012;
        knotInner.rotation.copy(knot.rotation);
        stars.rotation.y -= 0.0005;
        nodes.forEach(n=>{ n.rotation.y += 0.008*n.userData.spin; n.rotation.x += 0.005*n.userData.spin;
          n.scale.setScalar(n.scale.x + (n.userData.target - n.scale.x)*0.12); });
        boxes.forEach((b,i)=>{ b.rotation.y += 0.004+i*0.002; b.rotation.x += 0.0015; });
        tiles.forEach(t=>{ t.position.y += Math.sin(time + t.userData.ph)*0.0012; t.rotation.y += 0.003; });
        ico.rotation.y += 0.003; ico.rotation.z += 0.001; icoIn.rotation.y -= 0.005;
        guitarG.rotation.y = 0.5 + Math.sin(time*0.6)*0.02;
        recLabels.forEach(l=>{ l.rotation.y += 0.008; });
        cam.position.x += (camTargets[active].x + tx - cam.position.x)*0.05;
        cam.position.y += (camTargets[active].y - ty - cam.position.y)*0.05;
      }
      cam.position.z += (((active===5 && mobile()) ? 9.8 : camTargets[active].z) - cam.position.z)*0.05;
      if (active === 5){
        ray.setFromCamera(ndc, cam);
        let hit = null;
        for (const st of studioTargets){ if (ray.intersectObject(st, true).length){ hit = st; break; } }
        if (hit !== hoveredStudio){
          hoveredStudio = hit;
          document.body.style.cursor = hit ? 'pointer' : '';
          if (stag){ stag.style.opacity = hit ? 1 : 0; if (hit) stag.textContent = hit.userData.studio.label; }
          setStudioHighlight(hit);
        }
      } else if (hoveredStudio){
        hoveredStudio = null;
        document.body.style.cursor = '';
        if (stag) stag.style.opacity = 0;
        setStudioHighlight(null);
      }
      cam.lookAt(0, 0, 0);
      renderer.render(scene, cam);
      rafId = requestAnimationFrame(tick);
    }
    tick();


    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("click", onStudioClick);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      holder.innerHTML = "";
    };
  }, [threeReady]);

  return (
    <>
      <Script src="/vendor/three.min.js" strategy="afterInteractive" onLoad={() => setThreeReady(true)} />

<div id="bg" aria-hidden="true"></div>

<nav>
  <div className="nav-inner">
    <div className="brand">Anish Yenduri<span>.</span></div>
    <div className="tabs" role="tablist">
      <a className="tab active" href="#hero" data-chapter="0">Overview</a>
      <a className="tab" href="#work" data-chapter="1">Projects</a>
      <a className="tab" href="#xp" data-chapter="2">Experience</a>
      <a className="tab" href="#cred" data-chapter="3">Credentials</a>
      <a className="tab" href="#contact" data-chapter="4">Contact</a>
      <a className="tab" href="#studio" data-chapter="5">Studio</a>
    </div>
    <div className="nav-links">
      <a href="https://github.com/anish-yen">GitHub</a>
      <a href="https://www.linkedin.com/in/anish-yenduri">LinkedIn</a>
    </div>
  </div>
</nav>

<main>
  {/* 0 HERO */}
  <section className="chapter hero" id="hero">
    <div className="wrap">
      <div className="eyebrow">Hi, I&apos;m Anish</div>
      <h1>Software Engineer</h1>
      <h2>Infrastructure, backend, and cloud engineering</h2>
      <p>CS at Rutgers, with SWE internships at IBM and PNNL. I like building the backend and cloud systems behind products: deployment services, caching layers, and the pipelines that tie them together.</p>
      <div className="cta">
        <a className="btn primary" href="#work">See projects</a>
        <a className="btn ghost" href="https://github.com/anish-yen">GitHub</a>
        <a className="btn ghost" href="mailto:yenduri.anish@gmail.com">Email</a>
        <a className="btn ghost" href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
      </div>
    </div>
    <div className="scrollcue">scroll</div>
  </section>

  {/* 1 PROJECTS */}
  <section className="chapter" id="work">
    <div className="wrap align-right">
      <div className="inner">
        <h2 className="section-title">Projects</h2>
        <p className="section-sub">Things I&apos;ve built: hackathon winners, research tooling, and weekend ships. Hover a card and watch its node in the constellation.</p>
        <div className="proj-grid">
          <div className="proj featured" data-node="0">
            <div className="tag">HackPrinceton 2026 · KnotAPI track winner</div>
            <h3>Aletheia</h3>
            <p>Matches people with class-action settlements they qualify for using SKU-level purchase data, with an AI pipeline from purchase ingestion to exposure analysis and automated filing.</p>
            <div className="plinks"><a href="https://devpost.com/software/a-j4w2lc" target="_blank" rel="noreferrer">View on Devpost</a><a href="https://github.com/haoranxu88/hackprinceton26" target="_blank" rel="noreferrer">Code</a></div>
          </div>
          <div className="proj" data-node="1">
            <div className="tag">In progress</div>
            <h3>SubletMatching</h3>
            <p>A sublet marketplace for Rutgers students. Sign-up gated to verified Rutgers emails, with listings, favorites, and messaging on an Express API over Supabase, plus an Expo mobile app.</p>
            <div className="stack"><span>React</span><span>Express</span><span>Supabase</span><span>Expo</span></div>
            <div className="plinks"><a href="https://sublet-matching.vercel.app" target="_blank" rel="noreferrer">Live site</a><a href="https://github.com/Trian27/SubletMatching" target="_blank" rel="noreferrer">Code</a></div>
          </div>
          <div className="proj" data-node="2">
            <div className="tag">ML systems</div>
            <h3>SentinelStream</h3>
            <p>Intrusion-detection pipeline over 2.8M network flows: Optuna-tuned XGBoost at 0.866 test PR-AUC, SHAP explanations, drift monitoring, and FastAPI serving at 6.2 ms p95. 166 tests, 92% coverage.</p>
            <div className="stack"><span>PyTorch</span><span>XGBoost</span><span>SHAP</span><span>MLflow</span><span>FastAPI</span><span>Docker</span></div>
            <div className="plinks"><a href="https://github.com/anish-yen/sentinelstream-ml" target="_blank" rel="noreferrer">Code</a></div>
          </div>
          <div className="proj" data-node="3">
            <div className="tag">Morgan Stanley Hackathon 2026</div>
            <h3>LemonLens</h3>
            <p>A food access analytics platform for the Lemontree nonprofit. Built the FastAPI backend and the issue classification pipeline behind its dashboard KPIs.</p>
            <div className="stack"><span>Python</span><span>FastAPI</span><span>Pydantic</span><span>Gemini API</span></div>
            <div className="plinks"><a href="https://lemonlens.vercel.app/" target="_blank" rel="noreferrer">Live site</a><a href="https://github.com/ishratarshad/trackb_team7_code_to_give" target="_blank" rel="noreferrer">Code</a></div>
          </div>
          <div className="proj" data-node="4">
            <div className="tag">Rutgers IEEE ML/AI</div>
            <h3>AI Visibility Auditor</h3>
            <p>Crawls a company site and competitor sites, generates buyer-style prompts, and simulates AI-answer visibility to produce a directional visibility score, with prioritized recommendations and on-demand content briefs.</p>
            <div className="plinks"><a href="https://ieee.rutgers.edu/divisions/mlai/projects" target="_blank" rel="noreferrer">Rutgers IEEE</a><a href="https://github.com/anish-yen/visibility-next" target="_blank" rel="noreferrer">Code</a></div>
          </div>
          <div className="proj" data-node="5">
            <div className="tag">Research</div>
            <h3>CS Research Assistant</h3>
            <p>Version-controlled Python algorithm translating downlink MIMO VPP equations into QUBO matrices for arbitrary antenna configurations, validated on 4x4 MIMO instances against hand-derived calculations.</p>
          </div>
          <div className="proj" data-node="6">
            <div className="tag">Data / ML</div>
            <h3>NBA Win Prediction</h3>
            <p>End-to-end pipeline predicting NBA team win percentage from 24 seasons (716 team-season records): SQLite schema, engineered features, time-aware split, Linear Regression and Random Forest at R² ≈ 0.90 on held-out seasons.</p>
            <div className="stack"><span>Python</span><span>SQLite</span><span>scikit-learn</span><span>Pandas</span></div>
            <div className="plinks"><a href="https://github.com/anish-yen/nba-win-prediction-project" target="_blank" rel="noreferrer">Code</a></div>
          </div>
          <div className="proj" data-node="7">
            <div className="tag">Shipped</div>
            <h3>K-Color Analysis</h3>
            <p>A Korean personal color analysis app, built with a small team: determines a user&apos;s color palette from facial features, skin tone, eye color, and hair, then recommends jewelry, clothing styles, and stores that match the palette.</p>
            <div className="stack"><span>TypeScript</span></div>
            <div className="plinks"><a href="https://github.com/tanish-banota/K-ColorAnalysis" target="_blank" rel="noreferrer">Code</a></div>
          </div>
          <div className="proj" data-node="8">
            <div className="tag">In progress</div>
            <h3>Song Recommendation Platform</h3>
            <p>An ML-driven music retrieval and recommendation system. Dense embeddings over a vector index power similarity search and personalized recommendations, served through a full-stack app.</p>
            <div className="stack"><span>PyTorch</span><span>FastAPI</span><span>Next.js</span><span>pgvector</span></div>
            <div className="plinks"><a href="https://github.com/anish-yen/song-recommender" target="_blank" rel="noreferrer">Code</a></div>
          </div>
          <div className="proj" data-node="9">
            <div className="tag">In progress</div>
            <h3>Sweat</h3>
            <p>Campus-first workout coordination: post a session, see friends on a live map, and ping them to join. An Expo React Native prototype, store-prepped with icon, splash, and build config.</p>
            <div className="stack"><span>Expo</span><span>React Native</span><span>TypeScript</span></div>
            <div className="plinks"><a href="https://github.com/anish-yen/sweat-campus" target="_blank" rel="noreferrer">Code</a></div>
          </div>
          <div className="proj" data-node="10">
            <div className="tag">In progress</div>
            <h3>Barber Reactivation</h3>
            <p>A booking and client-reactivation app for independent barbershops, built around lapsed-client and no-show win-back so shops recover bookings they already earned once.</p>
            <div className="stack"><span>Next.js</span><span>TypeScript</span><span>Supabase</span></div>
            <div className="plinks"><a href="https://github.com/anish-yen/barber-app" target="_blank" rel="noreferrer">Code</a></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* 2 EXPERIENCE */}
  <section className="chapter" id="xp">
    <div className="wrap">
      <h2 className="section-title">Experience</h2>
      <p className="section-sub">Software engineering internships across cloud platforms and national security research.</p>
      <div className="sheet">
        <div className="xp">
          <div className="xp-item">
            <div className="xp-head"><h3>IBM</h3><span className="xp-date">May 2026 to Aug 2026</span></div>
            <div className="xp-role">Full-Stack Software Engineer Intern</div>
            <ul>
              <li>Architected a cloud deployment service for 10+ products across 100 environments on IBM&apos;s MultiCloud SaaS platform, reducing onboarding time by 87%.</li>
              <li>Engineered a thread-safe IAM caching service with proactive expiry refresh and request coalescing, cutting redundant auth calls by 80%; validated with 15+ unit tests.</li>
              <li>Replaced a 6-step GitHub issue template with a 14-field form-based automation over HMAC-authenticated GraphQL and Tekton CI/CD polling.</li>
              <li>Validated webhooks, PR creation, and async tracking across 3 hyperscalers (AWS, Azure, IBM Cloud).</li>
            </ul>
          </div>
          <div className="xp-item">
            <div className="xp-head"><h3>Pacific Northwest National Laboratory</h3><span className="xp-date">Oct 2024 to Present</span></div>
            <div className="xp-role">Software Engineering Intern, Emerging Threats &amp; Technologies</div>
            <ul>
              <li>Shipped 65+ Jira tickets across the DOE C2M2 web platform used by 2,400+ organizations, with React/JavaScript UI over Node and Python services.</li>
              <li>Built a pdfmake report generator for self-evaluations, saving 20+ minutes of manual work per report.</li>
              <li>Implemented client-side routing, cutting navigation steps to key assessments by 30%, and improved time-to-interactive by 18%.</li>
              <li>Named author (one of 16) on the Sol-ReMM Primary User Guide, documenting 350+ cybersecurity practices across 12 domains.</li>
            </ul>
            <a className="xlink" href="https://sol-remm.pnnl.gov/Documentation-Resources/Sol-ReMM_Primary_User-Guide--Dec_2024--Release-1.pdf" target="_blank" rel="noreferrer">Read the Sol-ReMM guide</a>
          </div>
          <div className="xp-item">
            <div className="xp-head"><h3>Hackathons</h3><span className="xp-date">2026</span></div>
            <div className="xp-role">Aletheia (HackPrinceton) · LemonLens (Morgan Stanley Code to Give)</div>
            <ul>
              <li>Aletheia won the KnotAPI track at HackPrinceton 2026.</li>
              <li>LemonLens built for the Lemontree nonprofit at Morgan Stanley&apos;s Code to Give.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* 3 CREDENTIALS */}
  <section className="chapter" id="cred">
    <div className="wrap align-right">
      <div className="inner">
        <h2 className="section-title">Credentials</h2>
        <p className="section-sub">Certifications, scholarships, and awards.</p>
        <div className="cred-grid">
          <div className="cred"><div className="n">CompTIA Security+</div><div className="d">Certification</div></div>
          <div className="cred"><div className="n">GFACT / GIAC Cybersecurity Essentials</div><div className="d">$3,000 scholarship</div></div>
          <div className="cred"><div className="n">NJCCIC</div><div className="d">Cyber consortium membership</div></div>
          <div className="cred"><div className="n">Agentic AI</div><div className="d">AutoGen, MCP, workflow automation</div></div>
          <div className="cred"><div className="n">National Cyber Scholar</div><div className="d">National recognition</div></div>
          <div className="cred"><div className="n">Best Written Brief</div><div className="d">Cyber 9/12 competition</div></div>
          <div className="cred"><div className="n">Outstanding Performance Award</div><div className="d">PNNL</div></div>
        </div>
      </div>
    </div>
  </section>

  {/* 4 CONTACT */}
  <section className="chapter" id="contact">
    <div className="wrap">
      <div className="sheet contact-card">
        <div className="eyebrow">Get in touch</div>
        <h2>Open to backend, infrastructure, and cloud work.</h2>
        <p>The fastest way to see what I build is the code itself.</p>
        <div className="cta">
          <a className="btn primary" href="https://github.com/anish-yen">GitHub</a>
          <a className="btn ghost" href="https://www.linkedin.com/in/anish-yenduri">LinkedIn</a>
          <a className="btn ghost" href="mailto:yenduri.anish@gmail.com">Email</a>
          <a className="btn ghost" href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
        </div>
      </div>
    </div>
  </section>
  {/* 5 STUDIO */}
  <section className="chapter studio" id="studio">
    <div className="wrap">
      <div className="eyebrow">The studio</div>
      <h2 className="section-title">Step into my studio</h2>
      <p className="section-sub">Guitar, production desk, and the records on my wall. Click around: the guitar opens my projects, the console my experience, the records my credentials. Each one plays a sound.</p>
      <div className="studio-cta">
        <button type="button" className="btn ghost" data-studio-open="projects" data-sound="pluck">Projects</button>
        <button type="button" className="btn ghost" data-studio-open="experience" data-sound="click">Experience</button>
        <button type="button" className="btn ghost" data-studio-open="credentials" data-sound="spin">Credentials</button>
        <button type="button" className="btn ghost" id="soundbtn">Sound: on</button>
      </div>
    </div>
  </section>
</main>

<div id="studiotag" aria-hidden="true"></div>
<div id="studiopanel" role="dialog" aria-label="Studio details">
  <button id="studiopanel-close" type="button" aria-label="Close">x</button>
  <div id="studiopanel-body"></div>
</div>

<footer>
  <div className="foot-inner">
    <span>© 2026 Anish Yenduri</span>
    <span><a href="https://github.com/anish-yen">GitHub</a> · <a href="https://www.linkedin.com/in/anish-yenduri">LinkedIn</a></span>
  </div>
</footer>
    </>
  );
}
