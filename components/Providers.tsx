'use client';

import { Web3Modal } from "@/context/Web3Modal";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Web3Modal>{children}</Web3Modal>;
};
