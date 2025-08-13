import { ReactNode } from "react";
import { Navigation } from "@/components/auth/Navigation";

export default function ReferencesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
