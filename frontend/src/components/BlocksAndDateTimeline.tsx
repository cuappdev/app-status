"useclient";
import { DownInterval, Severity } from "@/models/DownInterval";

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
    for (let { startTime, endTime, severity } of downIntervals) {
      const trueEnd = endTime ? new Date(endTime) : future;
      const iHoursAgo = getHoursAgo(i);
      if (new Date(startTime) <= iHoursAgo && iHoursAgo <= trueEnd) {
        timeline[i] = severity;
        break;
      }
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
      <div className="mobile:hidden">
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
      <div className="hidden mobile:block md-desktop:hidden">
        <p className="text-gray-06 p1">Timeline</p>
        <div className="h-2" />
        <div className="grid grid-flow-col  gap-1 justify-stretch h-13 items-end">
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
