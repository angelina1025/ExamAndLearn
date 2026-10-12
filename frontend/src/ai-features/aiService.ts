/**
 * AI Features Configuration & Integration Gateway
 * 
 * Configured via environment variable VITE_ENABLE_AI_API in .env / .env.example
 * Set VITE_ENABLE_AI_API="true" to enable AI features.
 * When "false" or unset, the application operates in 100% manual/offline mode.
 */

// Reads from .env (Vite client-side env vars must start with VITE_)
const envEnableAi = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env.VITE_ENABLE_AI_API : undefined;

export const AI_CONFIG = {
  // Enabled if VITE_ENABLE_AI_API is explicitly set to "true"
  ENABLE_AI_API: envEnableAi === 'true' || envEnableAi === '1',

  // Default model for question generation & semantic evaluation
  DEFAULT_MODEL: 'gemini-2.5-flash',
  
  // Endpoints or proxy paths if used
  PROXY_ENDPOINT: '/api/generate',
};

export interface AiDeriveRequest {
  stem: string;
  count?: number;
  difficulty?: string;
  topic?: string;
}

export interface AiDeriveResponseItem {
  id: string;
  title: string;
  prompt: string;
  type: string;
  difficulty: string;
  similarity: string;
}

/**
 * Service function to derive questions.
 * When AI API is not connected, returns null to signal manual mode.
 */
export async function deriveQuestionsWithAI(request: AiDeriveRequest): Promise<AiDeriveResponseItem[] | null> {
  if (!AI_CONFIG.ENABLE_AI_API) {
    return null; // Signals application to use manual question creator
  }

  // Future integration with @google/genai or server API endpoint:
  // const response = await fetch(AI_CONFIG.PROXY_ENDPOINT, { ... });
  // return await response.json();
  return null;
}
