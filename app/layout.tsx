import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthSessionProvider } from "./context/AuthSessionProvider";
import WalletContextProvider from "./context/WalletProvider";
import AppBar from "./AppComponents/AppBar";
const lato = Lato({ weight: "400", subsets: ["latin"] });
export const metadata: Metadata = {
  title: "No Code Blink | BMS",
  description:
    "Create solana Blinks without writing a single line of code or deployment",
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
          <AppBar />
          <WalletContextProvider>{children}</WalletContextProvider>
        </body>
      </AuthSessionProvider>
    </html>
  );
}
