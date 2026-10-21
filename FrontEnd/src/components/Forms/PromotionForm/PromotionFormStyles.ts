import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .containerInfo {
    width: 100%;
    height: 80%;
    overflow-y: auto;
    scrollbar-width: none;
  }
`;

export const SectionTitle = styled.h3`
  margin: 0;

  color: var(--app-primary);
  font-size: 1rem;
  font-weight: 700;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;

  label {
    color: var(--app-primary);
    font-size: 0.88rem;
    font-weight: 700;
    line-height: 1.2;
  }

  small {
    color: var(--app-muted-dark);
    font-size: 0.76rem;
    line-height: 1.4;
  }

  input,
  select,
  textarea {
    width: 100%;
    box-sizing: border-box;

    padding: 10px 13px;

    border: 1px solid var(--app-accent);
    border-radius: 8px;

    background-color: var(--app-white);
    color: var(--app-primary);

    font-family: inherit;
    font-size: 0.92rem;

    outline: none;

    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      background-color 0.2s ease;

    &::placeholder {
      color: var(--app-muted-dark);
    }

    &:hover {
      border-color: var(--app-accent);
    }

    &:focus {
      border-color: var(--app-primary);
      box-shadow: 0 0 0 3px rgba(var(--app-shadow-rgb), 0.1);
    }

    &:disabled {
      background-color: var(--app-surface-soft);
      color: var(--app-muted-dark);
      cursor: not-allowed;
    }
  }

  input,
  select {
    min-height: 44px;
  }

  textarea {
    min-height: 85px;
    resize: vertical;
  }

  input[type="number"] {
    appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      margin: 0;
      appearance: none;
    }
  }
`;

export const ErrorText = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;

  margin-top: 1px;

  color: var(--app-danger);

  font-size: 0.78rem;
  font-weight: 500;
  line-height: 1.3;
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  width: 100%;
`;

export const PromotionItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
  box-sizing: border-box;

  padding: 18px;

  border: 1px solid var(--app-accent-soft);
  border-radius: 10px;

  background-color: var(--app-white);
`;

export const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 12px;

  padding-bottom: 12px;

  border-bottom: 1px solid var(--app-surface-soft);

  > div {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  strong {
    color: var(--app-primary);

    font-size: 0.95rem;
    font-weight: 700;
  }

  span {
    color: var(--app-muted-dark);

    font-size: 0.76rem;
  }

  @media (max-width: 480px) {
    align-items: flex-start;

    > div {
      min-width: 0;
    }

    span {
      line-height: 1.3;
    }
  }
`;

export const RemoveItemButton = styled.button`
  flex-shrink: 0;

  padding: 6px 10px;

  border: 1px solid var(--app-danger-soft);
  border-radius: 7px;

  background-color: var(--app-danger-soft);
  color: var(--app-danger);

  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background-color: var(--app-danger-soft);
    border-color: var(--app-danger);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const ProductToolbar = styled.div`
  display: grid;
  grid-template-columns: 1fr 220px;

  gap: 10px;

  width: 100%;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

export const SearchInput = styled.input`
  min-height: 42px;

  padding: 9px 12px;

  border: 1px solid var(--app-accent);
  border-radius: 8px;

  background-color: var(--app-white);
  color: var(--app-primary);

  font-family: inherit;
  font-size: 0.86rem;

  outline: none;

  &::placeholder {
    color: var(--app-muted-dark);
  }

  &:focus {
    border-color: var(--app-primary);
    box-shadow: 0 0 0 3px rgba(var(--app-shadow-rgb), 0.1);
  }
`;

export const CategorySelect = styled.select`
  min-height: 42px;

  padding: 9px 12px;

  border: 1px solid var(--app-accent);
  border-radius: 8px;

  background-color: var(--app-white);
  color: var(--app-primary);

  font-family: inherit;
  font-size: 0.86rem;

  outline: none;

  cursor: pointer;

  &:focus {
    border-color: var(--app-primary);
    box-shadow: 0 0 0 3px rgba(var(--app-shadow-rgb), 0.1);
  }
`;

export const ProductSelection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  width: 100%;

  max-height: 260px;

  overflow-y: auto;

  padding: 10px;

  border: 1px solid var(--app-accent-soft);
  border-radius: 8px;

  background-color: var(--app-white);

  scrollbar-width: thin;
`;

export const ProductOption = styled.button<{
  $selected: boolean;
}>`
  display: flex;
  align-items: center;

  gap: 10px;

  width: 100%;
  min-height: 45px;

  padding: 8px 11px;

  border: 1px solid
    ${({ $selected }) => ($selected ? "var(--app-accent)" : "transparent")};

  border-radius: 8px;

  background-color: ${({ $selected }) =>
    $selected ? "var(--app-surface-soft)" : "var(--app-white)"};

  color: var(--app-primary);

  font-family: inherit;

  font-size: 0.86rem;

  font-weight: ${({ $selected }) => ($selected ? "700" : "500")};

  text-align: left;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background-color: var(--app-surface-soft);
    border-color: var(--app-accent);
  }

  &:active {
    transform: scale(0.99);
  }
`;

export const ProductCheck = styled.span<{
  $selected: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  width: 22px;
  height: 22px;

  border: 1px solid
    ${({ $selected }) =>
      $selected ? "var(--app-primary)" : "var(--app-accent)"};

  border-radius: 6px;

  background-color: ${({ $selected }) =>
    $selected ? "var(--app-primary)" : "var(--app-white)"};

  color: var(--app-white);

  font-size: 0.75rem;
  font-weight: 700;
`;

export const SelectedProductsInfo = styled.div`
  padding: 8px 11px;

  border-radius: 7px;

  background-color: var(--app-surface-soft);

  color: var(--app-accent);

  font-size: 0.78rem;
  font-weight: 600;
`;

export const EmptyProductsMessage = styled.div`
  padding: 12px 14px;

  border: 1px solid var(--app-accent-soft);
  border-radius: 8px;

  background-color: var(--app-white);

  color: var(--app-accent);

  font-size: 0.82rem;
  line-height: 1.4;
`;

export const AddItemButton = styled.button`
  width: 100%;
  min-height: 42px;

  padding: 10px 16px;

  border: 1px dashed var(--app-accent);
  border-radius: 8px;

  background-color: var(--app-white);
  color: var(--app-primary);

  font-family: inherit;
  font-size: 0.86rem;
  font-weight: 700;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background-color: var(--app-surface-soft);
    border-color: var(--app-primary);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const FormActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 10px;

  margin-top: 5px;
  padding-top: 16px;

  border-top: 1px solid var(--app-surface-soft);

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    align-items: stretch;

    button {
      width: 100%;
    }
  }
`;

export const CancelButton = styled.button`
  min-height: 42px;

  padding: 10px 20px;

  border: 1px solid var(--app-border);
  border-radius: 8px;

  background-color: var(--app-surface-soft);
  color: var(--app-primary);

  font-family: inherit;
  font-size: 0.86rem;
  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background-color: var(--app-surface-soft);
    border-color: var(--app-border);
    color: var(--app-primary-active);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SubmitButton = styled.button`
  min-height: 42px;

  padding: 10px 20px;

  border: 1px solid var(--app-primary);
  border-radius: 8px;

  background-color: var(--app-primary);
  color: var(--app-white);

  font-family: inherit;
  font-size: 0.86rem;
  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background-color: var(--app-primary);
    border-color: var(--app-primary);

    box-shadow: 0 3px 8px rgba(var(--app-shadow-rgb), 0.18);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;
