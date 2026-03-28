import { Severity } from './types/DownInterval';

function formatSeverity(s: Severity | undefined): string {
  switch (s) {
    case Severity.Medium: {
      return 'Partial Outage';
    }
    case Severity.High: {
      return 'Total Outage';
    }
    default: {
      return 'Operational';
    }
  }
}

export { formatSeverity };
