import { DEFAULT_APP_IMG } from "@/constants";
import { App } from "@/models/App";
import { DownInterval } from "@/models/DownInterval";
import React from "react";

export default function Timeline(app: App) {
  return (
    <div className="bg-white rounded-xl flex flex-col gap-6 items-stretch p-8">
      {/* Header row */}
      <div className="flex flex-row">
        <img
          src={app.imageUrl ?? DEFAULT_APP_IMG}
          className=" app-icon-shadow"
        />
        <div className="flex flex-col">
          <h1></h1>
        </div>
      </div>
    </div>
  );
}
