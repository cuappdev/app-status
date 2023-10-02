"use client";
import { MAX_PREVIEW_HOURS } from "@/constants";
import { DownInterval, Severity } from "@/models/DownInterval";

export default function BlocksAndDateTimeline({
  downIntervals,
}: {
  downIntervals: DownInterval[];
}) {
  const timeline: (Severity | undefined)[] =
    Array(MAX_PREVIEW_HOURS).fill(undefined);

  const mapMillisToIndex = (m: number): number => {
    const now = new Date().valueOf();
    return Math.floor(Math.max(now - m, 0) / (3.6 * Math.pow(10, 6)));
  };

  for (const { severity, startTime, endTime } of downIntervals) {
    const startMillis = new Date(startTime).valueOf();
    const endMillis = endTime
      ? new Date(endTime).valueOf()
      : new Date().valueOf() + 3.6 * Math.pow(10, 6);
    const first = Math.min(mapMillisToIndex(startMillis), MAX_PREVIEW_HOURS);
    const last = mapMillisToIndex(endMillis);

    for (let index = last; index <= first; index++) {
      timeline[index] = severity;
    }
  }
  timeline.reverse();

  const TimelineBlock = ({ severity }: { severity: Severity | undefined }) => {
    switch (severity) {
      case Severity.High: {
        return (
          <span
            className="tooltip tooltip-info rounded-xl h-4 hover:h-5 transition-all ease-in-out bg-failure"
            data-tip="Total outage"
          />
        );
      }
      case Severity.Medium: {
        return (
          // <div className="tooltip" data-tip="hello">
          <span
            className="tooltip tooltip-info rounded-xl h-8 hover:h-9 transition-all ease-in-out bg-warning"
            data-tip="Partial Outage"
          />
          // </div>
        );
      }
      default: {
        return (
          // <div className="tooltip" data-tip="hello">
          <span
            className="tooltip tooltip-info rounded-xl h-12 hover:h-13 transition-all ease-in-out bg-success"
            data-tip="Operational"
          />
          // </div>
        );
      }
    }
  };

  return (
    <>
      {/* Blocks and Date Mobile */}
      <div className="sm-tablet:hidden">
        <p className="text-gray-06 p">Timeline</p>
        <div className="h-2" />
        <div className="grid grid-flow-col gap-1 justify-stretch h-13 items-end">
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
      <div className="hidden sm-tablet:block md-desktop:hidden">
        <p className="text-gray-06 p1">Timeline</p>
        <div className="h-2" />
        <div className="grid grid-flow-col gap-1 justify-stretch h-13 items-end">
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
      <div className="hidden md-desktop:flex flex-col">
        <p className="text-gray-06 p1">Timeline</p>
        <div className="h-2" />
        <div className="grid grid-flow-col gap-1 justify-stretch h-13 items-end">
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
