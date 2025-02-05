"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { initializeIcons } from "@fluentui/react";
import { AppProvider } from "./contexts/AppContext";
import { UserContext, UserProvider } from "./contexts/UserContext";

const defaultBrowserHistory = {
  url: "/",
  location: { pathname: "" },
  listen: () => {},
  state: {
    url: "",
  },
};

let browserHistory = defaultBrowserHistory;
if (typeof window !== "undefined") {
  browserHistory = { ...browserHistory, ...window.history };
  browserHistory.location.pathname = browserHistory?.state?.url;
}

export default function App(props: Readonly<PropsWithChildren>) {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
    initializeIcons();
  }, []);
  useEffect(() => {
    if (!isSSR) {
      let browserHistory = { ...window.history };
      const currentPathname = window.location.pathname;
      const stateUrl = browserHistory.state?.url || "/";
      if (stateUrl !== currentPathname) {
        window.history.replaceState(browserHistory.state, "", stateUrl);
      }
    }
  }, [isSSR]);

  return (
    !isSSR && (
      <AppProvider>
        <UserProvider>{props.children}</UserProvider>
      </AppProvider>
    )
  );
}
