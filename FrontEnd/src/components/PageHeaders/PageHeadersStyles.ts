import styled from "styled-components";

/* =====================================================
   PAGE HEADER
===================================================== */

export const PageHeaderContainer = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  flex-shrink: 0;

  @media (max-width: 1000px) {
    gap: 15px;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    align-items: center;
    gap: 14px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;

  min-width: 150px;
  box-sizing: border-box;

  h2 {
    margin: 0;
    color: var(--color-text);
    font-size: clamp(1.35rem, 2.2vw, 1.8rem);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.03em;
  }

  p {
    margin: 6px 0 0;
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.5;
  }

  @media (max-width: 900px) {
    h2 {
      font-size: clamp(1.3rem, 2.5vw, 1.6rem);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: 0;

    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: var(--font-size-sm);
    }
  }

  @media (max-width: 500px) {
    h2 {
      font-size: 1.35rem;
    }

    p {
      font-size: var(--font-size-xs);
    }
  }

  @media (max-width: 400px) {
    h2 {
      font-size: 1.25rem;
    }
  }
`;

/* =====================================================
   HEADER ACTIONS / TABS WRAPPER
===================================================== */

export const Actions = styled.div`
  display: flex;
  flex: 0 1 40%;
  align-items: center;
  justify-content: center;
  gap: 8px;

  min-width: 200px;
  padding: 5px;
  box-sizing: border-box;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-muted);

  button {
    flex: 1 1 0;
    min-width: 0;
  }

  @media (max-width: 1000px) {
    gap: 6px;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: 0;
    flex: 1 1 100%;
    flex-wrap: wrap;
  }

  @media (max-width: 500px) {
    gap: 5px;

    button {
      padding: 9px 10px;
      font-size: var(--font-size-xs);
    }
  }

  @media (max-width: 400px) {
    button {
      padding: 8px 7px;
    }
  }
`;

/* =====================================================
   USER PROFILE
===================================================== */

export const ProfileContainer = styled.div`
  position: relative;
  z-index: 20;
  flex-shrink: 0;

  width: 250px;
  height: 50px;

  @media (max-width: 620px) {
    display: none;
  }
`;

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;

  width: 100%;
  height: 100%;
  padding: 5px 10px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);

  cursor: pointer;

  transition:
    background-color var(--transition-normal),
    border-color var(--transition-normal),
    box-shadow var(--transition-normal);

  &:hover {
    border-color: var(--color-border-strong);
    background: var(--color-surface-hover);
    box-shadow: var(--shadow-sm);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
`;

export const ProfileAvatar = styled.div`
  display: grid;
  place-items: center;
  flex: 0 0 38px;

  width: 38px;
  height: 38px;

  border: 1px solid var(--color-primary-soft);
  border-radius: 50%;
  background: var(--color-primary-soft);
  color: var(--color-primary);

  font-size: var(--font-size-sm);
  font-weight: 700;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;

  min-width: 0;

  strong {
    max-width: 100%;
    overflow: hidden;
    color: var(--color-text);
    font-size: var(--font-size-sm);
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    max-width: 100%;
    overflow: hidden;
    color: var(--color-text-secondary);
    font-size: var(--font-size-xs);
    text-overflow: ellipsis;
    text-transform: capitalize;
    white-space: nowrap;
  }
`;

export const ProfileArrow = styled.span<{ $isOpen: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;

  margin-left: auto;
  color: var(--color-text-light);
  font-size: var(--font-size-xs);

  transform: rotate(${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")});
  transition: transform var(--transition-normal);
`;

export const ProfileDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 30;

  width: 200px;
  padding: 6px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);

  animation: dropdownAppear var(--transition-normal) both;

  @keyframes dropdownAppear {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;
  min-height: 42px;
  padding: 10px 12px;

  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-danger);

  font-size: var(--font-size-sm);
  font-weight: 600;
  text-align: left;

  cursor: pointer;

  span {
    display: inline-flex;
    align-items: center;
    font-size: var(--font-size-md);
  }

  &:hover {
    background: var(--color-danger-soft);
  }

  &:focus-visible {
    outline: 2px solid var(--color-danger);
    outline-offset: -2px;
  }
`;

/* =====================================================
   TABS
===================================================== */

export const Tab = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;

  min-height: 40px;
  padding: 9px 16px;

  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-secondary);

  font-size: var(--font-size-sm);
  font-weight: 600;
  white-space: nowrap;

  cursor: pointer;

  transition:
    background-color var(--transition-normal),
    border-color var(--transition-normal),
    color var(--transition-normal);

  &:hover {
    background: var(--color-primary-soft);
    color: var(--color-primary);
  }

  &.active {
    border-color: var(--color-primary);
    background: var(--color-primary);
    color: var(--color-white);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  @media (max-width: 500px) {
    min-height: 38px;
    padding: 8px 10px;
    font-size: var(--font-size-xs);
  }

  @media (max-width: 400px) {
    padding: 8px 7px;
  }
`;
