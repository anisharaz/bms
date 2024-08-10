import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { AuthSessionProvider } from "./context/AuthSessionProvider";
import WalletContextProvider from "./context/WalletProvider";
const lato = Lato({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthSessionProvider>
        <body className={lato.className}>
          <WalletContextProvider>{children}</WalletContextProvider>
        </body>
      </AuthSessionProvider>
    </html>
  );
}
