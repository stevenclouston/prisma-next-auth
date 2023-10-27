import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useAuthsignal } from "../utils/authsignal";

const IndexPage = () => {
  const { data: session, status } = useSession();

  const authsignal = useAuthsignal();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handlePasskeySignin = async () => {
      //Initialize the input for passkey autofill
      const authsignalToken = await authsignal.passkey.signIn({
        autofill: true,
      });

      //Run NextAuth's sign in flow. This will run if the user selects one of their passkeys
      //from the Webauthn dropdown.
      if (authsignalToken) {
        signIn("credentials", {
          authsignalToken,
          callbackUrl: "/welcome",
        });
      }
    };
    if (session !== null) {
      handlePasskeySignin();
    }
  }, [session]);

  const handleClick = async () => {
    setLoading(true);
    await signIn("email", {
      email,
      callbackUrl: "/welcome",
    });
    setLoading(false);
  };

  if (loading || status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
