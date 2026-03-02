import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/lib/web3-provider";
import { CommerceProvider } from "@/lib/commerce-context";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-display",
  weight: ['400', '500', '600', '700']
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ['400', '500', '700']
});

export const metadata: Metadata = {
  title: "ZAYX-OS - Next-Gen Web3 Commerce Platform",
  description: "The ultimate decentralized marketplace. Buy physical & digital products with crypto. NFT receipts. DAO governance. On-chain everything.",
  keywords: ["Web3", "DeFi", "DAO", "Crypto", "E-Commerce", "NFT", "Blockchain", "Decentralized"],
  authors: [{ name: "ZAYX-OS" }],
  openGraph: {
    title: "ZAYX-OS",
    description: "Next-generation Web3 e-commerce platform",
    url: "https://zayx-os.com",
    siteName: "ZAYX-OS",
    images: [
      {
        url: "https://zayx-os.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050510",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${dmSans.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#050510" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-gradient-to-br from-[#050510] via-[#0a0a1a] to-[#050510] text-white overflow-x-hidden">
        <Web3Provider>
          <CommerceProvider>
            {children}
          </CommerceProvider>
        </Web3Provider>
      </body>
    </html>
  );
}



