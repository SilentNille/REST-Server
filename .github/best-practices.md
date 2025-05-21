Web-Engineering II
Prof. Dr. Sebastian von Klinski
REST-Services: Best Practices
• REST-Services sollen flexibel durch unterschiedliches Clients genutzt
werden
• Wesentliche Aspekte
• IT-Sicherheit
• Performante Ausführung
• Anfragen müssen schnell beantwortet werden
• Möglichst wenige Anfragen, um notwendige Daten zu bekommen
• Einfache Nutzung:
• Möglichst einheitliche Umsetzung à geringe Einarbeitung in Projekten
Zielsetzung
2
Grundlegender Aufbau: Request
Beuth Hochschule für Technik Berlin – University of Applied Sciences 3
HTTP-Methode
Body (JSON)
Header
Grundlegender Aufbau: Response
Beuth Hochschule für Technik Berlin – University of Applied Sciences 4
HTTP-Status
Body (JSON)
Header
• Message-Protokoll (XML, JSON, andere)
• Formatierung von Body
• Struktur des Requests
• HTTP-Methode: GET, POST, PUT, DELETE
• Struktur der URL
• Response
• HTTP-Status-Code
• Konsistente und aussagekräftige Status-Codes
• Body
• Enthält übertragene Daten
• Minimierung von Anfragen, indem möglich alle notwendige Daten
übertragen werden
• Umsetzung von Suchfunktionen
• Weiteres: Authentifizierung/ IT-Sicherheit/ Fehlermanagement
Relevante Aspekte bei Umsetzung
5
Message-Protokoll
Beuth Hochschule für Technik Berlin – University of Applied Sciences 6
• Message-Protokoll legt Format von Daten im Body fest
• Gängige Optionen: XML und JSON
Optionen: XML und JSON
7
POST /api/2.2/auth/signin HTTP/1.1
Content-Type:text/xml
<tsRequest>
<credentials name="administrator" password="passw0rd">
<site contentUrl="" />
</credentials>
</tsRequest>
POST /api/2.2/auth/signin HTTP/1.1
Content-Type:application/json
{
"credentials": {
"name": "administrator",
"password": "passw0rd",
"site": {
"contentUrl": ""
}
}
} XML-REST-Call
JSON-REST-Call
• XML
• Umfangreiche Möglichkeiten für Validieren (XSS)
• Sehr klare Struktur
• Erzeugen und Parsen in Java-Script aufwändig
• Sehr schnell sehr große Dokumente
• Insbesondere auf Client-Seite Erzeugen von XML und Manipulation
aufwändig
• JSON
• Im Vergleich zu XML knappe Syntax und deutlich kleinere Dokumente/
Nachrichten
• JavaScript:
• eingebaute Funktionen zum Lesen
• Erzeugen/ Marshalling und Un-Marshalling (JSON ó Objekt/ Array)
à In der Regel wird JSON als Message-Protokoll verwendet
Message-Protokoll
8
Message-Protokoll
9
POST /api/2.2/auth/signin HTTP/1.1
Content-Type:application/json
{
"name": "administrator",
"password": "passw0rd"
}
• Message-Protokoll wird im Header angegeben
• Message-Protokoll sollte bei Requests und Response festgelegt sein!
Requests
Beuth Hochschule für Technik Berlin – University of Applied Sciences 10
Beispiele für Requests
11
Auflisten aller User
Anlegen eines Users
Ändern eines Users
Löschen eines User
Wesentliche Aspekte: HTTP-Methode, URL und Body-Content
• GET
• Zum Abrufen von Ressourcen/ Daten
• Sollten nie Daten ändern
• Sollten nie Body übertragen
• POST
• Zum Anlegen von (neuen) Ressourcen/ Daten
• PUT
• Zum Ändern von existierenden Daten
• DELETE
• Zum Löschen von Daten
• Sollten nie Body übertragen
• PATCH
• Partielle Updates von Entitäten
HTTP-Methoden
12
• Die klassische Festlegungen für PUT und PATCH sind problematisch
• PUT für Anlegen oder vollständiges Ändern von Ressourcen
• PATCH für partielles Ändern von Ressourcen
• PUT zum Anlegen wäre nicht sinnvoll, weil dafür POST vorgesehen ist
• Ein partielles Aktualisieren kann auch mit PUT umgesetzt werden, indem nur
zu ändernde Attribute übertragen werden
• In Regel sind alle Update partielle Updates
• Bei Entitäten gibt es häufig Attribute, die durch den Server abgeleitet
werden (creatingUser, creationDate, status, etc.)
• Selbst bei einem PUT würde man diese nicht überschreiben
• Unter diesen Aspekten wäre gleichzeitige Umsetzung von PUT und PATCH
nicht sinnvoll, da weitgehend gleiche Umsetzung für 2 Endpoints
HTTP-Methoden: PUT versus PATCH
13
• PATCH wurde unter anderem eingeführt, um Bandbreite zu sparen
• Bandbreite ist heute kein Thema mehr
• Bei NoSQL-Datenbanken kann selektives leichter umgesetzt werden, weil es
direkt an ORD-Bridge übergeben werden kann
• Persönliche Empfehlung
• Bei einfachen Entitäten partielle und vollständige Updates mit PUT
umsetzen
• Wenn NoSQL-Datenbank im Backend und komplexe Updates von SubCollections notwendig, PATCH ergänzen
HTTP-Methoden: PUT versus PATCH
14
PATCH /products/234234
{ “stock: { “color": “red", "instock": “34" } }
• Bezeichnung und Struktur sollte systematisch sein
• Für das Verwalten von Daten (User, Artikel, Nachrichten, etc.) sollten
Substantive verwendet werden
• Es sollte der Plural verwendet werden
• Beispiele: „/users“, „/articles“, „/messages“
• Endpoints verwalten stets Sammlungen von Entitäten/ Ressourcen à
Plural verwenden
• Für gängie CRUD-Methoden sollten keine Verben benutzt werden
• Z.B. /getUser
• Stattdessen sollten HTTP-Methoden genutzt werden (z.B. GET)
• Für Operationen/ Berechnungen sollten Verben benutzt werden
• Beispiele: „/login“, „/logout“, „calculateTemperatur“, etc.
• Es sollte Camel-Case verwendet werden (z.B. „/calculateTemperatur“)
URL
15
• Body sollte nur bei POST und PUT übergeben werden
• Struktur bildet in der Regel Objekt ab (Attribute und Werte)
Body
16
• Gängige Request
• CRUD-Methoden (Create, Read, Update, Delet)
• Suchfunktionen
• Anwendungsprozess (z.B. Sende E-Mail an alle User)
• CRUD-Methoden
• Alle Entitäten abrufen (z.B. alle User)
• Eine Entität abrufen (z.B. speziellen User)
• Eine Entität anlegen (z.B. neuen User anglegen)
• Eine Entität ändern (z.B. beim User Passwort ändern)
• Eine Entität löschen (z.B. User löschen)
• Suchfunktionen
• In der Regel Abfragen mit gestaffelten Suchkriterien (z.B. Suche alle
User, die nicht aktiv sind)
Requests
17
• HTTP-Methode GET
• Header
• Content-Type sollte angeben, in welchem Format Ergebnis
zurückgegeben werden soll
• Authorization-Header für Requests, die Authentifizierung erfordern
• Beispiel für Umsetzung
CRUD Methoden: Auflisten von allen Objekten
18
app.get(‘/users', (req, res) => {
…
res.json(users);
});
• HTTP-Methode GET
• URL: Parameter für User-ID/
Unique-Identifier wird an URL
angehängt
• Header
• Content-Type sollte angeben, in welchem Format Ergebnis
zurückgegeben werden soll
• Authorization-Header für Requests, die Authentifizierung erfordern
• Beispiel für Umsetzung
CRUD Methoden: Abrufen von konkreten Objekt
19
app.get(‘/users/:userID', (req, res) => {
…
res.json(users);
});
• Beispiel 2: Es soll ein konkretes Forum abgerufen werden
• Struktur: An URL wird ID des Forums angehangen
CRUD Methoden: Abrufen von konkreten Objekt (2)
20
• Beispiel: Es soll das Forum mit der ID 619a5fb7b983591ed85a5799
abgerufen werden
router.get('/:forumID', function (req, res) {
const forumID = req.params.forumID;
…
res.status(200).send(forum);
});
• HTTP-Methode POST
• Header
• Content-Type von übergebenen Daten
im Body
• Authorization-Header für Requests, die
Authentifizierung erfordern
• Beispiel für Umsetzung
CRUD Methoden: Anlegen von Objekt
21
app.post(‘/users', (req, res) => {
…
res.json(createdUser);
});
• Nach dem Anlegen von Objekt sollte im Erfolgsfall das angelegte Objekt
zurückgegeben werden.
CRUD Methoden: Anlegen von Objekt: Response
22
• HTTP-Methode PUT
• URL: Parameter für User-ID/
Unique-Identifier wird an URL
angehängt
• Header
• Content-Type von übergebenen Daten im Body
• Authorization-Header für Requests, die Authentifizierung erfordern
• Beispiel für Umsetzung
CRUD Methoden: Ändern von Objekt
23
app.put(‘/users/:userID', (req, res) => {
const { userID } = req.params;
…
res.json(modifiedUser);
});
• Nach dem Ändern von Objekt sollte im Erfolgsfall das geänderte Objekt
zurückgegeben werden.
CRUD Methoden: Ändern von Objekt: Response
24
• HTTP-Methode DELETE
• URL: Parameter für User-ID/
Unique-Identifier wird an URL
angehängt
• Header
• Authorization-Header für Requests, die Authentifizierung erfordern
• Beispiel für Umsetzung
CRUD Methoden: Löschen von Objekt
25
app.delete(‘/users/:userID', (req, res) => {
const { userID } = req.params;
…
res.json(„Deleted User“);
});
• Nach dem Löschen von Objekt sollte im Erfolgsfall kein Body
zurückgegeben werden
CRUD Methoden: Löschen von Objekt: Response
26
• Authentifizierung per Basic Authentication sollte GET-Request sein, bei dem
Daten im Header übergeben werden
Basic Authentication
27
• Der erzeugte Token sollte im Header zurückgegeben werden
Response (Antworten)
Beuth Hochschule für Technik Berlin – University of Applied Sciences 28
• Die zurückgegebenen Antworten von REST-Server sollten ebenfalls so weit
wie möglich standardisiert sein
• Systeme, bzw. Anwendungen müssen Antworten verstehen
• Keine Freitext-Antworten schicken (z.B. „Hat nicht funktioniert“)
• Besser
• Standardisierte HTTP-Codes
• Standardisierte Nachrichten im Body im JSON-Format
Response/ Antworten
29
• Übersicht: https://de.wikipedia.org/wiki/HTTP-Statuscode#1xx_%E2%80%93_Informationen
• 1xx
• Informations-Codes
• Server meldet, dass Bearbeitung noch läuft
• 2xx
• Die Anfrage war erfolgreich, die Antwort kann verwertet werden.
• 3xx
• Um eine erfolgreiche Bearbeitung der Anfrage sicherzustellen, sind
weitere Schritte seitens des Clients erforderlich.
• 4xx
• Die Ursache des Scheiterns der Anfrage liegt (eher) im
Verantwortungsbereich des Clients
• 5xx
• Die Ursache des Scheiterns der Anfrage liegt jedoch eher im
Verantwortungsbereich des Servers.
HTTP-Status-Codes: Grundlegende Struktur
30
• 200 OK
• Die Operation wurde korrekt ausgeführt
• 201 Created
• Wenn durch die Operation eine Ressource angelegt wurde
• Z.B. beim Anlegen von Daten bei POST-Requests
• 202 Accepted
• Für asynchrone Anfragen
• 204
• Alles ok, aber kein Content
• z.B. bei Delete
2XX-Success-Codes
31
• 400 Bad Request
• Anfrage ist fehlerhaft
• 401 Unauthorized
• Client ist nicht berechtigt, die Aktion auszuführen (z.B. weil Client nicht
authentifiziert ist)
• 403 Forbidden
• Authentifzierter User hat keine Berechtigung, die Aktion auszuführen
• 404 Not Found
• Die Ressource gibt es nicht
• 415 Nicht unterstützter Medientyp
• Wenn der Medientyp (z.B. JSON oder XML) nicht untertützt wird
4XX-Error-Codes: Client-Fehler
32
• 500 Internal server error
• Generische Fehlermeldung des Servers
• 502 Bad Gateway
• Es gab einen Fehler von einem angegliederten Server
• 503 Service Unavailable
• Es gab einen unerwarteten Fehler auf dem Server wie zu lange
Antwortzeiten eines anderen Dienstes, fehlender Zugang zur Datenbank
etc.
5XX-Error-Codes: Server-Fehler
33
• Grundsätzlich unterschieden werden
• Einfache REST-Antworten (bare oder simple)
• Eingebettete REST-Antworten (wrapped)
• Einfache REST-Antworten
• Objekte als einfache JSON-Objekte oder
• Arrays von JSON-Objekten
• Üblicherweise empfohlen
• Wrapped REST-Antworten
• Es werden nachgeordnete Objekte und weiterführende Daten mitgeliefert
• Nachteil: engere Kopplung von Client und Server
• Vorteil: weniger Anfragen, dynamische Client-Steuerung
Body-Struktur: Web-Message-Body-Style
34
Einfaches JSON-Objekt
Web-Message-Body-Style Simple: Objekt
35
• Bei einfachen Antworten sollte direkt der Array zurückgegeben werden
Web-Message-Body-Style Simple: Array
36
• Antworten von REST-Server können umfangreich erweitert werden, um
weitergehende Funktionen zu ermöglichen und Performance zu optimieren
• Weitergehende Funktionen
• Detaillierte Fehlermeldungen
• Weitere Aktionen (siehe HATEOAS)
• Angaben zu Rechten (Schreiben, Löschen, etc.)
• Performance optimieren
• Nachgeordnete Daten mit einbinden (z.B. Forum-Thread mit Nachrichten)
Web-Message-Body-Style Wrapped
37
• Der Body-Message-Style sollte per Header übergeben werden, weil
ansonsten alle URLs gedoppelt werden müssten
• Beispiel
Web-Message-Body-Style
38
• Beispiel für erfolgreiche Antwort
Web-Message-Body-Style Wrapped
39
• Beispiel für Fehlerantwort
Web-Message-Body-Style Wrapped
40
• Üblicherweise wird empfohlen, einfache JSON-Objekte zurückzugeben
• Komplexe Antwortstruktur führt zu enger Kopplung zwischen Client und
Server
• Wechsel zwischen Services wäre schwieriger
• Aber…
• Wenn es viele kleine Entitäten gibt, kann Kommunikation sehr aufwändig
sein
• Normalisierung bei relationalen Daten ist meist nicht empfehlenswert!
• Vielen Anfragen mit kleinen Antworten brauchen viel Zeit
• Eine Anfrage mit viel Daten braucht wenig Zeit
• Messge-Body-Style ist daher ein Kompromiss zwischen Performance und
Kopplung!
Web-Message-Body-Style
41
Suchfunktionen
Beuth Hochschule für Technik Berlin – University of Applied Sciences 42
• Suche nach Daten sollte möglichst einfach gestaltet werden
• Gängige Anforderung
• Abrufen von Objekten, die einen bestimmten Wert haben
• Beispiel: Es sollen alle User abgerufen werden, die Administrator sind
• Abrufen von nachgeordneten Objekten
• Beispiel: Es sollen die Nachrichten in einem Forum abgerufen werden
• Pagination
• Es wird nur ein Teil alle Entitäten abgerufen
Suchfunktionen
43
• Beispiel: Es sollen die User abgerufen werden, die „manfred“ in der User-ID
haben und nicht Administrator sind
Abrufen von Objekten mit vorgegebenen Werten
44
• Suche kann auf zwei Arten umgesetzt werden
• Nutzen der Suchfunktionen von Mongoose
• Abrufen von allen Entitäten und dann filtern der Ergebnisse
• Empfohlen Vorgehensweise hängt von Suchwerten und Komplexität der
Anfrage ab
• In der Regel ist Suche über Mongoose schneller
• Beispiel: Es sollen die User abgerufen werden, die „manfred“ in der User-ID
haben und nicht Administrator sind
Abrufen von Objekten mit vorgegebenen Werten
45
async function findUsers(queryParameters, callback) {
var users;
if (queryParameters.userID) {
const userID = queryParameters.userID
const regex = new RegExp(userID, 'i') // i for case insensitive
users = await User.find({ userID: { $regex: regex } })
}
else {
users = await User.find()
}
if (queryParameters.isAdministrator != null) {
if (queryParameters.isAdministrator == "true") {
users = users.filter(user => user.isAdministrator == true);
}
else {
users = users.filter(user => user.isAdministrator === false);
}
}
…
• Beispiel 2 (siehe https://stackoverflow.blog/2020/03/02/best-practices-forrest-api-design/)
Abrufen von Objekten mit vorgegebenen Werten (2)
46
app.get('/employees', (req, res) => {
const { firstName, lastName, age } = req.query;
let results = [...employees];
if (firstName) {
results = results.filter(r => r.firstName === firstName);
}
if (lastName) {
results = results.filter(r => r.lastName === lastName);
}
if (age) {
results = results.filter(r => +r.age === +age);
}
res.json(results);
});
• Beispiel: Es sollen die Nachrichten in einem Forum-Thread abgerufen
werden
Abrufen von nachgeordneten Objekten
47
• HTTP-Methode GET
• URL: Parameter für Unique-Identifier wird an URL angehängt, anschließend
die gesuchte Entität
• Beispiel für Umsetzung
router.get('/:forumID/forumMessages', function (req, res) {
const forumID = req.params.forumID;
…
});
• Beispiel: Abrufen von den Kommentaren eines konkreten Artikels
Abrufen von nachgeordneten Objekten (2)
48
app.get('/articles/:articleId/comments', (req, res) => {
const { articleId } = req.params;
const comments = [];
…
res.json(comments);
});
• Es sollten nicht zu viele nachgeordnete Ebene abgebildet werden!
• Komplexität und Nutzbarkeit wird dann beeinträchtigt
• Nicht gut: /articles/:articleId/comments/:commentId/author
• Maximal 2-3 Ebenen
• Express vergleicht die URLs des Request mit den definierten Routen von
oben nach unten
• Beispiel: https://localhost/forumThreads/getByOwnerID
• Es sind unter anderem die folgenden Routen implementiert
• Route A: router.get('/:forumID', function (req, res) {
• Route B: router.get('/getByOwnerID',
AuthenticationUtils.isAuthenticated, function (req, res) {
• Wenn Route A vor Route B ist, wird die Route „getByOwnerID“ nie
aufgerufen, weil vorher immer die Route „/forumID“ gezogen wird!
• Daher:
• Routen mit spezifischen Namen müssen vor Routen mit dynamischen
IDs definiert werden!
REST-Routen bei Node.js
49
• Auch Sortierangaben können über URL angegeben werden
• Beispiel
Sortieren
50
http://example.com/articles?sort=+author,-datepublished
• + bedeutet in ansteigender Reihenfolge (A ist erster Buchstabe)
• - bedeutet in abfallender Reihenfolge (letzte Änderungen zuerst)
• Produktivsysteme haben häufig so viele Daten, dass ein Abrufen alle
Entitäten nicht mehr sinnvoll ist
• Beispiel: Ein System hat ca. 5000 User
• Das User-Management ruft die User immer in Blöcken a 20 User ab.
• Die Umsetzung kann über die Attribute „offset“ und „limit“ beschrieben
werden
• Offset: Beschreibt den Block
• Limit: Beschreibt die Größe des Block
Pagination
51
GET /users?offset=7&limit=20
Es soll der 7ten Block mit 20 Usern abgerufen werden
• Beispiel
Pagination
52
GET /users?offset=7&limit=20
• Es soll der 7ten Block mit 20 Usern abgerufen werden
• Mögliche Antwort
• Wrapped Response
• Angaben zum Block und
Gesamtanzahl
• Daten im Attribut „data“
{
"pagination": {
"offset": 7,
"limit": 20,
"total": 3465,
},
"data": [
//...
],
…
}
}
Weiteres: Authentifizierung, IT-Sicherheit,
Fehlermanagement, etc.
Beuth Hochschule für Technik Berlin – University of Applied Sciences 53
• Vertraulichkeit
• Netzwerkprotokoll: HTTPS (HTTP keine Option)
• Authentifizierung
• Token-basierte Authentifizierung
• Für Single-Sign-On: OAuth2
• Autorisierung
• Einfache Autorisierung fast immer notwendig
• Ggfls. rollenbasierte Autorisierung
• Für jede Route sollte geprüft werden:
• Ist Authentifizierung notwendig?
• Ist Autorisierung notwendig?
• Dürfen alle authentifizierte User die Aktion durchführen?
• Dürfen nur bestimmte User die Aktion durchführen?
IT-Sicherheit
54
• Die Authentifizierung bei REST-Services wird in der Regel über eine
tokenbasierte Authentifizierung umgesetzt
• Die Umsetzung besteht aus den folgenden Schritten
• Authentifizierung per Basic-Authentication, wenn erfolgreich, wird ein
JWT-Token zurückgegeben
• Bei allen weiteren Anfragen wird Token mitgegeben.
• Die Anfrage zur Authentifizierung sollte wie folgt aussehen (vergleiche
Vorlesung „Rest-Security“)
Authentifizierung
55
• Die Antwort nach einer erfolgreichen Authentifizierung sollte wie folgt
aussehen
• Der erzeugte Token ist im Authorization Header nach dem Wort Bearer
Authentifizierung: Antwort Basic-Authentication
56
• Die Antwort nach einer nicht-erfolgreichen Authentifizierung sollte wie folgt
aussehen
• Wichtig: Status-Code 401
Authentifizierung: Antwort Basic-Authentication
57
• Alle weitere Anfragen, die eine Authentifizierung erfordern, sollten im
Authorization-Header den Token haben
• Im Token sind alle wichtigen Daten (User-ID, User-Name, ggfls. mehr)
Authentifizierung: mit Token
58
• Häufige Fehler
• Wenn unerwarteter Fall eintritt, wird keine Antwort geschickt
• Es werden mehrere Antworten geschickt
• Es sollten immer alle möglichen Fälle abgefangen werden
Fehlermanagement
59
router.get('/:userID', AuthenticationUtils.isAuthenticated, function (req, res) {
const userID = req.params.userID;
userService.getUserByUserID(userID, function (err, result) {
if (err) {
res.status(500).json({ "Error": err });
}
else {
if (result) {
res.status(200).send(result);
}
else {
res.status(404).json({ "Error": "Es konnten keine User gefunden werden." });
}}});
});
• REST-Services, die über eine längere Zeit genutzt werden, verändern sich
über die Zeit hinweg
• Zusätzliche Entitäten
• Assoziationen werden verändert,
• Etc.
• Wenn bereits Anwendungen auf REST-Server zugreifen, ist Anpassung von
REST-Services nicht unproblematisch
• Nachfolgende Systeme funktionieren nicht mehr, weil Nachrichtenstruktur
und Service-Struktur sich verändert haben
• Mögliche Umgangsweise mit Änderungen/ Versionen
• Keine Versionsverwaltung
• Versionen über URLs abbilden
• Versionen über Header-Parameter
Versionierung
60
• Endpoints werden ohne Versionsangaben weiterentwickelt
• Vertretbar, wenn es im wesentlichen nur einen Client gibt (z.B. WebAnwendung mit REST-Server)
• In der Regel keine Fehler im Client, solange nur Felder/ Daten hinzukommen
(z.B. beim User-Objekt wird das Feld E-Mail hinzugefügt)
• Problematisch für Clients ist…
• Wenn Felder weggenommen werden (weil die Daten in eine anderen
Entität verschoben wurden)
• Wenn die Beziehungen zwischen Entitäten sich ändern
• Wenn Entitäten umbenannt werden oder ganz entfernt werden
à Nur vertretbar, wenn REST-Server und Client ein Produkt sind und die
Entwicklungsteams eng zusammenarbeiten
Versionierung: Keine Versionierung
61
• Gängiger Ansatz für Versionierung: es wird eine Versionsnummer in URI
aufgenommen
Versionierung: URI-Versionsverwaltung
62
• Vorteile
• Alte Services können erhalten bleiben, neue werden unter veränderter
URL angeboten (zumindest für Übergangsphase)
• Einfaches Hinzufügen und Entfernen von weiteren Versionen
• Nachteile
• Schnelle Vermehrung der Endpoints
• Duplizierung des Codes, selbst wenn nur geringe Änderungen bestehen
• Wenn Version nicht mehr unterstützt wird, fällt Endpoint-Version ganz
weg (Server-Fehler)
• Häufig gibt es gar nicht mehrere Versionen…
https://api.kundendatenbank.com/v1/customers/
https://api.kundendatenbank.com/v2/customers/
In URL wird v1, bzw. v2 eingefügt
Versionierung: Beispiel
63
app.get('/v1/employees', (req, res) => {
const employees = [];
// code to get employees
res.json(employees);
});
app.get('/v2/employees', (req, res) => {
const employees = [];
// different code to get employees
res.json(employees);
});
• Version des Endpoints kann per Header-Parameter angegeben werden
Versionierung: Wahl per Header-Parameter
64
• Vorteile
• Ein Endpoint für alle Versionen (Zugriff für Clients einfacher)
• Abbildung von Versionen häufig über Marshalling-Adapter umsetzbar à
keine überflüssige Duplizierung von Code
• Wenn Version nicht mehr unterstützt wird, kann trotzdem sinnvolle
Antwort geschickt werden
• Nachteile
• Umsetzung des Endpoints wird komplexer, weil unterschiedliche
Versionen dort abgebildet werden müssen
• Weniger gebräuchlich als URL-Versionierung, weil in der Umsetzung etwas
komplexer
GET https://api.kundendatenbank.com/customers HTTP/1.1
Custom-Header: api-version=1
HATEOAS
Beuth Hochschule für Technik Berlin – University of Applied Sciences 65
• Hypermedia as the Engine of Application State (HATEOAS)
• REST-Antworten sind angereichert mit weiteren Links und möglichen
Aktionen
Back-End: Lose Kopplung
REST - HATEOAS
Beuth Hochschule für Technik Berlin – University of Applied Sciences 66
HTTP/1.1 200 OK
Content-Type: application/vnd.acme.account+json
Content-Length: ...
{
"account": {
"account_number": 12345,
"links": {
"deposit": "/accounts/12345/deposit",
"withdraw": "/accounts/12345/withdraw",
"transfer": "/accounts/12345/transfer",
"close": "/accounts/12345/close"
}
}
}
• Der Ansatz ist, Dynamik in der Web-Anwendung über REST-Antworten zu
steuern
• Mögliche weitergehende Informationen
• Mögliche Aktionen für die betreffende Entität
• Rechte für die Entität (z.B. Ändern, Löschen)
• Nachgeordnete Daten (zur Vermeidung von weiteren REST-Calls)
HATEOAS
67
• Die meisten REST-Services auf Level 2
Back-End: Lose Kopplung
REST: Umsetzung
Beuth Hochschule für Technik Berlin – University of Applied Sciences 68
# TypeScript REST Server Best Practices

## Table of Contents
- [Code Organization](#code-organization)
- [TypeScript Specifics](#typescript-specifics)
- [API Design](#api-design)
- [Authentication & Authorization](#authentication--authorization)
- [Error Handling](#error-handling)
- [Database Operations](#database-operations)
- [Testing](#testing)

## Code Organization
- Organize code by feature/resource (users, courses, etc.)
- Keep route definitions separate from business logic
- Use interfaces to define data models
- Use dependency injection where appropriate

## TypeScript Specifics
- Use strict mode (`"strict": true` in tsconfig.json)
- Define proper interfaces for all data models
- Avoid using `any` type when possible
- Use type guards for runtime type checking
- Leverage TypeScript's utility types (Partial, Pick, etc.)
- Use enums for predefined values

## API Design
- Follow RESTful principles
- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Return appropriate status codes
- Use consistent response formats
- Version your APIs when making breaking changes
- Use query parameters for filtering, pagination
- Use plural nouns for resource endpoints (e.g., `/api/users`)

## Authentication & Authorization
- Use JWT for stateless authentication
- Store hashed passwords only (using bcrypt)
- Implement role-based access control
- Set appropriate token expiration times
- Use HTTPS in production
- Validate and sanitize all user inputs

## Error Handling
- Use a centralized error handling middleware
- Provide meaningful error messages
- Log errors for debugging but return safe error messages to clients
- Handle both operational and programmer errors differently
- Include error codes for easier client-side handling

## Database Operations
- Use Mongoose middleware for consistent data processing
- Implement data validation at the schema level
- Use indexes for frequently queried fields
- Keep database logic in service layers
- Use transactions for operations that modify multiple documents

## Testing
- Write unit tests for business logic
- Write integration tests for API endpoints
- Use HTTP request files (like test.http) for manual testing
- Test both success and failure cases
- Use mock objects for external dependencies