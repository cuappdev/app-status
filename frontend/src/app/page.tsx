"use client";

import Overview from "@/components/Overview";
import { ReportBug } from "@/components/ReportBug";
import Timeline from "@/components/Timeline";
import { App } from "@/models/App";

export default function Home() {
  const test = {
    name: "AppDev",
    downIntervals: [],
    lastUpdated: new Date(),
    imageUrl: undefined,
  } as App;
  return (
    <div className="bg-gray-bug flex flex-col items-center justify-center h-screen">
      <Overview />
      <ReportBug appNames={["Volume", "Scooped"]} />
      <Timeline app={test} />
    </div>
  );
}
