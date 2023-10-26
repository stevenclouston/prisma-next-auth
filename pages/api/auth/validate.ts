import { Authsignal } from "@authsignal/node";

const authsignal = new Authsignal({
  secret: process.env.AUTHSIGNAL_TENANT_SECRET || "",
  apiBaseUrl: "https://au.api.authsignal.com/v1",
});

export default async (req, res) => {
  // You can access request parameters, headers, and body through the 'req' object.

  const { token } = req.query;

  console.log("Running authsignal validate", token);

  // console.log("STARTNG", authsignal, opts.input.email);
  const data = await authsignal.validateChallenge({ token: token });

  // Set the response status code and send JSON response
  res.status(200).json(data);
};
