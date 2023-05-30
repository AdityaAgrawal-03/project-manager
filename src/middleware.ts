import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
const PUBLIC_FILE = /\.(.*)$/;

/* We need to write this function again as this file runs on edge runtime by default
   And bcrypt doesn't run on edge environment
*/
const verifyJWT = async (jwt) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload as any;
};

export default async function middleware(req, res) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/next") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const jwt = req.cookies.get(process.env.COOKIE_NAME);

  console.log({ jwt }, 'here')

  if (!jwt) {
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await verifyJWT(jwt.value);
    // await verifyJWT(jwt.value)
    return NextResponse.next();
  } catch (e) {
     console.error(e);
     req.nextUrl.pathname = "/signin";
     return NextResponse.redirect(req.nextUrl);
  }
}
