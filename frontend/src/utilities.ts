import { Severity } from "./models/DownInterval";

function formatSeverity(s: Severity | undefined): string {
  switch (s) {
    case Severity.Medium: {
      return "Partial Outage";
    }
    case Severity.High: {
      return "Total Outage";
    }
    default: {
      return "Operational";
    }
  }
}

function severityToStyle(s: Severity | undefined): string {
  switch (s) {
    case Severity.Medium: {
      return "bg-warning";
    }
    case Severity.High: {
      return "bg-failure";
    }
    default: {
      return "bg-success";
    }
  }
}
function formatUpdateDate(d: string): string {
  let date = new Date(d);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return formattedDate;
}

export {
  formatSeverity,
  formatUpdateDate,
  severityToStyle as severityToBgColor,
};
