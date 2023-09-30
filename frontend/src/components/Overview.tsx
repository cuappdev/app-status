import { App } from "@/models/App";
import { Severity } from "@/models/DownInterval";
import CheckSVG from "./svg/CheckSVG";
import Image from "next/image";

import { DEFAULT_APP_IMG } from "../../constants";

interface AppProps {
  apps: App[];
}

enum Status {
  Operational,
  Partial,
  Total,
}

interface AppRowProps {
  status: Status;
  apps: App[];
}

export default function Overview({ apps }: AppProps) {
  const operationalApps = apps.filter((app) => {
    return app.downIntervals.length === 0;
  });

  const partialOutageApps = apps.filter((app) => {
    const lastInterval = app.downIntervals[app.downIntervals.length - 1];
    if (lastInterval) {
      return lastInterval.severity === Severity.Medium;
    }
    return false;
  });

  const totalOutageApps = apps.filter((app) => {
    const lastInterval = app.downIntervals[app.downIntervals.length - 1];
    if (lastInterval) {
      return lastInterval.severity === Severity.High;
    }
    return false;
  });

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl p-8">
      <div>
        <h4>Overview</h4>
        <p className="p1 text-gray-06">
          All of our apps are operational. Select each app to see specific
          status.
        </p>
      </div>

      <AppRow status={Status.Operational} apps={operationalApps} />
      <AppRow status={Status.Partial} apps={partialOutageApps} />
      <AppRow status={Status.Total} apps={totalOutageApps} />
    </div>
  );
}

function AppRow(appRowProps: AppRowProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        <CheckSVG />
        <h6>
          {appRowProps.status === Status.Operational
            ? "Operational"
            : appRowProps.status === Status.Partial
            ? "Partial Outage"
            : appRowProps.status === Status.Total
            ? "Total Outage"
            : ""}
        </h6>
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        {appRowProps.apps.map((app) => {
          return (
            <Image
              key={app.id}
              src={DEFAULT_APP_IMG}
              width={64}
              height={64}
              alt={app.name}
            />
          );
        })}
      </div>
    </div>
  );
}
