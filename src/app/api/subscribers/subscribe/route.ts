import { NextResponse } from 'next/server';
import SubscriberController from '@/app/api/subscribers/controllers';
import { successJson } from '@/app/api/utils/jsonResponses';
import { dbConnect } from '@/app/api/database';

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    await SubscriberController.subscribeToApp(body.email, body.appName);
    return NextResponse.json(successJson('Subscribed to app'), { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
