import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAuthsignal } from "../utils/authsignal";

const IndexPage = () => {
  const { data: session, status } = useSession();

  const authsignal = useAuthsignal();

  useEffect(() => {
    const handlePasskeySignin = async () => {
      console.log("CALLING handlePasskeySignin", { session });

      const resultToken = await authsignal.passkey.signIn({ autofill: true });

      if (resultToken) {
        console.log({ resultToken });

        const result = await fetch(`/api/auth/validate/?token=${resultToken}`);

        const tokenData = await result.json();

        const csrfData = await fetch(`/api/auth/csrf`);

        const data = await csrfData.json();

        const csrfToken = data.csrfToken;

        const res = await fetch("/api/auth/callback/webauthn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "CSRF-Token": csrfToken,
          },
          body: JSON.stringify({
            "CSRF-Token": csrfToken,
            creds: tokenData,
            // Your credentials payload
          }),
        });

        signIn("credentials", {
          redirect: true,
          provider: "authsignal",
          webauthn: tokenData,
          callbackUrl: "/welcome",
        });
        // signIn("webauthn");

        console.log({ tokenData });
      } else {
        console.log("NO RESULT");
      }
    };
    if (session === null) {
      handlePasskeySignin();
    }
  }, [session]);

  const handleClick = () => {
    signIn("email", {
      email: "steven@authsignal.com",
      callbackUrl: "/welcome",
    });
  };

  // return (
  //   <div>
  //     You are not logged in! <br />
  //     <input type="text" id="username" autoComplete="username webauthn" />
  //     <button onClick={handleClick}>Sign in</button>
  //   </div>
  // );

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
