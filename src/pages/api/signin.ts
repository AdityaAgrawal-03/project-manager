import { comparePassword, createJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(401).json({ success: false, message: "Invalid login" });
      return;
    }

    const isPasswordCorrect = await comparePassword(
      req.body.password,
      user?.password
    );

    if (isPasswordCorrect) {
      const jwt = await createJWT(user);

      res.setHeader(
        "Set-Cookie",
        serialize(process.env.COOKIE_NAME, jwt, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        })
      );
    } else {
      res.status(401).json({ success: false, message: "Invalid password!" });
    }
  } else {
    res.status(405).json({ success: false, message: "method not allowed" });
  }
}
