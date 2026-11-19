import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(35, 23, 16, 0.66);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);

  @media (max-width: 600px) {
    align-items: flex-end;
    padding: 0;
  }
`;

export const ProductDialog = styled.div`
  width: min(100%, 650px);
  max-height: min(90dvh, 900px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 25px;
  background: var(--app-surface);
  color: var(--app-ink);
  box-shadow: 0 28px 90px rgba(34, 20, 12, 0.34);
  animation: modal-enter 180ms ease-out;

  @keyframes modal-enter {
    from { opacity: 0; transform: translateY(12px) scale(0.985); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @media (max-width: 600px) {
    width: 100%;
    max-height: 94dvh;
    border-radius: 23px 23px 0 0;
    animation: modal-sheet-enter 200ms ease-out;

    @keyframes modal-sheet-enter {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
  }
`;

export const ModalHeader = styled.header`
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 21px 26px;
  border-bottom: 1px solid var(--app-border);
  background: var(--app-surface);

  > div > span {
    display: block;
    margin-bottom: 4px;
    color: var(--app-accent);
    font-size: 0.65rem;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  @media (max-width: 600px) {
    padding: 17px 19px;
  }
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: var(--app-primary);
  font-size: 1.18rem;
  font-weight: 850;
  letter-spacing: -0.035em;

  @media (max-width: 600px) {
    font-size: 1.05rem;
  }
`;

export const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border: 1px solid var(--app-border);
  border-radius: 50%;
  background: #fff;
  color: var(--app-primary);
  font-size: 0.95rem;
  transition: background 160ms ease, transform 160ms ease, border-color 160ms ease;

  &:hover {
    border-color: var(--app-accent);
    background: #f8eee1;
    transform: rotate(90deg);
  }
`;

export const ModalContent = styled.div`
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 23px 26px 12px;
  scrollbar-width: thin;
  scrollbar-color: var(--app-border) transparent;

  &::-webkit-scrollbar { width: 7px; }
  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: var(--app-border);
  }

  @media (max-width: 600px) {
    padding: 18px 19px 10px;
  }
`;

export const ProductSummary = styled.section`
  display: grid;
  grid-template-columns: 132px minmax(0, 1fr);
  align-items: center;
  gap: 19px;
  margin-bottom: 25px;
  padding: 13px;
  border: 1px solid var(--app-border);
  border-radius: 17px;
  background: linear-gradient(135deg, #fffdf9, #f8efe3);

  @media (max-width: 480px) {
    grid-template-columns: 94px minmax(0, 1fr);
    gap: 13px;
    padding: 10px;
  }
`;

export const DialogProductImage = styled.img`
  width: 132px;
  height: 116px;
  object-fit: cover;
  border-radius: 12px;
  background: #eadbc8;

  @media (max-width: 480px) {
    width: 94px;
    height: 104px;
  }
`;

export const ImageFallback = styled.div`
  width: 132px;
  height: 116px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background:
    radial-gradient(circle at 50% 45%, rgba(255,255,255,.8), transparent 48%),
    #eadbc8;
  color: #8c735e;
  font-size: 2rem;

  @media (max-width: 480px) {
    width: 94px;
    height: 104px;
  }
`;

export const ProductInformation = styled.div`
  min-width: 0;
`;

export const ProductCategory = styled.span`
  display: block;
  margin-bottom: 5px;
  color: var(--app-accent);
  font-size: 0.66rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const ProductName = styled.h3`
  margin: 0;
  color: var(--app-primary);
  font-size: clamp(1.12rem, 3vw, 1.38rem);
  font-weight: 850;
  line-height: 1.2;
  letter-spacing: -0.035em;
  overflow-wrap: anywhere;
`;

export const ProductDescription = styled.p`
  margin: 6px 0 9px;
  color: var(--app-muted);
  font-size: 0.83rem;
  line-height: 1.45;
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 9px;
`;

export const Price = styled.strong`
  color: var(--app-primary);
  font-size: 1.15rem;
  font-weight: 900;
  letter-spacing: -0.025em;
`;

export const OldPrice = styled.span`
  color: #9b8877;
  font-size: 0.78rem;
  text-decoration: line-through;
`;

export const FormSection = styled.section`
  margin: 0 0 23px;
`;

export const SectionHeading = styled.label`
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 5px;
  color: var(--app-primary);
  font-size: 0.91rem;
  font-weight: 850;
  letter-spacing: -0.015em;

  span {
    padding: 3px 7px;
    border-radius: 30px;
    background: #f1e5d6;
    color: var(--app-muted);
    font-size: 0.62rem;
    font-weight: 750;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }
`;

export const SectionHint = styled.p<{ $align?: "right" }>`
  margin: 0 0 11px;
  color: var(--app-muted);
  font-size: 0.76rem;
  line-height: 1.45;
  text-align: ${({ $align }) => $align || "left"};
`;

export const OptionList = styled.div`
  display: grid;
  gap: 8px;
`;

export const OptionRow = styled.label<{ $selected?: boolean; $disabled?: boolean }>`
  min-height: 49px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 13px;
  border: 1px solid ${({ $selected }) => $selected ? "var(--app-accent)" : "var(--app-border)"};
  border-radius: 12px;
  background: ${({ $selected }) => $selected ? "#f8eee1" : "#fffdf9"};
  color: ${({ $disabled }) => $disabled ? "#9a8a7a" : "var(--app-ink)"};
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};
  transition: border-color 150ms ease, background 150ms ease, transform 150ms ease;

  &:hover {
    border-color: ${({ $disabled }) => $disabled ? "var(--app-border)" : "var(--app-accent)"};
    transform: ${({ $disabled }) => $disabled ? "none" : "translateY(-1px)"};
  }

  > svg {
    margin-left: auto;
    color: var(--app-accent);
    font-size: 0.8rem;
  }
`;

export const OptionInput = styled.input`
  appearance: none;
  -webkit-appearance: none;
  width: 19px;
  height: 19px;
  flex: 0 0 19px;
  display: grid;
  place-content: center;
  margin: 0;
  border: 1.5px solid #c9b49d;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;

  &[type="radio"] { border-radius: 50%; }

  &::before {
    content: "";
    width: 9px;
    height: 9px;
    transform: scale(0);
    transition: transform 120ms ease;
    border-radius: 2px;
    background: #fff;
  }

  &[type="radio"]::before { border-radius: 50%; }
  &:checked {
    border-color: var(--app-primary);
    background: var(--app-primary);
  }
  &:checked::before { transform: scale(1); }
  &:disabled { cursor: not-allowed; opacity: .55; }
`;

export const OptionText = styled.span`
  min-width: 0;
  flex: 1;
  color: inherit;
  font-size: 0.86rem;
  font-weight: 650;
  line-height: 1.35;
  text-transform: capitalize;
`;

export const OptionStatus = styled.span`
  flex-shrink: 0;
  padding: 4px 8px;
  border-radius: 30px;
  background: #f2e8dc;
  color: var(--app-muted);
  font-size: 0.65rem;
  font-weight: 750;
`;

export const NoteInput = styled.textarea`
  width: 100%;
  min-height: 82px;
  display: block;
  resize: vertical;
  padding: 12px 13px;
  border: 1px solid var(--app-border);
  border-radius: 12px;
  outline: none;
  background: #fffdf9;
  color: var(--app-ink);
  font-size: 0.84rem;
  line-height: 1.5;
  transition: border-color 150ms ease, box-shadow 150ms ease;

  &::placeholder { color: #aa9a89; }
  &:focus {
    border-color: var(--app-accent);
    box-shadow: 0 0 0 3px rgba(183, 131, 78, .13);
  }
`;

export const ModalFooter = styled.footer`
  flex-shrink: 0;
  padding: 14px 26px 20px;
  border-top: 1px solid var(--app-border);
  background: var(--app-surface);

  @media (max-width: 600px) {
    padding: 12px 19px max(16px, env(safe-area-inset-bottom));
  }
`;

export const AddButton = styled.button`
  width: 100%;
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 17px;
  border: 0;
  border-radius: 13px;
  background: var(--app-primary);
  color: #fff;
  font-size: 0.88rem;
  font-weight: 850;
  box-shadow: 0 7px 18px rgba(74, 40, 24, .16);
  transition: background 150ms ease, transform 150ms ease, box-shadow 150ms ease;

  strong {
    margin-left: auto;
    font-size: 0.9rem;
    font-weight: 900;
  }

  &:hover {
    background: var(--app-primary-hover);
    box-shadow: 0 10px 22px rgba(74, 40, 24, .2);
    transform: translateY(-1px);
  }

  &:active { transform: translateY(0); }

  @media (max-width: 380px) {
    gap: 8px;
    font-size: 0.82rem;
    strong { font-size: 0.82rem; }
  }
`;
