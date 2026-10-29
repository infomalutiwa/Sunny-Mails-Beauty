# Sunny Nails & Beauty Spa: Stand der Website

Zum Weitermachen in einem neuen Chat: diese Datei zuerst lesen.
Repo: `infomalutiwa/Sunny-Mails-Beauty`, Branch `ccr-2ec575da-frrsfm` (Stand 28.10.2026). Kein Pull Request angelegt.
Vorschau (statische Kopie, Version 2): https://claude.ai/artifact/J6xxidjY3iNWPoM771wjUZ
Hinweis: Die Vorschau zeigt nicht alle Dateien. Neue Fotos und Seiten muss man bei einem neuen Stand erneut mitveröffentlichen.

## Das Studio (aus den Fotos und Google-Bewertungen)
- Sunny Nails & Beauty Spa, Oberdorfstr. 44, 78054 Villingen-Schwenningen
- Telefon +49 7720 9898139, Mobil/WhatsApp +49 174 611 9584, Instagram @sunnynailsbeauty.vs
- Mo–Fr 9–19 Uhr, Sa 9–17:30 Uhr, Sonntag geschlossen. Auch ohne Termin möglich. Private Räume für Massage.
- Leistungen: Maniküre, Pediküre, wasserlose Pediküre, Wimpernverlängerung, Headspa und Massage.
- Logo: goldene halbe Sonne mit Strahlen, "SUNNY NAILS & BEAUTY". Auf der Website ist es ein SVG-Nachbau.

## Wünsche der Inhaberin (aus der Sprachnachricht)
- Modern und sanft, Farben Beige, Braun, Weiß (passend zur Einrichtung). **Umgesetzt.**
- Online-Buchung mit Live-Kalender, auch sonntags buchbar, Erinnerungen, 50 % Anzahlung ab 200 € oder ab 2 Stunden,
  bei Absage unter 24 Stunden wird die Anzahlung einbehalten. **Maske gebaut, Backend fehlt noch.**
- Domain und Hosting fehlen noch. Die Inhaberin ist für Rückfragen jederzeit telefonisch erreichbar.

## Was der Kunde zur Gestaltung gesagt hat (nicht wieder ändern)
- Kein "KI-Look": keine Farbwolken, kein Neon, keine Unschärfe-Effekte als Hauptmotiv, kein goldenes Kursiv-Wort in der Überschrift.
- Am PC gefällt das helle, foto-getriebene Layout. Auf dem Handy: Foto niedrig halten, damit man Text sieht; Galerie und Bewertungen wischbar.
- Fotos nicht zuschneiden, sodass die Nägel abgeschnitten werden. Alle Logos auf den Fotos sollen gleich (golden) aussehen.

## Aufbau (Stand 29.10.2026): zwei Pakete
- `index.html` (Root): Paketvergleich mit Links zu beiden Vorschauen (noindex).
- `starter/`: Starter-Paket (179 €), bewusst einfach: eine Seite, Systemschrift, Rückruf-Buttons, 4 Fotos, keine Buchung, keine Bewertungen. Gelbe Demo-Leiste und der gestrichelte Kasten "Das fehlt im Starter-Paket" sind Verkaufshilfen, beim echten Starter entfernen.
- `business/`: Business-Paket (349 €), 8 Seiten (Start, 5 Leistungen, Galerie, Termin & Kontakt) plus Impressum, Datenschutz, AGB. Mit Animationen, Buchungsmaske, JSON-LD (NailSalon, FAQ, Breadcrumb), Open Graph, `sitemap.xml`, `robots.txt` im Root.
- Die Business-Seiten werden mit einem Skript erzeugt (nicht im Repo). Leistungstexte sind Entwürfe, nur Fakten von der alten Seite, vom Studio bestätigen lassen. Für Pediküre, Wimpern und Headspa fehlen eigene Fotos (Platzhalter mit Sonnen-Logo).
- Domain `sunny-mails-beauty.web.app` steht in canonical, og:url, sitemap und robots: bei Domainwechsel ersetzen.
- Firebase Hosting: Projekt `sunny-mails-beauty`, `firebase.json` im Root.

## Dateien (Stand vor der Aufteilung, jetzt unter `business/`)
- `index.html`: Startseite (Hero, Leistungen, Galerie, Headspa, Bewertungen, Buchung, Besuch)
- `assets/style.css`: Gestaltung inkl. Handy-Teil und Buchungs-Widget. Farben als Variablen oben (`--paper`, `--blush`, `--sand`, `--ink`, `--gold`).
- `assets/business.js` und `assets/business.css`: Menü, Animationen, Galerie mit Vollbild, Öffnungszeiten, Karte nach Klick (ersetzen `app.js`)
- `assets/booking.js`, `assets/booking-config.js`: Buchungsmaske. In der Config stehen Leistungen, Dauer, Preise, Öffnungszeiten, Anzahlungsregel, `api` (leer = Anfrage per WhatsApp).
- `agb.html` (Buchungs- und Stornobedingungen), `datenschutz.html`, `impressum.html`
- `img/`: 10 Fotos (nur Fotos mit Sunny-Logo, aus Google-Screenshots ausgeschnitten). `assets/fonts/`: DM Serif Display und Jost, lokal.
- `BUCHUNG-SETUP.md`: Wie das Buchungssystem angeschlossen wird, Domain, Hosting.

## Datenschutz und Recht: Stand
- Keine Cookies, kein Tracking, Schriften lokal. Google Maps lädt erst nach Klick. WhatsApp und Instagram sind einfache Links.
- Bewertungen: nur gekürzte Auszüge mit Vorname und Initial, ohne Profilbild und ohne Kundenfotos.
- Entfernt: 5 Fotos von Kundinnen (Urheber- und Persönlichkeitsrechte) und das Foto der Ladenfront.
- **Offen (rosa markiert in den Rechtsseiten):** Name der Inhaberin, E-Mail, Rechtsform, USt-ID, Kammer, Hoster, Speicherdauer der Logs,
  Buchungssystem und Zahlungsdienstleister, Widerrufsregel, Datum. Erlaubnis der genannten Bewerterinnen und Bildrechte bestätigen.
- Die Ausfallentschädigung (50 % einbehalten) rechtlich prüfen lassen (§ 309 Nr. 5 BGB: Nachweis geringeren Schadens muss möglich sein).
- Die Rechtstexte sind Entwürfe, keine Rechtsberatung.

## Buchungssystem: Entscheidung steht aus
Empfehlung: ein fertiges System einbinden statt selbst bauen. Kandidaten (Funktionen noch nicht belegt, beim Anbieter klären):
Fresha (Vorauszahlung mit Kartenhinterlegung, Zahlungsgebühren prüfen), Booksy, Salonized (EU, Widget, SMS kosten extra), Koalendar, SumUp Bookings.
Fragen an jeden Anbieter: 1) Anzahlung nur für bestimmte Leistungen? 2) Einbehalt bei Absage unter 24 Stunden, Erstattung sonst?
3) Gesamtkosten (Monat, pro Zahlung, Erinnerungen)? 4) Auftragsverarbeitungsvertrag und Serverstandort? 5) Buchung sonntags möglich?
Danach: Link oder Widget-Code in `booking-config.js` bzw. in `index.html` einbauen, Anbieter in `datenschutz.html` und `agb.html` eintragen.

## Offene Aufgaben (Reihenfolge)
1. Buchungssystem wählen und anschließen.
2. Leistungen, Dauer und Preise vom Studio holen und in `booking-config.js` eintragen (aktuell Platzhalter-Dauern, keine Preise).
3. Domain registrieren, Hoster mit HTTPS wählen, Seite hochladen.
4. Rosa Stellen in den Rechtsseiten ausfüllen, rechtliche Prüfung.
5. Originalfotos ohne Logo vom Studio holen und überall dasselbe Logo setzen. Eigene Logo-Datei statt SVG-Nachbau einsetzen.
6. Echte Gesamtbewertung und eigene Fotos (Studio innen, Team) ergänzen, wenn vorhanden.

## Einstiegs-Prompt für den neuen Chat
"Lies STAND.md und BUCHUNG-SETUP.md im Repo infomalutiwa/Sunny-Mails-Beauty (Branch ccr-2ec575da-frrsfm) und mach bei den offenen Aufgaben weiter."
