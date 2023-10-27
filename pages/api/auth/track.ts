import { Authsignal } from "@authsignal/node";

const authsignal = new Authsignal({
  secret: process.env.AUTHSIGNAL_TENANT_SECRET || "",
  apiBaseUrl: "https://au.api.authsignal.com/v1",
});

export default async (req, res) => {
  const { email } = req.query;

  const { token } = await authsignal.track({
    userId: email,
    action: "track",
  });

  res.status(200).json(token);
};
