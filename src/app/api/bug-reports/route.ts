import { NextResponse } from 'next/server';
import BugController from '../../../server/bugReports/controllers';
import { successJson } from '../../../server/utils/jsonResponses';
import { dbConnect } from '../../../server/database';

export async function GET() {
  await dbConnect();
  try {
    const bugReports = await BugController.getBugReports();
    return NextResponse.json(successJson(bugReports), { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
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
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
