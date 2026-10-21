import styled from "styled-components";
import { caramelButtonStyles } from "../Utils/ButtonStyles.ts";

export const ModalContainer = styled.div`
  /* Dimensiones originales: no se agranda ni ocupa toda la pantalla */
  width: min(1240px, calc(100vw - 32px));
  height: min(80dvh, 900px);
  max-height: calc(100dvh - 24px);
  min-height: 0;
  margin: auto;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  border: 1px solid rgba(var(--app-shadow-rgb), 0.1);
  border-radius: 20px;
  background: var(--app-white);

  box-shadow:
    0 30px 90px rgba(var(--app-shadow-rgb), 0.28),
    0 8px 25px rgba(var(--app-shadow-rgb), 0.12);

  animation: modalIn 0.22s ease;
  @keyframes modalIn {
    from {
      opacity: 0;
      transform: translateY(8px) scale(0.985);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

export const ModalHeader = styled.header`
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  padding: 22px 28px;

  border-bottom: 1px solid rgba(var(--app-shadow-rgb), 0.08);

  background: linear-gradient(
    110deg,
    var(--app-white),
    var(--app-surface-soft)
  );

  ${caramelButtonStyles}

  @media (max-width: 900px) {
    padding: 20px 22px;
  }
  @media (max-width: 600px) {
    padding: 17px 15px;
    gap: 12px;
  }
`;

export const ModalHeaderInfo = styled.div`
  min-width: 0;
`;

export const ModalTitle = styled.h2`
  margin: 0;

  color: var(--app-primary-active);

  font-size: 22px;
  font-weight: 850;
  letter-spacing: -0.3px;

  @media (max-width: 900px) {
    font-size: 23px;
  }
  @media (max-width: 600px) {
    font-size: 21px;
    line-height: 1.25;
  }
`;

export const ModalSubtitle = styled.p`
  margin: 4px 0 0;

  color: var(--app-white);

  font-size: 13px;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

export const CloseButton = styled.button`
  width: 36px;
  height: 36px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid var(--app-accent-soft);
  border-radius: 10px;

  background: var(--app-white);

  color: var(--app-muted-dark);

  cursor: pointer;

  font-size: 13px;

  transition: 0.18s ease;

  &:hover {
    border-color: var(--app-accent);
    background: var(--app-surface-soft);
    color: var(--app-primary);
  }
`;

export const ModalContent = styled.div`
  min-height: 0;
  min-width: 0;
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 14px;

  overflow: hidden;

  padding: 18px 22px 22px;

  @media (max-width: 900px) {
    padding: 14px;
    gap: 12px;
  }

  @media (max-width: 600px) {
    padding: 10px;
    gap: 10px;
  }
`;

/* =====================================================
   FILTERS
===================================================== */

export const Filters = styled.div`
  display: flex;
  gap: 6px;

  width: fit-content;
  max-width: 100%;

  margin-bottom: 18px;
  padding: 4px;
  justify-content: space-between;

  overflow-x: auto;

  border: 1px solid rgba(var(--app-shadow-rgb), 0.08);
  border-radius: 11px;

  background: var(--app-surface-soft);

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 600px) {
    width: 100%;
    box-sizing: border-box;
    justify-content: stretch;
    margin-bottom: 12px;
    > button {
      flex: 1 1 auto;
    }
  }
`;

export const FilterButton = styled.button<{
  $active: boolean;
}>`
  flex-shrink: 0;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 7px;

  min-height: 34px;

  padding: 6px 12px;

  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(var(--app-shadow-rgb), 0.08)" : "transparent"};

  border-radius: 8px;

  background: ${({ $active }) =>
    $active ? "var(--app-white)" : "transparent"};

  color: ${({ $active }) =>
    $active ? "var(--app-primary)" : "var(--app-muted-dark)"};

  box-shadow: ${({ $active }) =>
    $active ? "0 2px 7px rgba(var(--app-shadow-rgb), 0.07)" : "none"};

  cursor: pointer;

  font-family: inherit;
  font-size: 10px;
  font-weight: 850;

  transition: 0.18s ease;

  span {
    min-width: 20px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: 2px 5px;

    border-radius: 20px;

    background: ${({ $active }) =>
      $active ? "var(--app-surface-soft)" : "rgba(var(--app-white-rgb), 0.55)"};

    font-size: 9px;
  }

  &:hover {
    background: var(--app-white);
    color: var(--app-primary);
  }

  @media (max-width: 600px) {
    min-height: 38px;
    padding: 8px 10px;
    font-size: 11px;
  }
`;

/* =====================================================
   MAIN
===================================================== */

export const MainLayout = styled.div`
  display: grid;
  flex: 1;
  min-height: 0;
  height: 100%;

  grid-template-columns:
    minmax(290px, 0.78fr)
    minmax(0, 1.5fr);

  gap: 14px;

  min-width: 0;

  align-items: stretch;

  @media (max-width: 1000px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    gap: 12px;
  }

  @media (max-width: 600px) {
    gap: 10px;
  }
`;

/* =====================================================
   USERS
===================================================== */

export const UsersPanel = styled.section<{
  $mobileVisible?: boolean;
}>`
  min-width: 0;
  min-height: 0;
  height: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  padding: 18px;

  border: 1px solid rgba(var(--app-shadow-rgb), 0.09);
  border-radius: 16px;

  background: var(--app-surface-soft);

  @media (max-width: 900px) {
    padding: 16px;
  }
  @media (max-width: 600px) {
    padding: 13px;
    border-radius: 13px;
  }

  @media (max-width: 1000px) {
    display: ${({ $mobileVisible }) => ($mobileVisible ? "flex" : "none")};
    height: 100%;
    min-height: 0;
  }
`;

export const UsersPanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 10px;

  margin-bottom: 12px;
  padding: 2px 2px 0;

  color: var(--app-primary);

  svg {
    margin-top: 2px;

    font-size: 15px;

    opacity: 0.45;
  }

  @media (max-width: 600px) {
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }
`;

export const UsersPanelTitle = styled.h3`
  margin: 0;

  color: var(--app-primary-active);

  font-size: 18px;
  font-weight: 850;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

export const UsersPanelSubtitle = styled.p`
  margin: 3px 0 0;

  color: var(--app-muted-dark);

  font-size: 13px;
  line-height: 1.45;
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const UsersList = styled.div`
  display: flex;
  flex-direction: column;

  gap: 7px;

  min-height: 0;
  flex: 1;
  max-height: none;

  overflow-y: auto;

  padding-right: 2px;

  scrollbar-width: thin;
  scrollbar-color: var(--app-accent) transparent;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--app-accent);
    border-radius: 20px;
  }

  @media (max-width: 900px) {
    flex: 0 1 auto;
    max-height: 34dvh;
    gap: 9px;
  }

  @media (max-width: 600px) {
    max-height: 30dvh;
    gap: 9px;
  }
`;

export const UserRow = styled.button<{
  $selected: boolean;
}>`
  position: relative;

  width: 100%;

  display: flex;
  align-items: center;

  gap: 10px;

  min-width: 0;

  padding: 10px;

  border: 1px solid
    ${({ $selected }) =>
      $selected ? "var(--app-accent)" : "rgba(var(--app-shadow-rgb), 0.07)"};

  border-radius: 12px;

  background: ${({ $selected }) =>
    $selected ? "var(--app-white)" : "var(--app-white)"};

  color: inherit;

  text-align: left;

  cursor: pointer;

  box-shadow: ${({ $selected }) =>
    $selected ? "0 4px 13px rgba(var(--app-shadow-rgb), 0.07)" : "none"};

  transition: 0.18s ease;

  &:hover {
    border-color: var(--app-accent);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid rgba(var(--app-accent-rgb), 0.22);

    outline-offset: 2px;
  }
`;

export const UserAvatar = styled.div<{
  $active: boolean;
}>`
  width: 38px;
  height: 38px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: ${({ $active }) =>
    $active ? "var(--app-surface-soft)" : "var(--app-surface-soft)"};

  color: ${({ $active }) =>
    $active ? "var(--app-primary)" : "var(--app-muted-dark)"};

  font-size: 13px;
`;

export const UserMain = styled.div`
  min-width: 0;

  flex: 1;
`;

export const UserName = styled.strong`
  display: block;

  overflow: hidden;

  color: var(--app-primary-active);

  font-size: 14px;
  font-weight: 850;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UserEmail = styled.span`
  display: block;

  overflow: hidden;

  margin-top: 2px;

  color: var(--app-muted-dark);

  font-size: 11px;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UserMeta = styled.div`
  display: flex;
  align-items: center;

  gap: 6px;

  margin-top: 5px;
`;

export const UserRole = styled.span`
  color: var(--app-muted-dark);

  font-size: 10px;
  font-weight: 700;
`;

export const UserStatus = styled.span<{
  $active: boolean;
}>`
  display: inline-flex;
  align-items: center;

  gap: 4px;

  padding: 2px 6px;

  border-radius: 20px;

  background: ${({ $active }) =>
    $active ? "var(--app-surface-soft)" : "var(--app-surface-soft)"};

  color: ${({ $active }) =>
    $active ? "var(--app-primary)" : "var(--app-muted-dark)"};

  font-size: 9px;
  font-weight: 800;

  &::before {
    content: "";

    width: 4px;
    height: 4px;

    border-radius: 50%;

    background: currentColor;
  }
`;

export const SelectedIndicator = styled.div`
  width: 24px;
  height: 24px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: var(--app-primary);

  color: var(--app-white);

  font-size: 8px;
`;

/* =====================================================
   EDITOR
===================================================== */

export const EditorPanel = styled.section<{
  $empty?: boolean;
  $mobileVisible?: boolean;
}>`
  min-width: 0;
  min-height: 0;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 22px;

  border: 1px solid rgba(var(--app-shadow-rgb), 0.09);
  border-radius: 17px;

  background: var(--app-white);

  ${({ $empty }) =>
    $empty &&
    `
      min-height: 0;
      align-items: center;
      justify-content: center;
    `}

  @media (max-width: 600px) {
    padding: 16px;
  }

  @media (max-width: 900px) {
    padding: 18px;
  }
  @media (max-width: 600px) {
    padding: 14px;
    border-radius: 13px;
  }

  @media (max-width: 1000px) {
    display: ${({ $mobileVisible }) => ($mobileVisible ? "flex" : "none")};
    height: 100%;
    min-height: 0;
  }
`;

export const EditorHeader = styled.div`
  height: 15%;

  border-bottom: 1px solid rgba(var(--app-shadow-rgb), 0.08);
`;

export const EditorUser = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
`;

export const EditorAvatar = styled.div<{
  $active: boolean;
}>`
  width: 44px;
  height: 44px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;

  background: ${({ $active }) =>
    $active ? "var(--app-surface-soft)" : "var(--app-surface-soft)"};

  color: ${({ $active }) =>
    $active ? "var(--app-primary)" : "var(--app-muted-dark)"};

  font-size: 16px;
`;

export const EditorUserInfo = styled.div`
  min-width: 0;
`;

export const EditorUserName = styled.strong`
  display: block;

  overflow: hidden;

  color: var(--app-primary-active);

  font-size: 15px;
  font-weight: 850;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EditorUserRole = styled.span`
  display: block;

  margin-top: 3px;

  color: var(--app-muted-dark);

  font-size: 10px;
`;

/* =====================================================
   SECTIONS
===================================================== */
export const ContainerSectionInfo = styled.div`
  height: 60%;
  overflow-y: auto;
  scrollbar-width: none;
`;

export const Section = styled.section`
  height: auto;
  margin-bottom: 17px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: flex-start;

  gap: 9px;

  margin-bottom: 11px;
`;

export const SectionIcon = styled.div<{
  $security?: boolean;
}>`
  width: 29px;
  height: 29px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;

  background: ${({ $security }) =>
    $security ? "var(--app-surface-soft)" : "var(--app-surface-soft)"};

  color: ${({ $security }) =>
    $security ? "var(--app-muted-dark)" : "var(--app-primary)"};

  font-size: 11px;
`;

export const SectionTitle = styled.h4`
  margin: 0;

  color: var(--app-primary-active);

  font-size: 14px;
  font-weight: 850;
`;

export const SectionDescription = styled.p`
  margin: 2px 0 0;

  color: var(--app-muted-dark);

  font-size: 11px;
  line-height: 1.4;
`;

export const FormGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 11px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 5px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 50px;
    }
  }
`;

export const Label = styled.label`
  color: var(--app-accent);

  font-size: 11px;
  font-weight: 850;
`;

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;

  min-height: 44px;

  padding: 8px 10px;

  border: 1px solid var(--app-accent-soft);
  border-radius: 9px;

  outline: none;

  background: var(--app-white);

  color: var(--app-primary-active);

  font-family: inherit;
  font-size: 13px;

  transition: 0.18s ease;

  &::placeholder {
    color: var(--app-muted);
  }

  &:hover {
    border-color: var(--app-accent);
  }

  &:focus {
    border-color: var(--app-accent);

    box-shadow: 0 0 0 3px rgba(var(--app-accent-rgb), 0.13);
  }

  @media (max-width: 600px) {
    min-height: 42px;
    font-size: 16px;
  }
`;

export const Select = styled.select`
  width: 100%;
  box-sizing: border-box;

  min-height: 44px;

  padding: 8px 10px;

  border: 1px solid var(--app-accent-soft);
  border-radius: 9px;

  outline: none;

  background: var(--app-white);

  color: var(--app-primary-active);

  font-family: inherit;
  font-size: 13px;

  cursor: pointer;

  &:focus {
    border-color: var(--app-accent);

    box-shadow: 0 0 0 3px rgba(var(--app-accent-rgb), 0.13);
  }

  @media (max-width: 600px) {
    min-height: 42px;
    font-size: 16px;
  }
`;

/* =====================================================
   SECURITY
===================================================== */

export const SecurityCard = styled.div`
  padding: 18px;

  border: 1px solid var(--app-surface-soft);
  border-radius: 14px;

  background: linear-gradient(
    145deg,
    var(--app-white) 0%,
    var(--app-white) 100%
  );
`;

export const SecurityHeader = styled.div`
  display: flex;
  align-items: center;

  gap: 9px;

  margin-bottom: 13px;
`;

export const SecurityIcon = styled.div`
  width: 36px;
  height: 36px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: var(--app-surface-soft);

  color: var(--app-muted-dark);

  font-size: 13px;
`;

export const SecurityText = styled.div`
  min-width: 0;
`;

export const SecurityTitle = styled.strong`
  display: block;
  color: var(--app-primary-active);
  font-size: 14px;
  line-height: 1.35;
  font-weight: 850;

  @media (max-width: 600px) {
    font-size: 15px;
  }
`;

export const SecurityDescription = styled.span`
  display: block;
  margin-top: 5px;
  color: var(--app-muted-dark);
  font-size: 12px;
  line-height: 1.5;

  strong {
    color: var(--app-primary);
  }
`;

export const SecuritySteps = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
  margin-bottom: 16px;
  padding: 5px;
  border-radius: 12px;
  background: var(--app-surface-soft);

  @media (max-width: 420px) {
    gap: 3px;
    padding: 4px;
  }
`;

export const SecurityStep = styled.div<{
  $active: boolean;
  $completed: boolean;
}>`
  min-width: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 5px;

  min-height: 40px;
  padding: 8px 6px;
  border-radius: 9px;

  background: ${({ $active }) =>
    $active ? "var(--app-white)" : "transparent"};

  color: ${({ $active, $completed }) =>
    $active || $completed ? "var(--app-primary)" : "var(--app-muted-dark)"};

  box-shadow: ${({ $active }) =>
    $active ? "0 2px 6px rgba(var(--app-shadow-rgb), 0.07)" : "none"};

  transition: 0.18s ease;
`;

export const SecurityStepNumber = styled.div`
  width: 17px;
  height: 17px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: currentColor;

  color: var(--app-white);

  font-size: 7px;
  font-weight: 850;
`;

export const SecurityStepText = styled.span`
  overflow: hidden;
  font-size: 11px;
  line-height: 1.2;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 420px) {
    font-size: 10px;
  }
`;

export const SendCodeButton = styled.button`
  width: 100%;

  min-height: 50px;

  display: flex;
  align-items: center;

  gap: 8px;

  padding: 9px 11px;

  border: 1px solid var(--app-accent);
  border-radius: 10px;

  background: var(--app-surface-soft);

  color: var(--app-primary);

  cursor: pointer;

  font-family: inherit;
  font-size: 15px;
  font-weight: 850;

  transition: 0.18s ease;

  span {
    flex: 1;
    text-align: left;
  }

  @media (max-width: 600px) {
    min-height: 52px;
    padding: 11px 12px;
    font-size: 14px;
  }

  svg:last-child {
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    border-color: var(--app-accent);

    background: var(--app-surface-soft);

    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.55;

    cursor: wait;
  }
`;

export const CodeArea = styled.div`
  padding-top: 2px;
`;

export const CodeHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 10px;

  margin-bottom: 11px;

  strong {
    display: block;

    color: var(--app-primary-active);

    font-size: 10px;
    font-weight: 850;
  }

  span {
    display: block;

    margin-top: 3px;

    color: var(--app-muted-dark);

    font-size: 9px;
  }
`;

export const CodeStatus = styled.div`
  display: inline-flex;
  align-items: center;

  gap: 4px;

  padding: 4px 7px;

  border-radius: 20px;

  background: var(--app-surface-soft);

  color: var(--app-primary);

  font-size: 8px;
  font-weight: 800;

  white-space: nowrap;
`;

export const CodeInputs = styled.div`
  display: flex;
  justify-content: center;

  gap: 6px;

  margin: 13px 0;

  @media (max-width: 390px) {
    gap: 4px;
  }
`;

export const CodeInput = styled.input`
  width: 39px;
  height: 44px;

  box-sizing: border-box;

  border: 1px solid var(--app-accent-soft);
  border-radius: 9px;

  outline: none;

  background: var(--app-white);

  color: var(--app-primary);

  text-align: center;

  font-family: inherit;
  font-size: 16px;
  font-weight: 850;

  transition: 0.18s ease;

  &:focus {
    border-color: var(--app-accent);

    background: var(--app-white);

    box-shadow: 0 0 0 3px rgba(var(--app-accent-rgb), 0.14);
  }

  @media (max-width: 390px) {
    width: 34px;
    height: 41px;

    font-size: 14px;
  }

  @media (max-width: 330px) {
    width: 29px;
    height: 38px;
  }
`;

export const VerifyCodeButton = styled.button`
  width: 100%;

  min-height: 41px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 7px;

  padding: 8px 12px;

  border: none;
  border-radius: 9px;

  background: var(--app-primary);

  color: var(--app-white);

  cursor: pointer;

  font-family: inherit;
  font-size: 10px;
  font-weight: 850;

  transition: 0.18s ease;

  &:hover:not(:disabled) {
    background: var(--app-primary-active);

    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.4;

    cursor: not-allowed;
  }
`;

export const ResendButton = styled.button`
  width: 100%;

  margin-top: 6px;

  padding: 7px;

  border: none;

  background: transparent;

  color: var(--app-muted-dark);

  cursor: pointer;

  font-family: inherit;
  font-size: 9px;
  font-weight: 750;

  &:hover:not(:disabled) {
    color: var(--app-primary);

    text-decoration: underline;
  }

  &:disabled {
    opacity: 0.5;

    cursor: wait;
  }
`;

export const SecuritySuccess = styled.div`
  display: flex;
  align-items: center;

  gap: 8px;

  margin-bottom: 12px;
  padding: 9px;

  border: 1px solid var(--app-surface-soft);
  border-radius: 9px;

  background: var(--app-white);

  color: var(--app-primary);

  svg {
    flex-shrink: 0;
  }

  strong {
    display: block;

    font-size: 9px;
    font-weight: 850;
  }

  span {
    display: block;

    margin-top: 2px;

    color: var(--app-muted-dark);

    font-size: 8px;
  }
`;

export const PasswordArea = styled.div`
  display: flex;
  flex-direction: column;

  gap: 9px;
`;

export const PasswordInput = styled(Input)`
  min-height: 41px;
`;

export const PasswordState = styled.div`
  display: flex;
  align-items: center;

  gap: 8px;
`;

export const PasswordStateIcon = styled.div`
  width: 26px;
  height: 26px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 7px;

  background: var(--app-surface-soft);

  color: var(--app-muted-dark);

  font-size: 9px;
`;

export const PasswordStateText = styled.div`
  strong {
    display: block;

    color: var(--app-primary);

    font-size: 9px;
  }

  span {
    display: block;

    margin-top: 2px;

    color: var(--app-muted-dark);

    font-size: 8px;
  }
`;

/* =====================================================
   STATUS
===================================================== */

export const StatusCard = styled.button<{
  $active: boolean;
}>`
  width: 100%;

  display: flex;
  align-items: center;

  gap: 12px;

  padding: 14px;

  border: 1px solid
    ${({ $active }) =>
      $active ? "var(--app-surface-soft)" : "var(--app-surface-soft)"};

  border-radius: 11px;

  background: ${({ $active }) =>
    $active ? "var(--app-white)" : "var(--app-surface-soft)"};

  text-align: left;

  cursor: pointer;

  transition: 0.18s ease;

  &:hover {
    transform: translateY(-1px);

    border-color: ${({ $active }) =>
      $active ? "var(--app-success-soft)" : "var(--app-border)"};
  }
`;

export const StatusIcon = styled.div<{
  $active: boolean;
}>`
  width: 33px;
  height: 33px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;

  background: ${({ $active }) =>
    $active ? "var(--app-surface-soft)" : "var(--app-surface-soft)"};

  color: ${({ $active }) =>
    $active ? "var(--app-primary)" : "var(--app-muted-dark)"};

  font-size: 13px;
`;

export const StatusContent = styled.div`
  min-width: 0;

  flex: 1;
`;

export const StatusTitle = styled.strong`
  display: block;
  color: var(--app-primary-active);
  font-size: 14px;
  line-height: 1.35;
  font-weight: 850;
`;

export const StatusDescription = styled.span`
  display: block;
  margin-top: 4px;
  color: var(--app-muted-dark);
  font-size: 12px;
  line-height: 1.45;
`;

export const StatusArrow = styled.div`
  color: var(--app-muted-dark);

  font-size: 9px;
`;

/* =====================================================
   FOOTER
===================================================== */

export const EditorFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 15%;
  gap: 8px;

  margin-top: 3px;
  padding-top: 14px;

  border-top: 1px solid rgba(var(--app-shadow-rgb), 0.08);
`;

export const CancelButton = styled.button`
  min-height: 39px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 6px;

  padding: 8px 14px;

  border: 1px solid var(--app-accent-soft);
  border-radius: 9px;

  background: var(--app-white);

  color: var(--app-primary);

  cursor: pointer;

  font-family: inherit;
  font-size: 15px;
  font-weight: 800;

  &:hover:not(:disabled) {
    background: var(--app-surface-soft);
  }

  &:disabled {
    opacity: 0.5;

    cursor: not-allowed;
  }

  @media (max-width: 1000px) {
    width: 40%;
  }
`;

export const SaveButton = styled.button`
  min-height: 39px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 6px;

  padding: 8px 16px;

  border: none;
  border-radius: 9px;

  background: var(--app-primary);

  color: var(--app-white);

  cursor: pointer;

  font-family: inherit;
  font-size: 15px;
  font-weight: 850;

  box-shadow: 0 4px 10px rgba(var(--app-shadow-rgb), 0.14);

  transition: 0.18s ease;

  &:hover:not(:disabled) {
    background: var(--app-primary-active);

    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.55;

    cursor: wait;
  }

  @media (max-width: 1000px) {
    width: 60%;
    svg {
      display: none;
    }
  }
`;

/* =====================================================
   EMPTY
===================================================== */

export const EmptyState = styled.div`
  min-height: 280px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 30px;

  text-align: center;

  color: var(--app-muted-dark);

  div {
    width: 48px;
    height: 48px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 12px;

    border-radius: 14px;

    background: var(--app-surface-soft);

    color: var(--app-accent);

    font-size: 18px;
  }

  strong {
    color: var(--app-primary-active);

    font-size: 13px;
    font-weight: 850;
  }

  span {
    max-width: 230px;

    margin-top: 5px;

    color: var(--app-muted-dark);

    font-size: 10px;
    line-height: 1.5;
  }

  button {
    min-height: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
    padding: 10px 18px;
    border: 0;
    border-radius: 10px;
    background: var(--app-primary);
    color: var(--app-white);
    font-family: inherit;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(var(--app-shadow-rgb), 0.14);
    transition:
      background 160ms ease,
      transform 160ms ease,
      box-shadow 160ms ease;

    &:hover {
      background: var(--app-primary-active);
      transform: translateY(-1px);
      box-shadow: 0 6px 14px rgba(var(--app-shadow-rgb), 0.2);
    }

    &:active {
      transform: translateY(0);
    }

    &:focus-visible {
      outline: 3px solid rgba(var(--app-accent-rgb), 0.55);
      outline-offset: 3px;
    }
  }
`;

/* =====================================================
   STATES
===================================================== */

export const LoadingState = styled.div`
  min-height: 350px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--app-muted-dark);

  font-size: 12px;

  &::before {
    content: "";

    width: 17px;
    height: 17px;

    margin-right: 9px;

    border: 2px solid var(--app-accent-soft);
    border-top-color: var(--app-primary);

    border-radius: 50%;

    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;

  gap: 7px;

  margin-bottom: 11px;
  padding: 9px 11px;

  border: 1px solid var(--app-danger-soft);
  border-radius: 9px;

  background: var(--app-danger-soft);

  color: var(--app-danger);

  font-size: 9px;
  font-weight: 700;

  animation: messageIn 0.18s ease;
`;

export const SuccessMessage = styled.div`
  display: flex;
  align-items: center;

  gap: 7px;

  margin-bottom: 11px;
  padding: 9px 11px;

  border: 1px solid var(--app-success-soft);
  border-radius: 9px;

  background: var(--app-white);

  color: var(--app-primary);

  font-size: 9px;
  font-weight: 700;

  animation: messageIn 0.18s ease;

  svg {
    flex-shrink: 0;
  }
`;

const messageAnimation = `
  @keyframes messageIn {
    from {
      opacity: 0;
      transform: translateY(-3px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

ErrorMessage.componentStyle.rules.push(messageAnimation);

SuccessMessage.componentStyle.rules.push(messageAnimation);

/* =====================================================
   EXPERIENCIA RESPONSIVE — TABLET Y MOBILE
   Overrides finales para mantener el diseño de escritorio.
===================================================== */

export const UsersPanelActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex-shrink: 0;
`;

export const CreateUserButton = styled.button`
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 13px;
  border: 1px solid var(--app-primary);
  border-radius: 10px;
  background: var(--app-primary);
  color: var(--app-white);
  font: inherit;
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
  position: relative;
  z-index: 1;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(var(--app-shadow-rgb), 0.12);
  transition:
    background 0.18s ease,
    transform 0.18s ease,
    box-shadow 0.18s ease;

  svg {
    font-size: 14px;
  }

  &:hover {
    background: var(--app-primary-active);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(var(--app-shadow-rgb), 0.16);
  }

  &:focus-visible {
    outline: 3px solid var(--app-accent);
    outline-offset: 3px;
  }

  @media (max-width: 600px) {
    min-height: 42px;
    padding: 10px 12px;
    gap: 6px;
    font-size: 12px;
  }

  @media (max-width: 360px) {
    padding: 9px;
    span {
      display: inline;
    }
    font-size: 11px;
  }
`;
