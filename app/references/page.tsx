import React from "react";

import { ReferenceList } from "@/components/reference/reference-list";
import BackButton from "@/components/common/BackButton";

export default function ReferencesPage() {
  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative flex justify-center">
        <div className="w-full max-w-4xl px-4 py-8">
          <div className="mb-4">
            <BackButton fallback="/dashboard" />
          </div>
          <ReferenceList />
        </div>
      </main>
    </div>
  );
}
