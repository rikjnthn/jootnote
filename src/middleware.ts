import { NextResponse } from "next/server";

import { TWO_YEARS_IN_SECONDS } from "./constant";

export default function middleware() {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = `
  default-src 'self'; base-uri 'self'; connect-src 'self' ${process.env.API_URL}; font-src 'self' https: data:; form-action 'self'; frame-ancestors 'self'; img-src 'self' data:; object-src 'none'; script-src 'self' 'nonce-${nonce}'; script-src-attr 'none'; style-src 'self' https: 'nonce-${nonce}'; upgrade-insecure-requests`;

  const requestHeaders = new Headers();

  if (process.env.NODE_ENV === "production") {
    requestHeaders.set("Content-Security-Policy", csp);
  } else requestHeaders.set("Content-Security-Policy-Report-Only", csp);

  requestHeaders.set("Cross-Origin-Opener-Policy", "same-origin");
  requestHeaders.set("Origin-Agent-Cluster", "?1");
  requestHeaders.set("Referrer-Policy", "no-referrer");
  requestHeaders.set(
    "Strict-Transport-Security",
    `max-age=${TWO_YEARS_IN_SECONDS}; includeSubDomains`,
  );
  requestHeaders.set("X-Content-Type-Options", "nosniff");
  requestHeaders.set("X-DNS-Prefetch-Control", "off");
  requestHeaders.set("X-Download-Options", "noopen");
  requestHeaders.set("X-Frame-Options", "SAMEORIGIN");
  requestHeaders.set("X-Permitted-Cross-Domain-Policies", "none");
  requestHeaders.set("X-XSS-Protection", "0");

  return NextResponse.next({
    headers: requestHeaders,
  });
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
