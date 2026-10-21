import styled from "styled-components";
import { caramelButtonStyles } from "../../Utils/ButtonStyles.ts";

export const HomeHeader = styled.section`
  width: min(100%, 1500px);
  height: 100dvh;
  padding: clamp(14px, 2vw, 24px);
  box-sizing: border-box;
  color: var(--app-white);
  background: linear-gradient(115deg, var(--app-accent), var(--app-accent));
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(var(--app-primary-rgb), 0.078);
`;

export const HeaderContent = styled.div`
  display: grid;
  align-items: center;
  gap: clamp(12px, 2vw, 26px);

  grid-template-columns: 20% 40% 20%;
  justify-content: space-between;

  &:has(> :nth-child(2):last-child) {
    grid-template-columns: 30% 30%;
    justify-content: space-between;
  }

  @media (max-width: 1100px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
  }
`;

export const Greeting = styled.div`
  min-width: 0;
  span {
    display: block;
    margin-bottom: 5px;
    color: var(--app-accent);
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  h1 {
    margin: 0;
    font-size: clamp(1.25rem, 2vw, 1.8rem);
    line-height: 1.15;
  }
  p {
    margin: 6px 0 0;
    font-size: 0.8rem;
    line-height: 1.35;
    opacity: 0.78;
  }
  @media (max-width: 620px) {
    p {
      display: block;
    }
  }
`;

export const UserBadge = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px;
  border: 1px solid rgba(var(--app-white-rgb), 0.2);
  border-radius: 12px;
  background: rgba(var(--app-white-rgb), 0.102);
  .user-info,
  .user-actions {
    display: flex;
    justify-content: center;
    gap: 9px;
    width: 100%;
  }
  background-image: linear-gradient(
    135deg,
    #b78350 0%,
    #94633d 50%,
    #60351f 100%
  );

  @media (max-width: 1100px) {
    flex-direction: row;
  }
  @media (max-width: 620px) {
    padding: 6px;
  }
`;

export const UserAvatar = styled.div`
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  flex: 0 0 34px;
  border-radius: 50%;
  background: var(--app-accent);
  color: var(--app-primary);
  font-size: 0.9rem;
  font-weight: 800;
`;

export const UserDetails = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const UserName = styled.strong`
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--app-surface-soft);
  font-size: 0.76rem;
`;

export const UserEmail = styled.span`
  max-width: 145px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--app-surface-soft);
  font-size: 0.65rem;
  opacity: 0.72;
`;

export const LogoutButton = styled.button`
  min-height: 34px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0 10px;
  border: 1px solid rgba(var(--app-white-rgb), 0.2);
  border-radius: 8px;
  background: rgba(var(--app-primary-rgb), 0.4);
  color: var(--app-surface-soft);
  font-family: inherit;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: rgba(var(--app-primary-rgb), 0.702);
  }
  &:focus-visible {
    outline: 3px solid var(--app-accent);
    outline-offset: 2px;
  }
  ${caramelButtonStyles}

  @media (max-width: 390px) {
    padding: 0 8px;
    span {
      font-size: 0.65rem;
    }
  }
`;

export const OutOfStockCard = styled.section`
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 11px 13px;
  border: 1px solid var(--app-accent);
  border-left: 4px solid var(--app-accent);
  border-radius: 12px;
  background: var(--app-white);
  color: var(--app-primary);
  box-shadow: 0 5px 16px rgba(var(--app-primary-rgb), 0.094);

  /* Primer hijo: 50% */
  > :first-child {
    width: 50%;
    flex-shrink: 0;
  }

  /* Segundo hijo: 40% */
  > :nth-child(2) {
    width: 40%;
    flex-shrink: 0;
  }

  @media (max-width: 620px) {
    align-items: stretch;
    flex-direction: column;
    padding: 10px 12px;

    > :first-child,
    > :nth-child(2) {
      width: 100%;
    }
  }
`;

export const SettingCopy = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  max-width: none;
  overflow-wrap: anywhere;
  h2 {
    margin: 0;
    color: var(--app-primary);
    font-size: 0.88rem;
    line-height: 1.2;
  }
  p {
    margin: 3px 0 0;
    color: var(--app-accent);
    font-size: 0.68rem;
    line-height: 1.3;
  }
`;

export const SettingControl = styled.button<{ $enabled: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex: 0 0 auto;
  min-width: 122px;
  min-height: 42px;
  max-width: 100%;
  padding: 6px 8px 6px 11px;
  border: 1px solid
    ${({ $enabled }) => ($enabled ? "var(--app-primary)" : "var(--app-accent)")};
  border-radius: 999px;
  background: ${({ $enabled }) =>
    $enabled ? "var(--app-surface-soft)" : "var(--app-white)"};
  color: ${({ $enabled }) =>
    $enabled ? "var(--app-primary)" : "var(--app-accent)"};
  font: inherit;
  font-size: 0.72rem;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
  &:focus-visible {
    outline: 3px solid var(--app-accent);
    outline-offset: 2px;
  }
  &:disabled {
    opacity: 0.68;
    cursor: wait;
  }
  .switch {
    position: relative;
    width: 38px;
    height: 22px;
    flex: 0 0 38px;
    border-radius: 99px;
    background: ${({ $enabled }) =>
      $enabled ? "var(--app-primary)" : "var(--app-muted-dark)"};
  }

  ${caramelButtonStyles}

  @media (max-width: 620px) {
    align-self: flex-start;
  }
  .switch::after {
    content: "";
    position: absolute;
    top: 3px;
    left: ${({ $enabled }) => ($enabled ? "19px" : "3px")};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--app-white);
    box-shadow: 0 1px 3px rgba(var(--app-shadow-rgb), 0.2);
    transition: left 160ms ease;
  }
`;

export const SettingStatus = styled.p<{ $enabled: boolean }>`
  margin: 3px 0 0;
  color: ${({ $enabled }) =>
    $enabled ? "var(--app-primary)" : "var(--app-accent)"};
  font-size: 0.62rem;
  line-height: 1.2;
`;

export const Intro = styled.section`
  width: min(100%, 1500px);
  margin-top: 2px;
`;

export const IntroTitle = styled.h2`
  margin: 0;
  color: var(--app-primary);
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  font-weight: 800;
`;

export const IntroText = styled.p`
  margin: 3px 0 0;
  color: var(--app-primary);
  font-size: 0.72rem;
  opacity: 0.68;
`;

export const QuickActions = styled.section`
  width: min(100%, 1500px);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 380px) {
    gap: 7px;
  }
`;

export const ActionItem = styled.article`
  min-width: 0;
  min-height: 96px;
  display: flex;
  align-items: flex-start;
  gap: 11px;
  padding: 13px;
  box-sizing: border-box;
  border: 1px solid rgba(var(--app-accent-rgb), 0.125);
  border-radius: 12px;
  background: rgba(var(--app-accent-rgb), 0.051);
  transition:
    background 160ms ease,
    transform 160ms ease;
  &:hover {
    transform: translateY(-1px);
    background: rgba(var(--app-accent-rgb), 0.094);
  }
  @media (max-width: 620px) {
    min-height: 76px;
    padding: 10px;
    gap: 8px;
  }
`;

export const ActionIcon = styled.div`
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  flex: 0 0 34px;
  border-radius: 9px;
  background: var(--app-accent);
  color: var(--app-primary);
  font-size: 0.85rem;
  @media (max-width: 620px) {
    width: 29px;
    height: 29px;
    flex-basis: 29px;
    font-size: 0.75rem;
  }
`;

export const ActionContent = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const ActionNumber = styled.span`
  margin-bottom: 2px;
  color: var(--app-primary);
  font-size: 0.58rem;
  font-weight: 800;
  opacity: 0.48;
`;

export const ActionTitle = styled.h3`
  margin: 0;
  color: var(--app-primary);
  font-size: 0.82rem;
  line-height: 1.2;
  @media (max-width: 620px) {
    font-size: 0.75rem;
  }
`;

export const ActionDescription = styled.p`
  margin: 4px 0 0;
  color: var(--app-primary);
  font-size: 0.67rem;
  line-height: 1.3;
  opacity: 0.68;
  @media (max-width: 620px) {
    margin-top: 2px;
    font-size: 0.61rem;
  }
`;

export const Workflow = styled.section`
  width: min(100%, 1500px);
  padding: 12px 16px;
  box-sizing: border-box;
  border-radius: 12px;
  background: rgba(var(--app-accent-rgb), 0.149);
  @media (max-width: 620px) {
    padding: 10px 12px;
  }
`;

export const WorkflowHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 9px;
`;

export const WorkflowTitle = styled.h2`
  margin: 0;
  color: var(--app-primary);
  font-size: 0.84rem;
`;

export const WorkflowDescription = styled.p`
  margin: 2px 0 0;
  color: var(--app-primary);
  font-size: 0.64rem;
  opacity: 0.62;
`;

export const WorkflowSteps = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(6px, 1.5vw, 16px);
  @media (max-width: 620px) {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    justify-content: stretch;
    gap: 7px;
  }
`;

export const WorkflowStep = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--app-primary);
  font-size: 0.68rem;
  font-weight: 700;
  white-space: normal;
  min-width: 0;
  @media (max-width: 620px) {
    font-size: 0.65rem;
  }
`;

export const WorkflowIcon = styled.div`
  width: 25px;
  height: 25px;
  display: grid;
  place-items: center;
  flex: 0 0 25px;
  border-radius: 50%;
  background: rgba(var(--app-accent-rgb), 0.651);
  color: var(--app-primary);
  font-size: 0.66rem;
`;

export const WorkflowArrow = styled.div`
  display: flex;
  color: var(--app-primary);
  opacity: 0.4;
  font-size: 0.65rem;
  @media (max-width: 620px) {
    display: none;
  }
`;

export const ActivityPanel = styled.section`
  width: min(100%, 1500px);
  min-width: 0;
  padding: 9px 12px;
  box-sizing: border-box;
  border: 1px solid rgba(var(--app-accent-rgb), 0.11);
  border-radius: 10px;
  background: rgba(var(--app-white-rgb), 0.6);
  h2 {
    margin: 0;
    color: var(--app-primary);
    font-size: 0.72rem;
  }
`;

export const ActivityList = styled.div`
  min-width: 0;
  margin-top: 4px;
  p {
    margin: 0;
    color: var(--app-primary);
    font-size: 0.65rem;
  }
`;

export const ActivityRow = styled.div`
  min-width: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-size: 0.64rem;
  strong {
    color: var(--app-primary);
  }
  span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  time {
    color: var(--app-primary);
    font-size: 0.6rem;
    white-space: nowrap;
  }

  strong,time{
    width: 20%;
    max-width: 20%;
  }
  span{
    width: 60%;
    max-width: 60%;
  }
`;

export const Tip = styled.div`
  width: min(100%, 1500px);
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--app-primary);
  span {
    font-size: 0.9rem;
  }
  strong {
    display: block;
    font-size: 0.65rem;
  }
  p {
    margin: 1px 0 0;
    font-size: 0.61rem;
    opacity: 0.65;
  }
  @media (max-height: 620px) {
    display: none;
  }
`;

export const ActivityButton = styled.button`
  width: min(100%, 1500px);
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px 16px;
  border: 1px solid rgba(var(--app-accent-rgb), 0.4);
  border-radius: 12px;
  background: var(--app-white);
  color: var(--app-primary);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    background 160ms ease,
    transform 160ms ease;

  svg {
    font-size: 1.05rem;
    flex-shrink: 0;
  }
  span {
    font-size: 0.82rem;
    font-weight: 800;
  }
  small {
    margin-left: auto;
    color: var(--app-accent);
    font-size: 0.7rem;
  }
  &:hover {
    background: var(--app-white);
    transform: translateY(-1px);
  }
  &:focus-visible {
    outline: 3px solid var(--app-accent);
    outline-offset: 2px;
  }

  ${caramelButtonStyles}

`;

export const ActivityModalContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
  height: min(62dvh, 560px);
  min-height: 220px;

  .activity-summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 0 0 12px;
    color: var(--app-primary);
    border-bottom: 1px solid rgba(var(--app-accent-rgb), 0.267);
    flex-shrink: 0;
  }

  .activity-summary strong {
    font-size: 0.9rem;
  }
  .activity-summary span {
    padding: 5px 9px;
    border-radius: 999px;
    background: var(--app-white);
    color: var(--app-primary);
    font-size: 0.72rem;
    font-weight: 700;
    white-space: nowrap;
  }

  ${ActivityList} {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: none;
    padding-right: 5px;
  }

  ${ActivityRow} {
    grid-template-columns: minmax(80px, 0.65fr) minmax(0, 2fr) auto;
    padding: 12px 4px;
    font-size: 0.76rem;
  }

  @media (max-width: 600px) {
    height: min(65dvh, 520px);
    ${ActivityRow} {
      grid-template-columns: minmax(0, 1fr) auto;
    }
    ${ActivityRow} span {
      grid-column: 1 / -1;
      grid-row: 2;
    }
  }
`;
