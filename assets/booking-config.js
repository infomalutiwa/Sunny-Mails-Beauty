/* Einstellungen für die Terminanfrage. Dauer der Leistungen vom Studio bestätigen lassen. */
window.SUNNY_BOOKING={
  /* Adresse des Buchungs-Backends (Live-Kalender, Zahlung, Erinnerungen).
     Leer lassen = Wunschtermin wird per WhatsApp angefragt. */
  api:'',
  whatsapp:'491733098632',
  deposit:null,   /* Anzahlungsregel, z. B. {minPrice:200,minMinutes:120,percent:50}. null = keine Anzahlung */
  slotStep:30,
  /* Öffnungszeiten: Wochentag (0 = Sonntag) -> Liste von [von, bis] in Stunden. Fehlt ein Tag, ist er online nicht buchbar
     (Mittwoch und Sonntag geschlossen, Samstag nur nach Vereinbarung). */
  hours:{1:[[8,13]],2:[[8,13],[15,20]],4:[[8,13],[15,20]],5:[[10,16]]},
  /* Preise laut Preisliste des Studios. TODO: Dauer (Minuten) vom Studio bestätigen lassen, aktuell Schätzwerte. */
  services:[
    {id:'mani-peeling',name:'Maniküre mit Peeling & Maske',minutes:45,price:35},
    {id:'mani-shellac',name:'Maniküre mit Shellac',minutes:60,price:40},
    {id:'gel-neu',name:'Gel-Neumodellage mit Tips',minutes:90,price:60},
    {id:'gel-auf',name:'Gel auffüllen',minutes:75,price:45},
    {id:'pedi',name:'Pediküre ohne Lack',minutes:60,price:43},
    {id:'pedi-shellac',name:'Pediküre mit Shellac',minutes:75,price:47},
    {id:'fuss-med',name:'Medizinische Fußpflege',minutes:60,price:48},
    {id:'wohlfuehl',name:'Wohlfühlbehandlung (Fuß)',minutes:90,price:69},
    {id:'brow-kombi',name:'Augenbrauen zupfen & färben',minutes:30,price:25},
    {id:'brow-lift',name:'Brow Lifting',minutes:60,price:59},
    {id:'lash-lift',name:'Wimpern Lifting',minutes:60,price:69},
    {id:'kosmetik',name:'Kosmetik (Beratung, Preis nach Behandlung)',minutes:60,price:null}
  ]
};
