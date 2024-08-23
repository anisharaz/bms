"use client";
import "@dialectlabs/blinks/index.css";
import { useState, useEffect } from "react";
import { Action, Blink, useAction } from "@dialectlabs/blinks";
import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import { clusterApiUrl, Connection } from "@solana/web3.js";

function ActionRenderer({ ActionUrl }: { ActionUrl: string }) {
  const [actionState, setactionState] = useState<Action | null>(null);
  const { adapter } = useActionSolanaWalletAdapter(
    // TODO: Change the network on user demand
    new Connection(clusterApiUrl("devnet"))
  );
  const { action } = useAction({
    url: ActionUrl,
    adapter: adapter,
  });
  useEffect(() => {
    setactionState(action);
  }, [action]);
  return actionState ? (
    <>
      <Blink
        action={actionState as Action}
        stylePreset="x-dark"
        websiteText={new URL(ActionUrl).hostname}
      />
    </>
  ) : (
    <div>Loading.....</div>
  );
}

export default ActionRenderer;
