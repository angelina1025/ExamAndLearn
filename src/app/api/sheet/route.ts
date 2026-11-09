import { NextResponse } from 'next/server';
import { extractSpreadsheetId } from '@/utils/sheetParser';

/**
 * Next.js App Router BFF Route Handler: /api/sheet
 * 負責在伺服器端代理轉發對 Google Sheets (gviz 讀取) 與 Google Apps Script (GAS 寫入/刪除) 的請求，
 * 解決瀏覽器跨網域 (CORS) 問題並保護伺服器端環境變數與金鑰。
 */
export async function GET(request?: Request): Promise<Response> {
  try {
    const envSheetUrl =
      process.env.GOOGLE_SHEET_URL ??
      process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL ??
      process.env.VITE_GOOGLE_SHEET_URL ??
      '';

    if (!request) {
      return NextResponse.json({
        ok: true,
        configured: Boolean(envSheetUrl),
      });
    }

    const { searchParams } = new URL(request.url);
    const hasQueryParams = searchParams.has('spreadsheetId') || searchParams.has('sheet');

    if (!hasQueryParams) {
      return NextResponse.json({
        ok: true,
        configured: Boolean(envSheetUrl),
      });
    }

    const rawSheetUrlOrId = searchParams.get('spreadsheetId') || envSheetUrl;
    const sheetName = searchParams.get('sheet') || 'test_bank';

    const spreadsheetId = extractSpreadsheetId(rawSheetUrlOrId) || rawSheetUrlOrId.trim();
    if (!spreadsheetId) {
      return NextResponse.json(
        { ok: false, success: false, error: '未提供有效的試算表 ID 或伺服器尚未設定 GOOGLE_SHEET_URL' },
        { status: 400 }
      );
    }

    const gvizUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&headers=1&sheet=${encodeURIComponent(sheetName)}`;
    const upstreamRes = await fetch(gvizUrl, { cache: 'no-store' });

    if (!upstreamRes.ok) {
      return NextResponse.json(
        { ok: false, success: false, error: `上游 Google Sheet 回應錯誤 (${upstreamRes.status})` },
        { status: upstreamRes.status }
      );
    }

    const rawText = await upstreamRes.text();
    return new Response(rawText, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, success: false, error: err?.message || '伺服器端讀取 Google Sheet 失敗' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const scriptUrl = (
      body?.scriptUrl ||
      process.env.GOOGLE_SCRIPT_URL ||
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
      process.env.VITE_GOOGLE_SCRIPT_URL ||
      ''
    ).trim();

    if (!scriptUrl) {
      return NextResponse.json(
        {
          ok: false,
          success: false,
          error: 'GAS endpoint not configured (尚未設定 GOOGLE_SCRIPT_URL / NEXT_PUBLIC_GOOGLE_SCRIPT_URL)',
        },
        { status: 500 }
      );
    }

    const payload = body?.payload ?? body;
    const gasRes = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const data = await gasRes.json().catch(() => ({ success: gasRes.ok }));
    return NextResponse.json(
      { ok: gasRes.ok, success: data?.success ?? gasRes.ok, data, error: data?.error },
      { status: gasRes.status }
    );
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, success: false, error: err?.message || 'BFF 代理轉發至 GAS 失敗' },
      { status: 500 }
    );
  }
}

