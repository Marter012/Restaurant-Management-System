import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresAt,
} from "./authStorage.ts";

import {
  getMe,
  refreshAccessToken,
} from "./authService.ts";

const REFRESH_BEFORE_EXPIRATION = 10 * 1000;

let refreshTimer: ReturnType<typeof setTimeout> | null = null;

let isRefreshing = false;

const clearRefreshTimer = () => {
  if (refreshTimer !== null) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
};

const scheduleRefresh = () => {
  clearRefreshTimer();

  const expiresAt = getTokenExpiresAt();
  const refreshToken = getRefreshToken();

  if (!expiresAt || !refreshToken) {
    return;
  }

  const now = Date.now();

  const timeUntilExpiration = expiresAt - now;

  const timeUntilRefresh =
    timeUntilExpiration - REFRESH_BEFORE_EXPIRATION;

  const delay = Math.max(timeUntilRefresh, 1000);

  refreshTimer = setTimeout(() => {
    void executeRefresh();
  }, delay);

};

const executeRefresh = async (): Promise<boolean> => {
  if (isRefreshing) {
    return false;
  }

  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    clearRefreshTimer();

    return false;
  }

  isRefreshing = true;

  try {

    await refreshAccessToken(refreshToken);

    scheduleRefresh();

    return true;
  } catch (error) {
    console.error(
      "No se pudo renovar la sesión:",
      error,
    );

    clearAuthTokens();
    clearRefreshTimer();

    return false;
  } finally {
    isRefreshing = false;
  }
};

export const ensureValidAccessToken =
  async (): Promise<boolean> => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    const expiresAt = getTokenExpiresAt();

    if (!accessToken || !refreshToken || !expiresAt) {
      return false;
    }

    const timeUntilExpiration =
      expiresAt - Date.now();

    /*
     * Si el token está vencido o está próximo
     * a vencer, renovamos directamente.
     */
    if (
      timeUntilExpiration <=
      REFRESH_BEFORE_EXPIRATION
    ) {
      return await executeRefresh();
    }

    /*
     * Aunque el timestamp local diga que el token
     * todavía sirve, verificamos contra el backend.
     */
    try {
      await getMe();

      return true;
    } catch (error) {
      console.warn(
        "El access token ya no es válido. Intentando renovar sesión...",
        error,
      );

      return await executeRefresh();
    }
  };

export const startTokenRefresh = () => {
  clearRefreshTimer();

  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!accessToken || !refreshToken) {
    return;
  }

  scheduleRefresh();
};

export const stopTokenRefresh = () => {
  clearRefreshTimer();

  isRefreshing = false;
};