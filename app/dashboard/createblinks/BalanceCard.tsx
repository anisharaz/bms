import { conn } from "@/lib/solana";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

async function BalanceCard({ WalletAddress }: { WalletAddress: string }) {
  const balance = await conn.getBalance(new PublicKey(WalletAddress));
  return (
    <div>
      Wallet Balance :{" "}
      <span>
        {(balance / LAMPORTS_PER_SOL).toFixed(4)}{" "}
        <span className="text-purple-700">SOL</span>
      </span>
    </div>
  );
}

export default BalanceCard;
