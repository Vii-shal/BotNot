import express, { RequestHandler } from 'express';
import request from 'supertest';
import { botDetector } from '../src/middleware';

const app = express();

const detector = botDetector({
  log: false,
  denylistUAs: ['badbot'],
  rateLimit: {
    windowMs: 1000,
    maxRequests: 2,
  },
}) as RequestHandler;

app.use(detector);

app.get('/', (req, res) => {
  res.status(200).send('Hello human');
});

describe('🧪 botnot tests', () => {
  it('should allow normal User-Agent', async () => {
    const res = await request(app).get('/').set('User-Agent', 'Mozilla');
    expect(res.status).toBe(200);
  });

  it('should block badbot User-Agent', async () => {
    const res = await request(app).get('/').set('User-Agent', 'badbot');
    expect(res.status).toBe(403);
  });
});
