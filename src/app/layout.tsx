import dynamic from "next/dynamic";
import React, { PropsWithChildren } from "react";
import styles from "./globals.module.scss";
import Header from "@/common/header/Header";

import App from "./app";

// Footer needs to skip SSR, otherwise it breaks hydration

export const metadata = {
  title: "CX Dashboard",
};

const RootLayout: React.FC<PropsWithChildren> = (props) => (
  <html lang="en">
    <head>
      {/* App Icons */}
      <link rel="icon" href="/favicon.ico" sizes="32x32"></link>
      <link rel="icon" href="/icon.svg" type="image/svg+xml"></link>
      <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
      <link rel="manifest" href="/manifest.webmanifest"></link>
      <script>window.dataLayer = window.dataLayer || [];</script>
    </head>
    <body className={styles.body}>
      <App>
        <Header />

        <main id="main">{props.children}</main>
      </App>
    </body>
  </html>
);

export default RootLayout;
