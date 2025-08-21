import React from 'react';

interface ChatHeaderProps {
  userName: string;
  status: string;
}

export function ChatHeader({ userName, status }: ChatHeaderProps) {
  return (
    <header className="relative">
      <div className="flex absolute left-px gap-16 items-center h-11 top-[9px] w-[209px] max-md:gap-5 max-md:justify-start max-md:px-5 max-md:py-0 max-md:w-full max-sm:gap-3 max-sm:px-3 max-sm:py-0">
        <div className="flex relative gap-1 items-end">
          <button className="flex relative flex-col gap-2.5 items-start p-2.5 bg-white rounded-[30px]">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  "<svg id=\"2076:30130\" layer-name=\"chevron/left\" width=\"27\" height=\"24\" viewBox=\"0 0 27 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"back-icon\" style=\"width: 26.071px; height: 24px; position: relative\"> <path d=\"M16.071 6L10.3213 11.2929C9.89712 11.6834 9.89712 12.3166 10.3213 12.7071L16.071 18\" stroke=\"#020101\" stroke-width=\"2\" stroke-linecap=\"round\"></path> </svg>",
              }}
            />
          </button>
          <div className="flex relative flex-col items-start">
            <h2 className="relative text-base font-semibold text-zinc-800 w-[137px] max-sm:w-auto max-sm:text-sm">
              {userName}
            </h2>
            <p className="relative text-xs font-light text-neutral-500 max-sm:text-xs">
              {status}
            </p>
          </div>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html:
            "<svg id=\"2076:30134\" width=\"656\" height=\"2\" viewBox=\"0 0 656 2\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"divider-line\" style=\"width: 655px; height: 0px; stroke-width: 1px; stroke: #CFCFCE; position: absolute; left: -1px; top: 66px\"> <path d=\"M0.486328 1H655.014\" stroke=\"#CFCFCE\"></path> </svg>",
        }}
      />
    </header>
  );
}
