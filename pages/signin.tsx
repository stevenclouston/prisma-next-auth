import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAuthsignal } from "../utils/authsignal";

const IndexPage = () => {
  const { data: session, status } = useSession();

  const authsignal = useAuthsignal();

  useEffect(() => {
    const handlePasskeySignin = async () => {
      console.log("CALLING handlePasskeySignin", { session });

      const authsignalToken = await authsignal.passkey.signIn({
        autofill: true,
      });

      if (authsignalToken) {
        signIn("credentials", {
          authsignalToken,
          redirect: true,
          provider: "authsignal",
          // callbackUrl: "/welcome",
        });
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

  console.log({ session });

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
