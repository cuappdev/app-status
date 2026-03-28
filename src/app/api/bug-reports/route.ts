import { NextResponse } from 'next/server';
import BugController from '@/app/api/bug-reports/controllers';
import { successJson } from '@/app/api/utils/jsonResponses';
import { dbConnect } from '@/app/api/database';

export async function GET() {
  await dbConnect();
  try {
    const bugReports = await BugController.getBugReports();
    return NextResponse.json(successJson(bugReports), { status: 200 });
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
    await BugController.createBugReport(
      body.email,
      body.appName,
      body.desc,
      new Date(body.createdTime),
    );
    return NextResponse.json(successJson('Added bug report'), { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
