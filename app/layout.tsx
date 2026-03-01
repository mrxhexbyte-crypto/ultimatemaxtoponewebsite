import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "ZAYX-OS - Web3 E-Commerce Platform",
  description: "Decentralized marketplace for physical and digital products. Pay with crypto, earn NFT receipts, and join the DAO.",
  keywords: ["Web3", "DeFi", "DAO", "Crypto", "E-Commerce", "NFT"],
  authors: [{ name: "ZAYX-OS" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050510",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

