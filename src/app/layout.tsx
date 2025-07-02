import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wall - Facebook 2009 Style",
  description: "A Facebook 2009-style wall application built with Next.js 15 and React 19",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
