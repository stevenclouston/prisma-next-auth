import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAuthsignal } from "../utils/authsignal";

const IndexPage = () => {
  const { data: session, status } = useSession();

  const authsignal = useAuthsignal();

  useEffect(() => {
    const handlePasskeySignin = async () => {
      console.log("CALLING handlePasskeySignin");

      const resultToken = await authsignal.passkey.signIn({ autofill: true });

      if (resultToken) {
        console.log({ resultToken });

        const result = await fetch(`/api/auth/validate/?token=${resultToken}`);

        const tokenData = await result.json();

        console.log({ tokenData });
      } else {
        console.log("NO RESULT");
      }
    };
    handlePasskeySignin();
  }, []);

  const handleClick = () => {
    signIn("email", {
      email: "steven@purposetech.io",
      callbackUrl: "/welcome",
    });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div>
        Hello, {session.user.email ?? session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else {
    return (
      <div>
        You are not logged in! <br />
        <input type="text" id="username" autoComplete="username webauthn" />
        <button onClick={handleClick}>Sign in</button>
      </div>
    );
  }
};

export default IndexPage;
