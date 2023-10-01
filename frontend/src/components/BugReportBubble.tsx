import { formatUpdateDate } from "@/utilities";

export default function BugReportBubble({
  lastUpdated,
  resolved,
  description,
}: {
  lastUpdated: string;
  resolved: boolean;
  description: string;
}) {
  const result = resolved ? "Resolved: " : "Occurred: ";
  // If it was update in the last 24 hours show the component
  if (
    new Date(lastUpdated).valueOf() >=
    new Date().valueOf() - 3.6 * 24 * Math.pow(10, 6)
  ) {
    return (
      <div className="flex flex-1 bg-gray-bug border-other p-4 flex-col rounded-lg">
        <h6>Latest bug</h6>
        <div className="h-1" />
        <p className="p3 sm-tablet:p1 text-gray-06">
          {result + formatUpdateDate(lastUpdated)}
        </p>
        <div className="h-2" />
        <p className="p3 sm-tablet:p1 text-gray-04">{description}</p>
      </div>
    );
  } else {
    return <></>;
  }
}
