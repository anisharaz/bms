"use client";

import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import dynamic from "next/dynamic";

const WalletProviderDynamic = dynamic(
  async () => (await import("@solana/wallet-adapter-react")).WalletProvider,
  { ssr: false }
);
const WalletModalProviderDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
  { ssr: false }
);
function WalletContextProvider({ children }: { children: React.ReactNode }) {
  const endpoint = clusterApiUrl("devnet");
  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProviderDynamic wallets={[]} autoConnect={true}>
          <WalletModalProviderDynamic>{children}</WalletModalProviderDynamic>
        </WalletProviderDynamic>
      </ConnectionProvider>
    </>
  );
}

export default WalletContextProvider;
