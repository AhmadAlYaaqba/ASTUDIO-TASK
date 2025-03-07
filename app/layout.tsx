import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/lib/providers";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "ASTUDIO Practical Assessment",
  description: "ASTUDIO Practical Assessment - Ahmad Alyaaqba",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-neutra">
        <Providers>
          <Navbar />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

import "./globals.css";
