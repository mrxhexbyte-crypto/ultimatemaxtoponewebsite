"use client";

import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-xs">
        <h1 className="text-center text-2xl font-bold mb-4">Login</h1>
        <div className="space-y-4">
          <Button className="w-full">Login with Email</Button>
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}
