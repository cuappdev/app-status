import { NextResponse } from 'next/server';
import SubscriberController from '@/app/api/subscribers/controllers';
import { successJson } from '@/app/api/utils/jsonResponses';
import { dbConnect } from '@/app/api/database';

export async function GET() {
  await dbConnect();
  try {
    const subscribers = await SubscriberController.getSubscribers();
    return NextResponse.json(successJson(subscribers), { status: 200 });
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
    await SubscriberController.createSubscriber(body.email);
    return NextResponse.json(successJson('Subscriber created'), {
      status: 201,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
