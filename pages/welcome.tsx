import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useAuthsignal } from "../utils/authsignal";
import { useRouter } from "next/router";

const WelcomePage = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const { method } = router.query as { method: string };

  const authsignal = useAuthsignal();

  const passkeyEnrollmentPromptMethods = ["email"];

  useEffect(() => {
    const enrollPasskey = async () => {
      const authsignalUser = await fetch(`/api/auth/get-authsignal-user`);

      const json = await authsignalUser.json();

      if (!json.enrolledVerificationMethods?.includes("PASSKEY")) {
        const response = await fetch(
          `/api/auth/track/?email=${session.user.email}`
        );

        const token = await response.json();

        const resultToken = await authsignal.passkey.signUp({
          token,
          userName: session.user.email,
        });

        await fetch(`/api/auth/validate/?token=${resultToken}`);
      }
    };
    if (session && passkeyEnrollmentPromptMethods.includes(method)) {
      enrollPasskey();
    }
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Welcome, {session?.user?.email ?? session?.user?.name} <br />
      <button onClick={() => signOut({ callbackUrl: "/signin" })}>
        Sign out
      </button>
    </div>
  );
};

export default WelcomePage;
