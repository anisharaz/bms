"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import WalletButton from "../WalletButton";

function WalletConnectVerifyPipe({ children }: { children: React.ReactNode }) {
  const wallet = useWallet();
  return wallet.connected ? children : <WalletButton />;
}

export default WalletConnectVerifyPipe;
