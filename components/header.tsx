import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <Link href="/" className="font-bold text-xl">
        ZAYX-OS
      </Link>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </header>
  );
}
