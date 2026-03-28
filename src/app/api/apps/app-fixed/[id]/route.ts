import { NextResponse } from 'next/server';
import AppController from '../../../../../server/apps/controllers';
import { successJson } from '../../../../../server/utils/jsonResponses';
import { dbConnect } from '../../../../../server/database';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  try {
    const body = await req.json();
    await AppController.appFixed((await params).id, new Date(body.date));
    await AppController.sendStatusEmails(
      (await params).id,
      'Down',
      'Up and running',
    );
    return NextResponse.json(successJson('App fixed'), { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
