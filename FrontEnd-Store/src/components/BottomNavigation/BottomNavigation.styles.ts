import styled from "styled-components";

export const Bar = styled.nav<{ $hasCart: boolean }>`
  position: fixed;
  z-index: 30;
  left: 50%;
  bottom: max(12px, env(safe-area-inset-bottom));
  transform: translateX(-50%);
  width: min(460px, calc(100% - 26px));
  display: grid;
  grid-template-columns: ${p => p.$hasCart ? "repeat(5, 1fr)" : "repeat(4, 1fr)"};
  padding: 7px;
  border: 1px solid #dfe3d8;
  border-radius: 14px;
  background: #fffefaed;
  backdrop-filter: blur(20px);
  box-shadow: 0 16px 42px rgba(24,59,54,.18);
`;

export const Item = styled.button`
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 4px;
  min-height: 55px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #71807a;
  font-size: 1.12rem;
  transition: background .18s, color .18s;
  &:hover { background: #e7e8dc; color: var(--app-primary); }
  &.active { background: var(--app-primary); color: #fff; }
  span { font-size: .61rem; font-weight: 850; letter-spacing: .01em; }
`;
