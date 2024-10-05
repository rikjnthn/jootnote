import { NextResponse } from "next/server";

import { TWO_YEARS_IN_SECONDS } from "./constant";

export default function middleware() {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = `
  default-src 'self'; base-uri 'self'; connect-src 'self' ${process.env.API_URL}; font-src 'self' https: data:; form-action 'self'; frame-ancestors 'self'; img-src 'self' data:; object-src 'none'; script-src 'self' 'nonce-${nonce}'; script-src-attr 'none'; style-src 'self' https: 'nonce-${nonce}'; upgrade-insecure-requests`;

  const headers = new Headers();

  if (process.env.NODE_ENV === "production") {
    headers.set("Content-Security-Policy", csp);
  } else headers.set("Content-Security-Policy-Report-Only", csp);

  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Origin-Agent-Cluster", "?1");
  headers.set("Referrer-Policy", "no-referrer");
  headers.set(
    "Strict-Transport-Security",
    `max-age=${TWO_YEARS_IN_SECONDS}; includeSubDomains`,
  );
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-DNS-Prefetch-Control", "off");
  headers.set("X-Download-Options", "noopen");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("X-Permitted-Cross-Domain-Policies", "none");
  headers.set("X-XSS-Protection", "0");
  headers.set("X-nonce", nonce);

  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/sign-up",
    "/verify-email/:token*",
    "/reset-password/:token*",
    "/change-email/:token*",
    "/note/:fileid*",
  ],
};
