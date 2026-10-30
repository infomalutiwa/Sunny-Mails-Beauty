# Wohlfühlraum Sunny: Stand der Website

Zum Weitermachen in einem neuen Chat: diese Datei zuerst lesen.
Repo: `infomalutiwa/Sunny-Mails-Beauty`, Branch `ccr-2ec575da-frrsfm` (Stand 30.10.2026). Kein Pull Request angelegt.
Vorschau (Firebase Hosting, Projekt `sunny-mails-beauty`): https://sunny-mails-beauty.web.app/

## Das Studio (aus den Instagram-Screenshots der Inhaberin)
- Wohlfühlraum Sunny, "Dein Ort zum Aufblühen", Kosmetik · Nails · Fußpflege. Neueröffnung 01.11.2025.
- Müßmattstraße 22, 79618 Rheinfelden (Baden). Telefon/WhatsApp 0173 3098632. Instagram @wohlfuehlraum_sunny.
- Zeiten: Mo 8–13, Di und Do 8–13 und 15–20, Mi geschlossen, Fr 10–16, Sa nach Vereinbarung, So geschlossen.
- Preise (aus den Preislisten): Maniküre 35–60 €, Zusätze +5 €, Schmucknagel 3 €. Pediküre 43–48 €, Wohlfühlbehandlung 69 €.
  Augenbrauen 15–59 €, Wimpern 15 und 69 €, Kombi 35 und 119 €. Kosmetik: keine Preisliste vorhanden, "auf Anfrage".
- Marke: dunkles Braun, Gold, Creme, Serifenschrift. Logo in der Seite: Wortmarke als Text plus "W"-Monogramm (Platzhalter). Echte Logo-Datei (SVG/PNG) einsetzen, sobald vorhanden.

## Aufbau: zwei Pakete
- `index.html` (Root): Paketvergleich (Starter 179 €, Business 349 €, 30 % Neukundenrabatt bis 15.11.2026, Abo 19 €/Monat, keine MwSt.), noindex.
- `starter/`: bewusst einfacher One-Pager. Gelbe Demo-Leiste und der gestrichelte Kasten "Das fehlt im Starter-Paket" sind Verkaufshilfen, beim echten Starter entfernen.
- `business/`: 8 Seiten (Start, Kosmetik, Nägel, Fußpflege, Brauen & Wimpern, Preise, Galerie, Termin & Kontakt) plus Impressum, Datenschutz. Animationen, Vorher-Nachher, Terminanfrage, JSON-LD (BeautySalon, FAQ, Breadcrumb), Open Graph, `sitemap.xml`/`robots.txt` im Root.
- Business-Seiten werden mit einem Skript erzeugt (liegt nicht im Repo). Änderungen daher direkt in den HTML-Dateien machen oder das Skript neu schreiben.
- `assets/`: `style.css`, `business.css`, `business.js`, `booking.js`, `booking-config.js` (Leistungen, Preise, Zeiten; Dauer sind Schätzwerte). `img/`: 9 Fotos aus den Screenshots, zugeschnitten und farblich angeglichen.
- Domain `sunny-mails-beauty.web.app` steht in canonical, og:url, sitemap, robots: bei Domainwechsel ersetzen.

## Offen
1. Fotorechte klären: Gesichtsfotos (Vorher-Nachher) brauchen Einwilligung der Kundinnen. Nägel- und Fußfotos wirken wie Fremdbilder, eigene einsetzen.
2. Echtes Logo, eigenes Foto für Augenbrauen & Wimpern (aktuell Platzhalter), Kosmetik-Leistungen und Preise ergänzen.
3. Dauer der Leistungen in `booking-config.js` bestätigen. Anzahlung/Storno-Regeln gibt es für dieses Studio nicht, `deposit:null`.
4. Buchungssystem wählen (Live-Kalender), Domain registrieren, Hoster in Datenschutz eintragen.
5. Rosa Stellen in Impressum und Datenschutz ausfüllen (Name Inhaberin, E-Mail, Rechtsform, Steuer-ID usw.), rechtlich prüfen.
6. Rheinfelden-Postleitzahl 79618 gegenprüfen.
