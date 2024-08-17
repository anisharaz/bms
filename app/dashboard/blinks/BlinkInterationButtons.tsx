"use client";
import { DeleteBlink, ToggleProductionReady } from "@/app/action/database";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Bounce, toast } from "react-toastify";
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
        className="flex items-center gap-1 bg-red-700 hover:bg-red-800 text-primary-foreground rounded-lg lg:px-3 lg:py-1 px-2 py-1"
        onClick={async (e) => {
          e.stopPropagation();
          setLoading(true);
          const make_sure = confirm(
            "Are you sure you want to delete this blink?"
          );
          if (make_sure) {
            await DeleteBlink({ id: id });
            toast.info("Blink Deleted", {
              position: "bottom-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
          setLoading(false);
        }}
      >
        <Trash2Icon className="h-5 w-5" />
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
        className="flex items-center gap-1 text-primary-foreground rounded-lg lg:px-3 lg:py-1 px-2 py-1 bg-green-700 hover:bg-green-800"
        onClick={async (e) => {
          e.stopPropagation();
          setLoading(true);
          const res = await ToggleProductionReady({
            id: id,
            production: !production,
          });
          if (!res.success) {
            alert(res.message);
            setLoading(false);
            return;
          }
          setLoading(false);
          toast.warn("Production OFF", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
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
        className="flex items-center gap-1 text-primary-foreground rounded-lg lg:px-3 lg:py-1 px-2 py-1 bg-red-700 hover:bg-red-800"
        onClick={async (e) => {
          e.stopPropagation();
          setLoading(true);
          const res = await ToggleProductionReady({
            id: id,
            production: !production,
          });
          if (!res.success) {
            alert(res.message);
            setLoading(false);
            return;
          }
          setLoading(false);
          toast.success("Production ON", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
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
        className="flex items-center gap-1 hover:bg-sky-200 rounded-lg lg:text-md text-sm lg:px-2 lg:mr-3 text-black/80"
        onClick={(e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(
            `${window.location.origin}/viewblink/${id}`
          );
          toast.success("Link Copied !!", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }}
      >
        Copy Link
        <ClipboardListIcon className="lg:w-8 w-5" />
      </HoverCardTrigger>
      <HoverCardContent className="p-0 px-1 m-0 w-fit rounded-xl">
        Copy Link
      </HoverCardContent>
    </HoverCard>
  );
}
