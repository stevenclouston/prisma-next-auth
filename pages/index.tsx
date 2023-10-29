import { useSession, signOut } from "next-auth/react";
import { useAuthsignal } from "../utils/authsignal";
import { useRouter } from "next/router";
import { useEffect } from "react";

const WelcomePage = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const authsignal = useAuthsignal();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status]);

  const enrollPasskey = async () => {
    try {
      //Get a short lived token by tracking an action
      const response = await fetch(
        `/api/auth/track/?email=${session.user.email}`
      );

      const token = await response.json();

      //Initiate the passkey enroll flow
      const resultToken = await authsignal.passkey.signUp({
        token,
        userName: session.user.email,
      });

      //Check that the enrollment was successful
      const validationResponse = await fetch(
        `/api/auth/validate/?token=${resultToken}`
      );

      const { success } = await validationResponse.json();

      if (success) {
        alert("Successfully added passkey");
      } else {
        alert("Failed to add passkey");
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="welcome-message">
        Welcome, {session?.user?.email ?? session?.user?.name}
      </div>
      <button onClick={() => signOut({ callbackUrl: "/signin" })}>
        Sign out
      </button>
      <button onClick={enrollPasskey}>Create passkey</button>
    </div>
  );
};

export default WelcomePage;
