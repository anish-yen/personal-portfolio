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

    /* ---- chapter 1: project constellation (7 nodes) ---- */
    const g1 = track(new THREE.Group(), 1);
    const nodes = [];
    const ringR = 2.5;
    for(let i=0;i<7;i++){
      const a = (i/7)*Math.PI*2;
      const feat = i===0;
      const m = new THREE.Mesh(new THREE.OctahedronGeometry(feat?0.42:0.3, 0),
        new THREE.MeshBasicMaterial({color: feat?accent:ink, wireframe:true, transparent:true, opacity: feat?0.9:0.4}));
      m.position.set(Math.cos(a)*ringR - 2.2, Math.sin(a)*1.7, Math.sin(a*2)*0.8);
      m.userData.spin = 0.4 + Math.random()*0.6;
      m.userData.target = 1;
      nodes.push(m); g1.add(m);
    }
    const linePts = [];
    for(let i=0;i<7;i++){ linePts.push(nodes[i].position, nodes[(i+1)%7].position); }
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

    const groups = [g0, g1, g2, g3, g4];
    const camTargets = [
      {x:0, y:0, z:7.4}, {x:0, y:0, z:8}, {x:0, y:0, z:8.4}, {x:0, y:0, z:8}, {x:0, y:0, z:7.4}
    ];
    const groupOffsets = [{x:3.15,y:0},{x:-1.2,y:0},{x:0.6,y:0},{x:-0.7,y:0.1},{x:0,y:0}];
    function layout3D(){
      if(mobile()){ g0.position.set(0.3,-1.6,-1.2); g0.scale.setScalar(0.75); }
      else { g0.position.set(groupOffsets[0].x, groupOffsets[0].y, 0); g0.scale.setScalar(0.82); }
      for(let i=1;i<groups.length;i++) groups[i].position.set(groupOffsets[i].x, groupOffsets[i].y, 0);
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

    /* ---- pointer parallax ---- */
    let tx=0, ty=0;
    const onPointerMove = (e)=>{ tx=(e.clientX/window.innerWidth-0.5)*0.5; ty=(e.clientY/window.innerHeight-0.5)*0.35; };
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
        cam.position.x += (camTargets[active].x + tx - cam.position.x)*0.05;
        cam.position.y += (camTargets[active].y - ty - cam.position.y)*0.05;
      }
      cam.position.z += (camTargets[active].z - cam.position.z)*0.05;
      cam.lookAt(0, 0, 0);
      renderer.render(scene, cam);
      rafId = requestAnimationFrame(tick);
    }
    tick();


    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
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
          </div>
          <div className="proj" data-node="1">
            <div className="tag">In progress</div>
            <h3>SubletMatching</h3>
            <p>A sublet marketplace for Rutgers students. Sign-up gated to verified Rutgers emails, with listings, favorites, and messaging on an Express API over Supabase, plus an Expo mobile app.</p>
            <div className="stack"><span>React</span><span>Express</span><span>Supabase</span><span>Expo</span></div>
          </div>
          <div className="proj" data-node="2">
            <div className="tag">ML systems</div>
            <h3>SentinelStream</h3>
            <p>Intrusion-detection pipeline over 2.8M network flows: Optuna-tuned XGBoost at 0.866 test PR-AUC, SHAP explanations, drift monitoring, and FastAPI serving at 6.2 ms p95. 166 tests, 92% coverage.</p>
            <div className="stack"><span>PyTorch</span><span>XGBoost</span><span>SHAP</span><span>MLflow</span><span>FastAPI</span><span>Docker</span></div>
          </div>
          <div className="proj" data-node="3">
            <div className="tag">Morgan Stanley Hackathon 2026</div>
            <h3>LemonLens</h3>
            <p>A food access analytics platform for the Lemontree nonprofit. Built the FastAPI backend and the issue classification pipeline behind its dashboard KPIs.</p>
            <div className="stack"><span>Python</span><span>FastAPI</span><span>Pydantic</span><span>Gemini API</span></div>
          </div>
          <div className="proj" data-node="4">
            <div className="tag">Rutgers IEEE ML/AI</div>
            <h3>AI Visibility Auditor</h3>
            <p>Crawls a company site and competitor sites, generates buyer-style prompts, and simulates AI-answer visibility to produce a directional visibility score, with prioritized recommendations and on-demand content briefs.</p>
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
        </div>
      </div>
    </div>
  </section>
</main>

<footer>
  <div className="foot-inner">
    <span>© 2026 Anish Yenduri</span>
    <span><a href="https://github.com/anish-yen">GitHub</a> · <a href="https://www.linkedin.com/in/anish-yenduri">LinkedIn</a></span>
  </div>
</footer>
    </>
  );
}
