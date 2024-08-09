"use client";
import { DeleteBlink, ToggleProductionReady } from "@/app/action/database";
import { Button } from "@/components/ui/button";
import {
  ClipboardListIcon,
  Loader2,
  ToggleLeftIcon,
  ToggleRightIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";

export function DeleteButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  return loading ? (
    <Button disabled>
      <Loader2 className="animate-spin" />
    </Button>
  ) : (
    <Button
      onClick={async (e) => {
        e.stopPropagation();
        setLoading(true);
        await DeleteBlink({ id: id });
        setLoading(false);
      }}
    >
      <Trash2Icon />
    </Button>
  );
}

export function ToggleActive({
  id,
  production,
}: {
  id: string;
  production: boolean;
}) {
  const [loading, setLoading] = useState(false);
  return loading ? (
    <Button disabled>
      <Loader2 className="animate-spin" />
    </Button>
  ) : production ? (
    <Button
      onClick={async (e) => {
        e.stopPropagation();
        setLoading(true);
        await ToggleProductionReady({ id: id, production: !production });
        setLoading(false);
      }}
      className="bg-green-700 hover:bg-green-800"
    >
      <ToggleRightIcon />
    </Button>
  ) : (
    <Button
      onClick={async (e) => {
        e.stopPropagation();
        setLoading(true);
        await ToggleProductionReady({ id: id, production: !production });
        setLoading(false);
      }}
      className="bg-red-700 hover:bg-red-800"
    >
      <ToggleLeftIcon />
    </Button>
  );
}

// TODO: add copy link functionality
export function CopyLink() {
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      Copy <ClipboardListIcon />
    </Button>
  );
}
