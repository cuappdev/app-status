'use client';
import { DownInterval, Severity } from '@/types/DownInterval';

const DAYS = 90;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export default function BlocksAndDateTimeline({
  downIntervals,
}: {
  downIntervals: DownInterval[];
}) {
  const timeline: (Severity | undefined)[] = Array(DAYS).fill(undefined);

  const mapMillisToIndex = (m: number): number => {
    const now = Date.now();
    return Math.floor(Math.max(now - m, 0) / MS_PER_DAY);
  };

  let totalDowntimeMs = 0;
  const ninetyDaysAgoMs = Date.now() - DAYS * MS_PER_DAY;

  for (const { severity, startTime, endTime } of downIntervals) {
    const startMillis = new Date(startTime).valueOf();
    const endMillis = endTime ? new Date(endTime).valueOf() : Date.now();

    const first = Math.min(mapMillisToIndex(startMillis), DAYS - 1);
    const last = Math.max(mapMillisToIndex(endMillis), 0);

    if (first >= 0 && last < DAYS) {
      for (let index = last; index <= first; index++) {
        if (timeline[index] !== Severity.High) {
          timeline[index] = severity;
        }
      }
    }

    const clampedStart = Math.max(startMillis, ninetyDaysAgoMs);
    const clampedEnd = Math.min(endMillis, Date.now());
    
    if (clampedEnd > clampedStart) {
      totalDowntimeMs += clampedEnd - clampedStart;
    }
  }

  const totalWindowMs = DAYS * MS_PER_DAY;
  const uptimePercentage = Math.max(
    0,
    ((totalWindowMs - totalDowntimeMs) / totalWindowMs) * 100
  );
  
  const formattedUptime =
    uptimePercentage >= 99.9
      ? uptimePercentage.toFixed(2)
      : uptimePercentage.toFixed(1);

  timeline.reverse();

  // Updated TimelineBlock accepts daysAgo to calculate the exact date
  const TimelineBlock = ({ 
    severity, 
    daysAgo 
  }: { 
    severity: Severity | undefined;
    daysAgo: number; 
  }) => {
    // Format the date for the tooltip
    const blockDate = new Date(Date.now() - daysAgo * MS_PER_DAY);
    const dateString = blockDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });

    // Swap tooltip-info for tooltip-error, tooltip-warning, and tooltip-success
    switch (severity) {
      case Severity.High: {
        return (
          <span
            className="tooltip tooltip-error rounded-xl h-4 hover:h-5 transition-all ease-in-out bg-failure"
            data-tip={`${dateString}: Total Outage`}
          />
        );
      }
      case Severity.Medium: {
        return (
          <span
            className="tooltip tooltip-warning rounded-xl h-8 hover:h-9 transition-all ease-in-out bg-warning"
            data-tip={`${dateString}: Partial Outage`}
          />
        );
      }
      default: {
        return (
          <span
            className="tooltip tooltip-success rounded-xl h-12 hover:h-13 transition-all ease-in-out bg-success"
            data-tip={`${dateString}: Operational`}
          />
        );
      }
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-end mb-2">
         <p className="text-gray-06 p1">Timeline</p>
         <p className="p1 text-gray-06 font-medium">{formattedUptime}% uptime</p>
      </div>

      {/* Mobile: 30 Days */}
      <div className="sm-tablet:hidden flex flex-col w-full">
        <div className="grid grid-flow-col gap-1 justify-stretch h-13 items-end">
          {timeline.slice(timeline.length - 30).map((elt, i) => (
            // Calculate daysAgo: (total days in slice - 1) - current index
            <TimelineBlock severity={elt} daysAgo={29 - i} key={i} />
          ))}
        </div>
        <div className="flex flex-row justify-between items-center text-sm mt-3">
          <p className="p3 text-gray-04">30 days ago</p>
          <p className="p3 text-gray-04">Today</p>
        </div>
      </div>

      {/* Tablet: 60 Days */}
      <div className="hidden sm-tablet:flex md-desktop:hidden flex-col w-full">
        <div className="grid grid-flow-col gap-1 justify-stretch h-13 items-end">
          {timeline.slice(timeline.length - 60).map((elt, i) => (
             <TimelineBlock severity={elt} daysAgo={59 - i} key={i} />
          ))}
        </div>
        <div className="flex flex-row justify-between items-center text-sm mt-3">
          <p className="p1 text-gray-04">60 days ago</p>
          <p className="p1 text-gray-04">Today</p>
        </div>
      </div>

      {/* Desktop: 90 Days */}
      <div className="hidden md-desktop:flex flex-col w-full">
        <div className="grid grid-flow-col gap-1 justify-stretch h-13 items-end">
          {timeline.map((elt, i) => (
             <TimelineBlock severity={elt} daysAgo={89 - i} key={i} />
          ))}
        </div>
        <div className="flex flex-row justify-between items-center text-sm mt-3">
          <p className="p1 text-gray-04">90 days ago</p>
          <p className="p1 text-gray-04">Today</p>
        </div>
      </div>
    </>
  );
}