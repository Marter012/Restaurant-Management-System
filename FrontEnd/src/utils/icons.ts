/** API oficial completa de Phosphor Icons + apariencia global centralizada. */
import { createGlobalStyle } from "styled-components";

export * from "@phosphor-icons/react";

/**
 * Apariencia única de los iconos de la aplicación.
 * Los componentes se importan directamente desde @phosphor-icons/react.
 */
export const PhosphorIconStyles = createGlobalStyle`
  svg[viewBox="0 0 256 256"] {
    width: 25px;
    height: 25px;
    min-width: 25px;
    flex: 0 0 25px;
    vertical-align: middle;
    transition: color 160ms ease, transform 160ms ease;
  }

  button:hover:not(:disabled) > svg[viewBox="0 0 256 256"],
  a:hover > svg[viewBox="0 0 256 256"] {
    color: var(--app-primary, #4A2818);
  }
`;
