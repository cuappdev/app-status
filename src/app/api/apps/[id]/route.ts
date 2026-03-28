import { NextResponse } from 'next/server';
import AppController from '@/app/api/apps/controllers';
import { successJson } from '@/app/api/utils/jsonResponses';
import { dbConnect } from '@/app/api/database';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  try {
    const app = await AppController.getAppById((await params).id);
    return NextResponse.json(successJson(app), { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
