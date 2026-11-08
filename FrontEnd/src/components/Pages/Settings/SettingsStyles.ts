import styled from "styled-components";

export const SettingsTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 7px;
  width: 100%;
  padding: 6px;
  border: 1px solid var(--app-border);
  border-radius: 17px;
  background: var(--app-paper);
  box-shadow: var(--app-shadow-xs);

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
  border: 1px solid ${({ $active }) => ($active ? "var(--app-primary)" : "transparent")};
  border-radius: 12px;
  background: ${({ $active }) => ($active ? "var(--app-primary)" : "transparent")};
  color: ${({ $active }) => ($active ? "var(--app-white)" : "var(--app-muted-dark)")};
  font: inherit;
  font-size: 0.98rem;
  font-weight: 800;
  cursor: pointer;
  transition: background var(--app-transition), color var(--app-transition), border-color var(--app-transition), transform var(--app-transition);

  svg {
    flex: 0 0 auto;
    font-size: 1.25rem;
  }

  &:hover {
    background: ${({ $active }) => ($active ? "var(--app-primary-hover)" : "var(--app-surface-soft)")};
  }

  &:focus-visible {
    outline: 3px solid var(--app-accent-soft);
    outline-offset: 2px;
  }

  @media (max-width: 420px) {
    gap: 7px;
    min-height: 48px;
    font-size: 0.85rem;
    svg { font-size: 1rem; }
  }
`;

export const SettingsPanel = styled.section`
  width: 100%;
  min-width: 0;
  padding: 22px;
  border: 1px solid var(--app-border);
  border-radius: 22px;
  background: var(--app-paper);
  box-shadow: var(--app-shadow-sm);
  box-sizing: border-box;

  &:focus { outline: none; }

  @media (max-width: 700px) {
    padding: 15px;
    border-radius: 17px;
  }
`;
