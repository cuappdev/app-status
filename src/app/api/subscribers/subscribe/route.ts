import { NextResponse } from 'next/server';
import SubscriberController from '../../../../server/subscribers/controllers';
import { successJson } from '../../../../server/utils/jsonResponses';
import { dbConnect } from '../../../../server/database';

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    await SubscriberController.subscribeToApp(body.email, body.appName);
    return NextResponse.json(successJson('Subscribed to app'), { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
