import styled from "styled-components";

export const CommercialContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  min-width: 0;
  color: var(--color-text);
`;

export const CommercialHeader = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  padding: 2px 0 5px;
`;

export const Eyebrow = styled.span`
  display: block;
  margin-bottom: 7px;
  color: var(--color-accent);
  font-size: var(--font-size-xs);
  font-weight: 800;
  letter-spacing: 0.1em;
`;

export const Title = styled.h2`
  margin: 0;
  color: var(--color-text);
  font-size: clamp(1.45rem, 2.5vw, 2rem);
`;

export const Description = styled.p`
  max-width: 760px;
  margin: 7px 0 0;
  color: var(--color-text-secondary);
  line-height: 1.55;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 0;
  padding: 19px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);

  @media (max-width: 600px) {
    padding: 14px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

export const SectionIcon = styled.div`
  display: grid;
  place-items: center;
  flex: 0 0 42px;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-md);
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: 1.05rem;
`;

export const SectionTitle = styled.h3`
  margin: 0;
  color: var(--color-text);
  font-size: var(--font-size-md);
  font-weight: 800;
`;

export const SectionDescription = styled.p`
  margin: 4px 0 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  line-height: 1.5;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
  max-width: 560px;
`;

export const Label = styled.label`
  color: var(--color-text);
  font-size: var(--font-size-sm);
  font-weight: 700;
`;

export const Input = styled.input`
  width: 100%;
  min-height: 44px;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  font: inherit;

  &:hover:not(:disabled) {
    border-color: var(--color-accent);
  }

  &:focus {
    border-color: var(--color-accent);
    outline: 2px solid var(--color-primary-soft);
  }

  &:disabled {
    background: var(--color-surface-muted);
    color: var(--color-text-light);
    cursor: not-allowed;
  }
`;

export const HelpText = styled.small`
  color: var(--color-text-secondary);
  line-height: 1.5;
`;

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 13px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-hover);

  @media (max-width: 480px) {
    align-items: flex-start;
  }
`;

export const ToggleCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;

  strong {
    color: var(--color-text);
    font-size: var(--font-size-sm);
  }

  span {
    color: var(--color-text-secondary);
    font-size: var(--font-size-xs);
    line-height: 1.45;
  }
`;

export const Toggle = styled.button<{ $enabled: boolean }>`
  position: relative;
  flex: 0 0 46px;
  width: 46px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 30px;
  background: ${({ $enabled }) => $enabled ? "var(--color-success)" : "var(--color-border-strong)"};
  transition: background var(--transition-normal);

  i {
    position: absolute;
    top: 3px;
    left: ${({ $enabled }) => $enabled ? "23px" : "3px"};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--color-white);
    box-shadow: var(--shadow-sm);
    transition: left var(--transition-normal);
  }
`;

export const SaveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 15px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: var(--color-white);
  font-weight: 700;

  &:hover:not(:disabled) {
    border-color: var(--color-primary-hover);
    background: var(--color-primary-hover);
  }
`;

export const SecondaryButton = styled.button`
  min-height: 42px;
  padding: 0 15px;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  font-weight: 700;

  &:hover:not(:disabled) {
    background: var(--color-surface-hover);
  }
`;

export const ActionRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 9px;
`;

export const Message = styled.div<{ $error?: boolean }>`
  padding: 11px 13px;
  border: 1px solid ${({ $error }) => $error ? "var(--color-danger)" : "var(--color-success)"};
  border-radius: var(--radius-md);
  background: ${({ $error }) => $error ? "var(--color-danger-soft)" : "var(--color-success-soft)"};
  color: ${({ $error }) => $error ? "var(--color-danger)" : "var(--color-success)"};
  font-size: var(--font-size-sm);
  font-weight: 650;
`;

export const RetentionPreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 13px;
  border: 1px solid var(--color-partial);
  border-radius: var(--radius-md);
  background: var(--color-partial-soft);
`;

export const WarningBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: var(--color-partial);

  > svg {
    flex: 0 0 auto;
    margin-top: 2px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  strong {
    color: var(--color-text);
    font-size: var(--font-size-sm);
  }

  span {
    color: var(--color-text-secondary);
    font-size: var(--font-size-xs);
    line-height: 1.5;
  }
`;

export const Loading = styled.div`
  padding: 24px;
  color: var(--color-text-secondary);
  text-align: center;
`;
