import styled from "styled-components";

export const SettingsTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 7px;
  width: 100%;
  padding: 6px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);

  @media (max-width: 650px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const SettingsTab = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
  min-width: 0;
  min-height: 56px;
  padding: 0 12px;
  border: 1px solid ${({ $active }) => ($active ? "var(--color-primary)" : "transparent")};
  border-radius: var(--radius-md);
  background: ${({ $active }) => ($active ? "var(--color-primary)" : "transparent")};
  color: ${({ $active }) => ($active ? "var(--color-white)" : "var(--color-text-secondary)")};
  font: inherit;
  font-size: var(--font-size-md);
  font-weight: 800;
  cursor: pointer;
  transition: background var(--transition-normal), color var(--transition-normal), border-color var(--transition-normal), transform var(--transition-normal);

  svg {
    flex: 0 0 auto;
    font-size: 1.25rem;
  }

  &:hover {
    background: ${({ $active }) => ($active ? "var(--color-primary-hover)" : "var(--color-surface-hover)")};
  }

  &:focus-visible {
    outline: 3px solid var(--color-primary-soft);
    outline-offset: 2px;
  }

  @media (max-width: 420px) {
    gap: 7px;
    min-height: 48px;
    font-size: var(--font-size-sm);

    svg {
      font-size: 1rem;
    }
  }
`;

export const SettingsPanel = styled.section`
  width: 100%;
  min-width: 0;
  padding: 22px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  box-sizing: border-box;

  &:focus {
    outline: none;
  }

  @media (max-width: 700px) {
    padding: 15px;
    border-radius: var(--radius-lg);
  }
`;
