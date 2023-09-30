import React from "react";
import { DEFAULT_APP_IMG } from "@/constants";

export default function AppIcon({
  imageUrl = DEFAULT_APP_IMG,
}: {
  imageUrl?: string;
}) {
  return (
    <img
      src={imageUrl}
      className="app-icon-shadow rounded-xl w-12 h-12 mobile:h-15 mobile:w-15"
    />
  );
}
