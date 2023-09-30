import { App } from "@/models/App";
import TimelineCard from "./TimelineCard";

interface AppProps {
  apps: App[];
}

export const Timeline = ({ apps }: AppProps) => {
  return (
    <div className="flex flex-col gap-2">
      {apps.map((app, i) => (
        <TimelineCard key={i} app={app} />
      ))}
    </div>
  );
};
