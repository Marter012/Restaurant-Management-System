import styled from "styled-components";
import ListTable from "../../components/Tables/ListTable.tsx";
import { TableRow } from "../../components/Tables/ListTableStyles.ts";

const bulkColumns = `
  minmax(250px, 2fr)
  minmax(105px, 0.8fr)
  minmax(135px, 1fr)
  minmax(135px, 1fr)
  minmax(150px, 1.1fr)
`;

export const BulkEditorContainer = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: var(--color-text);
  box-sizing: border-box;

  .bulk-editor-error {
    margin: 0;
    padding: 12px 15px;
    border: 1px solid color-mix(in srgb, var(--color-danger) 25%, transparent);
    border-radius: 12px;
    background: var(--color-danger-soft);
    color: var(--color-danger);
    font-size: 0.88rem;
    line-height: 1.45;
  }

  .bulk-editor-hint {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 12px 15px;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    background: var(--color-surface);
    color: var(--color-text-secondary);
    font-size: 0.82rem;
    line-height: 1.45;

    svg {
      flex: 0 0 auto;
      margin-top: 2px;
      color: var(--color-accent);
    }
  }

  @media (max-width: 700px) {
    gap: 14px;
  }
`;

export const BulkEditorToolbar = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(220px, 0.9fr) minmax(240px, 1.2fr) auto;
  align-items: end;
  gap: 14px;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: 15px;
  background: var(--color-surface);
  box-sizing: border-box;

  .category-control {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 7px;

    > span {
      color: var(--color-text-secondary);
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.035em;
      text-transform: uppercase;
    }

    select {
      width: 100%;
      min-width: 0;
      height: 48px;
      padding: 0 13px;
      border: 1px solid var(--color-border);
      border-radius: 10px;
      background: var(--color-white);
      color: var(--color-text);
      font: inherit;
      font-size: 0.9rem;
      outline: none;
      cursor: pointer;

      &:focus-visible {
        border-color: var(--color-accent);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 13%, transparent);
      }
    }
  }

  .search-control {
    min-width: 0;
    height: 48px;
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 0 14px;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    background: var(--color-white);
    color: var(--color-text-secondary);

    &:focus-within {
      border-color: var(--color-accent);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 13%, transparent);
    }

    svg {
      flex: 0 0 auto;
      font-size: 0.95rem;
    }

    input {
      width: 100%;
      min-width: 0;
      height: 100%;
      border: 0;
      outline: 0;
      background: transparent !important;
      color: var(--color-text);
      font: inherit;
      font-size: 0.9rem;
    }

    input::placeholder {
      color: var(--color-text-secondary);
    }
  }

  .edit-modes {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 9px;
    min-height: 48px;
  }

  .edit-modes-label {
    color: var(--color-text-secondary);
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .mode-toggle {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    min-height: 38px;
    padding: 0 11px;
    border: 1px solid var(--color-border);
    border-radius: 9px;
    background: var(--color-white);
    color: var(--color-text-secondary);
    font-size: 0.82rem;
    font-weight: 750;
    white-space: nowrap;
    cursor: pointer;
    transition: border-color 150ms ease, background 150ms ease;

    &.is-active {
      border-color: var(--color-accent);
      background: var(--color-surface-muted);
      color: var(--color-primary);
    }

    input {
      accent-color: var(--color-primary);
      width: 16px;
      height: 16px;
      margin: 0;
      cursor: pointer;
    }
  }

  @media (max-width: 1120px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);

    .edit-modes {
      grid-column: 1 / -1;
      justify-content: flex-start;
    }
  }

  @media (max-width: 620px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
    padding: 12px;

    .edit-modes {
      grid-column: auto;
      flex-wrap: wrap;
    }
  }
`;


export const BulkEditorListTable = styled(ListTable)`
 width: 100%;
  min-width: 0;
  height: auto;
  min-height: 0;
  max-height: none;
  overflow: visible;

  .table-scroll {
    width: 100%;
    min-width: 0;
    height: 100%;
    max-height: inherit;
    overflow: auto;
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: var(--color-accent) var(--color-surface-muted);
  }

  .table-scroll::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .table-scroll::-webkit-scrollbar-track {
    background: var(--color-surface-muted);
  }

  .table-scroll::-webkit-scrollbar-thumb {
    background: var(--color-accent);
    border-radius: 20px;
  }

  && .table-header {
    width: 100%;
    min-width: 900px;
    grid-template-columns: ${bulkColumns};
    gap: 12px;
    align-items: center;
    padding: 16px 18px;
    background: var(--color-surface-muted) !important;
    background-image: none !important;
    border: 0 !important;
    border-bottom: 1px solid var(--color-border) !important;
    box-shadow: none !important;
    box-sizing: border-box;

    h4 {
      min-width: 0;
      margin: 0;
      color: var(--color-primary) !important;
      background: transparent !important;
      font-size: 0.78rem;
      font-weight: 850;
      letter-spacing: 0.045em;
      line-height: 1.35;
      text-transform: uppercase;
      white-space: nowrap;
      text-align: center;
    }

    h4:first-child {
      text-align: left;
      padding-left: 45px;
    }
  }

  .table-scroll > div:last-child {
    width: 100%;
    min-width: 900px;
    padding: 0;
    gap: 0;
    box-sizing: border-box;
    background: var(--color-white) !important;
    background-image: none !important;
  }

  .bulk-empty {
    margin: 0;
    padding: 32px 16px;
    color: var(--color-text-secondary);
    text-align: center;
    font-size: 0.9rem;
  }

  @media (max-width: 700px) {
    max-height: 48dvh;
    border-radius: 11px;

    && .table-header {
      padding: 13px 12px;
    }
  }
`;

export const BulkEditorListRow = styled(TableRow)`
  && {
    background: var(--color-white) !important;
    background-image: none !important;
    border: 0 !important;
    border-bottom: 1px solid var(--color-border) !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }

  width: 100%;
  min-width: 900px;
  grid-template-columns: ${bulkColumns};
  gap: 12px;
  align-items: center;
  min-height: 76px;
  margin: 0;
  padding: 11px 18px;
  border: 0;
  border-bottom: 1px solid var(--color-border);
  border-radius: 0;
  background: var(--color-white);
  color: var(--color-text);
  box-shadow: none;
  box-sizing: border-box;
  transition: background 150ms ease;

  &&:nth-child(even) {
    background: var(--color-surface) !important;
  }

  &&.is-selected {
    background: var(--color-white) !important;
  }

  &&:nth-child(even).is-selected {
    background: var(--color-surface) !important;
  }

  &&:hover {
    z-index: 0;
    background: var(--color-surface-muted) !important;
    border-color: var(--color-border) !important;
    box-shadow: none !important;
  }

  .bulk-product-cell {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 11px;
    text-align: left;

    .bulk-product-checkbox {
      appearance: none;
      flex: 0 0 21px;
      width: 21px;
      height: 21px;
      display: grid;
      place-items: center;
      margin: 0;
      border: 1px solid var(--color-border-strong);
      border-radius: 6px;
      background: var(--color-white);
      cursor: pointer;

      &::after {
        content: "✓";
        color: var(--color-white);
        font-size: 0.82rem;
        font-weight: 900;
        transform: scale(0);
      }

      &:checked {
        border-color: var(--color-primary);
        background: var(--color-primary);
      }

      &:checked::after {
        transform: scale(1);
      }

      &:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }
    }

    img {
      flex: 0 0 48px;
      width: 48px;
      height: 46px;
      border-radius: 9px;
      object-fit: cover;
      background: var(--color-surface-muted);
    }

    .product-copy {
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    strong {
      min-width: 0;
      color: var(--color-text);
      font-size: 0.88rem;
      font-weight: 800;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .product-copy span {
      color: var(--color-text-secondary);
      font-size: 0.72rem;
      font-weight: 650;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .bulk-current-cell,
  .bulk-value-cell {
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cell-value {
    color: var(--color-text);
    font-size: 0.9rem;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .value-input {
    width: min(145px, 100%);
    min-width: 0;
    height: 44px;
    box-sizing: border-box;
    padding: 0 12px;
    border: 1px solid var(--color-border);
    border-radius: 9px;
    background: var(--color-surface-muted);
    color: var(--color-text);
    font: inherit;
    font-size: 0.88rem;
    font-weight: 750;
    text-align: center;
    outline: none;
    font-variant-numeric: tabular-nums;
    transition: border-color 150ms ease, box-shadow 150ms ease;

    &:focus-visible {
      border-color: var(--color-accent);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 14%, transparent);
      background: var(--color-white);
    }

    &:disabled {
      opacity: 0.62;
      background: var(--color-surface);
      color: var(--color-text-secondary);
      cursor: not-allowed;
    }
  }

  .price-input-wrap {
    gap: 7px;

    > span {
      color: var(--color-primary);
      font-size: 0.9rem;
      font-weight: 850;
    }

    .value-input {
      text-align: left;
    }
  }

  @media (max-width: 700px) {
    padding: 10px 12px;
    gap: 9px;

    .bulk-product-cell {
      gap: 8px;

      img {
        flex-basis: 40px;
        width: 40px;
        height: 40px;
      }

      strong {
        font-size: 0.8rem;
      }

      .product-copy span {
        font-size: 0.66rem;
      }
    }

    .value-input {
      height: 40px;
      padding: 0 8px;
      font-size: 0.8rem;
    }
  }
`;

export const BulkEditorFooterActions = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  .footer-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }

  @media (max-width: 700px) {
    align-items: stretch;
    flex-direction: column;

    .footer-buttons {
      width: 100%;
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
    }
  }

  @media (max-width: 420px) {
    .footer-buttons {
      grid-template-columns: 1fr;
    }
  }
`;

export const BulkEditorFooterSummary = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  color: var(--color-text-secondary);
  font-size: 0.84rem;
  font-weight: 700;

  .summary-count {
    display: inline-grid;
    place-items: center;
    min-width: 36px;
    height: 36px;
    padding: 0 8px;
    border-radius: 10px;
    background: var(--color-surface-muted);
    color: var(--color-primary);
    font-size: 1rem;
    font-weight: 900;
    font-variant-numeric: tabular-nums;
  }

  .summary-changes {
    padding: 6px 9px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-accent) 13%, transparent);
    color: var(--color-primary);
    font-size: 0.74rem;
    font-weight: 800;
  }
`;

export const BulkEditorButton = styled.button<{ $secondary?: boolean }>`
  min-height: 48px;
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 18px;
  border: 1px solid ${({ $secondary }) => ($secondary ? "var(--color-border)" : "transparent")};
  border-radius: 11px;
  background: ${({ $secondary }) =>
    $secondary ? "var(--color-white)" : "var(--color-primary)"};
  color: ${({ $secondary }) =>
    $secondary ? "var(--color-primary)" : "var(--color-white)"};
  font: inherit;
  font-size: 0.86rem;
  font-weight: 850;
  white-space: nowrap;
  cursor: pointer;
  transition: filter 150ms ease, transform 150ms ease;

  &:hover:not(:disabled) {
    filter: brightness(1.06);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 700px) {
    width: 100%;
    min-width: 0;
    min-height: 45px;
    padding: 0 12px;
    font-size: 0.8rem;
  }
`;
