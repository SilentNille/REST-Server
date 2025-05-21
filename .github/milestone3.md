# Milestone 3: Finale Abgabe

## Übersicht
Diese finale Abgabe umfasst alle Anforderungen der Übung 1 (Meilensteine 1–3). Insbesondere wird der neue Endpoint für Studienbewerbungen (`degreeCourseApplications`) implementiert, und der Server stellt nun auf HTTPS (Port 443) um. Die automatisierten Tests für Meilenstein 3 finden Sie in `tests/test3.http`.

## Funktionale Anforderungen
### Ressourcen-Endpoint: `/api/degreeCourseApplications`
- **Resource ID**: `degreeCourseApplications`
- **Server**: HTTPS, Standard-Port 443
- **Tests**: `tests/test3.http`

#### 1. Anwendung anlegen (User)
```http
POST https://localhost/api/degreeCourseApplications
Authorization: Bearer <userToken>
Content-Type: application/json

{
  "degreeCourseID": "<id>",
  "targetPeriodYear": 2024,
  "targetPeriodShortName": "WiSe"
}
```

#### 2. Eigene Bewerbungen abrufen (User)
```http
GET https://localhost/api/degreeCourseApplications/myApplications
Authorization: Bearer <userToken>
```

#### 3. Bewerbungen nach Nutzer filtern (Admin)
```http
GET https://localhost/api/degreeCourseApplications?applicantUserID=<userID>
Authorization: Bearer <adminToken>
```

#### 4. Bewerbungen nach Studiengang filtern (Admin)
```http
GET https://localhost/api/degreeCourseApplications?degreeCourseID=<degreeCourseID>
Authorization: Bearer <adminToken>
```

#### 5. Geschachtelte Suche über DegreeCourse
```http
GET https://localhost/api/degreeCourses/<degreeCourseID>/degreeCourseApplications
Authorization: Bearer <adminToken>
```
- **HTTPS**: Server mit selbstsigniertem Zertifikat auf Port 443
- **Abwärtskompatibilität**: Endpoints aus Meilenstein 1 (`/publicUsers`) und 2 (`/api/users`, `/api/authenticate`, `/api/degreeCourses`) müssen unverändert weiter funktionieren.
- **Konfiguration**: Environment-Variablen für Zertifikatpfad und Schlüssel, keine hardcodierten Pfade.

## Zusatzleistungen (Bonus)
Optional können Sie zusätzliche Features implementieren und dokumentieren:
- Bewerbungsstatus mit Benachrichtigungen
- Registrierung mit E-Mail-Aktivierung
- Datenvalidierung (z. B. mit Joi oder class-validator)
- Automatisierte Tests (Jest, Mocha, etc.)
- CI-Pipeline (GitHub Actions, GitLab CI)
- Profilbild-Upload und -Download
- Weitere passende Entitäten

> Bitte dokumentieren Sie alle zusätzlichen Features in einer separaten Datei mit Titelseite und Screenshots. Für Bonuspunkte ist eine persönliche Abnahme erforderlich.