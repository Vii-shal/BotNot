// import express from 'express';
// import request from 'supertest';
// import { botDetector } from 'botnot'; // adjust path if testing locally

// const app = express();

// app.use(botDetector({
//   log: false,
//   denylistUAs: ['badbot', 'curl'],
//   allowlistIPs: ['127.0.0.2'],
//   rateLimit: {
//     windowMs: 1000, // 1 second
//     maxRequests: 2
//   }
// }));

// app.get('/', (req, res) => {
//   res.status(200).send('Welcome Human ✅');
// });

// describe('🧪 botnot basic tests', () => {
//   it('allows a normal user-agent', async () => {
//     const res = await request(app)
//       .get('/')
//       .set('User-Agent', 'Mozilla/5.0');
//     expect(res.status).toBe(200);
//     expect(res.text).toContain('Welcome');
//   });

//   it('blocks a denied User-Agent', async () => {
//     const res = await request(app)
//       .get('/')
//       .set('User-Agent', 'badbot');
//     expect(res.status).toBe(403);
//   });

//   it('allows an allowlisted IP', async () => {
//     const res = await request(app)
//       .get('/')
//       .set('User-Agent', 'Mozilla')
//       .set('X-Forwarded-For', '127.0.0.2');
//     expect(res.status).toBe(200);
//   });

//   it('rate limits repeated access', async () => {
//     const ua = 'Repeated-UA';
//     const res1 = await request(app).get('/').set('User-Agent', ua);
//     const res2 = await request(app).get('/').set('User-Agent', ua);
//     const res3 = await request(app).get('/').set('User-Agent', ua);

//     expect(res1.status).toBe(200);
//     expect(res2.status).toBe(200);
//     expect(res3.status).toBe(429); // Too many requests
//   });
// });
