import { Authsignal } from "@authsignal/node";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./[...nextauth]";

const authsignal = new Authsignal({
  secret: process.env.AUTHSIGNAL_TENANT_SECRET || "",
  apiBaseUrl: "https://au.api.authsignal.com/v1",
});

export default async (req, res) => {
  // You can access request parameters, headers, and body through the 'req' object.
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const email = session.user.email;

    console.log("GEETTING SESSION DATA", session, email);
    const user = await authsignal.getUser({ userId: email });

    res.status(200).json(user);
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
};
