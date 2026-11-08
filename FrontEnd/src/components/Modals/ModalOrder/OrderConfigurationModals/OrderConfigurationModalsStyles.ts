import styled from "styled-components";

export const DiscountTypeButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-top: 7px;
`;

export const DiscountTypeButton = styled.button<{ $active: boolean }>`
  min-height: 42px;
  padding: 9px 12px;
  border: 1px solid
    ${({ $active }) => ($active ? "var(--app-accent)" : "var(--app-border)")};
  border-radius: 10px;
  background: ${({ $active }) =>
    $active ? "var(--app-accent)" : "var(--app-white)"};
  color: var(--app-primary-active);
  font: inherit;
  font-weight: 750;
  cursor: pointer;
`;

export const ModalField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
  color: var(--app-primary-active);
  font-size: 0.86rem;
  font-weight: 700;
`;

export const ModalInput = styled.input`
  width: 100%;
  min-width: 0;
  min-height: 42px;
  box-sizing: border-box;
  padding: 9px 12px;
  border: 1px solid var(--app-border);
  border-radius: 10px;
  background: var(--app-white);
  color: var(--app-primary-active);
  font: inherit;
`;

export const AcceptButton = styled.button`
  min-height: 44px;
  padding: 10px 20px;
  border: 1px solid var(--app-accent);
  border-radius: 10px;
  background: var(--app-accent);
  color: var(--app-white);
  font: inherit;
  font-weight: 800;
  cursor: pointer;
  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;
