import { NextResponse } from 'next/server';
import AppController from '@/app/api/apps/controllers';
import { successJson } from '@/app/api/utils/jsonResponses';
import { dbConnect } from '@/app/api/database';

export async function GET() {
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
