(()=>{
/* Terminbuchung: mehrere Leistungen wählen, nur freie Zeiten innerhalb der Öffnungszeiten,
   direkt verbindlich buchen. Belegte Zeiten liegen als 15-Minuten-Blöcke in Firestore (slots/),
   die Kundendaten in termine/ (nur für das Studio lesbar). */
const FB={apiKey:'AIzaSyDuomvaRRV4VYJYXDs1qE8J0_81gpjRAAs',authDomain:'sunny-mails-beauty.firebaseapp.com',projectId:'sunny-mails-beauty',appId:'1:680567722635:web:524f2428c35df8c1ddba8e'};
const V='https://www.gstatic.com/firebasejs/10.12.2/';
let fbp=null;
const fb=()=>fbp||(fbp=Promise.all([import(V+'firebase-app.js'),import(V+'firebase-firestore.js')]).then(([A,F])=>({F,db:F.getFirestore(A.initializeApp(FB))})));

const C=window.SUNNY_BOOKING,root=document.getElementById('bk');
if(!C||!root)return;
const DIRECT=C.direct!==false,BLOCK=15;
const $=(s,r=root)=>r.querySelector(s);
const st={svcs:[],day:null,slot:null,busy:null};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmtDur=m=>{const h=Math.floor(m/60),r=m%60;return (h?h+' Std.':'')+(h&&r?' ':'')+(r?r+' Min.':'')};
const fmtT=m=>String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');
const toMin=t=>{const [h,m]=t.split(':').map(Number);return h*60+m};
const pad=n=>String(n).padStart(2,'0');
const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const longDay=s=>new Date(s+'T00:00').toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'});
const total=()=>st.svcs.reduce((a,s)=>a+s.minutes,0);
const price=()=>st.svcs.some(s=>s.price==null)?null:st.svcs.reduce((a,s)=>a+s.price,0);
const roundUp=m=>Math.ceil(m/BLOCK)*BLOCK;

/* Leistungen: mehrere gleichzeitig wählbar */
const sv=$('#bk-svc');
sv.innerHTML=C.services.map(s=>`<button type="button" class="chip" data-id="${s.id}" aria-pressed="false">${esc(s.name)}<small>ca. ${fmtDur(s.minutes)}${s.price!=null?' · '+s.price+' €':''}</small></button>`).join('');

/* Tage */
const dy=$('#bk-days'),today=new Date();today.setHours(0,0,0,0);
const days=[...Array(C.daysAhead||28)].map((_,i)=>{const d=new Date(today);d.setDate(d.getDate()+i);return d});
dy.innerHTML=days.map(d=>{const open=!!C.hours[d.getDay()];return `<button type="button" class="day" data-d="${iso(d)}" aria-pressed="false" ${open?'':'disabled'} aria-label="${d.toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'})}${open?'':', geschlossen'}"><span>${d.toLocaleDateString('de-DE',{weekday:'short'})}</span><b>${d.getDate()}</b><span>${d.toLocaleDateString('de-DE',{month:'short'})}</span></button>`}).join('');

/* Belegte Blöcke eines Tages laden */
async function busyFor(dateStr){
  if(!DIRECT)return new Set();
  const {F,db}=await fb();
  const snap=await F.getDocs(F.query(F.collection(db,'slots'),F.where('d','==',dateStr)));
  return new Set(snap.docs.map(x=>x.data().m));
}
async function slotsFor(dateStr,minutes){
  if(C.api){
    const r=await fetch(`${C.api}/availability?date=${dateStr}&minutes=${minutes}&service=${st.svcs.map(s=>s.id).join(',')}`);
    if(!r.ok)throw new Error('availability');
    return (await r.json()).slots;
  }
  const d=new Date(dateStr+'T00:00'),h=C.hours[d.getDay()];if(!h)return [];
  const busy=await busyFor(dateStr),need=roundUp(minutes),out=[];
  const earliest=Date.now()+(C.minLead??60)*60000;
  for(const r of h)for(let m=r[0]*60;m+need<=r[1]*60;m+=C.slotStep){
    const t=new Date(d);t.setMinutes(m);
    if(t.getTime()<earliest)continue;
    let free=true;for(let b=m;b<m+need;b+=BLOCK)if(busy.has(b)){free=false;break}
    if(free)out.push(fmtT(m));
  }
  return out;
}
let req=0;
async function renderSlots(){
  const box=$('#bk-slots'),my=++req;st.slot=null;
  if(!st.svcs.length||!st.day){box.innerHTML='<p class="none">Wähle zuerst Leistung und Tag.</p>';update();return}
  box.innerHTML='<p class="none">Lade freie Zeiten …</p>';update();
  try{const s=await slotsFor(st.day,total());if(my!==req)return;
    box.innerHTML=s.length?s.map(t=>`<button type="button" class="slot" data-t="${t}" aria-pressed="false">${t}</button>`).join(''):'<p class="none">An diesem Tag ist für diese Dauer nichts mehr frei. Bitte wähle einen anderen Tag.</p>';
  }catch(e){if(my!==req)return;box.innerHTML='<p class="none">Die freien Zeiten konnten nicht geladen werden. Bitte ruf uns kurz an: 0173 3098632.</p>'}
  update();
}
function update(){
  const sum=$('#bk-sum');
  if(!st.svcs.length){sum.hidden=true;$('#bk-go').disabled=false;return}
  sum.hidden=false;
  const m=total(),p=price();
  const when=st.day?longDay(st.day)+(st.slot?`, ${st.slot}–${fmtT(toMin(st.slot)+m)} Uhr`:''):'noch offen';
  const list=st.svcs.map(s=>`<div><span>${esc(s.name)}</span><span>${s.price!=null?s.price+' €':'nach Behandlung'}</span></div>`).join('');
  sum.innerHTML=`${list}<div class="tot"><span>Dauer gesamt</span><span>ca. ${fmtDur(m)}</span></div><div><span>Termin</span><span>${when}</span></div><div><span>Preis gesamt</span><span>${p!=null?'<b>'+p+' €</b>':(st.svcs.length>1?'ab '+st.svcs.reduce((a,s)=>a+(s.price||0),0)+' €, ':'')+'Kosmetik nach Behandlung'}</span></div><p style="font-size:.86rem;color:var(--mut)">Bezahlt wird vor Ort. Bitte sag rechtzeitig ab, wenn du nicht kommen kannst.</p>`;
  $('#bk-go').textContent=DIRECT||C.api?'Termin verbindlich buchen':'Termin per WhatsApp anfragen';
}
root.addEventListener('click',e=>{
  const c=e.target.closest('.chip'),d=e.target.closest('.day'),t=e.target.closest('.slot');
  if(c){const s=C.services.find(x=>x.id===c.dataset.id),on=st.svcs.includes(s);
    st.svcs=on?st.svcs.filter(x=>x!==s):[...st.svcs,s];c.setAttribute('aria-pressed',!on);renderSlots()}
  if(d){st.day=d.dataset.d;dy.querySelectorAll('.day').forEach(x=>x.setAttribute('aria-pressed',x===d));renderSlots()}
  if(t){st.slot=t.dataset.t;$('#bk-slots').querySelectorAll('.slot').forEach(x=>x.setAttribute('aria-pressed',x===t));update()}
});

/* Kalendereintrag für die Kundin */
function ics(b){
  const dt=(date,min)=>date.replace(/-/g,'')+'T'+pad(Math.floor(min/60))+pad(min%60)+'00';
  const txt=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Wohlfuehlraum Sunny//DE','BEGIN:VEVENT','UID:'+b.id+'@sunny-mails-beauty.web.app',
    'DTSTAMP:'+new Date().toISOString().replace(/[-:]/g,'').slice(0,15)+'Z','DTSTART;TZID=Europe/Berlin:'+dt(b.date,b.start),'DTEND;TZID=Europe/Berlin:'+dt(b.date,b.end),
    'SUMMARY:Wohlfühlort Sunny: '+b.services.join(', '),'LOCATION:Müßmattstraße 22\\, 79618 Rheinfelden (Baden)','DESCRIPTION:Absage bitte telefonisch: 0173 3098632','END:VEVENT','END:VCALENDAR'].join('\r\n');
  return URL.createObjectURL(new Blob([txt],{type:'text/calendar'}));
}
function done(b){
  root.innerHTML=`<div class="bk-done" role="status" tabindex="-1"><span class="ok">✓</span><h3>Dein Termin ist gebucht</h3>
  <p><b>${esc(longDay(b.date))}, ${fmtT(b.start)}–${fmtT(b.end)} Uhr</b><br>${b.services.map(esc).join(', ')}</p>
  <p>Wir freuen uns auf dich, ${esc(b.name)}! Musst du absagen oder verschieben, ruf bitte an: <a href="tel:+491733098632">0173 3098632</a>.</p>
  <div class="cta"><a class="btn btn-dark" href="${ics(b)}" download="termin-wohlfuehlraum-sunny.ics">In meinen Kalender</a><a class="btn btn-line" href="index.html">Zur Startseite</a></div></div>`;
  root.querySelector('.bk-done').focus();
}

root.addEventListener('submit',async e=>{
  e.preventDefault();const err=$('#bk-err'),f=new FormData(root);err.textContent='';
  if(!st.svcs.length||!st.day||!st.slot){err.textContent='Bitte wähle Leistung, Tag und Uhrzeit.';return}
  const name=String(f.get('name')||'').trim(),phone=String(f.get('phone')||'').trim(),email=String(f.get('email')||'').trim(),note=String(f.get('note')||'').trim();
  if(!name){err.textContent='Bitte gib deinen Namen an.';return}
  if((DIRECT||C.api)&&phone.replace(/\D/g,'').length<6){err.textContent='Bitte gib deine Telefonnummer an, damit wir dich bei Fragen erreichen.';return}
  if(!$('#bk-ok').checked){err.textContent='Bitte bestätige die Datenschutzerklärung.';return}
  const names=st.svcs.map(s=>s.name),when=longDay(st.day)+', '+st.slot+' Uhr';
  if(!DIRECT&&!C.api){
    const msg=`Hallo Wohlfühlort Sunny! Ich bin ${name} und möchte gern einen Termin: ${names.join(', ')}, ${when}.${note?' Notiz: '+note:''}`;
    window.open('https://wa.me/'+C.whatsapp+'?text='+encodeURIComponent(msg),'_blank','noopener');return;
  }
  const go=$('#bk-go');go.disabled=true;go.textContent='Wird gebucht …';
  const start=toMin(st.slot),minutes=roundUp(total()),end=start+minutes;
  try{
    const {F,db}=await fb();
    const ref=F.doc(F.collection(db,'termine')),batch=F.writeBatch(db);
    batch.set(ref,{name,phone,email,note,services:names,date:st.day,start,end,minutes,price:price(),createdAt:F.serverTimestamp(),status:'gebucht'});
    for(let m=start;m<end;m+=BLOCK)batch.set(F.doc(db,'slots',st.day+'_'+m),{d:st.day,m,b:ref.id});
    await batch.commit();
    if(C.notify)fetch(C.notify,{method:'POST',headers:{Title:'Neuer Termin',Tags:'calendar'},body:`${when}: ${names.join(', ')} (${fmtDur(minutes)})`}).catch(()=>{});
    done({id:ref.id,name,date:st.day,start,end,services:names});
  }catch(x){
    go.disabled=false;update();
    err.textContent=x&&x.code==='permission-denied'?'Diese Uhrzeit wurde gerade von jemand anderem gebucht. Bitte wähle eine andere Zeit.':'Das hat nicht geklappt. Bitte versuche es erneut oder ruf uns an: 0173 3098632.';
    renderSlots();
  }
});
update();renderSlots();
})();
