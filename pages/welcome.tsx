import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAuthsignal } from "../utils/authsignal";
import { useRouter } from "next/router";

const WelcomePage = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  // const authsignal = useAuthsignal();

  // //sign up
  // useEffect(() => {
  //   const enrollPasskey = async () => {
  //     console.log({ session });
  //     console.log("RUNNING");
  //     if (!session) {
  //       return;
  //     }
  //     const authsignalUser = await fetch(`/api/auth/get-authsignal-user`);

  //     console.log({ authsignalUser });

  //     const json = await authsignalUser.json();

  //     console.log({ session });

  //     if (!json.enrolledVerificationMethods?.includes("PASSKEY")) {
  //       const response = await fetch(
  //         `/api/auth/track/?email=${session.user.email}`
  //       );

  //       const token = await response.json();

  //       const resultToken = await authsignal.passkey.signUp({
  //         token,
  //         userName: session.user.email,
  //       });

  //       const result = await fetch(`/api/auth/validate/?token=${resultToken}`);

  //       console.log({ result });

  //       if (resultToken) {
  //         // Pass this short-lived result token to your backend to validate that passkey registration succeeded
  //       }
  //     }
  //   };
  //   enrollPasskey();
  // }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // if (!session) {
  //   router.push("/");
  //   return null;
  // }

  return (
    <div>
      Welcome, {session?.user?.email ?? session?.user?.name} <br />
      {/* <button onClick={() => signOut()}>Sign out</button> */}
      {/* <input type="text" id="username" autoComplete="username webauthn" /> */}
    </div>
  );
};

export default WelcomePage;
