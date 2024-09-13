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
  return (
    <html lang="en">
      <PocketbaseProvider>
        <body className={roboto.className}>{children}</body>
      </PocketbaseProvider>
    </html>
  );
}
