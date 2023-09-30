import { formatUpdateDate } from "@/utilities";
import React from "react";

export default function BugReportBubble({
  lastUpdated,
  resolved,
  description,
}: {
  lastUpdated: Date;
  resolved: boolean;
  description: string;
}) {
  const result = resolved ? "Resolved: " : "Occurred: ";
  return (
    <div className="flex flex-1 bg-gray-bug border-other p-4 flex-col rounded-lg">
      <h6>Latest bug</h6>
      <div className="h-1" />
      <p className="p3 mobile:p1 text-gray-06">
        {result + formatUpdateDate(lastUpdated)}
      </p>
      <div className="h-2" />
      <p className="p3 mobile:p1 text-gray-04">{description}</p>
    </div>
  );
}
