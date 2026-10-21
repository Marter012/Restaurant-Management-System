import styled from "styled-components";
import { caramelButtonStyles } from "../Utils/ButtonStyles.ts";

export const Overlay = styled.div<{
  $above?: boolean;
}>`
  position: fixed;
  inset: 0;

  z-index: ${({ $above }) => ($above ? 1002 : 1000)};

  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(10px, 2.5vw, 24px);
  box-sizing: border-box;
  overflow-y: auto;
  overscroll-behavior: contain;

  background: rgba(var(--app-shadow-rgb), 0.62);

  backdrop-filter: blur(7px);

  animation: fadeIn 0.18s ease;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

export const Modal = styled.div`
  width: min(1200px, calc(100vw - 32px));
  height: min(82dvh, 900px);
  max-height: calc(100dvh - 24px);
  min-height: 0;
  margin: auto;
  overflow-y: auto;

  background: var(--app-white);

  border: 1px solid rgba(var(--app-shadow-rgb), 0.12);

  border-radius: 24px;

  box-shadow:
    0 28px 70px rgba(var(--app-shadow-rgb), 0.28),
    0 8px 24px rgba(var(--app-shadow-rgb), 0.12);

  color: var(--app-primary-active);

  scrollbar-width: none;
  position: relative;

  @media (max-width: 600px) {
    width: calc(100vw - 20px);
    height: calc(100dvh - 20px);
    max-height: calc(100dvh - 20px);
    border-radius: var(--app-radius-lg);
  }
`;

export const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 5;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 16px;

  padding: 22px 24px;

  background: linear-gradient(
    135deg,
    var(--app-primary) 0%,
    var(--app-accent) 55%,
    var(--app-accent) 100%
  );

  color: var(--app-white);

  box-shadow: 0 8px 24px rgba(var(--app-shadow-rgb), 0.18);
  button {
    width: 50px !important;
    border-radius: 30px !important;
  }
`;

export const HeaderLeft = styled.div`
  width: 50% !important;

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.h2`
  margin: 0;

  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 1.35rem;
  font-weight: 800;

  letter-spacing: -0.02em;
  svg {
    flex-shrink: 0;
    font-size: 1.6rem;
  }
  color: var(--app-white) !important;

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

export const Subtitle = styled.span`
  color: rgba(var(--app-white-rgb), 0.72);

  font-size: 0.82rem;
`;

export const CloseButton = styled.button`
  width: 40px;
  height: 40px;

  flex-shrink: 0;

  display: grid;
  place-items: center;

  border: 1px solid rgba(var(--app-white-rgb), 0.22);

  border-radius: 12px;

  background: rgba(var(--app-white-rgb), 0.1);

  color: var(--app-white);

  cursor: pointer;
  transition:
    background 0.18s ease,
    transform 0.18s ease;
  svg {
    font-size: 1.3rem;
  }
  &:hover {
    background: rgba(var(--app-white-rgb), 0.2);
    transform: scale(1.04);
  }
`;

export const DashboardGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 14px;

  padding: 22px 24px 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 20px 20px 0;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    padding: 16px 14px 0;
  }
`;

export const StatusCard = styled.div<{
  $active?: boolean;
}>`
  position: relative;

  overflow: hidden;

  min-width: 0;

  padding: 18px;

  border-radius: 18px;

  border: 1px solid
    ${({ $active }) =>
      $active
        ? "rgba(var(--app-shadow-rgb), 0.18)"
        : "rgba(var(--app-shadow-rgb), 0.12)"};

  background: ${({ $active }) =>
    $active
      ? "linear-gradient(145deg, var(--app-white), var(--app-white))"
      : "linear-gradient(145deg, var(--app-surface-soft), var(--app-white))"};

  box-shadow: 0 8px 22px rgba(var(--app-shadow-rgb), 0.06);

  &::after {
    content: "";

    position: absolute;

    width: 90px;
    height: 90px;

    right: -35px;
    bottom: -40px;

    border-radius: 50%;

    background: ${({ $active }) =>
      $active
        ? "rgba(var(--app-primary-rgb), 0.08)"
        : "rgba(var(--app-shadow-rgb), 0.05)"};
  }
`;

export const StatusCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 12px;
`;

export const StatusIcon = styled.div<{
  $active?: boolean;
}>`
  width: 38px;
  height: 38px;

  display: grid;
  place-items: center;

  border-radius: 12px;

  background: ${({ $active }) =>
    $active
      ? "green"
      : "red"};

  svg {
    font-size: 1.35rem;
  }
`;

export const StatusDot = styled.span<{
  $active?: boolean;
}>`
  width: 9px;
  height: 9px;

  border-radius: 50%;

  background: ${({ $active }) =>
    $active ? "green" : "red"};
  box-shadow: ${({ $active }) =>
    $active ? "0 0 0 4px rgba(var(--app-primary-rgb), 0.1)" : "none"};
`;

export const StatusCardTitle = styled.div`
  color: var(--app-accent);

  font-size: 0.78rem;
  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 0.06em;
`;

export const StatusCardValue = styled.div<{
  $active?: boolean;
}>`
  margin-top: 3px;

  color: ${({ $active }) =>
    $active ? "var(--app-primary)" : "var(--app-accent)"};

  font-size: 1.12rem;
  font-weight: 800;
`;

export const StatusCardDescription = styled.div`
  margin-top: 5px;

  color: var(--app-muted-dark);

  font-size: 0.75rem;

  line-height: 1.4;
`;

export const StatusBanner = styled.div<{
  $success?: boolean;
}>`
  display: flex;
  align-items: center;

  gap: 13px;

  margin: 18px 24px 0;

  padding: 14px 16px;

  border: 1px solid
    ${({ $success }) =>
      $success
        ? "rgba(var(--app-shadow-rgb), 0.18)"
        : "rgba(var(--app-accent-rgb), 0.2)"};

  border-radius: 16px;

  background: ${({ $success }) =>
    $success ? "var(--app-white)" : "var(--app-white)"};

  @media (max-width: 1024px) {
    margin: 16px 20px 0;
  }

  @media (max-width: 700px) {
    margin: 14px 14px 0;
    padding: 12px;
  }
`;

export const StatusBannerIcon = styled.div<{
  $success?: boolean;
}>`
  width: 38px;
  height: 38px;

  flex-shrink: 0;

  display: grid;
  place-items: center;

  border-radius: 11px;

  background: ${({ $success }) =>
    $success
      ? "rgba(var(--app-shadow-rgb), 0.11)"
      : "rgba(var(--app-accent-rgb), 0.1)"};

  color: ${({ $success }) =>
    $success ? "var(--app-primary)" : "var(--app-accent)"};

  svg {
    font-size: 1.35rem;
  }
`;

export const StatusBannerText = styled.div`
  min-width: 0;
`;

export const StatusBannerTitle = styled.div`
  color: var(--app-primary-active);

  font-size: 0.9rem;
  font-weight: 800;
`;

export const StatusBannerDescription = styled.div`
  margin-top: 2px;

  color: var(--app-muted-dark);

  font-size: 0.76rem;

  line-height: 1.4;
`;

export const Section = styled.section`
  margin: 18px 24px 0;

  padding: 19px;

  border: 1px solid rgba(var(--app-shadow-rgb), 0.1);

  border-radius: 18px;

  background: var(--app-white);

  box-shadow: 0 6px 20px rgba(var(--app-shadow-rgb), 0.045);
  button {
    width: 100%;
  }
  @media (max-width: 1024px) {
    margin: 16px 20px 0;
    padding: 17px;
  }

  @media (max-width: 700px) {
    margin: 13px 14px 0;
    padding: 14px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 12px;

  margin-bottom: 16px;

  > svg {
    color: var(--app-accent);
    font-size: 1.25rem;
  }
`;

export const SectionTitle = styled.h3`
  margin: 0;

  display: flex;
  align-items: center;
  gap: 9px;

  color: var(--app-primary-active);

  font-size: 1rem;
  font-weight: 800;
`;

export const SectionIcon = styled.span`
  width: 30px;
  height: 30px;

  display: grid;
  place-items: center;

  border-radius: 9px;

  background: rgba(var(--app-shadow-rgb), 0.08);

  color: var(--app-primary);

  svg {
    font-size: 1rem;
  }
`;

export const SectionDescription = styled.p`
  margin: 5px 0 0 39px;

  color: var(--app-muted-dark);

  font-size: 0.76rem;

  line-height: 1.45;

  @media (max-width: 600px) {
    margin-left: 0;
    margin-top: 7px;
  }
`;

export const PrinterSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  padding: 15px;
  border-radius: 14px;
  background: var(--app-white);
  border: 1px solid rgba(var(--app-shadow-rgb), 0.08);

  > div:last-child {
    flex: 1;
    min-width: 0;
  }

  @media (max-width: 520px) {
    align-items: flex-start;
    gap: 10px;
    padding: 12px;
  }
`;

export const PrinterIcon = styled.div`
  width: 44px;
  height: 44px;

  flex-shrink: 0;

  display: grid;
  place-items: center;

  border-radius: 12px;

  background: var(--app-primary);

  color: var(--app-white);

  svg {
    font-size: 1.25rem;
  }
`;

export const PrinterSelect = styled.select`
  display: block;

  width: 100%;

  margin-top: 4px;

  padding: 0;

  border: 0;

  outline: 0;

  background: transparent;

  color: var(--app-primary-active);

  font-size: 0.95rem;
  font-weight: 800;

  cursor: pointer;
`;

export const InfoGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 10px;

  margin-top: 12px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.div`
  min-width: 0;

  padding: 13px;

  border-radius: 13px;

  background: var(--app-white);

  border: 1px solid rgba(var(--app-shadow-rgb), 0.07);
`;

export const InfoLabel = styled.div`
  color: var(--app-muted-dark);

  font-size: 0.7rem;
  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 0.045em;
`;

export const InfoValue = styled.div<{
  $success?: boolean;
  $error?: boolean;
}>`
  margin-top: 4px;

  display: flex;
  align-items: center;

  gap: 5px;

  min-width: 0;

  color: ${({ $success, $error }) => {
    if ($success) {
      return "var(--app-primary)";
    }

    if ($error) {
      return "var(--app-danger)";
    }

    return "var(--app-primary-active)";
  }};

  font-size: 0.85rem;
  font-weight: 750;

  word-break: break-word;
`;

export const QueueSummary = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 10px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const QueueSummaryItem = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;

  padding: 14px;

  border-radius: 14px;

  background: var(--app-white);

  border: 1px solid rgba(var(--app-shadow-rgb), 0.08);
`;

export const QueueSummaryIcon = styled.div`
  width: 38px;
  height: 38px;

  flex-shrink: 0;

  display: grid;
  place-items: center;

  border-radius: 11px;

  background: rgba(var(--app-shadow-rgb), 0.08);

  color: var(--app-primary);

  svg {
    font-size: 1.15rem;
  }
`;

export const QueueBadgeLabel = styled.div`
  color: var(--app-muted-dark);

  font-size: 0.72rem;
  font-weight: 700;
`;

export const QueueBadgeValue = styled.div`
  margin-top: 1px;

  color: var(--app-primary-active);

  font-size: 1.2rem;
  font-weight: 850;
`;

export const QueueBadge = styled.div<{
  $warning?: boolean;
}>`
  grid-column: 1 / -1;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 7px;

  padding: 9px 12px;

  border-radius: 11px;

  background: ${({ $warning }) =>
    $warning ? "var(--app-surface-soft)" : "var(--app-surface-soft)"};

  color: ${({ $warning }) =>
    $warning ? "var(--app-accent)" : "var(--app-primary)"};

  font-size: 0.77rem;
  font-weight: 750;

  svg {
    font-size: 1rem;
  }
`;

export const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
  min-width: 0;
  gap: 10px;
  margin-top: 12px;

  @media (max-width: 1024px) {
    gap: 9px;
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const ActionButton = styled.button`
  min-height: 44px;
  min-width: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: normal;
  overflow-wrap: anywhere;

  padding: 10px 14px;

  border: 0;
  border-radius: 12px;

  background: var(--app-primary);

  color: var(--app-white);

  font-size: 0.82rem;
  font-weight: 750;

  cursor: pointer;

  transition:
    transform 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;

  &:hover:not(:disabled) {
    background: var(--app-primary-active);

    transform: translateY(-1px);

    box-shadow: 0 7px 18px rgba(var(--app-shadow-rgb), 0.18);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    font-size: 1.1rem;
  }

  ${caramelButtonStyles}
`;

export const SecondaryButton = styled.button`
  min-height: 44px;
  width: 100% !important;
  min-width: 0;
  box-sizing: border-box;
  white-space: normal;
  overflow-wrap: anywhere;
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  padding: 10px 14px;

  border: 1px solid rgba(var(--app-shadow-rgb), 0.15);

  border-radius: 12px;

  background: var(--app-white);

  color: var(--app-primary);

  font-size: 0.82rem;
  font-weight: 750;

  cursor: pointer;

  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    background: var(--app-white);

    border-color: rgba(var(--app-shadow-rgb), 0.28);

    transform: translateY(-1px);
  }

  svg {
    font-size: 1.1rem;
  }

  ${caramelButtonStyles}
`;

export const DangerButton = styled.button`
  min-height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  padding: 10px 15px;

  border: 0;

  border-radius: 12px;

  background: var(--app-danger);

  color: var(--app-white);

  font-size: 0.82rem;
  font-weight: 750;

  cursor: pointer;

  &:hover:not(:disabled) {
    background: var(--app-danger);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    font-size: 1.05rem;
  }
`;

export const RefreshButton = styled.button`
  min-height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  padding: 9px 15px;

  border: 1px solid rgba(var(--app-shadow-rgb), 0.16);

  border-radius: 12px;

  background: var(--app-white);

  color: var(--app-primary);

  font-size: 0.8rem;
  font-weight: 750;

  cursor: pointer;

  transition:
    background 0.18s ease,
    transform 0.18s ease;

  &:hover:not(:disabled) {
    background: var(--app-white);

    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    font-size: 1.1rem;
  }

  ${caramelButtonStyles}
`;

export const ResponsiveRow = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;

  gap: 12px;

  margin: 18px 24px 22px;

  @media (max-width: 1024px) {
    margin: 16px 20px 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    margin: 13px 14px 16px;
  }
`;

export const SmallInfo = styled.span`
  color: var(--app-muted-dark);

  font-size: 0.74rem;
`;

export const Loading = styled.div`
  min-height: 360px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;

  gap: 12px;

  color: var(--app-accent);

  font-size: 0.9rem;
  font-weight: 700;

  svg {
    font-size: 1.8rem;

    animation: spin 1s linear infinite;
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

  gap: 9px;

  margin: 14px 24px 0;

  padding: 12px 14px;

  border: 1px solid rgba(var(--app-danger-rgb), 0.16);

  border-radius: 12px;

  background: var(--app-danger-soft);

  color: var(--app-danger);

  font-size: 0.8rem;
  font-weight: 650;

  svg {
    flex-shrink: 0;
    font-size: 1.1rem;
  }

  @media (max-width: 600px) {
    margin: 14px 16px 0;
  }
`;

export const EmptyMessage = styled.div`
  min-height: 90px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  padding: 20px;

  border-radius: 13px;

  background: var(--app-white);

  color: var(--app-muted-dark);

  font-size: 0.8rem;

  text-align: center;

  svg {
    color: var(--app-primary);
    font-size: 1.15rem;
  }
`;


export const SubModalHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 3;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 12px;

  padding: 17px 20px;

  background: var(--app-primary);

  color: var(--app-white);

  border-radius: 22px 22px 0 0;

  @media (max-width: 600px) {
    border-radius: 22px 22px 0 0;
  }
`;

export const SubModalTitle = styled.h3`
  margin: 0;

  display: flex;
  align-items: center;

  gap: 9px;

  font-size: 1rem;

  svg {
    font-size: 1.2rem;
  }
`;

export const SubModalClose = styled.button`
  width: 36px;
  height: 36px;

  display: grid;
  place-items: center;

  border: 1px solid rgba(var(--app-white-rgb), 0.2);

  border-radius: 10px;

  background: rgba(var(--app-white-rgb), 0.08);

  color: var(--app-white);

  cursor: pointer;

  &:hover {
    background: rgba(var(--app-white-rgb), 0.17);
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const JobList = styled.div`
  display: flex;

  flex-direction: column;

  gap: 8px;
`;

export const JobItem = styled.div<{
  $selected?: boolean;
}>`
  display: flex;
  align-items: center;

  gap: 11px;

  padding: 12px;

  border: 1px solid
    ${({ $selected }) =>
      $selected
        ? "rgba(var(--app-shadow-rgb), 0.3)"
        : "rgba(var(--app-shadow-rgb), 0.08)"};

  border-radius: 13px;

  background: ${({ $selected }) =>
    $selected ? "var(--app-surface-soft)" : "var(--app-white)"};

  cursor: pointer;

  transition:
    background 0.16s ease,
    border-color 0.16s ease,
    transform 0.16s ease;

  &:hover {
    transform: translateY(-1px);

    background: var(--app-white);

    border-color: rgba(var(--app-shadow-rgb), 0.18);
  }
`;

export const JobSelection = styled.div`
  width: 22px;

  display: grid;
  place-items: center;

  input {
    accent-color: var(--app-primary);

    width: 16px;
    height: 16px;

    cursor: pointer;
  }
`;

export const JobIcon = styled.div`
  width: 38px;
  height: 38px;

  flex-shrink: 0;

  display: grid;
  place-items: center;

  border-radius: 10px;

  background: rgba(var(--app-shadow-rgb), 0.08);

  color: var(--app-primary);

  svg {
    font-size: 1.15rem;
  }
`;

export const JobInfo = styled.div`
  min-width: 0;

  flex: 1;
`;

export const JobTitle = styled.div`
  overflow: hidden;

  color: var(--app-primary-active);

  font-size: 0.84rem;
  font-weight: 800;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const JobStatus = styled.div`
  margin-top: 3px;

  color: var(--app-muted-dark);

  font-size: 0.74rem;
`;

export const JobMeta = styled.div`
  margin-top: 2px;

  color: var(--app-muted-dark);

  font-size: 0.7rem;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  position: sticky;
  bottom: 0;
  z-index: 5;
  margin-top: 12px;
  width: 100%;
  button {
    width: 100%;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;

  flex-direction: column;

  gap: 6px;
`;

export const SelectLabel = styled.label`
  color: var(--app-accent);

  font-size: 0.74rem;
  font-weight: 750;
`;

export const Select = styled.select`
  width: 100%;

  min-height: 44px;

  padding: 0 13px;

  border: 1px solid rgba(var(--app-shadow-rgb), 0.14);

  border-radius: 12px;

  outline: none;

  background: var(--app-white);

  color: var(--app-primary-active);

  font-size: 0.82rem;
  font-weight: 650;

  cursor: pointer;

  &:focus {
    border-color: var(--app-accent);

    box-shadow: 0 0 0 3px rgba(var(--app-shadow-rgb), 0.08);
  }
`;

export const OrderList = styled.div`
  display: flex;

  flex-direction: column;

  gap: 8px;

  margin-top: 12px;
`;

export const OrderItem = styled.div<{
  $selected?: boolean;
}>`
  display: flex;
  align-items: center;

  gap: 11px;

  padding: 13px;

  border: 1px solid
    ${({ $selected }) =>
      $selected
        ? "rgba(var(--app-shadow-rgb), 0.3)"
        : "rgba(var(--app-shadow-rgb), 0.08)"};

  border-radius: 13px;

  background: ${({ $selected }) =>
    $selected ? "var(--app-surface-soft)" : "var(--app-white)"};

  cursor: pointer;

  transition:
    transform 0.16s ease,
    background 0.16s ease,
    border-color 0.16s ease;

  &:hover {
    transform: translateY(-1px);

    background: var(--app-white);
  }
`;

export const OrderIcon = styled.div`
  width: 40px;
  height: 40px;

  flex-shrink: 0;

  display: grid;
  place-items: center;

  border-radius: 11px;

  background: rgba(var(--app-shadow-rgb), 0.08);

  color: var(--app-primary);

  svg {
    font-size: 1.2rem;
  }
`;

export const OrderInfo = styled.div`
  min-width: 0;

  flex: 1;
`;

export const OrderTitle = styled.div`
  color: var(--app-primary-active);

  font-size: 0.84rem;
  font-weight: 800;
`;

export const OrderCustomer = styled.div`
  overflow: hidden;

  margin-top: 3px;

  color: var(--app-muted-dark);

  font-size: 0.74rem;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const OrderTotal = styled.div`
  flex-shrink: 0;

  color: var(--app-primary);

  font-size: 0.85rem;
  font-weight: 850;

  @media (max-width: 420px) {
    font-size: 0.78rem;
  }
`;


/* =========================================================
   MODOS BÁSICO Y AVANZADO
========================================================= */

export const ModeBar = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  padding: 18px 24px 0;

  @media (max-width: 1024px) {
    padding: 16px 20px 0;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 13px 14px 0;
  }
`;

export const ModeButton = styled.button<{ $active?: boolean }>`
  min-height: 44px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 11px 15px;
  border: 1px solid
    ${({ $active }) => $active ? "var(--app-primary)" : "rgba(var(--app-shadow-rgb), 0.15)"};
  border-radius: 12px;
  background: ${({ $active }) => $active ? "var(--app-primary)" : "var(--app-white)"};
  color: ${({ $active }) => $active ? "var(--app-white)" : "var(--app-primary)"};
  font-size: 0.84rem;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.18s ease, transform 0.18s ease;
  overflow-wrap: anywhere;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  @media (max-width: 520px) {
    justify-content: flex-start;
    min-height: 46px;
    padding: 11px 13px;
    font-size: 0.82rem;
  }

  svg {
    font-size: 1.1rem;
    flex-shrink: 0;
  }
`;

export const ModeIntro = styled.p`
  margin: 10px 24px 0;
  color: var(--app-muted-dark);
  font-size: 0.78rem;
  line-height: 1.45;

  @media (max-width: 1024px) {
    margin: 9px 20px 0;
  }

  @media (max-width: 520px) {
    margin: 9px 14px 0;
  }
`;

export const BasicSettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const SettingField = styled.label`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const TextInput = styled.input`
  width: 100%;
  min-width: 0;
  min-height: 44px;
  box-sizing: border-box;
  padding: 0 13px;
  border: 1px solid rgba(var(--app-shadow-rgb), 0.14);
  border-radius: 12px;
  outline: none;
  background: var(--app-white);
  color: var(--app-primary-active);
  font: inherit;
  font-size: 0.84rem;

  &:focus {
    border-color: var(--app-accent);
    box-shadow: 0 0 0 3px rgba(var(--app-shadow-rgb), 0.08);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const CheckControl = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 11px;
  margin-top: 15px;
  padding: 14px;
  border: 1px solid rgba(var(--app-shadow-rgb), 0.1);
  border-radius: 12px;
  background: var(--app-surface-soft);
  color: var(--app-primary-active);
  cursor: pointer;

  input {
    margin-top: 3px;
    width: 17px;
    height: 17px;
    accent-color: var(--app-primary);
    flex-shrink: 0;
  }

  span {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  strong {
    font-size: 0.83rem;
  }

  small {
    color: var(--app-muted-dark);
    font-size: 0.74rem;
    line-height: 1.4;
  }
`;

export const SaveButton = styled.button`
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  border: 0;
  border-radius: 12px;
  background: var(--app-primary);
  color: var(--app-white);
  font-size: 0.82rem;
  font-weight: 800;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: var(--app-primary-active);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    font-size: 1.05rem;
  }

  ${caramelButtonStyles}
`;

export const ApiDataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 14px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const ApiDataCard = styled.div`
  min-width: 0;
  padding: 13px;
  border: 1px solid rgba(var(--app-shadow-rgb), 0.1);
  border-radius: 12px;
  background: var(--app-surface-soft);
`;

export const ApiDataTitle = styled.h4`
  margin: 0 0 10px;
  color: var(--app-primary-active);
  font-size: 0.8rem;
  font-weight: 850;
`;

export const ApiDataContent = styled.pre`
  max-width: 100%;
  max-height: 260px;
  overflow: auto;
  margin: 0;
  padding: 10px;
  border-radius: 9px;
  background: var(--app-white);
  color: var(--app-primary-active);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.7rem;
  line-height: 1.45;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
`;

export const ApiJobRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 9px 0;
  border-top: 1px solid rgba(var(--app-shadow-rgb), 0.1);
`;

export const ApiJobCancelButton = styled.button`
  align-self: flex-end;
  min-height: 34px;
  padding: 7px 10px;
  border: 1px solid rgba(var(--app-danger-rgb), 0.25);
  border-radius: 9px;
  background: var(--app-danger-soft);
  color: var(--app-danger);
  font-size: 0.75rem;
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

/* =========================================================
   DIAGNÓSTICO LEGIBLE PARA USUARIOS NO TÉCNICOS
========================================================= */

export const ApiInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`;

export const ApiInfoRow = styled.div`
  display: grid;
  grid-template-columns: minmax(130px, 0.8fr) minmax(0, 1.2fr);
  gap: 12px;
  align-items: start;
  padding: 10px 0;
  border-bottom: 1px solid rgba(var(--app-shadow-rgb), 0.09);

  &:last-child {
    border-bottom: 0;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

export const ApiInfoLabel = styled.span`
  color: var(--app-muted-dark);
  font-size: 0.76rem;
  font-weight: 750;
  overflow-wrap: anywhere;
`;

export const ApiInfoValue = styled.div`
  min-width: 0;
  color: var(--app-primary-active);
  font-size: 0.82rem;
  font-weight: 650;
  line-height: 1.45;
  overflow-wrap: anywhere;
`;

export const ApiRecordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const ApiRecordCard = styled.div`
  min-width: 0;
  padding: 12px 14px;
  border: 1px solid rgba(var(--app-shadow-rgb), 0.1);
  border-radius: 12px;
  background: var(--app-white);
`;

export const ApiActionMessage = styled.div`
  padding: 12px;
  border-radius: 10px;
  background: var(--app-surface-soft);
  color: var(--app-muted-dark);
  font-size: 0.8rem;
  line-height: 1.45;
`;


