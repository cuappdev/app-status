import { Severity } from '@/types/DownInterval';
import OutageIcon from './svg/OutageIcon';
import WarningIcon from './svg/WarningIcon';
import OperationalIcon from './svg/OperationalIcon';

export default function StatusIcon({ severity }: { severity?: Severity }) {
  switch (severity) {
    case Severity.High: {
      return <OutageIcon />;
    }
    case Severity.Medium: {
      return <WarningIcon />;
    }
    default: {
      return <OperationalIcon />;
    }
  }
}
