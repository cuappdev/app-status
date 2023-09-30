"useclient";
import { DownInterval, Severity } from "@/models/DownInterval";
import React from "react";
import { severityToBgColor } from "@/utilities";

export default function BlocksAndDateTimeline({
  downIntervals,
  latestSeverity,
}: {
  downIntervals: DownInterval[];
  latestSeverity: Severity | undefined;
}) {
  const timeline: (Severity | undefined)[] = Array(72).fill(undefined);
  timeline[0] = latestSeverity;
  const future = new Date();
  future.setHours(future.getHours() + 1);

  const getHoursAgo = (i: number) => {
    const hoursAgo = new Date();
    hoursAgo.setHours(hoursAgo.getHours() - i);
    return hoursAgo;
  };

  for (let i = 1; i < 72; i++) {
    for (const { startTime, endTime, severity } of downIntervals) {
      const trueEnd = endTime ?? future;
      const iHoursAgo = getHoursAgo(i);
      if (startTime <= iHoursAgo && iHoursAgo <= trueEnd) {
        timeline[i] = severity;
        break;
      }
    }
  }
  timeline.reverse();
  console.log(timeline);

  const TimelineBlock = ({ severity }: { severity: Severity | undefined }) => {
    switch (severity) {
      case Severity.High: {
        return <div className="rounded-xl h-4 bg-failure" />;
      }
      case Severity.Medium: {
        return <div className="rounded-xl h-8 bg-warning" />;
      }
      default: {
        return <div className="rounded-xl h-12 bg-success" />;
      }
    }
  };

  return (
    <>
      {/* Blocks and Date Mobile */}
      <div className="sm:hidden">
        <p className="text-gray-06 p3">Timeline</p>
        <div className="h-2" />
        <div className="grid grid-flow-col gap-1 justify-stretch h-12 items-end">
          {timeline.slice(timeline.length - 24).map((elt, i) => (
            <TimelineBlock severity={elt} key={i} />
          ))}
        </div>
        <div className="h-2" />

        <div className="flex flex-row justify-end">
          <p className="p3 text-gray-04">Last 24 hours</p>
        </div>
      </div>
      {/* Blocks and Date small tablet */}
      <div className="hidden sm:block lg:hidden">
        <p className="text-gray-06 p1">Timeline</p>
        <div className="h-2" />
        <div className="grid grid-flow-col  gap-1 justify-stretch h-12 items-end">
          {timeline.slice(timeline.length - 48).map((elt, i) => (
            <TimelineBlock severity={elt} key={i} />
          ))}
        </div>
        <div className="h-2" />

        <div className="flex flex-row justify-end">
          <p className="p1 text-gray-04">Last 48 hours</p>
        </div>
      </div>
      {/* Blocks and date large */}
      <div className="hidden lg:flex flex-col">
        <p className="text-gray-06 p1">Timeline</p>
        <div className="h-2" />
        <div className="grid grid-flow-col gap-1 justify-stretch h-12 items-end">
          {timeline.map((elt, i) => (
            <TimelineBlock severity={elt} key={i} />
          ))}
        </div>
        <div className="h-2" />
        <div className="flex flex-row justify-end">
          <p className="p1 text-gray-04">Last 72 hours</p>
        </div>
      </div>
    </>
  );
}
