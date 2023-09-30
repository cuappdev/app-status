import { DownInterval } from "@/models/DownInterval";
import React from "react";

export default function Timeline({
  appImgSrc,
  appName,
  lastUpdated,
  downIntervals,
}: {
  appImgSrc: string;
  appName: string;
  lastUpdated: Date;
  downIntervals: DownInterval;
}) {
  return (
    <div className="bg-white rounded-xl flex flex-col gap-6 items-stretch p-8">
      {/* Header row */}
      <div className="flex flex-row">
        <img src={appImgSrc} className=" app-icon-shadow" />
        <div className="flex flex-col"></div>
      </div>
    </div>
  );
}
