"use client";

import {
  useState,
  createContext,
  useMemo,
  useCallback,
  PropsWithChildren,
  useEffect,
} from "react";
import Spinner from "../../components/common/spinner/Spinner";
import { MsalProvider } from "@azure/msal-react";
import { useSessionStorage } from "react-use";
import {
  RefreshTokens,
  RefreshIfNone,
  useMsalClient,
} from "@/hooks/useMsalClient";
import { baseUrl } from "@/src/apiConfig";

export enum TokenTypes {
  DEFAULT,
  STUDENT,
  COMMUNITY,
}

export interface AppContextProps {
  MStoken?: string;
  BEtoken?: string;
  studentBEtoken?: string;
  communityBEtoken?: string;
  getToken(type: TokenTypes, url: string): string | undefined;
  refreshToken: RefreshTokens;
  refreshIfNone: RefreshIfNone;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

const useSessionToken = (key: string) =>
  useSessionStorage<string | undefined>(key);

export const AppProvider: React.FC<PropsWithChildren> = (props) => {
  const [MStoken, setMStoken] = useSessionToken("MStoken");
  const [BEtoken, setBEtoken] = useSessionToken("BEtoken");
  const [hastokens, setHastokens] = useState(false);

  const {
    error,
    client,
    refreshTokens: refreshToken,
    refreshIfNone,
  } = useMsalClient({
    tokens: [MStoken, BEtoken],
    onLogin(token1, token2, token3, token4) {
      setMStoken(token1);
      setBEtoken(token2);
     
    },
    onLogout() {
      setMStoken(undefined);
      setBEtoken(undefined);
    
    },
  });

  const getToken = useCallback(
    (type: TokenTypes, url: string) => {
      const sendToken =
        url.startsWith(baseUrl) 
      

      if (!sendToken) return undefined;

      switch (type) {
       
        default:
          return BEtoken;
      }
    },
    [BEtoken]
  );

  const value: AppContextProps = useMemo(
    () => ({
      MStoken,
      BEtoken,
     
      getToken,
      refreshToken,
      refreshIfNone,
    }),
    [
      MStoken,
      BEtoken,
     
      getToken,
      refreshToken,
      refreshIfNone,
    ]
  );
  useEffect(() => {
    setHastokens(
      Boolean(MStoken && BEtoken)
    );
  }, [MStoken, BEtoken]);

  return !client ? null : (
    <AppContext.Provider value={value}>
      <MsalProvider instance={client}>
        {error && (
          <>
            <p style={{ textAlign: "center" }}>{error}</p>
            <p style={{ textAlign: "center" }}>Refresh the page to try again</p>
          </>
        )}
        {!error && !hastokens && <Spinner />}
        {!error && hastokens && props.children}
      </MsalProvider>
    </AppContext.Provider>
  );
};
