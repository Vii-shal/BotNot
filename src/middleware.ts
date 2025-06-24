import { NextFunction, Request, Response } from "express";
import { BotDetectorOptions } from "./types";
import { defaultBlockedUserAgents } from "./botUserAgents";

const memoryRateLimitStore = new Map<string, { count: number; lastSeen: number }>();

export function botDetector(options: BotDetectorOptions = {}) {
  const {
    allowlistIPs = [],
    denylistIPs = [],
    allowlistUAs = [],
    denylistUAs = [],
    rateLimit = { windowMs: 60000, maxRequests: 30 },
    log = false,
  } = options;

  return function (req: Request, res: Response, next: NextFunction) {
    // const ip = req.ip;
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    const ua = (req.headers["user-agent"] || "").toLowerCase();

    // Allowlist
    if (allowlistIPs.includes(ip) || allowlistUAs.some(allowed => ua.includes(allowed))) {
      return next();
    }

    // Denylist
    if (denylistIPs.includes(ip) || denylistUAs.some(denied => ua.includes(denied))) {
      if (log) console.log(`[BotDetector] Denied IP/UA: ${ip} / ${ua}`);
      return res.status(403).json({ error: "Forbidden - Bot Detected" });
    }

    // Check default blocked UAs
    if (defaultBlockedUserAgents.some(bot => ua.includes(bot))) {
      if (log) console.log(`[BotDetector] Known bot UA: ${ua}`);
      return res.status(403).json({ error: "Forbidden - Bot Detected" });
    }

    // Rate limiting
    const now = Date.now();
    const rateKey = `${ip}_${ua}`;
    const existing = memoryRateLimitStore.get(rateKey);

    if (!existing || now - existing.lastSeen > rateLimit.windowMs) {
      memoryRateLimitStore.set(rateKey, { count: 1, lastSeen: now });
    } else {
      existing.count++;
      existing.lastSeen = now;
      if (existing.count > rateLimit.maxRequests) {
        if (log) console.log(`[BotDetector] Rate limit exceeded: ${ip}`);
        return res.status(429).json({ error: "Too many requests - possible bot" });
      }
    }

    return next();
  };
}
