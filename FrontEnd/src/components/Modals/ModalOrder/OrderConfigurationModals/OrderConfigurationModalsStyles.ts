import styled from "styled-components";

export const DetailsPanel = styled.div`  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  gap: 16px;`;

export const DataSection = styled.section`  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  gap: 14px;`;

export const FieldsGrid = styled.div`
display: grid;
grid-template-columns: repeat(2, minmax(0, 1fr));
align-items: start;
gap: 14px;
width: 100%;
min-width: 0;

@media (max-width: 480px) {
grid-template-columns: minmax(0, 1fr);
}
`;

export const ModalField = styled.label`  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
  color: var(--app-primary-active);
  font-size: 0.86rem;
  font-weight: 700;`;

export const FieldLabelExtraNameField = styled(ModalField)`  grid-column: 1 / -1;`;

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
outline: none;
transition: border-color 0.2s ease, box-shadow 0.2s ease;

&:focus {
border-color: var(--app-accent);
box-shadow: 0 0 0 3px
color-mix(in srgb, var(--app-accent) 16%, transparent);
}

&::placeholder {
color: var(--app-text-secondary);
opacity: 0.75;
}
`;

export const StyledInputDateDisplay = styled.input`  width: 100%;   min-width: 0;   min-height: 42px;   box-sizing: border-box;   padding: 9px 12px;   border: 1px solid var(--app-border);   border-radius: 10px;   background: var(--app-background);   color: var(--app-primary-active);   font: inherit;   cursor: default;   opacity: 0.85;`;

export const DiscountTypeButtons = styled.div`  display: grid;   grid-template-columns: repeat(2, minmax(0, 1fr));   gap: 8px;   margin-top: 7px;`;

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
transition: background 0.2s ease, border-color 0.2s ease;

&:hover {
border-color: var(--app-accent);
}

&:focus-visible {
outline: 2px solid var(--app-accent);
outline-offset: 2px;
}
`;

export const SmallTextDiscountHint = styled.p`  margin: 12px 0 0;
  color: var(--app-text-secondary);
  font-size: 0.8rem;
  line-height: 1.5;`;

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
transition: opacity 0.2s ease, transform 0.2s ease;

&:hover:not(:disabled) {
opacity: 0.9;
transform: translateY(-1px);
}

&:focus-visible {
outline: 2px solid var(--app-primary-active);
outline-offset: 2px;
}

&:disabled {
opacity: 0.45;
cursor: not-allowed;
transform: none;
}
`;
