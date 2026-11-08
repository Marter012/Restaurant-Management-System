import styled from "styled-components";

export const PageHeaderContainer = styled.header`
  position: relative;

  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  box-sizing: border-box;
  flex-shrink: 0;

  @media (max-width: 1000px) {
    gap: 15px;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }
`;

export const TitleContainer = styled.div`
  flex: 1;
  min-width: 150px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  box-sizing: border-box;

  h2 {
    margin: 0;
    font-size: 1.8rem;
    line-height: 1.2;
    color: var(--app-primary);
  }

  p {
    margin: 5px 0 0;
    font-size: 0.95rem;
    line-height: 1.4;
    opacity: 0.6;
  }

  @media (max-width: 900px) {
    h2 {
      font-size: 1.6rem;
    }
  }

  @media (max-width: 768px) {
    width: 100%;

    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 500px) {
    h2 {
      font-size: 1.35rem;
    }

    p {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 400px) {
    h2 {
      font-size: 1.25rem;
    }

    p {
      font-size: 0.8rem;
    }
  }
`;

export const Actions = styled.div`
  flex: 0 1 40%;
  min-width: 200px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;
  padding: 5px;

  box-sizing: border-box;

  background: var(--app-surface-soft);
  border-radius: 10px;
  button {
    flex: 1;
    min-width: 0;
  }

  @media (max-width: 1000px) {
    gap: 8px;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: 0;
    flex: 1 1 100%;
    flex-wrap: wrap;

    button {
      flex: 1;
      min-width: 0;
    }
  }

  @media (max-width: 500px) {
    gap: 6px;

    button {
      padding: 9px 10px;
      font-size: 0.85rem;
    }
  }

  @media (max-width: 400px) {
    button {
      padding: 8px 7px;
      font-size: 0.8rem;
    }
  }
`;

/* PERFIL DEL USUARIO */

export const ProfileContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  z-index: 20;
  width: 250px;
  height: 50px;

  @media (max-width: 620px) {
    display : none ;
  }
`;

export const ProfileButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: 100%;
  height: 100%;

  border: 1px solid var(--app-border);
  border-radius: 12px;

  background: var(--app-surface);

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: var(--app-surface-soft);
    border-color: var(--app-accent);
    box-shadow: 0 3px 12px rgba(var(--app-shadow-rgb), 0.08);
  }

`;

export const ProfileAvatar = styled.div`
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 100px;

  background: var(--app-primary);
  color: var(--app-white);

  font-size: 1rem;
  font-weight: 700;
  
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 3px;

  strong {
    color: var(--app-primary);
    font-size: 0.85rem;
    font-weight: 700;
  }

  span {
    color: var(--app-muted);
    font-size: 0.75rem;
    text-transform: capitalize;
  }

  @media (max-width: 400px) {
    strong {
      font-size: 0.78rem;
    }

    span {
      font-size: 0.7rem;
    }
  }
`;

export const ProfileArrow = styled.span<{ $isOpen: boolean }>`
  margin-left: 5px;

  color: var(--app-muted);
  font-size: 0.65rem;

  transform: rotate(${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")});

  transition: transform 0.2s ease;
`;

export const ProfileDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;

  width: 190px;

  padding: 6px;

  background: var(--app-surface);

  border: 1px solid var(--app-border);
  border-radius: 12px;

  box-shadow: 0 10px 30px rgba(var(--app-shadow-rgb), 0.14);

  animation: dropdownAppear 0.18s ease;

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
`;

export const DropdownButton = styled.button`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 10px;

  padding: 11px 12px;

  border: none;
  border-radius: 8px;

  background: transparent;

  color: var(--app-danger);
  font-size: 0.85rem;
  font-weight: 600;

  text-align: left;
  cursor: pointer;

  transition: background 0.2s ease;

  span {
    font-size: 1.1rem;
  }

  &:hover {
    background: var(--app-surface-soft);
  }
`;

export const Tab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px 20px;
  gap: 10px;

  border-radius: 7px;

  background: transparent;
  color: var(--app-primary);

  font-weight: 600;
  border: none;
  cursor: pointer;

  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    color: var(--app-accent);
  }

  &.active {
    background: var(--app-accent);
    color: var(--app-white);
  }

  @media (max-width: 500px) {
    padding: 9px 10px;
    font-size: 0.85rem;
  }

  @media (max-width: 400px) {
    padding: 8px 7px;
    font-size: 0.8rem;
  }
`;