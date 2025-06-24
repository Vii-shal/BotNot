export interface BotDetectorOptions {
  allowlistIPs?: string[];
  denylistIPs?: string[];
  allowlistUAs?: string[];
  denylistUAs?: string[];
  rateLimit?: {
    windowMs: number;
    maxRequests: number;
  };
  log?: boolean;
}