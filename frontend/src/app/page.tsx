"use client";

import { Subscribe } from "@/components/Subscribe";
import Overview from "@/components/Overview";
import { ReportBug } from "@/components/ReportBug";
import { BACKEND_URL } from "@/constants";
import { useEffect, useState } from "react";

interface AppsResponse {
  success: boolean;
  data: any[];
}

export default function Home() {
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      console.log(`${BACKEND_URL}/apps/`);
      const response = await fetch(`${BACKEND_URL}/apps/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      setApps(((await response.json()) as AppsResponse).data);
    })();
  }, []);

  return (
    <div className="bg-gray-bug">
      <div className="flex flex-col mx-auto items-center justify-center px-4 py-8 gap-4 sm-tablet:px-6 lg-tablet:py-16 sm-desktop:py-[124px] md-desktop:w-[1152px]">
        <div className="flex flex-col mr-auto gap-2 mb-4 sm-tablet:mb-6 lg-tablet:mb-8">
          <h1 className="h2 lg-tablet:h1">Platform Status</h1>
          <p className="p1 text-gray-04">
            Any issues with our applications will be shown below.
          </p>
        </div>
        <Overview apps={apps} />
        <ReportBug appNames={["Volume", "Scooped"]} />
        <Subscribe appNames={["Volume", "Scooped"]} />
      </div>
    </div>
  );
}
