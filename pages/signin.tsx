import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { useAuthsignal } from "../utils/authsignal";

const IndexPage = () => {
  const { data: session, status } = useSession();

  const authsignal = useAuthsignal();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handlePasskeySignin = async () => {
      try {
        //Initialize the input for passkey autofill
        const authsignalToken = await authsignal.passkey.signIn({
          autofill: true,
        });

        //Run NextAuth's sign in flow. This will run if the user selects one of their passkeys
        //from the Webauthn dropdown.
        if (authsignalToken) {
          await signIn("credentials", {
            authsignalToken,
            callbackUrl: "/",
          });
        }
      } catch (e: any) {
        alert(e);
      }
    };
    if (status === "unauthenticated") {
      handlePasskeySignin();
    }
  }, [session]);

  const handleClick = async () => {
    setLoading(true);
    await signIn("email", {
      email,
      callbackUrl: "/",
    });
    setLoading(false);
  };

  if (loading || status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>
        Create an account or sign in with an <br />
        existing account
      </p>
      <input
        type="text"
        id="email"
        onChange={(input) => setEmail(input.currentTarget.value)}
        autoComplete="email webauthn"
        placeholder="Email"
      />
      <button onClick={handleClick}>Continue</button>
    </div>
  );
};

export default IndexPage;
