import { NextResponse } from 'next/server';
import AppController from '@/app/api/apps/controllers';
import { successJson } from '@/app/api/utils/jsonResponses';
import { dbConnect } from '@/app/api/database';

export async function GET() {
  // Return mock data when running in development or when NEXT_PUBLIC_USE_MOCK is set
  if (
    process.env.NODE_ENV !== 'production' ||
    process.env.NEXT_PUBLIC_USE_MOCK === 'true'
  ) {
    const now = new Date();
    const tenMinutesAgo = new Date(
      now.getTime() - 10 * 60 * 1000,
    ).toISOString();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();

    const dummyApps = [
      {
        id: '1',
        name: 'Website',
        downIntervals: [],
        lastUpdated: now.toISOString(),
        // imageUrl: '/logo192.png',
      },
      {
        id: '2',
        name: 'API',
        downIntervals: [
          {
            severity: 1,
            description: 'External provider outage caused errors',
            startTime: oneHourAgo,
            endTime: tenMinutesAgo,
          },
        ],
        lastUpdated: now.toISOString(),
        // imageUrl: '/api-icon.png',
      },
    ];

    return NextResponse.json(successJson(dummyApps), { status: 200 });
  }

  await dbConnect();
  try {
    const apps = await AppController.getApps();
    return NextResponse.json(successJson(apps), { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const newApp = await AppController.createApp(body.name, body.imageUrl);
    return NextResponse.json(successJson(newApp), { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
