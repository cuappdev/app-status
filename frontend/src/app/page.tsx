import AppIcon from "@/components/AppIcon";
import Overview from "@/components/Overview";
import Timeline from "@/components/Timeline";
import { App } from "@/models/App";

export default function Home() {
  const test = {
    name: "AppDev",
    downIntervals: [],
    lastUpdated: new Date(),
    imageUrl: undefined,
  } as App;
  return (
    <div className="bg-black flex flex-col items-center justify-center h-screen">
      <Timeline app={test} />
    </div>
  );
}
