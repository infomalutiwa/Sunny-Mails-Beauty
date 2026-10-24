(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;

/* mobile menu */
const bg=$('.burger'),sh=$('.sheet');
if(bg){bg.onclick=()=>{const o=sh.classList.toggle('open');bg.setAttribute('aria-expanded',o)};$$('a',sh).forEach(a=>a.onclick=()=>{sh.classList.remove('open');bg.setAttribute('aria-expanded',false)})}

/* headline: split into letters */
const h1=$('h1[data-split]');
if(h1){let i=0;h1.innerHTML=h1.textContent.trim().split(' ').map(w=>`<span class="w">${[...w].map(c=>`<span class="c" style="--i:${i++}">${c}</span>`).join('')}</span>`).join(' ');h1.setAttribute('aria-label',h1.dataset.split)}

/* cursor glow */
const glow=$('.glow');
if(glow&&fine&&!reduce){let x=-999,y=-999,tx=x,ty=y;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY});(function f(){x+=(tx-x)*.12;y+=(ty-y)*.12;glow.style.transform=`translate3d(${x}px,${y}px,0)`;requestAnimationFrame(f)})()}

/* hero 3D ring */
const box=$('.ringbox'),ring=$('.ring');
if(box){
  const imgs=['gold-lang','blau','cherry','ombre','bordeaux','gold-french','regenbogen','creme','blumen','stiletto'];
  ring.innerHTML=imgs.map(n=>`<div class="panel"><img src="img/${n}.jpg" alt="" loading="eager" decoding="async"></div>`).join('');
  const panels=$$('.panel',ring),N=panels.length;
  function layout(){const w=innerWidth<700?130:Math.min(230,innerWidth*.16,innerHeight*.24),h=Math.round(w*1.36);box.style.setProperty('--pw',w+'px');box.style.setProperty('--ph',h+'px');const R=(w/2)/Math.tan(Math.PI/N)*1.12;panels.forEach((p,i)=>p.style.transform=`rotateY(${i*360/N}deg) translateZ(${R}px)`);ring.dataset.r=R}
  layout();addEventListener('resize',layout);
  let ang=0,vel=reduce?0:.12,drag=false,lx=0,tiltX=-8,tgtX=-8,tiltY=0;
  box.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;box.setPointerCapture(e.pointerId)});
  box.addEventListener('pointermove',e=>{if(drag){const d=e.clientX-lx;lx=e.clientX;ang+=d*.35;vel=d*.12}else if(fine){tgtX=-8+((e.clientY/innerHeight)-.5)*-10}});
  const end=()=>drag=false;box.addEventListener('pointerup',end);box.addEventListener('pointercancel',end);
  (function f(){if(!drag){vel+=((reduce?0:.12)-vel)*.03}ang+=vel;tiltX+=(tgtX-tiltX)*.06;ring.style.transform=`translateZ(-${ring.dataset.r*0.0}px) rotateX(${tiltX}deg) rotateY(${ang}deg)`;requestAnimationFrame(f)})();
}

/* 3D tilt + spotlight */
if(fine&&!reduce)$$('.tilt').forEach(c=>{
  c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.transform=`perspective(900px) rotateY(${(x-.5)*12}deg) rotateX(${(.5-y)*12}deg) translateY(-6px)`;c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%')});
  c.addEventListener('pointerleave',()=>c.style.transform='');
});
/* magnetic buttons */
if(fine&&!reduce)$$('.btn').forEach(b=>{
  b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.28}px)`});
  b.addEventListener('pointerleave',()=>b.style.transform='');
});

/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.rv-in').forEach(el=>io.observe(el));

/* gallery */
const shots=[['gold-lang','Lange Nägel mit Blattgold'],['blau','Pastellblaues French mit 3D-Muster'],['cherry','Kirschen und Leopardenmuster mit Steinen'],['ombre','Orange-rosa Ombré'],['bordeaux','Bordeauxrot mit Schmuckstein'],['gold-french','French mit Goldflocken'],['regenbogen','Regenbogen in Matt'],['creme','Cremeweiß mit Glitzer'],['blumen','Gelbes French mit roten Blumen'],['stiletto','Schwarze Stiletto mit Zahlen']];
const rail=$('#rail');
if(rail){
  rail.innerHTML=shots.map((s,i)=>`<button class="shot" data-i="${i}" aria-label="${s[1]} vergrößern"><img src="img/${s[0]}.jpg" alt="${s[1]}" loading="lazy" decoding="async"></button>`).join('');
  const pin=$('.pin'),bar=$('.bar b');let on=false;
  function setup(){
    on=innerWidth>820&&!reduce;pin.classList.toggle('flat',!on);rail.style.transform='';
    if(on){pin.style.setProperty('--ph',(rail.scrollWidth-innerWidth+innerHeight*1.1)+'px')}else pin.style.removeProperty('--ph');
  }
  addEventListener('load',setup);addEventListener('resize',setup);setup();
  addEventListener('scroll',()=>{
    if(on){const r=pin.getBoundingClientRect(),max=pin.offsetHeight-innerHeight,p=Math.min(1,Math.max(0,-r.top/max));rail.style.transform=`translate3d(${-p*(rail.scrollWidth-innerWidth)}px,0,0)`;bar.style.width=p*100+'%'}
    const spa=$('.spa-bg');if(spa&&!reduce){const r=spa.parentElement.getBoundingClientRect();spa.style.setProperty('--py',(r.top*-.12)+'px')}
  },{passive:true});
  const lb=$('#lb'),li=$('img',lb);let cur=0;
  const show=i=>{cur=(i+shots.length)%shots.length;li.src='img/'+shots[cur][0]+'.jpg';li.alt=shots[cur][1]};
  rail.onclick=e=>{const b=e.target.closest('.shot');if(!b)return;show(+b.dataset.i);lb.classList.add('open');$('.x',lb).focus()};
  $('.p',lb).onclick=e=>{e.stopPropagation();show(cur-1)};$('.n',lb).onclick=e=>{e.stopPropagation();show(cur+1)};
  lb.onclick=e=>{if(e.target===lb||e.target.classList.contains('x'))lb.classList.remove('open')};
  addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')lb.classList.remove('open');if(e.key==='ArrowRight')show(cur+1);if(e.key==='ArrowLeft')show(cur-1)});
}

/* reviews: excerpts, first name + initial only, no photos */
const revs=[['Lea S.','Ich bin jedes Mal sehr zufrieden. Meine Nägel hat immer eine sehr liebe Mitarbeiterin gemacht. Sie arbeitet sehr sorgfältig und präzise.'],['Franka K.','Ich bin vom ersten Termin an super begeistert und nun seit fast einem Jahr monatlich dort und kann das Studio weiterempfehlen.'],['Sandra S.','Ich bin super zufrieden mit Sunny Nails! Alle Mitarbeiter sind sehr freundlich, arbeiten aufmerksam und ordentlich.'],['Aylin B.','Bin sehr zufrieden mit meinem Besuch bei Sunny Nails. Wunderschöne Nägel und total liebe Mädels im Salon. Love it!'],['Mary','Sauber, freundlich, immer gute Arbeit. Preis-Leistung passt perfekt.'],['Lisa V.','Super Team und perfekte Arbeit!'],['Eleni N.','Studio sehr schön und sauber. Mitarbeiter auch sehr nett und gute Kommunikation möglich. Insgesamt super zufrieden mit dem Ergebnis.'],['Linda L.','Schöne Arbeit, gute Kommunikation und die Preise stimmen auch.'],['Tina N.','So toll, ich werde noch viele Male wiederkommen.']];
const card=r=>`<article class="rv glass"><span class="stars" aria-label="5 Sterne">★★★★★</span><q>${r[1]}</q><div class="who"><span class="av" aria-hidden="true">${r[0][0]}</span>${r[0]}</div></article>`;
const rows=$$('.row');
if(rows.length){const a=revs.slice(0,5),b=revs.slice(5).concat(revs.slice(0,1));
  [a,b].forEach((set,i)=>{rows[i].innerHTML=(set.map(card).join('')).repeat(2)});
}

/* open / closed */
const n=new Date(),d=n.getDay(),m=n.getHours()*60+n.getMinutes(),close=d===6?1050:1140,open=d>=1&&d<=6&&m>=540&&m<close;
const dot=$('#dot'),st=$('#statusTxt');
if(st){if(open)st.textContent='Jetzt geöffnet bis '+(d===6?'17:30':'19:00')+' Uhr';else{dot.classList.add('off');st.textContent='Gerade geschlossen'}}
const today=$(`#hours li[data-d="${d}"]`);if(today)today.classList.add('today');
const day=$('#day');if(day)day.min=n.toISOString().slice(0,10);

/* booking → opens WhatsApp only on click */
const bf=$('#bf');
if(bf)bf.onsubmit=e=>{e.preventDefault();const f=new FormData(bf);
  const dt=f.get('day')?new Date(f.get('day')).toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'}):'flexibel';
  const msg=`Hallo Sunny Nails! Ich bin ${f.get('name')} und möchte gern einen Termin für ${f.get('svc')}. Wunschtag: ${dt}.${f.get('note')?' Notiz: '+f.get('note'):''}`;
  window.open('https://wa.me/491746119584?text='+encodeURIComponent(msg),'_blank','noopener')};

/* maps: load only after click (consent) */
const mb=$('#loadmap');
if(mb)mb.onclick=()=>{const w=$('.map');w.innerHTML='<iframe title="Karte: Sunny Nails & Beauty Spa, Oberdorfstr. 44" referrerpolicy="no-referrer" loading="lazy" src="https://maps.google.com/maps?q=Oberdorfstr.+44,+78054+Villingen-Schwenningen&output=embed"></iframe>'};
})();
