# Schritt-für-Schritt Anleitung zur Finalen Abgabe (Milestone 3)

Diese Anleitung beschreibt, welche Schritte noch umgesetzt werden müssen und wie sie mit Code-Beispielen in TypeScript realisiert werden können.

---
## 1. HTTPS-Umstellung
1. Selbstsigniertes Zertifikat erzeugen (z. B. mit OpenSSL):
   ```bash
   openssl req -x509 -newkey rsa:4096 -nodes \
     -keyout key.pem -out cert.pem \
     -days 365 \
     -subj "/CN=localhost"
   ```
2. Pfade zu Zertifikat und Schlüssel in der Datei `.env` speichern:
   ```ini
   SSL_KEY_PATH=./certificates/key.pem
   SSL_CERT_PATH=./certificates/cert.pem
   ```
3. `HttpServer.ts` anpassen, um HTTPS zu nutzen:
   ```ts
   import express from 'express';
   import https from 'https';
   import fs from 'fs';
   import dotenv from 'dotenv';
   dotenv.config();

   const app = express();
   // ... vorhandene Middleware und Routen ...

   const key = fs.readFileSync(process.env.SSL_KEY_PATH!);
   const cert = fs.readFileSync(process.env.SSL_CERT_PATH!);
   https.createServer({ key, cert }, app)
     .listen(443, () => console.log('Server läuft auf https://localhost'));
   ```

---
## 2. Datenmodell anlegen
Erstelle im Ordner `endpoints/degreeCourseApplications/` eine Datei `DegreeCourseApplicationModel.ts`:
```ts
import { Schema, model, Document } from 'mongoose';

export interface DegreeCourseApplication extends Document {
  applicantUserID: string;
  degreeCourseID: string;
  targetPeriodYear: number;
  targetPeriodShortName: 'WiSe' | 'SoSe';
}

const ApplicationSchema = new Schema({
  applicantUserID: { type: String, required: true },
  degreeCourseID:     { type: String, required: true },
  targetPeriodYear:   { type: Number, required: true },
  targetPeriodShortName: { type: String, enum: ['WiSe', 'SoSe'], required: true }
});

export default model<DegreeCourseApplication>(
  'DegreeCourseApplication', ApplicationSchema
);
``` 

---
## 3. Service-Schicht implementieren
In `DegreeCourseApplicationService.ts`:
```ts
import ApplicationModel, { DegreeCourseApplication } from './DegreeCourseApplicationModel';

export async function createApplication(
  applicantUserID: string,
  data: Omit<DegreeCourseApplication, '_id'>
) {
  const existing = await ApplicationModel.findOne({
    applicantUserID,
    degreeCourseID: data.degreeCourseID,
    targetPeriodYear: data.targetPeriodYear,
    targetPeriodShortName: data.targetPeriodShortName
  });
  if (existing) throw new Error('Bewerbung bereits vorhanden');
  return ApplicationModel.create({ applicantUserID, ...data });
}

export async function findMyApplications(applicantUserID: string) {
  return ApplicationModel.find({ applicantUserID });
}

export async function findApplications(filter: any) {
  return ApplicationModel.find(filter);
}
``` 

---
## 4. Route definieren
In `DegreeCourseApplicationRoute.ts`:
```ts
import { Router } from 'express';
import * as service from './DegreeCourseApplicationService';
import { verifyToken, verifyAdmin } from '../../authenticate/AuthMiddleware';

const router = Router();

// 1. Bewerbung anlegen
router.post(
  '/', verifyToken,
  async (req, res) => {
    try {
      const app = await service.createApplication(
        req.user.userID,
        req.body
      );
      res.status(201).json(app);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// 2. Eigene Bewerbungen
router.get(
  '/myApplications', verifyToken,
  async (req, res) => {
    const list = await service.findMyApplications(req.user.userID);
    res.json(list);
  }
);

// 3+4. Admin-Filter
router.get(
  '/', verifyToken, verifyAdmin,
  async (req, res) => {
    const filter = { ...req.query };
    const list = await service.findApplications(filter);
    res.json(list);
  }
);

export default router;
``` 

---
## 5. Nachgelagerte Suche
In `endpoints/degreeCourses/DegreeCourseRoute.ts` unten ergänzen:
```ts
// ...existing code...
router.get(
  '/:id/degreeCourseApplications',
  verifyToken, verifyAdmin,
  async (req, res) => {
    const list = await applicationService.findApplications({
      degreeCourseID: req.params.id
    });
    res.json(list);
  }
);
// ...existing code...
``` 

---
## 6. Registrierung der Route in HttpServer.ts
```ts
import applicationRoute from './endpoints/degreeCourseApplications/DegreeCourseApplicationRoute';

// ...existing code...
app.use(
  '/api/degreeCourseApplications', applicationRoute
);
// ...existing code...
``` 

---
## 7. Testing
- Server starten: `npm start`
- REST-Client in VSCode öffnen und `tests/test3.http` ausführen
- Auf korrekte Status-Codes und JSON-Formate achten

---
## 8. Bonus (optional)
- Datenvalidierung mit `class-validator` oder `Joi`
- Automatisierte Tests mit Jest
- CI-Pipeline (GitHub Actions)
- Profilbild-Upload via `multer`

---

Damit sind alle notwendigen Schritte für Milestone 3 beschrieben und mit Beispielen hinterlegt. Viel Erfolg bei der Umsetzung!
