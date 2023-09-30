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
    <div className="bg-white flex flex-col items-center justify-center h-screen rounded-">
      <Timeline app={test} />
    </div>
  );
}
