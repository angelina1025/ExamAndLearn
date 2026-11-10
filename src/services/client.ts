const SHEETS_API_BASE = 'https://sheets.googleapis.com/v4/spreadsheets';

export interface SheetRequestOptions extends RequestInit {
  accessToken: string;
}

/**
 * Base Fetch connector for Google Sheets REST API v4
 */
export async function googleSheetsRequest<T = any>(
  endpoint: string,
  { accessToken, headers, ...restOptions }: SheetRequestOptions
): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${SHEETS_API_BASE}${endpoint}`;

  const response = await fetch(url, {
    ...restOptions,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Google Sheets API 請求失敗 (${response.status})`);
  }

  return response.json() as Promise<T>;
}

