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
    await AppController.appStatusChange(
      (await params).id,
      body.severity,
      body.description,
      body.startTime,
      body.endTime,
    );
    return NextResponse.json(successJson('status updated'), { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
