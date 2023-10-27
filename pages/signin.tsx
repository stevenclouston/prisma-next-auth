import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAuthsignal } from "../utils/authsignal";

const IndexPage = () => {
  const { data: session, status } = useSession();

  const authsignal = useAuthsignal();

  useEffect(() => {
    const handlePasskeySignin = async () => {
      const authsignalToken = await authsignal.passkey.signIn({
        autofill: true,
      });

      if (authsignalToken) {
        signIn("credentials", {
          authsignalToken,
          redirect: true,
          provider: "authsignal",
          callbackUrl: "/welcome?method=passkey",
        });
      }
    };
    if (session === null) {
      handlePasskeySignin();
    }
  }, [session]);

  const handleClick = () => {
    signIn("email", {
      email: "steven@authsignal.com",
      callbackUrl: "/welcome?method=email",
    });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{ maxWidth: "300px", margin: "100px auto", textAlign: "center" }}
    >
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          id="email"
          autoComplete="email webauthn"
          placeholder="Email"
          style={{
            width: "200px",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleClick}
          style={{
            width: "220px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default IndexPage;
