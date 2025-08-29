"use client";
import * as React from "react";

interface FaqItemProps {
  question: string;
  isLast?: boolean;
}

export function FaqItem({ question, isLast = false }: FaqItemProps) {
  const [open, setOpen] = React.useState(false);

  const toggle = () => setOpen((v) => !v);

  return (
    <>
      <div className="mt-6 w-full max-w-[1148px] max-md:max-w-full">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          className="flex w-full items-start justify-between gap-5 text-left"
        >
          <h3 className="text-2xl text-zinc-800">{question}</h3>
          <img
            src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d7681fc5563c43b6a7b0250d1f56706ba304c446?placeholderIfAbsent=true"
            className={`object-contain shrink-0 aspect-[0.97] w-[37px] transition-transform duration-200 ${
              open ? "rotate-180" : "rotate-0"
            }`}
            alt={open ? "Collapse FAQ" : "Expand FAQ"}
          />
        </button>

        {open && (
          <div className="mt-3 text-base text-zinc-700 leading-relaxed">
            This is a placeholder answer. We will provide detailed information here soon. For now, this demonstrates the expand/collapse behavior.
          </div>
        )}
      </div>

      {!isLast && (
        <img
          src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/99350048a26e156737f6109607aced39c1f70249?placeholderIfAbsent=true"
          className="object-contain mt-7 w-full aspect-[500] max-w-[1171px] max-md:max-w-full"
          alt="Divider"
        />
      )}
    </>
  );
}
