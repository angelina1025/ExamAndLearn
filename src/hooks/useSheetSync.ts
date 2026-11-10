import { useState, useCallback } from 'react';
import {
  getEnvConfiguredSpreadsheetUrl,
  extractSpreadsheetId,
  readAllTablesFromSpreadsheet,
} from '@/services/publicSheet';
import { getAccessToken, googleSignIn } from '@/services/googleAuth';
import { Question, ExamPaper } from '@/types';

/**
 * Google Sheet 連線與同步狀態管理 Hook
 */
export function useSheetSync() {
  const envSheetUrl = getEnvConfiguredSpreadsheetUrl();
  const envSheetId = extractSpreadsheetId(envSheetUrl);

  const [connectedSpreadsheetId, setConnectedSpreadsheetId] = useState<string | null>(() => {
    return localStorage.getItem('google_spreadsheet_id') || envSheetId || null;
  });
  const [connectedSpreadsheetUrl, setConnectedSpreadsheetUrl] = useState<string | null>(() => {
    return localStorage.getItem('google_spreadsheet_url') || envSheetUrl || null;
  });
  const [isLoadingSheetData, setIsLoadingSheetData] = useState(false);

  const updateConnection = useCallback((id: string | null, url: string | null) => {
    setConnectedSpreadsheetId(id);
    setConnectedSpreadsheetUrl(url);
    if (id && url) {
      localStorage.setItem('google_spreadsheet_id', id);
      localStorage.setItem('google_spreadsheet_url', url);
    } else {
      localStorage.removeItem('google_spreadsheet_id');
      localStorage.removeItem('google_spreadsheet_url');
    }
  }, []);

  const syncFromSheet = useCallback(
    async (options?: {
      silent?: boolean;
      onLoaded?: (questions: Question[], exams: ExamPaper[]) => void;
    }) => {
      const targetUrl = connectedSpreadsheetUrl || envSheetUrl;
      const targetId = connectedSpreadsheetId || envSheetId;
      if (!targetId) return null;

      let token = await getAccessToken();
      if (!token && !options?.silent) {
        try {
          const signRes = await googleSignIn();
          token = signRes?.accessToken || null;
        } catch {
          token = null;
        }
      }

      setIsLoadingSheetData(true);
      try {
        const result = await readAllTablesFromSpreadsheet(token, targetId);
        updateConnection(targetId, targetUrl);
        options?.onLoaded?.(result.questions, result.allExams);
        return result;
      } finally {
        setIsLoadingSheetData(false);
      }
    },
    [connectedSpreadsheetId, connectedSpreadsheetUrl, envSheetId, envSheetUrl, updateConnection]
  );

  return {
    connectedSpreadsheetId,
    connectedSpreadsheetUrl,
    isLoadingSheetData,
    updateConnection,
    syncFromSheet,
  };
}

