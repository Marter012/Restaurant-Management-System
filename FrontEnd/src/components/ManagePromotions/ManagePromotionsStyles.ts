import styled from "styled-components";

export const ContainerManagePromotions = styled.div`
  width: 100%;
  min-height: 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 18px;
  box-sizing: border-box;
  padding-bottom: 12px;

  .promotions-feedback {
    margin: 8px 0;
    color: var(--app-muted);
  }

  @media (max-width: 700px) {
    gap: 12px;
  }
`;

export const CategoryTabs = styled.nav`
  width: 100%;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding: 5px;
  overflow-x: auto;
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 15px;
  box-shadow: var(--app-shadow-xs);
  scrollbar-width: thin;
`;

export const CategoryTab = styled.button<{ $active: boolean }>`
  min-width: max-content;
  min-height: 46px;
  flex: 1 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
  padding: 0 18px;
  border: 0;
  border-radius: 10px;
  background: ${({ $active }) =>
    $active ? "var(--app-primary)" : "transparent"};
  color: ${({ $active }) => ($active ? "var(--app-white)" : "var(--app-ink)")};
  font: inherit;
  font-size: 0.9rem;
  font-weight: 650;
  cursor: pointer;
  transition:
    background 0.18s ease,
    color 0.18s ease;

  svg {
    font-size: 1.15rem;
    flex: 0 0 auto;
  }
  &:hover {
    background: ${({ $active }) =>
      $active ? "var(--app-primary)" : "var(--app-surface-soft)"};
  }

  @media (max-width: 600px) {
    min-height: 40px;
    padding: 0 12px;
    gap: 7px;
    font-size: 0.8rem;
  }
`;

export const Filter = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(220px, 1.8fr) minmax(130px, 0.7fr) minmax(
      130px,
      0.7fr
    );
  align-items: end;
  gap: 16px;

  .select-filter {
    display: grid;
    gap: 6px;
    min-width: 0;
    color: var(--app-ink);
    font-size: 0.82rem;
    font-weight: 600;
  }

  @media (max-width: 1200px) {
  grid-template-columns:
    minmax(0, 1fr)
    minmax(130px, 0.7fr)
    minmax(0, 1fr);

  align-items: end;
  gap: 12px;
}



  @media (max-width: 850px) {
    grid-template-columns: minmax(0, 1fr) minmax(130px, 0.6fr);
    .promotion-search {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr 1fr;
    gap: 9px;
    .promotion-search {
      grid-column: 1 / -1;
    }
  }
`;

export const SearchControl = styled.label`
  min-width: 0;
  height: 54px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 17px;
  border: 1px solid var(--app-border);
  border-radius: 13px;
  background: var(--app-surface);
  color: var(--app-muted);
  box-shadow: var(--app-shadow-xs);

  > svg {
    flex: 0 0 auto;
    font-size: 1.05rem;
  }
  input {
    width: 100%;
    min-width: 0;
    height: 100%;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--app-ink);
    font: inherit;
    font-size: 0.94rem;
  }
  input::placeholder {
    color: var(--app-muted);
  }
  button.clear-search {
    width: 30px;
    height: 30px;
    min-height: 30px;
    padding: 0;
    border: 0;
    border-radius: 7px;
    background: transparent;
    color: var(--app-muted);
    cursor: pointer;
  }
  &:focus-within {
    border-color: var(--app-accent);
    box-shadow: 0 0 0 3px rgba(var(--app-accent-rgb), 0.13);
  }

  @media (max-width: 520px) {
    height: 46px;
  }
`;

export const FilterSelect = styled.select`
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border: 1px solid var(--app-border);
  border-radius: 12px;
  background: var(--app-surface);
  color: var(--app-ink);
  font: inherit;
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;
  &:focus {
    border-color: var(--app-accent);
  }
  @media (max-width: 520px) {
    height: 46px;
  }
`;

export const PromotionGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-content: start;
  gap: 16px;

  @media (max-width: 1250px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const PromotionCard = styled.article`
  min-width: 0;
  overflow: visible;
  padding: 10px;
  border: 1px solid var(--app-border);
  border-radius: 18px;
  background: var(--app-surface);
  box-shadow: var(--app-shadow-xs);
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: var(--app-accent-soft);
    box-shadow: 0 10px 26px rgba(75, 43, 25, 0.11);
  }
`;

export const PromotionImage = styled.div`
  height: 142px;
  position: relative;
  overflow: visible;
  border-radius: 13px;
  background: var(--app-surface-soft);

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 13px;
  }

  .promotion-card-menu {
    position: absolute;
    z-index: 5;
    top: 38px;
    right: 5px;
    min-width: 160px;
    display: grid;
    gap: 3px;
    padding: 6px;
    border: 1px solid var(--app-border);
    border-radius: 10px;
    background: var(--app-surface);
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.15);

    button {
      padding: 9px 10px;
      border: 0;
      border-radius: 7px;
      background: transparent;
      color: var(--app-ink);
      text-align: left;
      font: inherit;
      font-size: 0.8rem;
      cursor: pointer;
      &:hover {
        background: var(--app-surface-soft);
      }
    }
  }

  @media (max-width: 520px) {
    height: 180px;
  }
`;

export const PromotionBadge = styled.span<{
  $status: "active" | "inactive" | "scheduled" | "expired";
}>`
  position: absolute;
  top: 9px;
  left: 9px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px;
  border-radius: 9px;
  background: ${({ $status }) =>
    $status === "active"
      ? "#e2f3df"
      : $status === "scheduled"
        ? "#fff0c2"
        : $status === "expired"
          ? "#fce8e5"
          : "#fce8e5"};
  color: ${({ $status }) =>
    $status === "active"
      ? "#24723a"
      : $status === "scheduled"
        ? "#a96800"
        : "#bd3932"};
  font-size: 0.78rem;
  font-weight: 800;
  svg {
    font-size: 0.85rem;
  }
`;

export const PromotionMenuButton = styled.button`
  position: absolute;
  top: 7px;
  right: 7px;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 9px;
  background: #fffaf2;
  color: var(--app-primary);
  cursor: pointer;
  &:hover {
    background: var(--app-white);
  }
`;

export const PromotionCardContent = styled.div`
  padding: 10px 12px 3px;
  h3 {
    margin: 0 0 5px;
    color: var(--app-ink);
    font-size: 1.02rem;
    font-weight: 800;
    line-height: 1.25;
  }
  > p {
    min-height: 38px;
    margin: 0;
    color: var(--app-ink);
    font-size: 0.86rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const PromotionCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 9px;
  margin-top: 12px;

  strong {
    flex: 0 0 auto;
    padding: 8px 15px;
    border-radius: 22px;
    background: var(--app-surface-soft);
    color: var(--app-ink);
    font-size: 1.02rem;
    font-weight: 800;
    white-space: nowrap;
  }
  span {
    min-width: 0;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: var(--app-ink);
    font-size: 0.8rem;
    white-space: nowrap;
  }
  span svg {
    color: var(--app-primary);
    flex: 0 0 auto;
  }
  @media (max-width: 520px) {
    strong {
      font-size: 0.95rem;
    }
    span {
      font-size: 0.76rem;
    }
  }
`;

export const EmptyPromotions = styled.div`
  grid-column: 1 / -1;
  padding: 42px 20px;
  border: 1px dashed var(--app-border);
  border-radius: 16px;
  background: var(--app-surface);
  color: var(--app-muted);
  text-align: center;
`;

export const AddPromotionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 12px 19px;
  border: 0;
  border-radius: 10px;
  background: var(--app-primary);
  color: var(--app-white);
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    filter 0.2s ease,
    transform 0.2s ease;
  &:hover {
    filter: brightness(1.08);
  }
  &:active {
    transform: scale(0.98);
  }
  svg {
    width: 15px;
    height: 15px;
  }
  @media (max-width: 1300px) {
    width: 100%;
    height: 54px;
    min-height: 54px;
    padding: 0 12px;
    font-size: 0.85rem;
    white-space: nowrap;
    flex-shrink: 0;
  }
 @media (max-width: 600px) {
  width: 100%;
  height: 46px;
  min-height: 46px;
  padding: 0 8px;
  font-size: 0.8rem;
  white-space: nowrap;
}
`;

export const PromotionActions = styled.div`
  width: 100%;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 10px;
  box-sizing: border-box;
  padding-top: 14px;
  border-top: 1px solid var(--app-border);

  button {
    min-height: 44px;
    flex: 0 1 auto;
    min-width: 132px;
    padding: 10px 16px;
    border-radius: 9px;
    font-family: inherit;
    font-size: 0.84rem;
    font-weight: 750;
    transition:
      transform 0.16s ease,
      box-shadow 0.16s ease,
      background 0.16s ease;
  }

  button:active {
    transform: scale(0.98);
  }

  @media (max-width: 520px) {
    gap: 8px;
    button {
      flex: 1 1 calc(50% - 4px);
      min-width: 0;
    }
  }

  @media (max-width: 340px) {
    flex-direction: column-reverse;
    align-items: stretch;
    button {
      width: 100%;
      flex: 1 1 auto;
    }
  }
`;

/* Presentación de detalle de promoción: datos + composición */
export const PromotionDetailsLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, 0.88fr) minmax(0, 1.12fr);
  align-items: start;
  gap: 24px;
  width: 100%;
  min-width: 0;

  @media (max-width: 850px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
  }
`;

export const PromotionDetailsMain = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
  padding-right: 22px;
  border-right: 1px solid var(--app-border);

  > h3 {
    margin: 0;
    color: var(--app-primary);
    font-size: 1.18rem;
    font-weight: 800;
    line-height: 1.3;
    overflow-wrap: anywhere;
  }

  @media (max-width: 850px) {
    padding-right: 0;
    padding-bottom: 18px;
    border-right: 0;
    border-bottom: 1px solid var(--app-border);
  }
`;

export const PromotionDetailImage = styled.img`
  display: block;
  width: 100%;
  height: 210px;
  object-fit: cover;
  border: 1px solid var(--app-border);
  border-radius: 13px;
  background: var(--app-surface-soft);

  @media (max-width: 520px) {
    height: 170px;
  }
`;

export const PromotionDetailSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-width: 0;

  > div {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
    padding: 12px 14px;
    border: 1px solid var(--app-border);
    border-radius: 10px;
    background: var(--app-surface);

    span {
      color: var(--app-muted-dark);
      font-size: 0.82rem;
    }

    strong {
      max-width: 65%;
      color: var(--app-primary);
      font-size: 0.88rem;
      font-weight: 750;
      text-align: right;
      overflow-wrap: anywhere;
    }
  }

  > h3 {
    margin: 0;
    color: var(--app-primary);
    font-size: 1.1rem;
  }

  > p {
    margin: 0;
    color: var(--app-muted-dark);
    font-size: 0.9rem;
    line-height: 1.5;
  }

  > strong {
    color: var(--app-primary);
    font-size: 0.95rem;
  }

  .error {
    color: var(--app-danger);
    font-weight: 650;
  }
`;

export const PromotionDetailsComposition = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;

  .section-heading {
    h3 {
      margin: 0;
      color: var(--app-primary);
      font-size: 1.12rem;
      font-weight: 800;
    }

    p {
      margin: 5px 0 0;
      color: var(--app-muted-dark);
      font-size: 0.82rem;
      line-height: 1.45;
    }
  }
`;
