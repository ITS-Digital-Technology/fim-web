"use client";

import { useEffect, useCallback, useState } from "react";
import { EventType, PublicClientApplication } from "@azure/msal-browser";
import { configuration, initializeAuth } from "@/utils/token";
import { isTokenAbsent } from "@/utils/jwt";

type Tokens = Array<string | undefined>;

export type MsalClientOpts = {
  tokens: Tokens;
  onLogin(...tokens: Tokens): void;
  onLogout(): void;
};

export type RefreshTokens = () => Promise<void>;
export type RefreshIfNone = (token?: string) => Promise<void>;

const client = new PublicClientApplication(configuration);

export const useMsalClient = (opts: MsalClientOpts) => {
  const [error, setError] = useState<string>();

  const refreshTokens = useCallback<RefreshTokens>(
    async () => {
      opts.onLogout();
      setError(undefined);
      try {
        const result = await client.handleRedirectPromise();
        const tokens = await initializeAuth(client, result?.account);
        opts.onLogin(...tokens);
      } catch (e) {
        setError((e as Error).message);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...opts.tokens]
  );

  const refreshIfNone = useCallback<RefreshIfNone>(
    async (token?: string) => {
      const tokens = token ? [token] : opts.tokens;
      if (tokens.some(isTokenAbsent)) {
        await refreshTokens();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...opts.tokens]
  );

  useEffect(
    () => {
      client.initialize().then(() => refreshIfNone());

      return handleLogout(client, opts.onLogout);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    error,
    client,
    refreshTokens,
    refreshIfNone,
  };
};

function handleLogout(client: PublicClientApplication, onLogout: () => void) {
  const logout = client.addEventCallback((message) => {
    if (message.eventType === EventType.LOGOUT_START) {
      onLogout();
    }
  });
  return () => {
    if (logout) client.removeEventCallback(logout);
  };
}
