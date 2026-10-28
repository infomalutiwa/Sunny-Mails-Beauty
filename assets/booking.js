(()=>{
const C=window.SUNNY_BOOKING,root=document.getElementById('bk');
if(!C||!root)return;
const $=(s,r=root)=>r.querySelector(s);
const st={svc:null,day:null,slot:null};
const fmtDur=m=>{const h=Math.floor(m/60),r=m%60;return (h?h+' Std.':'')+(h&&r?' ':'')+(r?r+' Min.':'')};
const needsDeposit=s=>s&&((s.price!=null&&s.price>=C.deposit.minPrice)||s.minutes>=C.deposit.minMinutes);
const fmtT=m=>String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');
const pad=n=>String(n).padStart(2,'0');
const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());

const sv=$('#bk-svc');
sv.innerHTML=C.services.map(s=>`<button type="button" class="chip" data-id="${s.id}" aria-pressed="false">${s.name}<small>ca. ${fmtDur(s.minutes)}</small></button>`).join('');

const dy=$('#bk-days'),today=new Date();today.setHours(0,0,0,0);
const days=[...Array(28)].map((_,i)=>{const d=new Date(today);d.setDate(d.getDate()+i);return d});
dy.innerHTML=days.map(d=>{const open=!!C.hours[d.getDay()];return `<button type="button" class="day" data-d="${iso(d)}" aria-pressed="false" ${open?'':'disabled'} aria-label="${d.toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'})}${open?'':', geschlossen'}"><span>${d.toLocaleDateString('de-DE',{weekday:'short'})}</span><b>${d.getDate()}</b><span>${d.toLocaleDateString('de-DE',{month:'short'})}</span></button>`}).join('');

async function slotsFor(dateStr,svc){
  if(C.api){
    const r=await fetch(`${C.api}/availability?date=${dateStr}&minutes=${svc.minutes}&service=${svc.id}`);
    if(!r.ok)throw new Error('availability');
    return (await r.json()).slots;   /* z. B. ["09:00","09:30"] */
  }
  const d=new Date(dateStr+'T00:00'),h=C.hours[d.getDay()];if(!h)return [];
  const out=[],now=new Date();
  for(let m=h[0]*60;m+svc.minutes<=h[1]*60;m+=C.slotStep){
    const t=new Date(d);t.setMinutes(m);
    if(t>new Date(now.getTime()+60*60000))out.push(fmtT(m));
  }
  return out;
}
async function renderSlots(){
  const box=$('#bk-slots');st.slot=null;
  if(!st.svc||!st.day){box.innerHTML='<p class="none">Wähle zuerst Leistung und Tag.</p>';update();return}
  box.innerHTML='<p class="none">Lade freie Zeiten …</p>';
  try{const s=await slotsFor(st.day,st.svc);
    box.innerHTML=s.length?s.map(t=>`<button type="button" class="slot" data-t="${t}" aria-pressed="false">${t}</button>`).join(''):'<p class="none">An diesem Tag ist nichts mehr frei. Bitte wähle einen anderen Tag.</p>';
  }catch(e){box.innerHTML='<p class="none">Die freien Zeiten konnten nicht geladen werden. Bitte ruf uns kurz an: +49 7720 9898139.</p>'}
  update();
}
function update(){
  const s=st.svc,sum=$('#bk-sum');
  if(!s){sum.hidden=true;return}
  sum.hidden=false;
  const dep=needsDeposit(s);
  const when=st.day?new Date(st.day+'T00:00').toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'})+(st.slot?', '+st.slot+' Uhr':''):'noch offen';
  let depTxt='Keine Anzahlung nötig.';
  if(dep)depTxt=s.price!=null?`${C.deposit.percent} % Anzahlung: <b>${(s.price*C.deposit.percent/100).toFixed(2).replace('.',',')} €</b>`:`<b>${C.deposit.percent} % Anzahlung</b> des Behandlungspreises`;
  sum.innerHTML=`<div><span>Leistung</span><span>${s.name}</span></div><div><span>Dauer</span><span>ca. ${fmtDur(s.minutes)}</span></div><div><span>Termin</span><span>${when}</span></div><div class="dep"><span>Anzahlung</span><span>${depTxt}</span></div><p style="font-size:.86rem;color:var(--mut)">${dep?`Die Anzahlung wird auf den Preis angerechnet. Bei Absage weniger als ${C.cancelHours} Stunden vorher behalten wir sie als Ausfallentschädigung ein.`:`Bitte sag bis ${C.cancelHours} Stunden vorher ab, wenn du nicht kommen kannst.`}</p>`;
  $('#bk-go').textContent=C.api?(dep?'Verbindlich buchen und Anzahlung zahlen':'Verbindlich buchen'):'Termin per WhatsApp anfragen';
  $('#bk-contact').hidden=!C.api;
}
root.addEventListener('click',e=>{
  const c=e.target.closest('.chip'),d=e.target.closest('.day'),t=e.target.closest('.slot');
  if(c){st.svc=C.services.find(x=>x.id===c.dataset.id);$('#bk-svc').querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed',x===c));renderSlots()}
  if(d){st.day=d.dataset.d;dy.querySelectorAll('.day').forEach(x=>x.setAttribute('aria-pressed',x===d));renderSlots()}
  if(t){st.slot=t.dataset.t;$('#bk-slots').querySelectorAll('.slot').forEach(x=>x.setAttribute('aria-pressed',x===t));update()}
});
root.addEventListener('submit',async e=>{
  e.preventDefault();const err=$('#bk-err'),f=new FormData(root);err.textContent='';
  if(!st.svc||!st.day||!st.slot){err.textContent='Bitte wähle Leistung, Tag und Uhrzeit.';return}
  if(!f.get('name')){err.textContent='Bitte gib deinen Namen an.';return}
  if(!$('#bk-ok').checked){err.textContent='Bitte bestätige die Buchungs- und Stornobedingungen.';return}
  const when=new Date(st.day+'T00:00').toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'})+', '+st.slot+' Uhr';
  if(!C.api){
    const msg=`Hallo Sunny Nails! Ich bin ${f.get('name')} und möchte gern einen Termin: ${st.svc.name}, ${when}.${f.get('note')?' Notiz: '+f.get('note'):''}`;
    window.open('https://wa.me/'+C.whatsapp+'?text='+encodeURIComponent(msg),'_blank','noopener');return;
  }
  if(!f.get('phone')&&!f.get('email')){err.textContent='Bitte gib Telefon oder E-Mail für die Bestätigung an.';return}
  try{
    const r=await fetch(C.api+'/bookings',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({service:st.svc.id,date:st.day,time:st.slot,name:f.get('name'),phone:f.get('phone'),email:f.get('email'),note:f.get('note'),termsAccepted:true})});
    if(!r.ok)throw new Error();const j=await r.json();
    if(j.checkoutUrl)location.href=j.checkoutUrl;else $('#bk-err').textContent='Gebucht. Du bekommst gleich eine Bestätigung.';
  }catch(x){err.textContent='Das hat nicht geklappt. Bitte versuche es erneut oder ruf uns an: +49 7720 9898139.'}
});
update();renderSlots();
})();
