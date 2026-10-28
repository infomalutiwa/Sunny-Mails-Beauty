# Buchung, Domain und Hosting: was noch fehlt

Stand: Die Website zeigt eine Buchungsmaske (Leistung, Tag, Uhrzeit, Anzahlungs-Hinweis, Bedingungen).
Ohne Backend schickt sie den Wunschtermin per WhatsApp. Ein Live-Kalender, Zahlung und automatische
Erinnerungen brauchen ein Buchungssystem mit Konto. Das lässt sich nur mit euren Zugangsdaten einrichten.

## 1. Buchungssystem wählen
Es muss alles können, was die Inhaberin verlangt:
- Live-Kalender mit freien Zeiten, auch sonntags online buchbar
- Anzahlung 50 % ab 200 € oder ab 2 Stunden (Regel nach Preis oder Dauer)
- automatische Erinnerungen vor dem Termin
- Absage bis 24 Stunden vorher, danach Anzahlung einbehalten
- Auftragsverarbeitungsvertrag und Datenverarbeitung in der EU

Kandidaten zum Prüfen (Funktionen bei jedem Anbieter einzeln bestätigen lassen): Booksy, Koalendar, Anolla, SumUp Bookings.
Alternative: eigenes Backend mit Stripe (Anzahlung, Checkout) plus Erinnerungen über E-Mail/SMS. Das ist mehr Arbeit.

## 2. Anschluss an die Website
- `assets/booking-config.js`: Leistungen, Dauer, Preise, Öffnungszeiten, Anzahlungsregel eintragen.
- Gibt das System eine Embed- oder API-Adresse, trägt man sie bei `api` ein. Die Website erwartet dann:
  - `GET {api}/availability?date=YYYY-MM-DD&minutes=N&service=ID` → `{ "slots": ["09:00","09:30"] }`
  - `POST {api}/bookings` mit Name, Telefon, E-Mail, Termin → `{ "checkoutUrl": "…" }` (für die Anzahlung)
- Alternativ das Buchungs-Widget des Anbieters statt der eigenen Maske einbetten, dann `booking.js` entfernen.

## 3. Domain und Hosting
- Domain registrieren (z. B. `sunny-nails-vs.de`) bei einem EU-Anbieter. Das geht nur mit Zahlung und Inhaberdaten.
- Webspace mit HTTPS (Let's Encrypt) und Auftragsverarbeitungsvertrag. Die Seite ist statisch, jeder einfache Hoster reicht.
- Danach Hoster in der Datenschutzerklärung eintragen.

## 4. Vor dem Livegang
- Rosa Stellen in `impressum.html`, `datenschutz.html`, `agb.html` ausfüllen.
- Dauer und Preise der Leistungen vom Studio bestätigen lassen.
- Rechtliche Prüfung der Anzahlungs- und Stornoklausel (§ 309 Nr. 5 BGB: Nachweis geringeren Schadens muss möglich bleiben).
