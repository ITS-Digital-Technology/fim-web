import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import styles from "./globals.module.scss";
import Header from '@/common/header/Header'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fim Web",
  description: "The fim project",
};

// Footer needs to skip SSR, otherwise it breaks hydration
const Footer = dynamic(() => import("@/components/footer/Footer"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
