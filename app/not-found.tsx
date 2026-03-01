'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto flex h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-extrabold tracking-tighter text-primary">404</h1>
      <h2 className="mt-4 text-4xl font-bold">Page Not Found</h2>
      <p className="mx-auto mt-6 max-w-xl text-xl text-muted-foreground">
        Oops! It seems like you've stumbled upon a cosmic anomaly. The page you were looking for doesn't exist in this universe.
      </p>
      <div className="mt-10">
        <Button asChild size="lg">
          <Link href="/">Return to Home Base</Link>
        </Button>
      </div>
    </div>
  );
}
