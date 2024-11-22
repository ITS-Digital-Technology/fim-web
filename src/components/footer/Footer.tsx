"use client";

import styles from "./footer.module.scss";
import React, { useEffect, useState } from "react";

export default function Footer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
    setIsClient(true);
  }, []);

  return (
    <div className={styles.footer} aria-label="FIM WEB">
      {isClient && (
        <>
          <section
            x-data="NUGlobalElements.footer()"
            x-init="init()"
            suppressHydrationWarning
          ></section>
          <section
            x-data="NUGlobalElements.trustarc()"
            x-init="init()"
            suppressHydrationWarning
          ></section>
        </>
      )}
    </div>
  );
}
