# Milestone 2: Authentifizierung und erweiterte Endpoints

## Inhaltsverzeichnis
- [Übersicht](#übersicht)
- [Funktionale Anforderungen](#funktionale-anforderungen)
  - [Authentifizierung](#authentifizierung)
  - [User-Management](#user-management)
  - [Studiengang-Endpoint](#studiengang-endpoint-degreecourse)
- [Allgemeine Anforderungen](#allgemeine-anforderungen)
- [Tests](#tests-zur-prüfung-der-funktionen-endpoints)

## Übersicht

Grundlage für die Umsetzung und Benotung dieses Meilensteins sind die "Allgemeinen Regelungen für Übungsaufgaben" sowie die Aufgabenstellung für Übung 1. Die Vorgaben für Meilenstein 1 gelten auch für diesen Meilenstein - der Endpoint "/publicUsers" muss weiterhin funktionieren.

## Funktionale Anforderungen

Implementieren Sie die Endpoints für die Authentifizierung, für User und Studiengänge entsprechend der Aufgabenstellung.

### Authentifizierung

Der Endpoint unter der URL "/api/authenticate" soll die Authentifizierung per Basic-Authentication umsetzen.

```http
GET http://localhost/api/authenticate
Authorization: Basic YWRtaW46MTIz
```

#### Server-Start
Beim Hochfahren des Servers sollte automatisch ein Standardadministrator angelegt werden (User-ID "admin", Passwort "123"), falls dieser noch nicht existiert.

#### Erfolgreiche Authentifizierung
Bei erfolgreicher Authentifizierung soll der JWT-Token im Authorization-Header zurückgegeben werden.

Im Payload des Tokens sollten mindestens folgende Informationen enthalten sein:
- User-ID
- Administrator-Status
- Vor- und Nachname (optional)

#### Fehlgeschlagene Authentifizierung
Bei fehlgeschlagener Authentifizierung soll eine entsprechende Fehlermeldung mit dem passenden HTTP-Status-Code (401) zurückgegeben werden.

### User-Management

Setzen Sie den User-Endpoint unter der URL "/api/users" um. Im Gegensatz zum Public-User-Endpoint soll bei allen Anfragen über den Token im Header geprüft werden, ob der User sich korrekt authentifiziert hat.

#### Autorisierungsregeln
- Nur Administratoren dürfen vollen Zugriff auf die User-Daten haben
- Normale User dürfen nur ihre eigenen User-Daten abrufen
- User dürfen ihren eigenen Vor- und Nachnamen ändern, nicht jedoch die Eigenschaft "isAdministrator"
- Die User-ID darf nicht geändert werden

#### Datenschutz
Alle Routen des Users-Endpoints dürfen nur jene Daten vom User zurückgeben, die sicher übertragen werden können. Insbesondere muss das Passwort aus der Antwort entfernt werden.

#### Middleware
Die Prüfung, ob ein User eingeloggt und ein Administrator ist, sollte über eine Middleware-Funktion umgesetzt werden.

#### User-Suche
Zum Abrufen eines konkreten Users sollte eine einfache Suchfunktion implementiert werden:

```http
GET http://localhost/api/users/manfred
Authorization: {{adminToken}}
```

### Studiengang-Endpoint (DegreeCourse)

Setzen Sie den Studiengang-Endpoint mit den CRUD-Methoden entsprechend den Best-Practices für REST-Services um. Die Resource-ID für diesen Endpoint ist "degreeCourses".

```http
# Auflisten aller Studiengänge
GET http://localhost/api/degreeCourses
Authorization: {{adminToken}}
```

#### Suchen nach Hochschule
Zusätzlich zu den CRUD-Methoden soll der Studiengang-REST-Service eine Such-Route umsetzen, um alle Studiengänge einer Hochschule abzurufen:

```http
# Auflisten der Studiengänge einer bestimmten Hochschule
GET http://localhost/api/degreeCourses?universityShortName=Beuth HS
Authorization: {{adminToken}}
```

#### Berechtigungen
- Schreibende Zugriffe auf Studiengangdaten dürfen nur Administratoren nutzen
- Lesende Zugriffe dürfen alle authentifizierten User

## Allgemeine Anforderungen

Es gelten die gleichen allgemeinen Anforderungen, die bereits für den Meilenstein 1 aufgeführt wurden. 

Wichtig:
- Verwenden Sie für diesen Meilenstein noch HTTP und Port 80
- Stellen Sie sicher, dass alle Funktionen von Meilenstein 1 weiterhin korrekt funktionieren
- Beide Endpoints, "/users" und "/publicUsers", müssen auf dieselben Daten zugreifen

## Tests zur Prüfung der Funktionen/Endpoints

Im Moodle finden Sie eine Test-Datei, in der alle wesentlichen Anfragen aufgelistet sind, die Ihr REST-Server bei diesem Meilenstein erfüllen muss.