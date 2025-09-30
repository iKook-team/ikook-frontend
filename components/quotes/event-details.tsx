import React from "react";

interface Props {
  booking?: any | null;
  loading?: boolean;
}

export const EventDetails: React.FC<Props> = ({ booking, loading = false }) => {
  const dateText = React.useMemo(() => {
    const d = booking?.event_date;

    if (!d) return undefined;
    try {
      const dt = new Date(d);

      if (isNaN(dt.getTime())) return String(d);

      return dt.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return String(d);
    }
  }, [booking?.event_date]);

  const addressText = React.useMemo(() => {
    if (!booking) return undefined;
    const parts = [booking.address, booking.city, booking.country].filter(
      Boolean,
    );

    return parts.length ? parts.join(", ") : undefined;
  }, [booking?.address, booking?.city, booking?.country]);

  const guestsText = React.useMemo(() => {
    const n = booking?.num_of_guests;

    if (!(typeof n === "number")) return undefined;

    return `${n} Guest${n === 1 ? "" : "s"}`;
  }, [booking?.num_of_guests]);

  return (
    <div className="flex flex-col items-start self-start mt-7 text-sm leading-none text-black">
      {dateText && (
        <div className="flex gap-2 items-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3f07306ff168cdfbbc1ec048a31ae9cad545073c?placeholderIfAbsent=true"
            className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
            alt="Calendar"
          />
          <span className="self-stretch my-auto">{dateText}</span>
        </div>
      )}
      {addressText && (
        <div className="flex gap-2 items-center self-stretch mt-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/1420f97bee27b190a8f78da5d687cc5ea7c2de9a?placeholderIfAbsent=true"
            className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
            alt="Location"
          />
          <span className="self-stretch my-auto">{addressText}</span>
        </div>
      )}
      {typeof booking?.num_of_guests === "number" && (
        <div className="flex gap-2 items-center mt-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/70435404a95f8790c51695afdaf73c024aa768ca?placeholderIfAbsent=true"
            className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
            alt="Guests"
          />
          <span className="self-stretch my-auto">{guestsText}</span>
        </div>
      )}
    </div>
  );
};
