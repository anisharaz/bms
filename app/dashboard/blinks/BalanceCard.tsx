import { conn } from "@/lib/solana";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

async function BalanceCard({ WalletAddress }: { WalletAddress: string }) {
  let balance = null;
  try {
    balance = await conn.getBalance(new PublicKey(WalletAddress));
  } catch (error) {}
  return (
    <div>
      <span className="font-bold">Wallet Balance : </span>
      <span>
        {balance === null ? (
          <span className="text-red-600">No Wallet Address added</span>
        ) : (
          <>
            <span className="text-purple-700">
              {(balance / LAMPORTS_PER_SOL).toFixed(4)} SOL
            </span>
          </>
        )}
      </span>
    </div>
  );
}

export default BalanceCard;
