import { DEFAULT_APP_IMG } from "@/constants";
import { App } from "@/models/App";
import { Severity } from "@/models/DownInterval";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import OperationalIcon from "./svg/OperationalIcon";
import OutageIcon from "./svg/OutageIcon";
import WarningIcon from "./svg/WarningIcon";

interface AppProps {
  apps: App[];
  selectedApp: App | undefined;
  setSelectedApp: Dispatch<SetStateAction<App | undefined>>;
}

enum Status {
  Operational,
  Partial,
  Total,
}

interface AppRowProps {
  status: Status;
  apps: App[];
  selectedApp: App | undefined;
  setSelectedApp: Dispatch<SetStateAction<App | undefined>>;
}

export default function Overview(appProps: AppProps) {
  const operationalApps = appProps.apps.filter((app) => {
    if (app.downIntervals.length === 0) {
      return true;
    }
    const lastInterval = app.downIntervals[app.downIntervals.length - 1];
    if (lastInterval) {
      return lastInterval.endTime;
    }
    return false;
  });

  const partialOutageApps = appProps.apps.filter((app) => {
    const lastInterval = app.downIntervals[app.downIntervals.length - 1];
    if (lastInterval) {
      return lastInterval.severity === Severity.Medium && !lastInterval.endTime;
    }
    return false;
  });

  const totalOutageApps = appProps.apps.filter((app) => {
    const lastInterval = app.downIntervals[app.downIntervals.length - 1];
    if (lastInterval) {
      return lastInterval.severity === Severity.High && !lastInterval.endTime;
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
            ? "Some of our apps have known issues. Enter your email below to receive a notification when we fix them!"
            : "All of our apps are operational. Select each app to see specific status."}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {operationalApps.length !== 0 && (
          <AppRow
            status={Status.Operational}
            apps={operationalApps}
            selectedApp={appProps.selectedApp}
            setSelectedApp={appProps.setSelectedApp}
          />
        )}
        {partialOutageApps.length !== 0 && (
          <AppRow
            status={Status.Partial}
            apps={partialOutageApps}
            selectedApp={appProps.selectedApp}
            setSelectedApp={appProps.setSelectedApp}
          />
        )}
        {totalOutageApps.length !== 0 && (
          <AppRow
            status={Status.Total}
            apps={totalOutageApps}
            selectedApp={appProps.selectedApp}
            setSelectedApp={appProps.setSelectedApp}
          />
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
              src={app.imageUrl ?? DEFAULT_APP_IMG}
              alt={app.name}
              width={1024}
              height={1024}
              onClick={() => appRowProps.setSelectedApp(app)}
              className={`w-16 h-16 rounded-xl sm-desktop:w-10 sm-desktop:h-10 sm-desktop:rounded-lg app-icon-shadow ${
                appRowProps.selectedApp === app
                  ? "max-sm-desktop:selected-icon-highlight"
                  : ""
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
