import React from "react";
import { DEFAULT_APP_IMG } from "@/constants";

export default function AppIcon({
  imageUrl = DEFAULT_APP_IMG,
}: {
  imageUrl?: string;
}) {
  return (
    <img width={60} height={60} src={imageUrl} className="app-icon-shadow" />
  );
}
