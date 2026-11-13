import styled from "styled-components";

export const StoreContactPanel = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 0.8fr);
  gap: 18px;
  align-items: center;
  padding: 18px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);

  @media (max-width: 760px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const StoreContactCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;

  strong { color: var(--color-text); font-size: var(--font-size-md); }
  p { margin: 0; color: var(--color-text-secondary); line-height: 1.5; }
`;

export const StoreContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 9px;
  min-width: 0;

  label { color: var(--color-text-secondary); font-size: var(--font-size-xs); font-weight: 700; }
  input {
    width: 100%; min-height: 43px; padding: 10px 12px;
    border: 1px solid var(--color-border); border-radius: var(--radius-md);
    background: var(--color-surface); color: var(--color-text);
  }
`;

export const StoreContactActions = styled.div`
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  button {
    min-height: 42px; padding: 9px 16px; border: 1px solid var(--color-primary);
    border-radius: var(--radius-md); background: var(--color-primary);
    color: var(--color-white); font-weight: 750;
  }
  span { color: var(--color-text-secondary); font-size: var(--font-size-xs); }
`;

export const StoreContactMessage = styled.p<{ $error?: boolean }>`
  margin: 0;
  color: ${({ $error }) => $error ? "var(--color-danger)" : "var(--color-success)"};
  font-size: var(--font-size-xs);
`;
