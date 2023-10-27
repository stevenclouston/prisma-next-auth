import { Authsignal } from "@authsignal/node";

const authsignal = new Authsignal({
  secret: process.env.AUTHSIGNAL_TENANT_SECRET || "",
  apiBaseUrl: "https://au.api.authsignal.com/v1",
});

export default async (req, res) => {
  const { token } = req.query;

  const data = await authsignal.validateChallenge({ token: token });

  res.status(200).json(data);
};
