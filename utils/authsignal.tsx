import { Authsignal } from "@authsignal/browser";
import { TrackResponse } from "@authsignal/node";
import React, { useEffect } from "react";

export type TrackResponseWithToken = TrackResponse & {
  token: string;
};

const AuthsignalContext = React.createContext<
  | {
      authsignal: Authsignal;
    }
  | undefined
>(undefined);

type AuthsignalProviderProps = {
  tenantId: string;
  children: React.ReactNode;
};

function AuthsignalProvider({ tenantId, children }: AuthsignalProviderProps) {
  const [authsignal, setAuthsignal] = React.useState<Authsignal | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!authsignal) {
      // ! Need to initialise in a useEffect to guarantee the document exists
      setAuthsignal(
        new Authsignal({
          tenantId,
          baseUrl: process.env.NEXT_PUBLIC_AUTHSIGNAL_BASE_URL || "",
        }),
      );
    }
  }, [authsignal, tenantId]);

  if (!authsignal) {
    return null;
  }

  return (
    <AuthsignalContext.Provider value={{ authsignal }}>
      {children}
    </AuthsignalContext.Provider>
  );
}

function useAuthsignal() {
  const context = React.useContext(AuthsignalContext);

  if (context === undefined) {
    throw new Error("useAuthsignal must be used within a AuthsignalProvider");
  }

  return context.authsignal;
}

export { AuthsignalProvider, useAuthsignal };
