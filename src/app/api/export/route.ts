import { NextRequest, NextResponse } from 'next/server';

/**
 * 考卷與錯題紀錄匯出 API (Next.js App Router Route Handler)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({
      ok: true,
      exportedAt: new Date().toISOString(),
      payload: body,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : '匯出失敗';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}

