import { App } from "@/models/App";
import warning from "../assets/warning.svg";
import AppIcon from "./AppIcon";
import WarningIcon from "@/components/svg/WarningIcon";
import StatusIcon from "./StatusIcon";

export default function Timeline({ app }: { app: App }) {
  return (
    <div className="bg-white rounded-xl flex flex-col gap-6 items-stretch p-8">
      {/* Header row */}
      <div className="flex flex-row justify-between">
        <AppIcon
          imageUrl={
            "https://daily.jstor.org/wp-content/uploads/2015/05/standardizedtests.jpg"
          }
        />
        <div className="w-4" />
        <div className="flex flex-col">
          <h4> {app.name} </h4>
          <p className="p1 text-gray-06">{"test date"}</p>
        </div>
        <div className="flex flex-1  " />
        <div className="py-4 px-8 other-border rounded-[30px] flex flex-row gap-2 items-center">
          <StatusIcon severity={app.downIntervals[0]?.severity} />
          <p className="p3">Partial outage</p>
        </div>
      </div>
    </div>
  );
}
