import { App } from "@/models/App";
import { Severity } from "@/models/DownInterval";
import Image from "next/image";
import OperationalIcon from "./svg/OperationalIcon";
import OutageIcon from "./svg/OutageIcon";
import WarningIcon from "./svg/WarningIcon";

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
    <div className="flex flex-col gap-4 w-full bg-white rounded-xl p-6 lg-tablet:p-8 sm-tablet:gap-8">
      <div className="flex flex-col gap-2">
        <div>
          <h2 className="lg-tablet">Overview</h2>
          <h4 className="mobile:hidden">Overview</h4>
        </div>
        <p className="p1 text-gray-04">
          {partialOutageApps.length > 0 || totalOutageApps.length > 0
            ? "Some of our apps have known issues."
            : "All of our apps are operational. Select each app to see specific status."}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {operationalApps.length !== 0 && (
          <AppRow status={Status.Operational} apps={operationalApps} />
        )}
        {partialOutageApps.length !== 0 && (
          <AppRow status={Status.Partial} apps={partialOutageApps} />
        )}
        {totalOutageApps.length !== 0 && (
          <AppRow status={Status.Total} apps={totalOutageApps} />
        )}{" "}
      </div>
    </div>
  );
}

function AppRow(appRowProps: AppRowProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        {appRowProps.status === Status.Operational && (
          <>
            <OperationalIcon />
            <h6>Operational</h6>
          </>
        )}
        {appRowProps.status === Status.Partial && (
          <>
            <WarningIcon />
            <h6>Partial Outage</h6>
          </>
        )}
        {appRowProps.status === Status.Total && (
          <>
            <OutageIcon />
            <h6>Total Outage</h6>
          </>
        )}
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        {appRowProps.apps.map((app) => {
          return (
            <Image
              key={app.id}
              src={DEFAULT_APP_IMG}
              alt={app.name}
              width={128}
              height={128}
              className="w-16 h-16 sm-desktop:w-10 sm-desktop:h-10"
            />
          );
        })}
      </div>
    </div>
  );
}
