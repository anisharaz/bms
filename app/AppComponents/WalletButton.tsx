"use client";
import dynamic from "next/dynamic";
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
export default function WalletButton() {
  return (
    <WalletMultiButtonDynamic
      style={{
        padding: "5px 10px",
        borderRadius: "5px",
        height: "34px",
      }}
      className="bg-primary hover:bg-primary/90"
    />
  );
}
