import express from 'express';
export const router = express.Router();

router.get('/', (req: any, res: any) => {
  res.send('all endpoints');
});

router.get('/json', (req: any, res: any) => {
  res.json('json endpoint');
});