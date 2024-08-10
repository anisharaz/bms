"use client";
import { DeleteBlink, ToggleProductionReady } from "@/app/action/database";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
    <HoverCard>
      <HoverCardTrigger
        className="flex items-center gap-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-3"
        onClick={async (e) => {
          e.stopPropagation();
          setLoading(true);
          const make_sure = confirm(
            "Are you sure you want to delete this blink?"
          );
          if (make_sure) {
            await DeleteBlink({ id: id });
          }
          setLoading(false);
        }}
      >
        <Trash2Icon />
      </HoverCardTrigger>
      <HoverCardContent className="p-0 px-1 m-0 w-fit rounded-xl">
        Delete Item
      </HoverCardContent>
    </HoverCard>
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
    <HoverCard>
      <HoverCardTrigger
        className="flex items-center gap-1 text-primary-foreground rounded-lg px-3 py-1 bg-green-700 hover:bg-green-800"
        onClick={async (e) => {
          e.stopPropagation();
          setLoading(true);
          const res = await ToggleProductionReady({
            id: id,
            production: !production,
          });
          if (!res.success) {
            alert(res.message);
          }
          setLoading(false);
        }}
      >
        <ToggleRightIcon />
      </HoverCardTrigger>
      <HoverCardContent className="p-0 px-1 m-0 w-fit rounded-xl">
        Toggle to Production Mode
      </HoverCardContent>
    </HoverCard>
  ) : (
    <HoverCard>
      <HoverCardTrigger
        className="flex items-center gap-1 text-primary-foreground rounded-lg px-3 py-1 bg-red-700 hover:bg-red-800"
        onClick={async (e) => {
          e.stopPropagation();
          setLoading(true);
          const res = await ToggleProductionReady({
            id: id,
            production: !production,
          });
          if (!res.success) {
            alert(res.message);
          }
          setLoading(false);
        }}
      >
        <ToggleLeftIcon />
      </HoverCardTrigger>
      <HoverCardContent className="p-0 px-1 m-0 w-fit rounded-xl">
        Toggle to Production Mode
      </HoverCardContent>
    </HoverCard>
  );
}

export function CopyLink({ id }: { id: string }) {
  return (
    <HoverCard>
      <HoverCardTrigger
        className="flex items-center gap-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-1"
        onClick={(e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(
            `${window.location.origin}/viewblink/${id}`
          );
          alert("Link copied to clipboard");
        }}
      >
        <div>Copy</div>
        <ClipboardListIcon />
      </HoverCardTrigger>
      <HoverCardContent className="p-0 px-1 m-0 w-fit rounded-xl">
        Copy Link
      </HoverCardContent>
    </HoverCard>
  );
}
