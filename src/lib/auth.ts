import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";

const saltRounds = 10;

export const hashPassword = (inputPassword) =>
  bcrypt.hash(inputPassword, saltRounds);

export const comparePassword = (inputPassword, hashedPassword) =>
  bcrypt.compare(inputPassword, hashedPassword);

export const createJWT = async (user) => {
  const alg = "HS256";
  const iat = Math.floor(Date.now() / 1000);
  const expirationTime = iat + 60 * 60 * 24 * 7;
  const jwt = await new SignJWT({ id: user.id, email: user.email })
    .setProtectedHeader({ alg })
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .setExpirationTime(expirationTime)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  console.log(jwt);

  return jwt;
};

export const verifyJWT = async (jwt) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload as any;
};

// cookies argument will come from 'nextjs/headers'
export const getUserFromCookies = async (cookies) => {
    const jwt = cookies.get(process.env.COOKIE_NAME);

    const { id } = await verifyJWT(jwt.value);

    const user = await db.user.findUnique({
        where: {
            id: id
        }
    })

    return user
}