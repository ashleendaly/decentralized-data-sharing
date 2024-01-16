import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "@/lib/thirdweb-dev";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Decentralised Personal Data Manager",
  description:
    "A personal data manager application that is powered by the InterPlanetary FileSystem and Ethereum blockchain.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThirdwebProvider
      clientId={process.env.THIRDWEB_CLIENT_ID}
      activeChain={"ethereum"}
      authConfig={{
        domain: process.env.APP_URL || "localhost:3000",
        authUrl: "/api/auth",
      }}
    >
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ThirdwebProvider>
  );
}
