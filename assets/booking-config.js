/* Einstellungen für die Terminbuchung. Alles mit TODO vom Studio bestätigen lassen. */
window.SUNNY_BOOKING={
  /* Adresse des Buchungs-Backends (Live-Kalender, Zahlung, Erinnerungen).
     Leer lassen = Wunschtermin wird per WhatsApp angefragt. */
  api:'',
  whatsapp:'491746119584',
  deposit:{minPrice:200,minMinutes:120,percent:50},   /* Anzahlung ab 200 € oder ab 2 Stunden */
  cancelHours:24,
  slotStep:30,
  /* Öffnungszeiten: Wochentag (0 = Sonntag) -> Liste von [von, bis] in Stunden. Fehlt ein Tag, ist er online nicht buchbar
     (Mittwoch und Sonntag geschlossen, Samstag nur nach Vereinbarung). */
  hours:{1:[[8,13]],2:[[8,13],[15,20]],4:[[8,13],[15,20]],5:[[10,16]]},
  /* TODO: Leistungen, Dauer (Minuten) und Preis (€) vom Studio bestätigen lassen.
     price:null = Preis noch nicht hinterlegt, dann entscheidet nur die Dauer über die Anzahlung. */
  services:[
    {id:'mani-auf',name:'Maniküre Auffüllen',minutes:90,price:null},
    {id:'mani-neu',name:'Maniküre Neumodellage',minutes:150,price:null},
    {id:'pedi',name:'Pediküre',minutes:60,price:null},
    {id:'pedi-dry',name:'Wasserlose Pediküre',minutes:45,price:null},
    {id:'lash',name:'Wimpernverlängerung',minutes:120,price:null},
    {id:'headspa',name:'Headspa',minutes:60,price:null}
  ]
};
