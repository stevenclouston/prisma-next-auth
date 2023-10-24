import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { AuthsignalProvider } from "../utils/authsignal";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <AuthsignalProvider tenantId={process.env.NEXT_PUBLIC_AUTHSIGNAL_TENANT_ID}>
      <SessionProvider session={session}>
        <Component {...pageProps}></Component>
      </SessionProvider>
    </AuthsignalProvider>
  );
};

export default App;
