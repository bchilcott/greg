export type APIError = {
  code: number;
  message: string;
};

export function createError(code: number, message: string): APIError {
  return { code, message };
}
