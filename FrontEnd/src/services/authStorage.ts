const ACCESS_TOKEN_KEY = "boutique-sabores-access-token";
const REFRESH_TOKEN_KEY = "boutique-sabores-refresh-token";
const TOKEN_EXPIRES_AT_KEY = "boutique-sabores-token-expires-at";

export const saveAuthTokens = (
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
): void => {
  const expiresAt = Date.now() + expiresIn * 1000;

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(TOKEN_EXPIRES_AT_KEY, expiresAt.toString());
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getTokenExpiresAt = (): number | null => {
  const value = localStorage.getItem(TOKEN_EXPIRES_AT_KEY);

  if (!value) {
    return null;
  }

  return Number(value);
};

export const clearAuthTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRES_AT_KEY);
};