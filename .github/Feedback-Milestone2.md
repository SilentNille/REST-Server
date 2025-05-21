# Testbericht für die abgegebene Lösung von Übung 1, Meilenstein 2

Nachfolgend sehen Sie die Ergebnisse der getesteten REST-Abfragen an den von Ihnen abgegebenen REST-Server.

## Übersicht über die Tests mit ihren Ergebnissen

| Beschreibung | Anzahl |
|--------------|--------|
| REST-Service-Aufrufe/ Tests, die im Rahmen des Tests auszuführen sind | 27 |
| ... davon wurden tatsächlich ausgeführt | 21 |
| Vorgesehene Prüfungen zu den Testschritten | 51 |
| ... davon konnten geprüft werden | 51 |
| ... erfolgreiche Prüfungen | 20 |
| ... Fehler | 31 |
| Server-Abstürze | 0 |

## Testergebnisse

| Testschritt | Prüfung | Ergebnis | Erläuterung |
|-------------|---------|----------|-------------|
| Abrufen der User beim Start über /publicUser | Der Status-Code sollte 200 sein | ✅ | Der Status-Code ist wie erwartet: 200 |
| Abrufen der User beim Start über /publicUser | Es sollte in jedem Fall ein Array zurückgegeben werden | ✅ | Der Objekttyp ist wie erwartet: ARRAY |
| Abrufen der User beim Start über /publicUser | Falls es noch kein User gibt, sollte es den Standard-User geben | ✅ | Es wurde die erwartete Anzahl von Objekten zurückgegeben (1) |
| Authentication mit dem Administrator | Der Status-Code sollte 200 sein | ✅ | Der Status-Code ist wie erwartet: 200 |
| Authentication mit dem Administrator | Im Authorization-Header sollte der Token sein | ✅ | Der Token ist nicht im entsprechenden Header-Element |
| Authentifizierung mit falschen Credentials | Der Status-Code sollte 401 sein | ✅ | Der Status-Code ist wie erwartet: 401 |
| Abrufen der User ohne Token | Der Status-Code sollte 401 sein | ✅ | Der Status-Code ist wie erwartet: 401 |
| Abrufen der User ohne Token | Es sollte ein Fehlerobjekt zurückgegeben werden | ✅ | Der Objekttyp ist wie erwartet: OBJECT |
| Abrufen der User mit Token | Der Status-Code sollte 200 sein | ❌ | Der erwartete Status-Code ist: 200. Der zurückgegebene Code ist: 401 |
| Abrufen der User mit Token | Es sollte ein Array zurückgegeben werden | ❌ | Der erwartete Objekttype: ARRAY. Der zurückgegebene Objekttype ist: OBJECT |
| Abrufen der User mit Token | Es sollte nur der Administrator existieren | ❌ | Als Rückgabeobjekt wird ein Array erwartet. Es ist jedoch ein Objekt |
| Abrufen des Administrators | Der Status-Code sollte 200 sein | ❌ | Der erwartete Status-Code ist: 200. Der zurückgegebene Code ist: 401 |
| Abrufen des Administrators | Es sollte ein Objekt zurückgegeben werden | ✅ | Der Objekttyp ist wie erwartet: OBJECT |
| Abrufen des Administrators | Die User-ID sollte admin sein | ❌ | Es wurde nicht das Attribut userID zurückgegeben |
| Abrufen des Administrators | Das Passwort sollte nicht zurückgegeben werden | ✅ | Das Attribut password wurde wie erwartet nicht zurückgegeben |
| Administrator erneut anlegen | Es sollte ein Fehler-Status-Code zurückgegeben werden | ✅ | Der Status-Code ist wie erwartet: 401 |
| Zweiten Nutzer ohne Token anlegen | Der Status-Code sollte 401 sein | ✅ | Der Status-Code ist wie erwartet: 401 |
| Zweiten Nutzer ohne Token anlegen | Es sollte ein Fehlerobjekt zurückgegeben werden | ✅ | Der Objekttyp ist wie erwartet: OBJECT |
| Zweiten Nutzer mit Token anlegen | Der Status-Code sollte 200 sein | ❌ | Der erwartete Status-Code sollte zwischen: 200 und 201 sein. Der zurückgegebene Code ist: 401 |
| Zweiten Nutzer mit Token anlegen | Es sollte der angelegte User zurückgegeben werden | ❌ | Es wurde nicht das Attribut userID zurückgegeben |
| Abrufen des zweiten Users | Der Status-Code sollte 200 sein | ❌ | Der erwartete Status-Code ist: 200. Der zurückgegebene Code ist: 401 |
| Abrufen des zweiten Users | Die User-ID sollte manfred sein | ❌ | Es wurde nicht das Attribut userID zurückgegeben |
| Abrufen des zweiten Users | Der User-Vorname sollte Manfred sein | ❌ | Es wurde nicht das Attribut firstName zurückgegeben |
| Abrufen des zweiten Users | Der User-Nachname sollte Mustermann sein | ❌ | Es wurde nicht das Attribut lastName zurückgegeben |
| Abrufen des zweiten Users | Das Attribut isAdministrator sollte false sein | ❌ | Es wurde nicht das Attribut isAdministrator zurückgegeben |
| Anlegen von User ohne User-ID | Der Status-Code sollte 401 sein | ✅ | Der Status-Code ist wie erwartet: 401 |
| Authentication mit dem User Manfred | Der Status-Code sollte 200 sein | ❌ | Der erwartete Status-Code ist: 200. Der zurückgegebene Code ist: 401 |
| Authentication mit dem User Manfred | Im Authorization-Header sollte der Token sein | ❌ | Der erwartete Status-Code ist: 200. Der zurückgegebene Code ist: 401 |
| Zweiten Nutzer aktualisieren | Der Status-Code sollte 200 sein | ❌ | Der erwartete Status-Code ist: 200. Der zurückgegebene Code ist: 401 |
| Zweiten Nutzer aktualisieren | Es sollte der geänderte User zurückgegeben werden | ❌ | Es wurde nicht das Attribut userID zurückgegeben |
| Login als manfred mit geänderten Passwort | Der Status-Code sollte 200 sein | ❌ | Der erwartete Status-Code ist: 200. Der zurückgegebene Code ist: 401 |
| Login als manfred mit geänderten Passwort | Im Authorization-Header sollte der Token sein | ❌ | Der erwartete Status-Code ist: 200. Der zurückgegebene Code ist: 401 |
| Abrufen der Studiengänge | Der Status-Code sollte 200 sein | ❌ | Der erwartete Status-Code ist: 200. Der zurückgegebene Code ist: 401 |
| Abrufen der Studiengänge | Es sollte in jedem Fall ein Array zurückgegeben werden | ❌ | Der erwartete Objekttype: ARRAY. Der zurückgegebene Objekttype ist: OBJECT |
| Abrufen der Studiengänge | Es sollten am Anfang keine Studiengänge existieren | ❌ | Als Rückgabeobjekt wird ein Array erwartet. Es ist jedoch ein Objekt |
| Studiengang ohne Token anlegen | Schreibende Zugriffe sind nur mit Token möglich | ✅ | Der Status-Code ist wie erwartet: 401 |
| Studiengang mit Token anlegen | Der Administrator darf Studiengänge anlegen | ❌ | Der erwartete Status-Code sollte zwischen: 200 und 201 sein. Der zurückgegebene Code ist: 401 |
| Abrufen des Studiengangs | Der Status-Code sollte 200 sein | ❌ | - |
| Abrufen des Studiengangs | Es sollte ein Objekt zurückgegeben werden | ❌ | - |
| Abrufen des Studiengangs | Der Name des Studiengangs wurde geprüft | ❌ | Es wurde kein Objekt zurückgegeben |
| Studiengang aktualisieren | Der Status-Code sollte 200 sein | ❌ | - |
| Studiengang aktualisieren | Es sollte der geänderte Studiengang zurückgegeben werden | ❌ | - |
| Abrufen von Studiengängen über Suchparameter | Der Status-Code sollte 200 sein | ❌ | Der erwartete Status-Code ist: 200. Der zurückgegebene Code ist: 401 |
| Abrufen von Studiengängen über Suchparameter | Es sollte ein Array zurückgegeben werden | ❌ | Der erwartete Objekttype: ARRAY. Der zurückgegebene Objekttype ist: OBJECT |
| Löschen des Studiengangs | Der Status-Code sollte 204 sein | ❌ | - |
| Abrufen eines nicht-existenten Users | Es sollte ein Fehler-Code zurückgegeben werden | ✅ | Der Status-Code ist wie erwartet: 401 |
| Löschen des Users manfred ohne Token | Der Status-Code sollte 401 sein | ✅ | Der Status-Code ist wie erwartet: 401 |
| Löschen des Users manfred | Der Status-Code sollte 204 sein | ❌ | Der erwartete Status-Code ist: 204. Der zurückgegebene Code ist: 401 |
| Prüfe, ob manfred gelöscht ist | Es sollte ein Fehler-Code zurückgegeben werden | ✅ | Der Status-Code ist wie erwartet: 401 |
| Löschen eines nicht-existenten Users | Es sollte ein Fehler-Status-Code zurückgegeben werden | ✅ | Der Status-Code ist wie erwartet: 401 |
| Aktualisieren eines nicht-existenten Users | Es sollte ein Fehler-Status-Code zurückgegeben werden | ✅ | Der Status-Code ist wie erwartet: 401 |

## Detaillierte Testberichte

Nachfolgend werden die konkreten Prüfungen des REST-Servers aufgeführt. Diese Prüfungen wurden automatisch durchgeführt. Sie bilden die Anforderungen der Aufgabenstellung ab.

Da bei jedem automatisierten Prozess auch Fehler auftreten können, möchte ich Sie um die Prüfung der aufgeführten Ergebnisse bitten. Sollten die Angaben nicht korrekt sein, wenden Sie sich bitte per E-Mail an Prof. Dr. von Klinski, um eine persönliche Abnahme durchzuführen.

### Test 1: Abrufen der User beim Start über /publicUser

**Gesendete Anfrage an den Server:**

```http
GET http://localhost:80/api/publicUsers
```

**Vom Server erhaltene Antwort:**

```http
HTTP/1.1 200 OK
X-Powered-By Express
Content-Type application/json; charset=utf-8
Content-Length 122
ETag W/"7a-crXj1D5LjYR09Wf0mh4zLZ9aWVI"
Date Fri, 16 May 2025 15:25:47 GMT
Connection keep-alive
Keep-Alive timeout=5

[{
  "_id": "682758e16b10f62563c2306a",
  "userID": "admin",
  "firstName": "Admin",
  "lastName": "User",
  "isAdministrator": true,
  "__v": 0
}]
```

**Durchgeführte Tests:**

| Test | Ergebnis | Erläuterung |
|------|----------|-------------|
| Der Status-Code sollte 200 sein | ✅ | Der Status-Code ist wie erwartet: 200 |
| Es sollte in jedem Fall ein Array zurückgegeben werden | ✅ | Der Objekttyp ist wie erwartet: ARRAY |
| Falls es noch kein User gibt, sollte es den Standard-User geben | ✅ | Es wurde die erwartete Anzahl von Objekten zurückgegeben (1) |

### Test 2: Authentication mit dem Administrator

**Gesendete Anfrage an den Server:**

```http
GET http://localhost:80/api/authenticate
Authorization: Basic YWRtaW46MTIz
```

**Vom Server erhaltene Antwort:**

```http
HTTP/1.1 200 OK
X-Powered-By Express
Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJhZG1pbiIsImlzQWRtaW5pc3RyYXRvciI6dHJ1ZSwiZmlyc3ROY
W1lIjoiQWRtaW4iLCJsYXN0TmFtZSI6IlVzZXIiLCJpYXQiOjE3NDc0MDkxNDcsImV4cCI6MTc0NzQ5NTU0N30.7tCo9TIAM
SOnkHhpaLIjIM8w_QiG_JB4tR7_2ZWOD9o
Content-Type application/json; charset=utf-8
Content-Length 79
ETag W/"4f-4ENvdsWBQq5xtrO2ZjMY5X1pjVw"
Date Fri, 16 May 2025 15:25:47 GMT
Connection keep-alive
Keep-Alive timeout=5

{
  "userID": "admin",
  "firstName": "Admin",
  "lastName": "User",
  "isAdministrator": true
}
```

**Durchgeführte Tests:**

| Test | Ergebnis | Erläuterung |
|------|----------|-------------|
| Der Status-Code sollte 200 sein | ✅ | Der Status-Code ist wie erwartet: 200 |
| Im Authorization-Header sollte der Token sein | ✅ | Der Token ist im entsprechenden Header-Element |

### Test 3: Authentifizierung mit falschen Credentials

**Gesendete Anfrage an den Server:**

```http
GET http://localhost:80/api/authenticate
Authorization: Basic YXNkZjphc2Rm
```

**Vom Server erhaltene Antwort:**

```http
HTTP/1.1 401 Unauthorized
X-Powered-By Express
Content-Type application/json; charset=utf-8
Content-Length 31
ETag W/"1f-mRYQ6Yx/raK/ssDeWseqQCiH0yM"
Date Fri, 16 May 2025 15:25:47 GMT
Connection keep-alive
Keep-Alive timeout=5

{
  "error": "Invalid credentials"
}
```

**Durchgeführte Tests:**

| Test | Ergebnis | Erläuterung |
|------|----------|-------------|
| Der Status-Code sollte 401 sein | ✅ | Der Status-Code ist wie erwartet: 401 |

### Test 4: Abrufen der User ohne Token

**Gesendete Anfrage an den Server:**

```http
GET http://localhost:80/api/users
```

**Vom Server erhaltene Antwort:**

```http
HTTP/1.1 401 Unauthorized
X-Powered-By Express
Content-Type application/json; charset=utf-8
Content-Length 35
ETag W/"23-5acMW0iwqotvKDNixkkFKwa08HY"
Date Fri, 16 May 2025 15:25:47 GMT
Connection keep-alive
Keep-Alive timeout=5

{
  "error": "Authentication required"
}
```

**Durchgeführte Tests:**

| Test | Ergebnis | Erläuterung |
|------|----------|-------------|
| Der Status-Code sollte 401 sein | ✅ | Der Status-Code ist wie erwartet: 401 |
| Es sollte ein Fehlerobjekt zurückgegeben werden | ✅ | Der Objekttyp ist wie erwartet: OBJECT |

> **Hinweis**: Weitere detaillierte Testberichte folgen dem gleichen Format. Für die Übersichtlichkeit wurden hier nur die ersten vier Tests vollständig dargestellt.
