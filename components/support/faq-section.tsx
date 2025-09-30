"use client";
import React, { useEffect, useMemo, useState } from "react";

import { SearchInput } from "./search-input";
import { FAQList } from "./faq-list";

import { supportsService } from "@/lib/api/supports";
import { useAuthStore } from "@/lib/store/auth-store";

export const FAQSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [faqs, setFaqs] = useState<
    { id: string; question: string; answer: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const user = useAuthStore((s) => s.user);
  const userTypeStore = useAuthStore((s) => s.userType);

  const userTypeParam = useMemo(() => {
    // Prefer backend-provided user.user_type ("Host"|"Chef"), fallback to store's lowercase userType
    if (user?.user_type === "Host" || user?.user_type === "Chef")
      return user.user_type;
    if (userTypeStore === "host") return "Host";
    if (userTypeStore === "chef") return "Chef";

    return "Host";
  }, [user?.user_type, userTypeStore]);

  useEffect(() => {
    let isMounted = true;
    const fetchFaqs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await supportsService.getFaqs(userTypeParam);
        const list = (data?.results || []).map((item) => ({
          id: String(item.id),
          question: item.question,
          answer: item.answer,
        }));

        if (isMounted) setFaqs(list);
      } catch (e: any) {
        if (isMounted) setError(e?.message || "Failed to load FAQs");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFaqs();

    return () => {
      isMounted = false;
    };
  }, [userTypeParam]);

  return (
    <section className="mt-6">
      <header>
        <h2 className="text-[#323335] text-lg font-medium">FAQs</h2>
        <p className="text-[#3F3E3D] text-[10px] font-normal mt-1">
          Need any help, contact us through the form or read our FAQs below for
          quick help.
        </p>
      </header>

      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search here"
      />

      {loading ? (
        <div className="text-center py-8 text-[#3F3E3D]">Loading FAQs...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500 text-sm">{error}</div>
      ) : (
        <FAQList faqs={faqs} searchTerm={searchTerm} />
      )}
    </section>
  );
};
