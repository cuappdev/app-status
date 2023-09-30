"use client";

import { Subscribe } from "@/components/Subscribe";
import Overview from "@/components/Overview";
import { ReportBug } from "@/components/ReportBug";
import { App } from "@/models/App";
import { Severity } from "@/models/DownInterval";

export default function Home() {
  return (
    <div className="bg-gray-bug flex flex-col items-center justify-center px-4 py-6 gap-4">
      <div className="flex flex-col gap-2">
        <h2>Platform Status</h2>
        <p className="p1 text-gray-04">
          Any issues with our applications will be shown below.
        </p>
      </div>
      <Overview apps={dummyApps} />
      <ReportBug appNames={["Volume", "Scooped"]} />
      <Subscribe appNames={["Volume", "Scooped"]} />
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
