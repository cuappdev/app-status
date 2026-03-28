import { NextResponse } from 'next/server';
import AppController from '@/app/api/apps/controllers';
import { successJson } from '@/app/api/utils/jsonResponses';
import { dbConnect } from '@/app/api/database';

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
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
