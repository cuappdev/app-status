'use client';
import { App } from '@/types/App';
import { Severity } from '@/types/DownInterval';
import { formatSeverity } from '@/utilities';
import AppIcon from './AppIcon';
import BlocksAndDateTimeline from './BlocksAndDateTimeline';
import StatusIcon from './StatusIcon';

interface ComponentProps {
  app: App;
}

export default function TimelineCard({ app }: ComponentProps) {
  let severity: Severity | undefined = undefined;
  const last = app.downIntervals.length - 1;
  if (app.downIntervals.length > 0 && !app.downIntervals[last].endTime) {
    severity = app.downIntervals[last].severity;
  }
  return (
    <div className="bg-white rounded-xl flex flex-col sm-tablet:gap-6 gap-4 items-stretch p-8">
      {/* Outage status */}
      <div
        className="sm-tablet:hidden flex flex-row justify-center border-other rounded-xl items-center bg-gray-bug px-4 py-2"
        role="status"
        aria-live="polite"
      >
        <StatusIcon severity={severity} />
        <div className="w-2" />
        <p className="p1">{formatSeverity(severity)}</p>
      </div>
      {/* Header row */}
      <div className="flex flex-row items-center ">
        <AppIcon imageUrl={app.imageUrl} />
        <div className="w-4" />
        <div className="flex flex-col">
          <div className="sm-tablet:hidden">
            <h5> {app.name} </h5>
          </div>
          <div className="hidden sm-tablet:flex">
            <h4> {app.name} </h4>
          </div>

        </div>
        <div className="flex flex-1" />
        <div
          className="border-other flex-row rounded-[30px] hidden sm-tablet:flex items-center py-2 px-4"
          role="status"
          aria-live="polite"
        >
          <StatusIcon severity={severity} />
          <div className="w-2" />
          <p className="p1">{formatSeverity(severity)}</p>
        </div>
      </div>

      <BlocksAndDateTimeline downIntervals={app.downIntervals} />
    </div>
  );
}
