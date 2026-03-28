import { NextResponse } from 'next/server';
import SubscriberController from '../../../server/subscribers/controllers';
import { successJson } from '../../../server/utils/jsonResponses';
import { dbConnect } from '../../../server/database';

export async function GET() {
  await dbConnect();
  try {
    const subscribers = await SubscriberController.getSubscribers();
    return NextResponse.json(successJson(subscribers), { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
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
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
