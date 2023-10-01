import { formatUpdateDate } from "@/utilities";

export default function BugReportBubble({
  lastUpdated,
  resolved,
  description,
  currentlyDown,
}: {
  lastUpdated: string;
  resolved: boolean;
  description: string;
  currentlyDown: boolean;
}) {
  const result = resolved ? "Resolved: " : "Occurred: ";

  if (
    new Date(lastUpdated).valueOf() <
      new Date().valueOf() - 3.6 * 24 * Math.pow(10, 6) &&
    !currentlyDown
  ) {
    return <></>;
  }

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
}
