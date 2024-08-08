"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <Button
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </Button>
  );
}

export default LogoutButton;
