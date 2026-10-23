/**
 * Compatibilidad temporal con imports históricos del Print Agent.
 * Este módulo NO realiza peticiones HTTP ni fetch al equipo local.
 * Todas las operaciones pasan por websocketService -> API backend -> Print Agent.
 */

export const getPrintAgentConnectionState = () => ({
  consecutiveFailures: 0,
  connectionBlocked: false,
  maxFailures: 0,
});

export const resetPrintAgentConnection = (): void => {};

export const finishPrintAgentManualRefresh = (): void => {};

export const isPrintAgentBlockedError = (error: unknown): boolean =>
  error instanceof Error &&
  /PRINT_AGENT_(BLOCKED|RETRIES_EXHAUSTED)/.test(`${error.name} ${error.message}`);
