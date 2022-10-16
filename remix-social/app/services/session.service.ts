import { createCookieSessionStorage } from "@remix-run/node"; // or "@remix-run/cloudflare"

const isProduction = process.env.NODE_ENV === "production";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__top-trump-session",

      // all of these are optional
      domain: isProduction ? "top-trump-mariobrusarosco.vercel.app" : undefined,
      expires: new Date(Date.now() + 60_000),
      httpOnly: true,
      maxAge: 60_000,
      path: "/",
      sameSite: "lax",
      secrets: ["this_needs_to_change"],
      secure: isProduction,
    },
  });

export { getSession, commitSession, destroySession };
