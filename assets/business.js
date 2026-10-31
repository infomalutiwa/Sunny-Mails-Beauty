(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const bg=$('.burger'),sh=$('.sheet');
if(bg){bg.onclick=()=>{const o=sh.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.textContent=o?'✕':'☰'};$$('a',sh).forEach(a=>a.onclick=()=>{sh.classList.remove('open');bg.textContent='☰'})}

/* Einblenden beim Scrollen, leicht gestaffelt */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv-in').forEach(el=>io.observe(el));
$$('.cards .card,.revs .rv,.steps li,.trust .wrap>div').forEach((el,i)=>{el.classList.add('rv-in');el.style.setProperty('--d',(i%4)*.08+'s');io.observe(el)});

/* Kopfzeile: Schatten und Lesefortschritt */
const hd=$('header.site'),pr=$('.progress');
const onScroll=()=>{hd.classList.toggle('stuck',scrollY>8);if(pr){const h=document.documentElement.scrollHeight-innerHeight;pr.style.transform='scaleX('+(h>0?scrollY/h:0)+')'}};
addEventListener('scroll',onScroll,{passive:true});onScroll();

/* Galerie mit Vollbild */
const shots=$$('.shot[data-full]'),lb=$('#lb');
if(shots.length&&lb){
  const li=$('img',lb);let cur=0;
  const show=i=>{cur=(i+shots.length)%shots.length;li.src=shots[cur].dataset.full;li.alt=$('img',shots[cur]).alt};
  shots.forEach((b,i)=>b.onclick=()=>{show(i);lb.classList.add('open');$('.x',lb).focus()});
  $('.p',lb).onclick=e=>{e.stopPropagation();show(cur-1)};$('.n',lb).onclick=e=>{e.stopPropagation();show(cur+1)};
  lb.onclick=e=>{if(e.target===lb||e.target.classList.contains('x'))lb.classList.remove('open')};
  addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')lb.classList.remove('open');if(e.key==='ArrowRight')show(cur+1);if(e.key==='ArrowLeft')show(cur-1)});
}

/* Geöffnet-Anzeige und heutiger Tag */
const n=new Date(),d=n.getDay(),m=n.getHours()*60+n.getMinutes();
const H={1:[[480,780]],2:[[480,780],[900,1200]],4:[[480,780],[900,1200]],5:[[600,960]]};
const cur=(H[d]||[]).find(r=>m>=r[0]&&m<r[1]),open=!!cur;
const hm=x=>Math.floor(x/60)+':'+String(x%60).padStart(2,'0');
const dot=$('#dot'),st=$('#statusTxt');
if(st){if(open)st.textContent='Jetzt geöffnet bis '+hm(cur[1])+' Uhr';else{dot.classList.add('off');st.textContent='Gerade geschlossen'}}
const today=$(`#hours li[data-d="${d}"]`);if(today)today.classList.add('today');

/* Karte erst nach Klick laden */
const mb=$('#loadmap');
if(mb)mb.onclick=()=>{$('.map').innerHTML='<iframe title="Karte: Wohlfühlort Sunny, Müßmattstraße 22" referrerpolicy="no-referrer" loading="lazy" src="https://maps.google.com/maps?q=M%C3%BC%C3%9Fmattstra%C3%9Fe+22,+79618+Rheinfelden+(Baden)&output=embed"></iframe>'};
})();
