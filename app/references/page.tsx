import React from "react";

import { ReferenceList } from "@/components/reference/reference-list";

export default function ReferencesPage() {
  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative flex justify-center">
        <ReferenceList />
      </main>
    </div>
  );
}
