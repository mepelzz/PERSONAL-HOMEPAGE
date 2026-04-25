/* =============================================
   LENN. — script.js
   Anime Aesthetic × Dark Moon
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ══ 1. Stars ══ */
  const starsEl = document.querySelector('.stars');
  if (starsEl) {
    for (let i = 0; i < 100; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const sz = Math.random() * 2 + 0.4;
      /* Mix white stars with rare subtle pink/violet ones */
      const colors = ['#fff','#fff','#fff','#fff','rgba(212,160,176,0.8)','rgba(155,114,207,0.7)'];
      s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        --dur:${(Math.random()*4+1.8).toFixed(1)}s;--delay:${(Math.random()*6).toFixed(1)}s;
        opacity:${(Math.random()*0.2+0.04).toFixed(2)};`;
      starsEl.appendChild(s);
    }
  }

  /* ══ 2. Sakura petals ══ */
  function spawnPetal() {
    const el = document.createElement('div');
    el.className = 'petal';
    const size = Math.random() * 6 + 5;
    const duration = Math.random() * 14 + 10;
    const startX = Math.random() * 110 - 5;
    const drift = (Math.random() - 0.5) * 120;
    el.style.cssText = `
      left:${startX}vw; top:-20px;
      width:${size}px; height:${size}px;
      animation-duration:${duration}s;
      animation-delay:${Math.random() * 8}s;
      transform:rotate(${Math.random()*360}deg);
      opacity:${Math.random()*0.5+0.3};
    `;
    /* slight horizontal drift using animation */
    el.style.setProperty('--drift', drift + 'px');
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (duration + 8) * 1000);
  }
  /* Spawn petals periodically — sparse, not overwhelming */
  for (let i = 0; i < 8; i++) setTimeout(() => spawnPetal(), Math.random() * 12000);
  setInterval(() => { if (Math.random() < 0.4) spawnPetal(); }, 3500);

  /* ══ 3. Cursor ══ */
  const cursor = document.querySelector('.cursor');
  const ring   = document.querySelector('.cursor-ring');
  let mx=0,my=0,rx=0,ry=0;
  if (cursor && ring) {
    document.addEventListener('mousemove', e => {
      mx=e.clientX; my=e.clientY;
      cursor.style.transform = `translate(${mx-4}px,${my-4}px)`;
    });
    (function ar(){
      rx+=(mx-rx-13)*0.12; ry+=(my-ry-13)*0.12;
      ring.style.transform=`translate(${rx}px,${ry}px)`;
      requestAnimationFrame(ar);
    })();
    document.querySelectorAll('a,button,.blog-card,.explore-card,.photo-item,.thumb-card,.back-to-top,.blog-filter').forEach(el=>{
      el.addEventListener('mouseenter',()=>{cursor.classList.add('hover');ring.classList.add('hover');});
      el.addEventListener('mouseleave',()=>{cursor.classList.remove('hover');ring.classList.remove('hover');});
    });
  }

  /* ══ 4. Paw trail ══ */
  let lastPaw=0,pawIdx=0;
  document.addEventListener('mousemove', e=>{
    const now=Date.now(); if(now-lastPaw<350)return; lastPaw=now; pawIdx++;
    const el=document.createElement('span'); el.className='cat-paw'; el.textContent='🐾';
    el.style.left=(e.clientX-10)+'px'; el.style.top=(e.clientY-10)+'px';
    el.style.setProperty('--rot',(pawIdx%2===0?18:-14)+'deg');
    document.body.appendChild(el); setTimeout(()=>el.remove(),860);
  });



  /* ══ 6. Scroll / UI ══ */
  const navbar  = document.querySelector('.navbar');
  const backTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', ()=>{
    if(navbar)  navbar.classList.toggle('navbar-shadow', window.scrollY>20);
    if(backTop) backTop.classList.toggle('visible', window.scrollY>400);
  },{passive:true});
  if(backTop) backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  /* ══ 7. Blog category filters ══ */
  const filters  = document.querySelectorAll('.blog-filter');
  const blogCards = document.querySelectorAll('.blog-card[data-category]');
  if (filters.length) {
    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        blogCards.forEach(card => {
          const show = cat === 'all' || card.dataset.category === cat;
          card.style.opacity = show ? '1' : '0.25';
          card.style.transform = show ? '' : 'scale(0.97)';
          card.style.transition = 'opacity 0.3s, transform 0.3s';
          card.style.pointerEvents = show ? '' : 'none';
        });
      });
    });
  }

  /* ══ 8. Scroll reveal ══ */
  const revealIO = new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealIO.unobserve(e.target);}});
  },{threshold:0.1});
  document.querySelectorAll('.fade-up').forEach(el=>revealIO.observe(el));

  /* ══ 9. Skill bars ══ */
  const barIO = new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.style.width=e.target.dataset.width;barIO.unobserve(e.target);}});
  },{threshold:0.4});
  document.querySelectorAll('.skill-bar').forEach(b=>barIO.observe(b));

  /* ══ 10. Typing effect ══ */
  const badge = document.querySelector('.hero-badge');
  if(badge){
    const texts=[
      '> Mahasiswa Teknik Informatika',
      '> Film & Anime Enthusiast',
      '> AI · ML · Backend',
      '> Code. Watch. Reflect.',
    ];
    let ti=0,ci=0,del=false;
    function type(){
      const cur=texts[ti];
      if(!del){badge.textContent=cur.slice(0,ci++);if(ci>cur.length){del=true;setTimeout(type,1800);return;}}
      else{badge.textContent=cur.slice(0,ci--);if(ci<0){del=false;ti=(ti+1)%texts.length;ci=0;}}
      setTimeout(type,del?36:66);
    }
    setTimeout(type,900);
  }

  /* ══ 11. Reading progress ══ */
  const progressBar = document.querySelector('.reading-progress');
  if(progressBar){
    window.addEventListener('scroll',()=>{
      const scrollTop=window.scrollY;
      const docH=document.documentElement.scrollHeight-window.innerHeight;
      progressBar.style.width=(docH>0?(scrollTop/docH*100):0)+'%';
    },{passive:true});
  }

/* ══ 12. Contact form ══ */
  const form = document.querySelector('.contact-form');
  const modal = document.getElementById('success-modal');
  const closeModal = document.getElementById('close-modal');

  if(form){
    form.addEventListener('submit', e => {
      e.preventDefault(); // Mencegah halaman ke-refresh
      const btn = form.querySelector('.btn-submit');
      
      // Ubah teks tombol jadi loading
      btn.textContent = 'Mengirim...'; 
      btn.disabled = true;

      // Simulasi waktu loading selama 1.2 detik
      setTimeout(() => {
        btn.textContent = 'Kirim Pesan'; 
        btn.disabled = false;

        // Tampilkan Pop-up
        if (modal) modal.classList.add('active');

        form.reset(); // Kosongkan form setelah dikirim
      }, 1200);
    });
  }

  // Fungsi untuk menutup pop-up saat tombol Tutup diklik
  if (closeModal && modal) {
    closeModal.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Opsional: Tutup pop-up jika pengunjung mengklik area luar kotak
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  // Fungsi untuk menutup pop-up
  if(closePopup && popup) {
    closePopup.addEventListener('click', () => {
      popup.classList.remove('show');
    });
  }

  /* ══ 13. Lightbox ══ */
  const lightbox=document.getElementById('lightbox');
  const lbImg=document.getElementById('lightbox-img');
  const lbClose=document.getElementById('lightbox-close');
  if(lightbox&&lbImg){
    document.querySelectorAll('.photo-item[data-src]').forEach(item=>{
      item.addEventListener('click',()=>{
        lbImg.src=item.dataset.src; lbImg.alt=item.dataset.caption||'';
        lightbox.classList.add('open'); document.body.style.overflow='hidden';
      });
    });
    function closeLB(){lightbox.classList.remove('open');document.body.style.overflow='';setTimeout(()=>lbImg.src='',380);}
    if(lbClose)lbClose.addEventListener('click',closeLB);
    lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLB();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLB();});
  }

  /* ══ 14. Dynamic photo gallery from data.json ══ */
  const dynGallery = document.getElementById('dynamic-gallery');
  if (dynGallery) {
    fetch('data.json')
      .then(r => r.json())
      .then(data => {
        dynGallery.innerHTML = '';
        data.forEach((item, i) => {
          const div = document.createElement('div');
          div.className = 'photo-item';
          /* Wide items at positions 0 and 4 */
          if (i === 0 || i === 4) div.style.gridColumn = 'span 2';
          div.dataset.src = item.full || item.src;
          div.dataset.caption = item.caption || '';
          div.innerHTML = `
            <img src="${item.src}" alt="${item.caption||''}" loading="lazy"/>
            <div class="photo-overlay">
              <span class="photo-cat">${item.category||''}</span>
              <span class="photo-cap">${item.caption||''}</span>
            </div>`;
          div.addEventListener('click', () => {
            if(lbImg && lightbox){
              lbImg.src = item.full||item.src; lbImg.alt = item.caption||'';
              lightbox.classList.add('open'); document.body.style.overflow='hidden';
            }
          });
          dynGallery.appendChild(div);
        });
      })
      .catch(() => {
        /* Fallback: hide the section gracefully */
        const sec = dynGallery.closest('section');
        if (sec) sec.style.display = 'none';
      });
  }

  /* ══════════════════════════════════════════════
     WALKING CAT — Canvas 2D, orange tabby
     Realistic diagonal gait
     ══════════════════════════════════════════════ */
  const mainCanvas = document.getElementById('walking-cat-canvas');
  const speech     = document.querySelector('.cat-speech-walk');
  if (mainCanvas) {
    const ctx = mainCanvas.getContext('2d');
    const msgs = [
      '映画を見ている…', /* watching movies... */
      'purrr~',
      'アニメの時間', /* anime time */
      '...zzzZ',
      '*tail flick*',
      'meow.',
      'ふふ…',       /* hehe... */
      'watching the moon~',
    ];
    let msgIdx=0, speechTimer=null;
    let catX=-100, dir=1, gaitT=0, tailT=0, blinkT=0, earT=0;
    let idle=false, idleFrames=0;

    function resize(){ mainCanvas.width=window.innerWidth; mainCanvas.height=72; }
    resize(); window.addEventListener('resize',resize,{passive:true});

    /* Orange tabby palette */
    const C = {
      body1:'#b85e1a', body2:'#cc6e22', body3:'#e08030',
      stripe:'rgba(100,40,5,0.3)', belly:'rgba(235,195,135,0.48)',
      nose:'#c86060', pupil:'#140a04', iris:'#5a7818',
      white:'rgba(255,248,240,0.75)', whisker:'rgba(255,248,240,0.38)',
    };

    function drawCat(cx, gy, gait, blink, tail, ear) {
      ctx.save(); ctx.translate(cx,gy); if(dir===-1) ctx.scale(-1,1);

      /* Shadow */
      ctx.fillStyle='rgba(0,0,0,0.14)';
      ctx.beginPath(); ctx.ellipse(0,12,17,3.5,0,0,Math.PI*2); ctx.fill();

      /* Tail */
      const tw=Math.sin(tail)*0.38, tc=Math.sin(tail*1.2+1)*0.3;
      ctx.save();
      ctx.strokeStyle=C.body1; ctx.lineWidth=5; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(-18,-2);
      ctx.quadraticCurveTo(-36,-22+tw*10,-32+tc*7,-38+tw*7); ctx.stroke();
      ctx.lineWidth=3.5;
      ctx.beginPath(); ctx.moveTo(-32+tc*7,-38+tw*7);
      ctx.quadraticCurveTo(-30+tc*5,-46+tw*5,-26+tc*10,-50+tw*4); ctx.stroke();
      ctx.strokeStyle=C.stripe; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(-20,-3);
      ctx.quadraticCurveTo(-35,-20+tw*8,-31+tc*6,-35+tw*6); ctx.stroke();
      ctx.restore();

      /* Body */
      ctx.fillStyle=C.body2;
      ctx.beginPath(); ctx.ellipse(0,0,20,12,-0.06,0,Math.PI*2); ctx.fill();
      ctx.save(); ctx.clip();
      ctx.fillStyle=C.stripe;
      for(let i=-1;i<=1;i++){ ctx.beginPath(); ctx.ellipse(i*9,0,2.4,12,0.18,0,Math.PI*2); ctx.fill(); }
      ctx.restore();
      ctx.fillStyle=C.belly;
      ctx.beginPath(); ctx.ellipse(3,4,12,7,0.1,0,Math.PI*2); ctx.fill();

      /* Neck */
      ctx.fillStyle=C.body2;
      ctx.beginPath();
      ctx.moveTo(10,-4); ctx.quadraticCurveTo(16,-14,19,-13);
      ctx.quadraticCurveTo(24,-5,20,2); ctx.quadraticCurveTo(14,4,10,2);
      ctx.closePath(); ctx.fill();

      /* Head */
      const hx=21, hy=-10;
      ctx.fillStyle=C.body1;
      ctx.beginPath(); ctx.ellipse(hx,hy,11,10,0.08,0,Math.PI*2); ctx.fill();
      ctx.fillStyle=C.body3;
      ctx.beginPath(); ctx.ellipse(hx-1,hy-2,6,5,0.1,0,Math.PI*2); ctx.fill();

      /* Tabby M forehead */
      ctx.strokeStyle=C.stripe; ctx.lineWidth=1.1; ctx.lineCap='round';
      [[hx-4,hy-6,hx-5,hy-10],[hx,hy-6,hx,hy-11],[hx+4,hy-6,hx+4,hy-10]].forEach(([x1,y1,x2,y2])=>{
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
      });

      /* Ears */
      const el=Math.sin(ear)*1.4;
      ctx.fillStyle=C.body1;
      ctx.beginPath(); ctx.moveTo(hx-3,hy-8); ctx.lineTo(hx-9,hy-17+el*0.4); ctx.lineTo(hx+1,hy-12); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(hx+4,hy-8); ctx.lineTo(hx+11,hy-19+el); ctx.lineTo(hx+8,hy-12); ctx.closePath(); ctx.fill();
      ctx.fillStyle='rgba(190,100,90,0.42)';
      ctx.beginPath(); ctx.moveTo(hx+5,hy-9); ctx.lineTo(hx+10,hy-17+el); ctx.lineTo(hx+8,hy-12); ctx.closePath(); ctx.fill();

      /* Eye */
      const ex=hx+4, ey=hy-1;
      ctx.fillStyle='#201408'; ctx.beginPath(); ctx.ellipse(ex,ey,4,3,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle=C.iris;
      const eyeH = Math.max(0.1, blink > 0.1 ? 3 : (3 * blink / 0.1));
      ctx.beginPath(); ctx.ellipse(ex,ey,3.5,eyeH,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle=C.pupil;
      ctx.beginPath(); ctx.ellipse(ex,ey,0.9,eyeH*0.9,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle=C.white;
      ctx.beginPath(); ctx.ellipse(ex-1.1,ey-1.1,0.95,0.75,-0.3,0,Math.PI*2); ctx.fill();

      /* Nose */
      ctx.fillStyle=C.nose;
      ctx.beginPath(); ctx.moveTo(hx+9,hy+3); ctx.lineTo(hx+11.5,hy+5); ctx.lineTo(hx+9,hy+6); ctx.closePath(); ctx.fill();
      ctx.strokeStyle='rgba(150,70,60,0.45)'; ctx.lineWidth=0.7;
      ctx.beginPath(); ctx.moveTo(hx+9,hy+6); ctx.quadraticCurveTo(hx+10,hy+8,hx+11.5,hy+7); ctx.stroke();

      /* Whiskers */
      ctx.strokeStyle=C.whisker; ctx.lineWidth=0.75;
      [[hx+9,hy+3,hx+22,hy+1],[hx+9,hy+4,hx+22,hy+5],[hx+9,hy+3,hx+22,hy-2]].forEach(([x1,y1,x2,y2])=>{
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
      });

      /* Legs — diagonal gait */
      function leg(bx,by,phase,far){
        const t=((gait+phase)%1), sw=t<0.5, pt=sw?t*2:(t-0.5)*2;
        const stride=9, ll=12, bend=4;
        let fx=sw?bx+Math.sin(pt*Math.PI)*stride:bx+stride-pt*stride*2;
        let fy=sw?by+ll-Math.sin(pt*Math.PI)*6:by+ll;
        const kx=(bx+fx)*0.5+(sw?-2:2), ky=(by+fy)*0.5-bend+(sw?-3:0);
        ctx.strokeStyle=far?C.body1:C.body2; ctx.lineWidth=far?3.2:3.8; ctx.lineCap='round';
        ctx.beginPath(); ctx.moveTo(bx,by); ctx.lineTo(kx,ky); ctx.stroke();
        ctx.lineWidth=far?2.8:3.4;
        ctx.beginPath(); ctx.moveTo(kx,ky); ctx.lineTo(fx,fy); ctx.stroke();
        ctx.fillStyle=far?C.body1:C.body2;
        ctx.beginPath(); ctx.ellipse(fx,fy,2.5,1.5,0,0,Math.PI*2); ctx.fill();
      }
      ctx.globalAlpha=0.52; leg(9,8,0.5,true); leg(-13,8,0.5,true);
      ctx.globalAlpha=1;    leg(10,8,0,false);  leg(-14,8,0,false);
      ctx.restore();
    }

    let prevT=0;
    function loop(ts){
      const dt=Math.min((ts-prevT)/16.67,3); prevT=ts;
      ctx.clearRect(0,0,mainCanvas.width,mainCanvas.height);
      if(!idle){ catX+=0.52*dir*dt; gaitT=(gaitT+0.025*dt)%1; }
      tailT=(tailT+0.019*dt)%(Math.PI*2);
      blinkT=(blinkT+0.007*dt)%1;
      earT=(earT+0.005*dt)%(Math.PI*2);
      if(idleFrames>0){ idleFrames-=dt; if(idleFrames<=0)idle=false; }
      const margin=90;
      if(catX>mainCanvas.width+margin){ catX=mainCanvas.width+margin; dir=-1; idle=true; idleFrames=40+Math.random()*80; }
      if(catX<-margin){ catX=-margin; dir=1; idle=true; idleFrames=40+Math.random()*80; }
      const blinkVal = blinkT > 0.92 ? Math.max(0, 1 - (blinkT - 0.92) / 0.05) : 1;
      drawCat(catX,54,gaitT,blinkVal,tailT,earT);
      if(speech){ let bx=catX+(dir===1?12:-12-170); bx=Math.max(8,Math.min(mainCanvas.width-178,bx)); speech.style.left=bx+'px'; }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    mainCanvas.addEventListener('click', e=>{
      const r=mainCanvas.getBoundingClientRect();
      const mx=e.clientX-r.left;
      if(Math.abs(mx-catX)<50 && Math.abs((e.clientY-r.top)-54)<36){
        if(speech){ speech.textContent=msgs[msgIdx%msgs.length]; msgIdx++; speech.classList.add('show'); clearTimeout(speechTimer); speechTimer=setTimeout(()=>speech.classList.remove('show'),3200); }
        spawnFallingCat(e.clientX);
      }
    });
    mainCanvas.addEventListener('mousemove', e=>{
      const r=mainCanvas.getBoundingClientRect();
      mainCanvas.style.cursor=Math.abs(e.clientX-r.left-catX)<50?'pointer':'default';
    });
  }

  /* Falling cat SVG */
  function spawnFallingCat(atX){
    const el=document.createElement('div'); el.className='cat-fall';
    el.style.left=(atX-26)+'px';
    el.innerHTML=`<svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
      <ellipse cx="26" cy="27" rx="14" ry="10" fill="#cc6e22"/>
      <circle cx="26" cy="17" r="12" fill="#cc6e22"/>
      <polygon points="17,9 11,0 23,7" fill="#b85e1a"/>
      <polygon points="35,9 41,0 29,7" fill="#b85e1a"/>
      <polygon points="17,8 13,2 22,7" fill="rgba(190,100,90,0.38)"/>
      <ellipse cx="30" cy="16" rx="4" ry="4.5" fill="#5a7818"/>
      <ellipse cx="30.5" cy="16" rx="1.5" ry="3.5" fill="#140a04"/>
      <ellipse cx="29.5" cy="14" rx="0.8" ry="0.6" fill="rgba(255,248,240,0.7)"/>
      <ellipse cx="26" cy="21" rx="1.6" ry="1.1" fill="#c86060"/>
      <path d="M5,26 Q1,18 4,12" stroke="#b85e1a" stroke-width="4" stroke-linecap="round" fill="none"/>
      <ellipse cx="17" cy="35" rx="5" ry="3" fill="#a85214"/>
      <ellipse cx="26" cy="37" rx="5" ry="3" fill="#a85214"/>
      <ellipse cx="35" cy="35" rx="5" ry="3" fill="#a85214"/>
    </svg>`;
    document.body.appendChild(el); setTimeout(()=>el.remove(),2500);
  }
  window.spawnFallingCat=spawnFallingCat;

  /* ══════════════════════════════════════════════
     NAVBAR CAT — tiny cat above logo
     ══════════════════════════════════════════════ */
  const nbCanvas = document.getElementById('navbar-cat-canvas');
  if (nbCanvas) {
    const nc = nbCanvas.getContext('2d');
    let nx=-30, ndir=1, ngait=0, ntail=0, nblinkT=0;

    function drawNavCat(cx,gy,gait,blink,tail){
      nc.save(); nc.translate(cx,gy); if(ndir===-1) nc.scale(-1,1);
      const tw=Math.sin(tail)*0.28;
      nc.strokeStyle='#b85e1a'; nc.lineWidth=2.4; nc.lineCap='round';
      nc.beginPath(); nc.moveTo(-8,-1); nc.quadraticCurveTo(-15,-10+tw*4,-13+tw*3,-16+tw*3); nc.stroke();
      nc.fillStyle='#cc6e22';
      nc.beginPath(); nc.ellipse(0,0,9,5.5,0,0,Math.PI*2); nc.fill();
      nc.fillStyle='rgba(235,195,135,0.42)';
      nc.beginPath(); nc.ellipse(1,2,5,3,0,0,Math.PI*2); nc.fill();
      const hx=9, hy=-4;
      nc.fillStyle='#b85e1a';
      nc.beginPath(); nc.ellipse(hx,hy,5.5,5,0.08,0,Math.PI*2); nc.fill();
      nc.beginPath(); nc.moveTo(hx+2,hy-4); nc.lineTo(hx+6,hy-9); nc.lineTo(hx+5,hy-5); nc.closePath(); nc.fill();
      nc.fillStyle='rgba(190,100,90,0.38)';
      nc.beginPath(); nc.moveTo(hx+2.5,hy-4); nc.lineTo(hx+5.5,hy-8); nc.lineTo(hx+5,hy-5.5); nc.closePath(); nc.fill();
      nc.fillStyle='#5a7818';
      const eh=blink>0.1?2:(2*blink/0.1);
      nc.beginPath(); nc.ellipse(hx+2,hy,1.8,eh,0,0,Math.PI*2); nc.fill();
      nc.fillStyle='#140a04';
      nc.beginPath(); nc.ellipse(hx+2,hy,0.55,eh*0.85,0,0,Math.PI*2); nc.fill();
      function mleg(bx,by,ph,a){
        const t=((gait+ph)%1), sw=t<0.5, pt=sw?t*2:(t-0.5)*2;
        const fx=bx+(sw?Math.sin(pt*Math.PI)*4:4-pt*8), fy=by+5-(sw?Math.sin(pt*Math.PI)*2.5:0);
        nc.strokeStyle=a?'rgba(160,80,18,0.5)':'#b85e1a'; nc.lineWidth=a?1.5:2; nc.lineCap='round';
        nc.beginPath(); nc.moveTo(bx,by); nc.lineTo(fx,fy); nc.stroke();
      }
      nc.globalAlpha=0.5; mleg(4,4,0.5,true); mleg(-5,4,0.5,true);
      nc.globalAlpha=1;   mleg(5,4,0,false);  mleg(-6,4,0,false);
      nc.restore();
    }

    let prevNT=0;
    function navLoop(ts){
      const dt=Math.min((ts-prevNT)/16.67,3); prevNT=ts;
      nc.clearRect(0,0,nbCanvas.width,nbCanvas.height);
      nx+=0.36*ndir*dt; ngait=(ngait+0.023*dt)%1;
      ntail=(ntail+0.017*dt)%(Math.PI*2); nblinkT=(nblinkT+0.007*dt)%1;
      if(nx>nbCanvas.width+18)ndir=-1; if(nx<-18)ndir=1;
      const bv = nblinkT > 0.92 ? Math.max(0, 1 - (nblinkT - 0.92) / 0.05) : 1;
      drawNavCat(nx,20,ngait,bv,ntail);
      requestAnimationFrame(navLoop);
    }
    requestAnimationFrame(navLoop);
  }

});

/* ══════════════════════════════════════════════
     GRAVITY FALLS CIPHER DECODE EFFECT
     ══════════════════════════════════════════════ */
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

  document.querySelectorAll('.cipher-text').forEach(el => {
    const realText = el.dataset.value; // Pesan asli (TRUST NO ONE)
    const fakeText = el.innerText;     // Pesan sandi (WUXVW QR RQH)

    // Animasi saat kursor masuk (Memecahkan sandi)
    el.addEventListener('mouseenter', () => {
      let iterations = 0;
      clearInterval(el.interval);
      
      el.interval = setInterval(() => {
        el.innerText = realText.split("").map((letter, index) => {
          if (letter === " ") return " "; // Biarkan spasi tetap spasi
          if (index < iterations) return realText[index]; // Terkunci ke huruf asli
          return letters[Math.floor(Math.random() * letters.length)]; // Huruf acak
        }).join("");
        
        if(iterations >= realText.length) clearInterval(el.interval);
        iterations += 1/3; // Kecepatan efek dekripsi
      }, 30);
    });

    // Animasi saat kursor keluar (Mengacak kembali menjadi sandi)
    el.addEventListener('mouseleave', () => {
      let iterations = 0;
      clearInterval(el.interval);
      
      el.interval = setInterval(() => {
        el.innerText = fakeText.split("").map((letter, index) => {
          if (letter === " ") return " ";
          if (index < iterations) return fakeText[index]; // Terkunci kembali ke sandi
          return letters[Math.floor(Math.random() * letters.length)];
        }).join("");
        
        if(iterations >= fakeText.length) clearInterval(el.interval);
        iterations += 1/3; 
      }, 30);
    });
  });