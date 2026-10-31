# Wohlfühlraum Sunny: Stand der Website

Zum Weitermachen in einem neuen Chat: diese Datei zuerst lesen.
Repo: `infomalutiwa/Sunny-Mails-Beauty`, Branch `ccr-2ec575da-frrsfm` (Stand 31.10.2026). Kein Pull Request angelegt.
Vorschau (Firebase Hosting, Projekt `sunny-mails-beauty`): https://sunny-mails-beauty.web.app/

## Das Studio (aus den Instagram-Screenshots der Inhaberin)
- Wohlfühlraum Sunny, "Dein Ort zum Aufblühen", Kosmetik · Nails · Fußpflege. Neueröffnung 01.11.2025.
- Müßmattstraße 22, 79618 Rheinfelden (Baden). Telefon/WhatsApp 0173 3098632. Instagram @wohlfuehlraum_sunny.
- Zeiten: Mo 8–13, Di und Do 8–13 und 15–20, Mi geschlossen, Fr 10–16, Sa nach Vereinbarung, So geschlossen.
- Preise (aus den Preislisten): Maniküre 35–60 €, Zusätze +5 €, Schmucknagel 3 €. Pediküre 43–48 €, Wohlfühlbehandlung 69 €.
  Augenbrauen 15–59 €, Wimpern 15 und 69 €, Kombi 35 und 119 €. Kosmetik: keine Preisliste vorhanden, "auf Anfrage".
- Design (31.10.): Vollbild-Wellness-Hero (`img/hero.jpg`), Champagner-Gold (Verlauf, dunkle Schrift auf Gold-Buttons), kräftige Serife mit kursiven Akzenten, Leistungen als versetzte Bogen-Bilder, Marmor nur noch weich ausgeblendet im Studio-Bereich und CTA-Band, ruhige helle Fußzeile.
- Marke: Braun, Gold, Creme, Serifenschrift. Logo in der Seite: Wortmarke als Text plus "W"-Monogramm (Platzhalter). Echte Logo-Datei (SVG/PNG) einsetzen, sobald vorhanden.

## Aufbau
- `index.html` (Root) leitet auf `business/` weiter, das ist die Website. Paketvergleich und Starter-Seite wurden entfernt.
- `business/`: 8 Seiten (Start, Kosmetik, Nägel, Fußpflege, Brauen & Wimpern, Preise, Galerie, Termin & Kontakt) plus Impressum, Datenschutz. Animationen, Vorher-Nachher, Terminbuchung, JSON-LD (BeautySalon, FAQ, Breadcrumb), Open Graph, `sitemap.xml`/`robots.txt` im Root.
- Business-Seiten werden mit einem Skript erzeugt (liegt nicht im Repo). Änderungen daher direkt in den HTML-Dateien machen oder das Skript neu schreiben.
- `assets/`: `style.css`, `business.css`, `business.js`, `booking.js`, `booking-config.js` (Leistungen, Preise, Zeiten; Dauer sind Schätzwerte). `img/`: Stimmungsbilder von Unsplash (kostenlos, auch gewerblich, ohne Namensnennung; Unsplash-Lizenz): spa-kerzen, spa-handtuecher, empfang, kosmetik, naegel, naegel-2, fussmassage, wimpern, creme, marmor. Vorher-Nachher (`haut-1..3`) sind echte Studiofotos. Die alten Studiofotos wurden auf Wunsch der Inhaberin entfernt. Später gern durch eigene, professionelle Fotos ersetzen.
- Domain `sunny-mails-beauty.web.app` steht in canonical, og:url, sitemap, robots: bei Domainwechsel ersetzen.

## Terminbuchung (Direktbuchung)
- `termin.html` + `assets/booking.js`: mehrere Leistungen wählbar, nur freie Zeiten in den Öffnungszeiten (`booking-config.js`), sofort gebucht, Kalenderdatei für die Kundin.
- Firestore: `termine/` (Kundendaten, nur Studio lesbar), `slots/{datum}_{minute}` (15-Min.-Blöcke, öffentlich lesbar, ohne Namen). Ein Block kann nur einmal angelegt werden, Doppelbuchungen sind per Regel ausgeschlossen. 12 Regeltests im Emulator bestanden.
- Studio: `/mail` zeigt „Termine“ live, Benachrichtigung im Browser (solange die Seite offen ist, auch als App auf dem Homescreen), stornieren, „Zeit blockieren“ (Urlaub, telefonische Termine).
- Push bei geschlossener Seite: kostenlose App ntfy, Adresse in `booking-config.js` bei `notify` eintragen. Echte Push/E-Mail-Bestätigung bräuchte Cloud Functions (Blaze-Tarif).
- **Firestore-Regeln müssen deployt werden** (`firebase deploy --only firestore`), sonst schlägt die Buchung fehl.

## Offen
1. Fotorechte klären: Gesichtsfotos (Vorher-Nachher) brauchen Einwilligung der Kundinnen. Nägel- und Fußfotos wirken wie Fremdbilder, eigene einsetzen.
2. Echtes Logo, eigenes Foto für Augenbrauen & Wimpern (aktuell Platzhalter), Kosmetik-Leistungen und Preise ergänzen.
3. Dauer der Leistungen in `booking-config.js` bestätigen. Anzahlung/Storno-Regeln gibt es für dieses Studio nicht, `deposit:null`.
4. Buchungssystem wählen (Live-Kalender), Domain registrieren, Hoster in Datenschutz eintragen.
5. Rosa Stellen in Impressum und Datenschutz ausfüllen (Name Inhaberin, E-Mail, Rechtsform, Steuer-ID usw.), rechtlich prüfen.
6. Rheinfelden-Postleitzahl 79618 gegenprüfen.
