import type { Metadata } from "next";

import { roboto } from "@/fonts";
import "./globals.css";

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
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
