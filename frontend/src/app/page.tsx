"use client";

import Overview from "@/components/Overview";
import { ReportBug } from "@/components/ReportBug";

export default function Home() {
  return (
    <div className="bg-gray-bug flex flex-col items-center justify-center h-screen">
      <Overview />
      <ReportBug appNames={["Volume", "Scooped"]} />
    </div>
  );
}
