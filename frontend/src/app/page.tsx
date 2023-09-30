"use client";
import TimelineCard from "@/components/TimelineCard";
import { App } from "@/models/App";
import { DownInterval, Severity } from "@/models/DownInterval";

export default function Home() {
  const test = {
    name: "AppDev",
    downIntervals: [downInterval],
    lastUpdated: new Date(),
    imageUrl: undefined,
  } as App;
  return (
    <div className="bg-gray-08 flex flex-col items-center justify-center h-screen w-full">
      <div className="h-full w-full">
        <TimelineCard app={test} />
      </div>
    </div>
  );
}
const hoursAgo10 = new Date();
hoursAgo10.setHours(new Date().getHours() - 5);
hoursAgo10.setMinutes(new Date().getMinutes() + 1);
const downInterval = {
  startTime: hoursAgo10,
  severity: Severity.High,
  description:
    'Users are experiencing issues while attempting to log in to their accounts. Upon entering their credentials and clicking the "Login" button, the system fails to authenticate the user and denies access. This issue is affecting a significant number of users and is preventing them from accessing their accounts and utilizing the platform\'s services. We are aware of the issue, and our team is working to fix this bug as soon as possible.',
} as DownInterval;
const testApp = {
  id: "0",
  name: "AppDev",
  downIntervals: [downInterval],
  lastUpdated: new Date(),
  imageUrl: undefined,
} as App;

const dummyApps: App[] = [
  {
    id: "1",
    name: "Volume",
    downIntervals: [],
    lastUpdated: new Date(),
  },
  {
    id: "2",
    name: "Volume",
    downIntervals: [],
    lastUpdated: new Date(),
  },
  {
    id: "3",
    name: "Volume",
    downIntervals: [],
    lastUpdated: new Date(),
  },
  {
    id: "4",
    name: "Volume",
    downIntervals: [
      {
        severity: Severity.Medium,
        description: "",
        startTime: new Date(),
      },
    ],
    lastUpdated: new Date(),
  },
  {
    id: "5",
    name: "Volume",
    downIntervals: [
      {
        severity: Severity.High,
        description: "",
        startTime: new Date(),
      },
    ],
    lastUpdated: new Date(),
  },
  {
    id: "6",
    name: "Volume",
    downIntervals: [
      {
        severity: Severity.High,
        description: "",
        startTime: new Date(),
      },
    ],
    lastUpdated: new Date(),
  },
];
