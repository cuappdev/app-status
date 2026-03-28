import { NextResponse } from 'next/server';
import AppController from '../../../../server/apps/controllers';
import { successJson } from '../../../../server/utils/jsonResponses';
import { dbConnect } from '../../../../server/database';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  try {
    const app = await AppController.getAppById((await params).id);
    return NextResponse.json(successJson(app), { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
