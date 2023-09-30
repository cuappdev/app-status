import { DEFAULT_APP_IMG } from "@/constants";
import { App } from "@/models/App";
import { DownInterval } from "@/models/DownInterval";
import React from "react";
import AppIcon from "./AppIcon";

export default function Timeline({ app }: { app: App }) {
  return (
    <div className="bg-white rounded-xl flex flex-col gap-6 items-stretch p-8">
      {/* Header row */}
      <div className="flex flex-row">
        <AppIcon imageUrl={app.imageUrl} />
        <div className="flex flex-col">
          <h3> {app.name} </h3>
        </div>
      </div>
    </div>
  );
}
