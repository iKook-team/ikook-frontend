import React from "react";

interface WarningCardProps {
  children: React.ReactNode;
  className?: string;
}

export const WarningCard: React.FC<WarningCardProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`flex w-full items-center gap-3 bg-[#FFFCF5] p-2 rounded-md ${className}`}
    >
      <div
        className="w-5 h-5 shrink-0 relative"
        role="img"
        aria-label="Warning"
      >
        <div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="warning-circle"
            style={{
              width: "20px",
              height: "20px",
              flexShrink: 0,
              fill: "#FDEEC5",
            }}
          >
            <circle cx="10" cy="10" r="10" fill="#FDEEC5" />
          </svg>
        </div>
        <div className="w-3 h-3 shrink-0 absolute left-1 top-1">
          <div>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="alert-icon"
              style={{
                width: "11px",
                height: "11px",
                flexShrink: 0,
                strokeWidth: "1px",
                stroke: "#A07A13",
              }}
            >
              <path
                d="M6 4V7M6 8.5V8.505M11.5 6C11.5 9.03757 9.03757 11.5 6 11.5C2.96243 11.5 0.5 9.03757 0.5 6C0.5 2.96243 2.96243 0.5 6 0.5C9.03757 0.5 11.5 2.96243 11.5 6Z"
                stroke="#A07A13"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex-1 text-[#323335] text-sm font-normal">
        {children}
      </div>
    </div>
  );
};
