import React from "react";

export default function EventBlock() {
  return (
    <div className="absolute h-[167px] left-[127px] top-[116px] w-[106px]">
      <div className="absolute top-0 left-0 bg-amber-400 rounded-md h-[167px] w-[106px]" />
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<svg style="width:20px;height:20px;flex-shrink:0;border-radius:20px;border:1px solid #FFF;background:url(<path-to-image>) lightgray 50% / cover no-repeat;position:absolute;left:10px;top:20px" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <circle cx="10" cy="10" r="9.5" fill="url(#pattern0_1954_24144)" stroke="white"></circle> <defs> <pattern id="pattern0_1954_24144" patternContentUnits="objectBoundingBox" width="1" height="1"> <use xlink:href="#image0_1954_24144" transform="translate(0 -0.25) scale(0.0025)"></use> </pattern>  </defs> </svg>',
        }}
      />
      <div className="absolute text-xs h-[15px] left-[85px] text-zinc-800 top-[18px] w-[7px]">
        ...
      </div>
      <div className="absolute left-2.5 top-12 w-10 text-xs text-white h-[15px]">
        8:00 AM
      </div>
      <div className="absolute left-2.5 text-xs text-white h-[30px] top-[70px] w-[74px]">
        Chef at Home with Laura Ben
      </div>
    </div>
  );
}
