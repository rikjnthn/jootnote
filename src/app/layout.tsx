import type { Metadata } from "next";

import { roboto } from "@/fonts";
import "./globals.css";
import PocketbaseProvider from "@/context/pocketbase-context";

export const metadata: Metadata = {
  title: "JootNote",
  description: "Note App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const API_URL = process.env.API_URL;

  return (
    <html lang="en">
      <PocketbaseProvider API_URL={API_URL}>
        <body className={roboto.className}>{children}</body>
      </PocketbaseProvider>
    </html>
  );
}
