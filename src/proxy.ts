import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "vi"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  return match(languages, locales, defaultLocale);
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname already has /vi prefix
  const hasViPrefix = pathname.startsWith("/vi/") || pathname === "/vi";
  
  // If path has /vi, it's Vietnamese - no action needed
  if (hasViPrefix) {
    return NextResponse.next();
  }
  
  // For paths without /vi prefix, detect if user prefers Vietnamese
  const preferredLocale = getLocale(request);
  
  // If user prefers Vietnamese and path doesn't have /vi, redirect to /vi
  if (preferredLocale === "vi" && !hasViPrefix) {
    return NextResponse.redirect(
      new URL(`/vi${pathname}`, request.url)
    );
  }
  
  // Otherwise, serve as English (no prefix needed)
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico|.*\\..*).*)",
  ],
};
