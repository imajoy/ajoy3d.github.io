const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const categories = ['Realistic','Stylized','Toon','Product','Rigging'];
const rowIntro = {
  Realistic:'Grounded character performance, mocap and believable movement.',
  Toon:'Acting, timing and expressive character animation.',
  Stylized:'Stylized motion studies and driven shots.',
  Rigging:'Character setup and animation-ready rig workflows.',
  Product:'Clean product motion for advertising and presentation.'
};

function projectCard(p, index, wide=false){
  return `<article class="work-card ${wide?'wide':''} reveal" data-id="${p.id}">
    <button class="work-media" data-project="${p.id}" aria-label="Watch ${p.title}">
      <video muted loop playsinline preload="metadata" src="${p.src}"></video>
      <span class="media-shade"></span><span class="media-meta"><span>${String(index+1).padStart(2,'0')}</span><span>${p.category}</span></span>
      <span class="play-icon">↗</span>
    </button>
    <div class="work-card-copy"><div><h3>${p.title}</h3><p>${p.category}</p></div><span class="watch">WATCH ↗</span></div>
  </article>`;
}
function renderRows(filter='All'){
  const wrap=$('#work-rows');
  if(filter==='All'){
    wrap.innerHTML = categories.map((cat,ci)=>{
      const items=PROJECTS.filter(p=>p.category===cat);
      const cards=items.map((p,i)=>projectCard(p,i,i===0)).join('');
      return `<section class="work-row reveal"><div class="work-row-head"><div class="row-title"><span>0${ci+1}</span><h3>${cat==='Toon'?'Toon & Acting':cat==='Realistic'?'Realistic Animation':cat==='Stylized'?'Stylized Work':cat}</h3></div><p>${rowIntro[cat]}</p></div><div class="row-track">${cards}</div></section>`;
    }).join('');
  } else {
    const items=PROJECTS.filter(p=>p.category===filter);
    wrap.innerHTML = `<section class="work-row"><div class="work-row-head"><div class="row-title"><span>01</span><h3>${filter==='Toon'?'Toon & Acting':filter==='Realistic'?'Realistic Animation':filter==='Stylized'?'Stylized Work':filter}</h3></div><p>${rowIntro[filter]}</p></div><div class="row-track filtered-track">${items.map((p,i)=>projectCard(p,i,i===0)).join('')}</div></section>`;
  }
  bindWorkCards(); revealElements();
}
function bindWorkCards(){
  $$('.work-card').forEach(card=>{
    const video=card.querySelector('video');
    card.addEventListener('mouseenter',()=>{ if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){video.play().catch(()=>{});} });
    card.addEventListener('mouseleave',()=>{ video.pause(); video.currentTime=0; });
    card.querySelector('[data-project]').addEventListener('click',()=>openModal(card.dataset.id));
  });
}
let currentIndex=0;
function openModal(id){
  currentIndex=PROJECTS.findIndex(p=>p.id===id); if(currentIndex<0) currentIndex=0; updateModal();
  const m=$('#modal'); m.classList.add('open'); m.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
}
function updateModal(){
  const p=PROJECTS[currentIndex]; $('#modal-category').textContent=p.category; $('#modal-title').textContent=p.title; $('#modal-count').textContent=`${String(currentIndex+1).padStart(2,'0')} / ${String(PROJECTS.length).padStart(2,'0')}`;
  $('#modal-video').innerHTML=`<video controls autoplay playsinline src="${p.src}"></video>`;
}
function closeModal(){ const m=$('#modal'); m.classList.remove('open'); m.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); $('#modal-video').innerHTML=''; }
function revealElements(){
  const els=$$('.reveal:not(.is-visible)');
  if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('is-visible'));return;}
  if(!window.__revealObserver){ window.__revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');window.__revealObserver.unobserve(e.target);}}),{threshold:.12,rootMargin:'0px 0px -50px'}); }
  els.forEach(e=>window.__revealObserver.observe(e));
}
function init(){
  renderRows();
  $$('#work-filter .filter').forEach(btn=>btn.addEventListener('click',()=>{ $$('#work-filter .filter').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); renderRows(btn.dataset.category); }));
  $('#modal-close').addEventListener('click',closeModal); $$('.modal-backdrop').forEach(x=>x.addEventListener('click',closeModal));
  $('#modal-prev').addEventListener('click',()=>{currentIndex=(currentIndex-1+PROJECTS.length)%PROJECTS.length;updateModal();});
  $('#modal-next').addEventListener('click',()=>{currentIndex=(currentIndex+1)%PROJECTS.length;updateModal();});
  window.addEventListener('keydown',e=>{if(!$('#modal').classList.contains('open'))return;if(e.key==='Escape')closeModal();if(e.key==='ArrowLeft')$('#modal-prev').click();if(e.key==='ArrowRight')$('#modal-next').click();});
  const header=$('#site-header'); let lastY=0; window.addEventListener('scroll',()=>{const y=window.scrollY; header.classList.toggle('scrolled',y>30); if(y>lastY && y>180) header.classList.add('hidden'); else header.classList.remove('hidden'); lastY=y; const max=document.body.scrollHeight-window.innerHeight; $('#scroll-progress').style.transform=`scaleX(${max>0?y/max:0})`;},{passive:true});
  $('#menu-btn').addEventListener('click',()=>{const open=$('#mobile-nav').classList.toggle('open');$('#menu-btn').setAttribute('aria-expanded',String(open));});
  $$('#mobile-nav a').forEach(a=>a.addEventListener('click',()=>$('#mobile-nav').classList.remove('open')));
  $('#year').textContent=new Date().getFullYear();
}
document.addEventListener('DOMContentLoaded',init);
