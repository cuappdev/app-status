"use client";
import { App } from "@/models/App";
import { Severity } from "@/models/DownInterval";
import { formatSeverity, formatUpdateDate } from "@/utilities";
import AppIcon from "./AppIcon";
import BlocksAndDateTimeline from "./BlocksAndDateTimeline";
import BugReportBubble from "./BugReportBubble";
import StatusIcon from "./StatusIcon";

interface ComponentProps {
  app: App;
}

export default function TimelineCard({ app }: ComponentProps) {
  let severity: Severity | undefined = undefined;
  if (app.downIntervals[0] != null && app.downIntervals[0].endTime == null) {
    severity = app.downIntervals[0].severity;
  }

  return (
    <div className="bg-white rounded-xl flex flex-1 flex-col mobile:gap-6 gap-4 items-stretch p-8">
      {/* Outage status */}
      <div className="sm-tablet:hidden flex flex-row justify-center border-other rounded-xl items-center bg-gray-bug px-4 py-2">
        <StatusIcon severity={severity} />
        <div className="w-2" />
        <p className="p1">{formatSeverity(severity)}</p>
      </div>
      {/* Header row */}
      <div className="flex flex-row items-center ">
        <AppIcon imageUrl={app.imageUrl} />
        <div className="w-4" />
        <div className="flex flex-col">
          <div className="mobile:hidden">
            <h5> {app.name} </h5>
          </div>
          <div className="hidden mobile:flex">
            <h4> {app.name} </h4>
          </div>
          <p className="p3 mobile:p1 text-gray-06 w-full">
            {`Updated: ${formatUpdateDate(app.lastUpdated)}`}
          </p>
        </div>
        <div className="flex flex-1" />
        <div className="border-other flex-row rounded-[30px] hidden sm-tablet:flex items-center py-2 px-4">
          <StatusIcon severity={severity} />
          <div className="w-2" />
          <p className="p1">{formatSeverity(severity)}</p>
        </div>
      </div>

      <BlocksAndDateTimeline
        downIntervals={app.downIntervals}
        latestSeverity={severity}
      />

      {severity != undefined && (
        <BugReportBubble
          lastUpdated={
            severity == null
              ? app.downIntervals[0].endTime!!
              : app.downIntervals[0].startTime
          }
          description={app.downIntervals[0].description}
          resolved={severity == null}
        />
      )}
    </div>
  );
}
