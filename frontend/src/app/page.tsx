"use client";

import Overview from "@/components/Overview";
import { App } from "@/models/App";
import { Severity } from "@/models/DownInterval";
import { ReportBug } from "@/components/ReportBug";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <div className="bg-black flex flex-col items-center justify-center h-screen">
      <Overview apps={dummyApps} />
    </div>
  );
}
const dummyApps: App[] = [
  {
    id: "1",
    name: "Volume",
    downIntervals: [],
    lastUpdated: new Date(),
  },
  {
    id: "2",
    name: "Volume",
    downIntervals: [],
    lastUpdated: new Date(),
  },
  {
    id: "3",
    name: "Volume",
    downIntervals: [],
    lastUpdated: new Date(),
  },
  {
    id: "4",
    name: "Volume",
    downIntervals: [
      {
        severity: Severity.Medium,
        description: "",
        startTime: new Date(),
      },
    ],
    lastUpdated: new Date(),
  },
  {
    id: "5",
    name: "Volume",
    downIntervals: [
      {
        severity: Severity.High,
        description: "",
        startTime: new Date(),
      },
    ],
    lastUpdated: new Date(),
  },
  {
    id: "6",
    name: "Volume",
    downIntervals: [
      {
        severity: Severity.High,
        description: "",
        startTime: new Date(),
      },
    ],
    lastUpdated: new Date(),
  },
];
