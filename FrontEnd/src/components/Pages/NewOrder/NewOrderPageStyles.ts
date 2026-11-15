import styled from "styled-components";

export const NewOrderPageShell = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  min-width: 0;
  min-height: calc(100dvh - 150px);
`;

export const NewOrderPageActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
  margin: 0 0 2px;

  @media (max-width: 600px) {
    flex-direction: column-reverse;
    align-items: stretch;

    > button {
      width: 100%;
    }
  }
`;

export const BackToOrdersButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  font: inherit;
  font-weight: 750;
  cursor: pointer;
  transition:
    background var(--transition-normal),
    border-color var(--transition-normal),
    transform var(--transition-normal);

  &:hover {
    border-color: var(--color-accent);
    background: var(--color-surface-hover);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid var(--color-primary-soft);
    outline-offset: 2px;
  }
`;

export const NewOrderPageContent = styled.div`
  width: 100%;
  min-width: 0;
  min-height: 0;
  height: auto;
  overflow: visible;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-background);

  /*
   * Selector Productos / Comanda visible en escritorio y móvil.
   * Solo se muestra el panel cuya clase sea mobile-active.
   * Se limita a Nueva comanda para no alterar el modal reutilizado.
   */
  > div {
    width: 100%;
    height: auto;
    min-height: 0;
    overflow: visible;
  }

  nav {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px;
    width: 100%;
    margin: 0 0 12px;
    padding: 6px;
    box-sizing: border-box;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    background: var(--color-surface-hover);
  }

  main {
    display: block;
    width: 100%;
    height: auto;
    min-height: 0;
    overflow: visible;

    > div {
      display: none;
      width: 100%;
      height: auto;
      min-width: 0;
      min-height: 0;
      overflow: visible;
    }

    > div.mobile-active {
      display: block;
    }

    > div.mobile-hidden {
      display: none;
    }
  }

  @media (max-width: 900px) {
    height: auto;
    min-height: 0;
    overflow: visible;

    main {
      display: block;
      height: auto;
      min-height: 0;
      overflow: visible;

      > div {
        height: auto;
        min-height: 0;
        overflow: visible;
      }
    }
  }

  @media (max-width: 500px) {
    nav {
      gap: 4px;
      margin-bottom: 10px;
      padding: 4px;
    }
  }
`;

export const NewOrderPageFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 12px 0;

  @media (max-width: 600px) {
    > button {
      width: 100%;
    }
  }
`;
