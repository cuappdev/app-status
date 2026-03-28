'use client';
import Overview from '@/components/Overview';
import { PageFooter } from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import { ReportBug } from '@/components/ReportBug';
import { Subscribe } from '@/components/Subscribe';
import { Timeline } from '@/components/Timeline';
import { App } from '@/types/App';
import { useEffect, useState } from 'react';

interface AppsResponse {
  success: boolean;
  data: App[];
}

export default function Home() {
  const [apps, setApps] = useState<App[]>([]);
  const [appNames, setAppNames] = useState<string[]>([]);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [now, setNow] = useState<number>(Date.now());

  // Timer for last updated counter
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;
    const controller = new AbortController();

    const fetchApps = async () => {
      try {
        const response = await fetch(`/api/apps/`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
        });

        if (!response.ok) {
          console.error('Failed to fetch apps');
          return;
        }

        const json = (await response.json()) as AppsResponse;
        const data = Array.isArray(json.data) ? json.data : [];
        // only update state if still mounted
        if (!mounted) return;
        setApps(data);
        setAppNames(data.map((app) => app.name));
        if (data.length > 0) {
          setLastUpdated(Date.now());
        }
      } catch (error: unknown) {
        if ((error as any)?.name === 'AbortError') return; // expected on abort
        console.error('Error fetching apps:', error);
      } finally {
        if (mounted) {
          timeoutId = setTimeout(fetchApps, 30_000);
        }
      }
    };

    fetchApps();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return (
    <div className="bg-gray-bug overflow-hidden">
      <PageHeader />
      <div className="flex flex-col mx-auto items-center justify-center px-4 pt-8 gap-4 lg-tablet:px-6 lg-tablet:pt-16 sm-desktop:pt-31 sm-desktop:w-6xl">
        <div className="flex flex-col mr-auto gap-2 mb-4 sm-tablet:mb-6 lg-tablet:mb-8">
          <h1 className="h2 lg-tablet:h1">Platform Status</h1>
          <p className="p1 text-gray-04">
            Any issues with our applications will be shown below.
          </p>
          {lastUpdated && (
            <p className="p3 sm-tablet:p1 text-gray-06 w-full">
              {`Last updated: ${Math.max(0, Math.floor((now - lastUpdated) / 1000))} seconds ago`}
            </p>
          )}
        </div>
        <div className="flex flex-col sm-desktop:flex-row w-full gap-4">
          <div className="flex flex-col gap-4 sm-desktop:w-135">
            <Overview apps={apps} />
            <div className="hidden sm-desktop:flex flex-col gap-4">
              <Subscribe appNames={appNames} />
              <ReportBug appNames={appNames} />
            </div>
          </div>
          <Timeline apps={apps} />
          <div className="flex sm-desktop:hidden flex-col gap-4">
            <Subscribe appNames={appNames} />
            <ReportBug appNames={appNames} />
          </div>
        </div>
        <PageFooter />
      </div>
    </div>
  );
}
