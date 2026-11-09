import styled from "styled-components";

export const CashRegisterNotice = styled.section`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin: 18px 0 22px;
  padding: 20px 22px;
  border: 1px solid var(--color-primary-soft);
  border-left: 5px solid var(--color-danger);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-md);

  @media (max-width: 600px) {
    gap: 12px;
    padding: 16px;
    border-radius: var(--radius-md);
  }
`;

export const CashRegisterNoticeIcon = styled.div`
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-md);
  background: var(--color-primary-soft);
  color: var(--color-danger);
  font-size: 1.55rem;
`;

export const CashRegisterNoticeContent = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;

  h2 {
    margin: 0;
    color: var(--color-primary);
    font-size: 1.08rem;
    font-weight: 800;
    line-height: 1.3;
  }

  p {
    margin: 0;
    color: var(--color-text-secondary);
    font-size: 0.92rem;
    line-height: 1.5;
  }
`;

export const CashRegisterNoticeDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 24px;
  margin-top: 5px;
`;

export const CashRegisterNoticeDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-primary);
  font-size: 0.88rem;

  svg {
    color: var(--color-accent);
    font-size: 1.1rem;
  }

  strong {
    font-weight: 800;
  }
`;
