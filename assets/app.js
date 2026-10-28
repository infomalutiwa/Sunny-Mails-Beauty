(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const bg=$('.burger'),sh=$('.sheet');
if(bg){bg.onclick=()=>{const o=sh.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.textContent=o?'✕':'☰'};$$('a',sh).forEach(a=>a.onclick=()=>{sh.classList.remove('open');bg.textContent='☰'})}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv-in').forEach(el=>io.observe(el));

const shots=[['gold-lang','Lange Nägel mit Blattgold'],['blau','Pastellblaues French mit 3D-Muster'],['cherry','Kirschen und Leopardenmuster mit Steinen'],['ombre','Orange-rosa Ombré'],['bordeaux','Bordeauxrot mit Schmuckstein'],['gold-french','French mit Goldflocken'],['regenbogen','Regenbogen in Matt'],['creme','Cremeweiß mit Glitzer'],['blumen','Gelbes French mit roten Blumen'],['stiletto','Schwarze Stiletto mit Zahlen']];
const gal=$('#gal');
if(gal){
  gal.innerHTML=shots.map((s,i)=>`<button class="shot" data-i="${i}" aria-label="${s[1]} vergrößern"><img src="img/${s[0]}.jpg" alt="${s[1]}" loading="lazy" decoding="async"></button>`).join('');
  const lb=$('#lb'),li=$('img',lb);let cur=0;
  const show=i=>{cur=(i+shots.length)%shots.length;li.src='img/'+shots[cur][0]+'.jpg';li.alt=shots[cur][1]};
  gal.onclick=e=>{const b=e.target.closest('.shot');if(!b)return;show(+b.dataset.i);lb.classList.add('open');$('.x',lb).focus()};
  $('.p',lb).onclick=e=>{e.stopPropagation();show(cur-1)};$('.n',lb).onclick=e=>{e.stopPropagation();show(cur+1)};
  lb.onclick=e=>{if(e.target===lb||e.target.classList.contains('x'))lb.classList.remove('open')};
  addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')lb.classList.remove('open');if(e.key==='ArrowRight')show(cur+1);if(e.key==='ArrowLeft')show(cur-1)});
}
/* reviews: excerpts, first name + initial, no photos */
const revs=[['Lea S.','Ich bin jedes Mal sehr zufrieden. Meine Nägel hat immer eine sehr liebe Mitarbeiterin gemacht. Sie arbeitet sehr sorgfältig und präzise.'],['Mary','Sauber, freundlich, immer gute Arbeit. Preis-Leistung passt perfekt.'],['Franka K.','Ich bin vom ersten Termin an super begeistert und nun seit fast einem Jahr monatlich dort und kann das Studio weiterempfehlen.'],['Sandra S.','Ich bin super zufrieden mit Sunny Nails! Alle Mitarbeiter sind sehr freundlich, arbeiten aufmerksam und ordentlich.'],['Lisa V.','Super Team und perfekte Arbeit!'],['Eleni N.','Studio sehr schön und sauber. Mitarbeiter auch sehr nett und gute Kommunikation möglich. Insgesamt super zufrieden mit dem Ergebnis.'],['Aylin B.','Bin sehr zufrieden mit meinem Besuch bei Sunny Nails. Wunderschöne Nägel und total liebe Mädels im Salon. Love it!'],['Linda L.','Schöne Arbeit, gute Kommunikation und die Preise stimmen auch.'],['Tina N.','So toll, ich werde noch viele Male wiederkommen.']];
const rv=$('#revs');
if(rv)rv.innerHTML=revs.map(r=>`<article class="rv"><span class="stars" aria-label="5 Sterne">★★★★★</span><q>${r[1]}</q><div class="who">${r[0]}</div></article>`).join('');

const n=new Date(),d=n.getDay(),m=n.getHours()*60+n.getMinutes(),close=d===6?1050:1140,open=d>=1&&d<=6&&m>=540&&m<close;
const dot=$('#dot'),st=$('#statusTxt');
if(st){if(open)st.textContent='Jetzt geöffnet bis '+(d===6?'17:30':'19:00')+' Uhr';else{dot.classList.add('off');st.textContent='Gerade geschlossen'}}
const today=$(`#hours li[data-d="${d}"]`);if(today)today.classList.add('today');
const mb=$('#loadmap');
if(mb)mb.onclick=()=>{$('.map').innerHTML='<iframe title="Karte: Sunny Nails & Beauty Spa, Oberdorfstr. 44" referrerpolicy="no-referrer" loading="lazy" src="https://maps.google.com/maps?q=Oberdorfstr.+44,+78054+Villingen-Schwenningen&output=embed"></iframe>'};
})();
