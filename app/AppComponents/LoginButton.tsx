"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { LogInIcon } from "lucide-react";

function LoginButton() {
  return (
    <Button
      onClick={() => {
        signIn();
      }}
      variant={"outline"}
      className="text-lg"
    >
      Login <LogInIcon />
    </Button>
  );
}

export default LoginButton;
