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
    await AppController.updateImage((await params).id, body.imageUrl);
    return NextResponse.json(successJson(body.imageUrl), { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
