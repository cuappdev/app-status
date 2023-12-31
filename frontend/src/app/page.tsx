"use client";
import Overview from "@/components/Overview";
import { PageFooter } from "@/components/PageFooter";
import PageHeader from "@/components/PageHeader";
import { ReportBug } from "@/components/ReportBug";
import { Subscribe } from "@/components/Subscribe";
import { Timeline } from "@/components/Timeline";
import TimelineCard from "@/components/TimelineCard";
import { BACKEND_URL } from "@/constants";
import { App } from "@/models/App";
import { useEffect, useState } from "react";

interface AppsResponse {
  success: boolean;
  data: any[];
}

export default function Home() {
  const [apps, setApps] = useState<any[]>([]);
  const [appNames, setAppNames] = useState<string[]>([]);
  const [selectedApp, setSelectedApp] = useState<App | undefined>();

  useEffect(() => {
    (async () => {
      const response = await fetch(`${BACKEND_URL}/apps/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const apps = ((await response.json()) as AppsResponse).data;
      setApps(apps);
      setAppNames(apps.map((app) => app.name));
      setSelectedApp(apps[0]);
    })();
  }, []);

  return (
    <div className="bg-gray-bug overflow-hidden">
      <PageHeader />
      <div className="flex flex-col mx-auto items-center justify-center px-4 pt-8 gap-4 lg-tablet:px-6 lg-tablet:pt-16 sm-desktop:pt-[124px] sm-desktop:w-[1152px]">
        <div className="flex flex-col mr-auto gap-2 mb-4 sm-tablet:mb-6 lg-tablet:mb-8">
          <h1 className="h2 lg-tablet:h1">Platform Status</h1>
          <p className="p1 text-gray-04">
            Any issues with our applications will be shown below.
          </p>
        </div>
        <div className="flex flex-col sm-desktop:hidden w-full gap-4">
          <Overview
            apps={apps}
            selectedApp={selectedApp}
            setSelectedApp={setSelectedApp}
          />
          {selectedApp !== undefined ? (
            <TimelineCard key={selectedApp?.id} app={selectedApp} />
          ) : null}
          <Subscribe appNames={appNames} />
          <ReportBug appNames={appNames} />
        </div>
        <div className="flex-row hidden sm-desktop:flex gap-4 w-full">
          <div className="flex flex-col gap-4 sm-desktop:w-[540px]">
            <Overview
              apps={apps}
              selectedApp={selectedApp}
              setSelectedApp={setSelectedApp}
            />
            <Subscribe appNames={appNames} />
            <ReportBug appNames={appNames} />
          </div>
          <Timeline apps={apps} />
        </div>
        <PageFooter />
      </div>
    </div>
  );
}
