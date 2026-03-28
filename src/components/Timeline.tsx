import { App } from '@/types/App';
import TimelineCard from './TimelineCard';

interface AppProps {
  apps: App[];
}

export const Timeline = ({ apps }: AppProps) => {
  if (!apps) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      {apps.map((app) => (
        <TimelineCard key={app.id} app={app} />
      ))}
    </div>
  );
};
