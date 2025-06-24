# 🛡️ botnot

**botnot** is a lightweight and pluggable Node.js module to detect and block bots using **User-Agent fingerprinting**, **rate limiting**, and flexible **allow/deny lists**.  
It’s perfect for securing APIs, login pages, contact forms, and public routes in **Express**, **Next.js**, or even vanilla **Node.js** servers.

[![npm](https://img.shields.io/npm/v/botnot?color=blue)](https://www.npmjs.com/package/botnot)
[![NPM downloads](https://img.shields.io/npm/dm/limiter.svg)](https://www.npmjs.com/package/limiter)

<!-- --- -->

## ✨ Features

- 🧠 Detects bots via User-Agent fingerprinting
- 🔐 Allow or deny specific IPs and User-Agents
- 📈 Built-in rate limiting per IP + User-Agent
- ⚙️ Easy to plug into Express, Next.js, or custom Node.js servers
- 🧾 TypeScript support with full typings
- 🧰 Zero dependencies – lightweight & fast

<!-- --- -->

## 📦 Installation

```bash
npm install botnot
```

<!-- --- -->

## ⚙️ Configuration Options

| Option          | Type                         | Description |
|-----------------|------------------------------|-------------|
| `allowlistIPs`  | `string[]`                   | IPs to always allow |
| `denylistIPs`   | `string[]`                   | IPs to always block |
| `allowlistUAs`  | `string[]`                   | Substrings of UAs to allow |
| `denylistUAs`   | `string[]`                   | Substrings of UAs to block |
| `rateLimit`     | `{ windowMs, maxRequests }`  | Rate limiting configuration |
| `log`           | `boolean`                    | Enable console logging (default: false) |

<!-- --- -->

## 🚀 Usage Examples

### ✅ 1. Express (Node.js) Example

```ts
import express from 'express';
import { botDetector } from 'botnot';

const app = express();

app.use(botDetector({
  log: true,
  rateLimit: {
    windowMs: 60000,
    maxRequests: 30,
  },
  denylistUAs: ['curl', 'python', 'wget']
}));

app.get('/', (req, res) => {
  res.send('You are human ✅');
});

app.listen(3000, () => console.log('Running on http://localhost:3000'));
```

<!-- --- -->

### ✅ 2. Next.js API Route Example

```ts
// pages/api/protected.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { botDetector } from 'botnot';
import { NextApiHandler } from 'next';

const withBotProtection = (handler: NextApiHandler) => {
  const middleware = botDetector({ log: true });

  return async (req: NextApiRequest, res: NextApiResponse) => {
    await new Promise<void>((resolve, reject) => {
      middleware(req as any, res as any, (err?: any) => {
        if (err) reject(err);
        else resolve();
      });
    });

    return handler(req, res);
  };
};

const handler: NextApiHandler = async (req, res) => {
  res.status(200).json({ message: 'You are not a bot ✅' });
};

export default withBotProtection(handler);
```

<!-- --- -->

### ✅ 3. Raw Node.js HTTP Server Example

```ts
import http from 'http';
import { botDetector } from 'botnot';

const detector = botDetector({ log: true });

const server = http.createServer((req, res) => {
  detector(req as any, res as any, (err?: any) => {
    if (err) return;
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Human access granted ✅');
  });
});

server.listen(3000, () => {
  console.log('Raw HTTP server running on http://localhost:3000');
});
```

<!-- --- -->

## 🧩 Use Cases

- 🔐 Stop brute-force attacks on login or admin endpoints
- 🤖 Prevent scrapers from abusing your public APIs
- 📄 Protect form submissions from bots and spam
- ⚡ Reduce server load by dropping suspicious traffic early

<!-- --- -->

## 📝 License

MIT © [Vishal Kumar Sharma](https://github.com/Vii-shal)

<!-- --- -->

## 🤝 Contributing

We welcome contributions, ideas, and feedback!

- 📥 Submit issues or bug reports in [GitHub Issues](https://github.com/Vii-shal/botnot/issues)
- 🧑‍💻 Fork, build, and open a PR with improvements

<!-- --- -->