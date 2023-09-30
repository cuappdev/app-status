"use client";

import { Subscribe } from "@/components/Subscribe";
import Overview from "@/components/Overview";
import { ReportBug } from "@/components/ReportBug";
import { App } from "@/models/App";
import { Severity } from "@/models/DownInterval";
import { BACKEND_URL } from "@/constants";
import { useEffect, useState } from "react";

export default function Home() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${BACKEND_URL}/apps/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      setApps(await response.json());
    })();
  }, []);

  return (
    <div className="bg-gray-bug flex flex-col items-center justify-center px-4 py-6 gap-4">
      <div className="flex flex-col mr-auto">
        <h2>Platform Status</h2>
        <p className="p1 text-gray-04">
          Any issues with our applications will be shown below.
        </p>
      </div>
      <Overview apps={apps} />
      <ReportBug appNames={["Volume", "Scooped"]} />
      <Subscribe appNames={["Volume", "Scooped"]} />
    </div>
  );
}
