import React from "react";

import { QuoteForm } from "@/components/quotes/quote-form";
import { CreateSidebar } from "@/components/quotes/create-sidebar";

export const CreateQuotePage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center mt-9 max-w-full w-full px-4">
      <div className="w-full max-w-[885px]">
        <h1 className="self-start text-2xl font-semibold leading-none text-black">
          Create Quote
        </h1>

        <div className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:">
            <section className="w-[57%] max-md:ml-0 max-md:w-full">
              <QuoteForm />
            </section>
            <aside className="ml-5 w-[43%] max-md:ml-0 max-md:w-full">
              <CreateSidebar />
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateQuotePage;
