"use client";
import * as React from "react";
import Link from "next/link";

import { MessageItem } from "./message-item";

import { supportsService, type TicketItem } from "@/lib/api/supports";

const GRAVATAR_FALLBACK =
  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

const formatDate = (iso: string): string => {
  try {
    const d = new Date(iso);

    return d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

// Time display removed per design

export function MessagesList() {
  const [tickets, setTickets] = React.useState<TicketItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await supportsService.getTickets();

        if (!active) return;
        const list = Array.isArray(data?.results) ? data.results : [];
        // Group by admin.id and keep the most recent ticket per admin
        const byAdmin = new Map<number, TicketItem>();

        for (const t of list) {
          const key = t.admin?.id;
          const prev = key != null ? byAdmin.get(key) : undefined;

          if (key == null) continue;
          if (!prev) {
            byAdmin.set(key, t);
          } else {
            const prevDate = new Date(prev.created_at).getTime();
            const currDate = new Date(t.created_at).getTime();

            if (currDate > prevDate) byAdmin.set(key, t);
          }
        }
        setTickets(Array.from(byAdmin.values()));
      } catch (e: any) {
        if (!active) return;
        setError(e?.message || "Failed to load messages");
      } finally {
        if (!active) return;
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section>
      <h2 className="mt-8 text-base font-medium text-zinc-800">
        Previous messages
      </h2>
      <div className="mt-4 mb-0 max-md:mb-2.5 max-md:max-w-full">
        {loading && (
          <div className="text-center py-6 text-neutral-500">Loading...</div>
        )}
        {error && !loading && (
          <div className="text-center py-6 text-red-500 text-sm">{error}</div>
        )}
        {!loading && !error && tickets.length === 0 && (
          <div className="text-center py-6 text-neutral-500">No messages</div>
        )}
        {!loading &&
          !error &&
          tickets.map((t) => {
            const admin: any = t.admin || {};
            const first = admin.first_name ?? admin.firstName ?? "";
            const last = admin.last_name ?? admin.lastName ?? "";
            let name = `${first} ${last}`.trim();

            if (!name)
              name = admin.name || admin.full_name || admin.username || "Admin";
            const avatarSrc = t.admin?.avatar || GRAVATAR_FALLBACK;
            const messagePreview = t.category || ""; // show category under name
            const date = formatDate(t.created_at);

            return (
              <Link
                key={t.id}
                href={`/support/messages/chat?ticket=${t.id}`}
                className="block"
              >
                <MessageItem
                  avatarSrc={avatarSrc}
                  name={name}
                  messagePreview={messagePreview}
                  date={date}
                />
              </Link>
            );
          })}
      </div>
    </section>
  );
}
