import styled from "styled-components";

export const FormContainer = styled.div`
  width: 100%;
  min-width: 0;
  color: var(--app-ink);

  
  input{
    background-color: #F3E5CF !important;
  }
`;

export const PromotionEditorLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, 0.72fr) minmax(0, 1.28fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const PromotionMainColumn = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 0;
  padding-right: 22px;
  border-right: 1px solid var(--app-border);

  @media (max-width: 850px) {
    padding: 0 0 20px;
    border-right: 0;
    border-bottom: 1px solid var(--app-border);
  }
`;

export const PromotionCompositionColumn = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;

  .composition-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 1px;
  }

  .composition-heading span {
    color: var(--app-muted-dark);
    font-size: 0.76rem;
  }
`;

export const SectionTitle = styled.h3`
  margin: 0;
  color: var(--app-primary);
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
  min-width: 0;

  label {
    color: var(--app-ink);
    font-size: 0.78rem;
    font-weight: 750;
  }

  input,
  select {
    width: 100%;
    min-width: 0;
    min-height: 42px;
    box-sizing: border-box;
    padding: 10px 12px;
    border: 1px solid var(--app-border);
    border-radius: 9px;
    outline: none;
    background: var(--app-surface);
    color: var(--app-ink);
    font: inherit;
    font-size: 0.84rem;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
      border-color: var(--app-accent);
      box-shadow: 0 0 0 3px rgba(var(--app-primary-rgb), 0.08);
    }

    &::placeholder {
      color: var(--app-muted-dark);
      opacity: 0.7;
    }
  }
`;

export const ErrorText = styled.span`
  color: var(--app-danger);
  font-size: 0.74rem;
  font-weight: 650;
`;

export const PromotionImagePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border: 1px solid var(--app-border);
  border-radius: 13px;
  background: var(--app-surface);

  input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
  }

  small {
    color: var(--app-muted-dark);
    font-size: 0.7rem;
    text-align: center;
  }
`;

export const PromotionImagePreview = styled.img`
  display: block;
  width: 100%;
  height: 185px;
  object-fit: cover;
  border-radius: 9px;
  background: var(--app-surface-soft);
`;

export const PromotionImagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 185px;
  border: 1px dashed var(--app-accent);
  border-radius: 9px;
  background: var(--app-surface-soft);
  color: var(--app-primary);

  svg {
    font-size: 27px;
  }

  strong {
    font-size: 0.86rem;
  }

  span {
    color: var(--app-muted-dark);
    font-size: 0.74rem;
  }
`;

export const PromotionImageUpload = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 39px;
  padding: 0 14px;
  border-radius: 8px;
  background: var(--app-primary);
  color: var(--app-white);
  font-size: 0.78rem;
  font-weight: 750;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export const PromotionDescriptionPreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  label {
    color: var(--app-ink);
    font-size: 0.78rem;
    font-weight: 750;
  }

  p {
    min-height: 58px;
    margin: 0;
    padding: 10px 12px;
    border: 1px solid var(--app-border);
    border-radius: 9px;
    background: var(--app-surface);
    color: var(--app-muted-dark);
    font-size: 0.78rem;
    line-height: 1.45;
  }
`;

export const PromotionStatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--app-border);
  border-radius: 10px;
  background: var(--app-surface);

  > div {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  strong {
    color: var(--app-ink);
    font-size: 0.8rem;
  }

  span {
    color: var(--app-muted-dark);
    font-size: 0.7rem;
  }
`;

export const PromotionStatusSwitch = styled.button<{ $active: boolean }>`
  position: relative;
  flex: 0 0 43px;
  width: 43px;
  height: 25px;
  padding: 0;
  border: 0;
  border-radius: 20px;
  background: ${({ $active }) =>
    $active ? "var(--app-primary)" : "var(--app-border)"};
  cursor: pointer;
  transition: background 0.2s;

  span {
    position: absolute;
    top: 3px;
    left: ${({ $active }) => ($active ? "21px" : "3px")};
    width: 19px;
    height: 19px;
    border-radius: 50%;
    background: var(--app-white);
    transition: left 0.2s;
  }
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  width: 100%;
`;

export const PromotionItem = styled.section`
  display: flex;
  flex-direction: column;
  gap: 13px;
  min-width: 0;
  padding: 15px;
  border: 1px solid var(--app-border);
  border-radius: 12px;
  background: var(--app-surface);
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: var(--app-accent);
    box-shadow: 0 3px 12px rgba(var(--app-shadow-rgb), 0.05);
  }
`;

export const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 11px;
  border-bottom: 1px solid var(--app-border);

  > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .group-index {
    color: var(--app-muted-dark);
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.09em;
  }

  strong {
    overflow: hidden;
    color: var(--app-primary);
    font-size: 0.88rem;
    font-weight: 800;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const RemoveItemButton = styled.button`
  display: grid;
  place-items: center;
  flex: 0 0 34px;
  width: 34px;
  height: 34px;
  border: 1px solid var(--app-danger-soft);
  border-radius: 8px;
  background: var(--app-danger-soft);
  color: var(--app-danger);
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;

  &:hover {
    transform: scale(1.05);
    opacity: 0.85;
  }
`;

export const GroupControlsRow = styled.div`
  display: grid;
  grid-template-columns: auto auto minmax(150px, 1fr) 170px;
  align-items: end;
  gap: 12px;
  min-width: 0;

  @media (max-width: 1050px) {
    grid-template-columns: auto auto minmax(130px, 1fr);
    ${""}
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr auto;
    align-items: center;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`;

export const GroupQuantityControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 116px;

  > label {
    color: var(--app-ink);
    font-size: 0.72rem;
    font-weight: 750;
    white-space: nowrap;
  }

  .stepper {
    display: inline-grid;
    grid-template-columns: 30px 32px 30px;
    align-items: center;
    justify-items: center;
    gap: 3px;
    min-height: 39px;
    padding: 3px 5px;
    box-sizing: border-box;
    border-radius: 9px;
    background: var(--app-surface-soft);
    color: var(--app-primary);
  }

  strong {
    font-size: 0.9rem;
    font-weight: 850;
  }

  button {
    display: grid;
    place-items: center;
    width: 29px;
    height: 29px;
    padding: 0;
    border: 0;
    border-radius: 7px;
    background: var(--app-canvas);
    color: var(--app-primary);
    cursor: pointer;
    transition: opacity 0.15s, background 0.15s;

    &:hover:not(:disabled) {
      background: var(--app-accent);
      color: var(--app-white);
    }

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
  }
`;

export const GroupProductsHeading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
  min-width: max-content;
  min-height: 39px;

  strong {
    color: var(--app-ink);
    font-size: 0.75rem;
    font-weight: 750;
  }

  span {
    color: var(--app-muted-dark);
    font-size: 0.68rem;
    white-space: nowrap;
  }

  @media (max-width: 760px) {
    align-items: flex-end;
  }

  @media (max-width: 520px) {
    align-items: flex-start;
  }
`;

export const ProductToolbar = styled.div`
  display: grid;
  grid-template-columns: minmax(120px, 1fr) 165px;
  gap: 7px;
  min-width: 0;

  @media (max-width: 1050px) {
    grid-column: 1 / -1;
    grid-template-columns: minmax(0, 1fr) 165px;
  }

  @media (max-width: 760px) {
    grid-column: 1 / -1;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  min-width: 0;
  min-height: 38px;
  box-sizing: border-box;
  padding: 9px 12px;
  border: 1px solid var(--app-border);
  border-radius: 8px;
  outline: none;
  background: var(--app-white);
  color: var(--app-ink);
  font-family: inherit;
  font-size: 0.78rem;

  &:focus {
    border-color: var(--app-accent);
  }

  &::placeholder {
    color: var(--app-muted-dark);
  }
`;

export const CategorySelect = styled.select`
  width: 100%;
  min-width: 0;
  min-height: 38px;
  box-sizing: border-box;
  padding: 8px 10px;
  border: 1px solid var(--app-border);
  border-radius: 8px;
  outline: none;
  background: var(--app-white);
  color: var(--app-ink);
  font-family: inherit;
  font-size: 0.78rem;
  cursor: pointer;

  &:focus {
    border-color: var(--app-accent);
  }
`;

export const ProductSelection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  max-height: 230px;
  overflow-y: auto;
  padding: 2px;
  scrollbar-width: thin;
  scrollbar-color: var(--app-accent) transparent;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: var(--app-accent);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const ProductOption = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  min-height: 45px;
  padding: 9px 10px;
  border: 1px solid
    ${({ $selected }) =>
      $selected ? "var(--app-accent)" : "var(--app-border)"};
  border-radius: 9px;
  background: ${({ $selected }) =>
    $selected ? "var(--app-surface-soft)" : "var(--app-white)"};
  color: var(--app-ink);
  text-align: left;
  font-family: inherit;
  font-size: 0.76rem;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: var(--app-accent);
    background: var(--app-surface-soft);
  }

  span:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const ProductCheck = styled.span<{ $selected: boolean }>`
  display: grid;
  place-items: center;
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  border: 1px solid
    ${({ $selected }) =>
      $selected ? "var(--app-primary)" : "var(--app-border)"};
  border-radius: 6px;
  background: ${({ $selected }) =>
    $selected ? "var(--app-primary)" : "var(--app-white)"};
  color: var(--app-white);
  font-size: 0.65rem;
`;

export const EmptyProductsMessage = styled.div`
  grid-column: 1 / -1;
  padding: 15px;
  border: 1px dashed var(--app-border);
  border-radius: 9px;
  color: var(--app-muted-dark);
  font-size: 0.78rem;
  text-align: center;
`;

export const AddItemButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  width: 100%;
  min-height: 43px;
  border: 1px dashed var(--app-accent);
  border-radius: 9px;
  background: var(--app-surface-soft);
  color: var(--app-primary);
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;

  &:hover {
    border-style: solid;
    background: var(--app-canvas);
  }
`;
