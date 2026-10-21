import styled from "styled-components";

export const ContainerManagePromotions = styled.div`
  width: 100%;
  flex: 1 1 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90%;
  max-height: 90%;

  gap: 12px;

  box-sizing: border-box;

  flex-shrink: 0;

  form{
    width: 100%;
    height: 100%;
  }

  .active {
    background-color: #50934d;
    color: var(--app-white);
  }

  .inactive {
    background-color: #db7f7f;
    color: var(--app-white);
  }

  .promotions-table {
    width: 100%;
    height: auto;
    max-height: none;
    min-height: 0;
    flex: 1 1 auto;

    .actions {
      .button-text {
        color: var(--app-white);
      }
    }

    .table-header-1,
    .promotions-table-row .promotion-description {
      display: none;
    }

    .table-header,
    .promotions-table-row {
      grid-template-columns:
        minmax(0, 1.4fr)
        minmax(80px, 0.6fr)
        minmax(0, 1fr)
        120px;
    }

    @media (max-width: 1300px) {

      .table-header {
        grid-template-columns:
          minmax(0, 1fr)
          minmax(80px, 0.6fr)
          120px;

        gap: 10px;
      }

      .table-header-1,
      .table-header-3 {
        display: none;
      }

      .promotions-table-row {
        grid-template-columns:
          minmax(0, 1fr)
          minmax(80px, 0.6fr)
          120px;

        gap: 10px;
      }

      .promotions-table-row .promotion-description,
      .promotions-table-row .promotion-composition {
        display: none !important;
      }

      .promotions-table-row .promotion-name {
        min-width: 0;
      }

      .promotions-table-row .promotion-name strong {
        display: block;

        min-width: 0;

        overflow: hidden;

        text-overflow: ellipsis;

        white-space: nowrap;
      }

      .promotions-table-row .price {
        text-align: center;

        font-weight: 600;

        white-space: nowrap;
      }

      .promotions-table-row .actions {
        display: flex;

        align-items: center;

        justify-content: center;

        gap: 0;
      }

      .promotions-table-row .actions .status-text {
        display: none;
      }

      .promotions-table-row .actions button {
        width: 32px;

        min-width: 32px;

        height: 32px;

        padding: 6px;

        display: inline-flex;

        align-items: center;

        justify-content: center;

        gap: 0;

        flex-shrink: 0;
      }

      .promotions-table-row .actions button svg {
        width: 15px;

        height: 15px;

        flex-shrink: 0;
      }
    }

    @media (min-width: 851px) and (max-width: 1300px) {
      .promotions-table-row .actions button {
        width: auto;
        min-width: 0;
        height: auto;
        padding: 8px 12px;
        gap: 6px;
      }
    }

    @media (max-width: 850px) {
      .promotions-table-row .actions .button-text {
        display: none;
      }

      .promotions-table-row .actions button {
        width: 32px;
        min-width: 32px;
        height: 32px;
        padding: 6px;
        gap: 0;
      }
    }

    @media (max-width: 600px) {
      
      height: auto;
      max-height: none;
      overflow: visible;
      flex: 0 0 auto;

      > div:last-child {
        height: auto !important;
        min-height: 0 !important;
        max-height: none !important;
        overflow: visible !important;
        flex: 0 0 auto !important;
      }

      .table-header {
        grid-template-columns:
          minmax(0, 1fr)
          80px;

        gap: 6px;

        padding: 9px 8px;
      }

      .table-header-1,
      .table-header-2,
      .table-header-3 {
        display: none;
      }

      .promotions-table-row {
        grid-template-columns:
          minmax(0, 1fr)
          80px;

        gap: 6px;

        padding: 10px 8px;
      }

      .promotions-table-row .price {
        display: none;
      }

      .table-header h4 {
        font-size: 9px;
      }

      .promotions-table-row {
        font-size: 11px;
      }

      .promotions-table-row .actions {
        gap: 4px;
      }

      .promotions-table-row .actions button {
        width: 30px;

        min-width: 30px;

        height: 30px;

        padding: 6px;
      }

      .promotions-table-row .actions button svg {
        width: 14px;

        height: 14px;
      }
    }

    @media (max-width: 400px) {

      .table-header {
        grid-template-columns:
          minmax(0, 1fr)
          72px;

        gap: 4px;

        padding: 8px 6px;
      }

      .table-header-1,
      .table-header-2,
      .table-header-3 {
        display: none;
      }

      .promotions-table-row {
        grid-template-columns:
          minmax(0, 1fr)
          72px;

        gap: 4px;

        padding: 9px 6px;
      }

      .promotions-table-row .price {
        display: none;
      }

      .table-header h4 {
        font-size: 8px;
      }

      .promotions-table-row {
        font-size: 10px;
      }

      .promotions-table-row .actions {
        gap: 3px;
      }

      .promotions-table-row .actions button {
        width: 28px;

        min-width: 28px;

        height: 28px;

        padding: 5px;
      }

      .promotions-table-row .actions button svg {
        width: 13px;

        height: 13px;
      }
    }
  }

  @media (max-width: 850px) {
    gap: 16px;
  }

  @media (max-width: 600px) {
    gap: 14px;
  }

  @media (max-width: 400px) {
    gap: 12px;
  }
`;

export const AddPromotionButton = styled.button`
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 8px;

  padding: 12px 18px;

  border: none;

  border-radius: 8px;

  background-color: var(--app-primary);

  color: var(--app-white);

  font-size: 14px;

  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background-color: var(--app-accent);
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 15px;

    height: 15px;
  }

  @media (max-width: 600px) {
    width: 100%;

    padding: 11px 15px;

    font-size: 13px;
  }

  @media (max-width: 400px) {
    padding: 10px 12px;

    font-size: 12px;
  }
`;

export const Filter = styled.div`
  width: 80%;

  display: flex;

  align-items: center;

  gap: 8px;

  padding: 5px;

  box-sizing: border-box;

  background-color: var(--app-surface-soft);

  border-radius: 10px;

  button,
  select {
    flex: 1;

    min-width: 0;

    height: 38px;

    border: none;

    border-radius: 7px;

    padding: 0 12px;

    font-size: 13px;

    font-weight: 600;

    cursor: pointer;

    box-sizing: border-box;
  }

  button {
    background-color: transparent;

    color: var(--app-primary);

    transition:
      background-color 0.2s ease,
      color 0.2s ease;

    &:hover {
      color: var(--app-accent);
    }

    &.active {
      background-color: var(--app-accent);

      color: var(--app-white);
    }
  }

  select {
    background-color: var(--app-white);

    color: var(--app-primary);

    border: 1px solid var(--app-accent-soft);

    outline: none;

    cursor: pointer;

    &:focus {
      border-color: var(--app-accent);
    }
  }

  @media (max-width: 1000px) {
    width: 90%;
  }

  @media (max-width: 700px) {
    width: 100%;
  }

  @media (max-width: 500px) {
    flex-wrap: wrap;

    button {
      flex: 1 1 calc(50% - 4px);
    }

    select {
      flex: 1 1 100%;
    }
  }

  @media (max-width: 400px) {
    gap: 5px;

    padding: 4px;

    button,
    select {
      height: 36px;

      padding: 0 8px;

      font-size: 12px;
    }
  }

  width: 100%;
  gap: 9px;
  padding: 0;
  background: transparent;
  border-radius: 0;

  button {
    flex: 0 0 auto;
    min-height: 42px;
    height: 42px;
    padding: 0 15px;
    border: 1px solid var(--app-accent-soft);
    border-radius: 10px;
    background: var(--app-white);
    color: var(--app-primary);
    font-family: inherit;
    font-size: 0.84rem;
    font-weight: 700;
    white-space: nowrap;

    &:hover {
      border-color: var(--app-accent);
      color: var(--app-primary);
    }
    &.active {
      border-color: var(--app-primary);
      background: var(--app-primary);
      color: var(--app-white);
    }
  }

  .promotion-search {
    min-width: 180px;
    height: 42px;
    min-height: 42px;
    flex: 1 1 260px;
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 0 12px;
    border: 1px solid var(--app-accent-soft);
    border-radius: 10px;
    background: var(--app-white);
    color: var(--app-accent);
    box-sizing: border-box;

    &:focus-within {
      border-color: var(--app-accent);
      box-shadow: 0 0 0 3px rgba(var(--app-accent-rgb), 0.149);
    }
    > svg {
      flex: 0 0 auto;
      font-size: 0.9rem;
    }
    input {
      width: 100%;
      height: 100%;

      min-width: 0;
      border: 0;
      outline: 0;
      background: transparent;
      color: var(--app-primary);
      font-family: inherit;
      font-size: 0.86rem;
      border: none !important;
    }
    input::placeholder {
      color: var(--app-muted-dark);
    }
    input::-webkit-search-cancel-button {
      display: none;
    }
    button.clear-search {
      min-width: 28px;
      width: 28px;
      height: 28px;
      min-height: 28px;
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--app-muted-dark);
    }
    button.clear-search:hover {
      background: var(--app-surface-soft);
    }
  }

  @media (max-width: 600px) {
    gap: 7px;
    > button {
      flex: 1 1 calc(50% - 4px);
    }
    .promotion-search {
      flex: 1 1 100%;
      min-width: 0;
    }
  }

  @media (max-width: 400px) {
    > button {
      min-height: 38px;
      height: 38px;
      padding: 0 10px;
      font-size: 0.78rem;
    }
    .promotion-search {
      min-height: 40px;
    }
  }
`;

export const PromotionOptions = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  gap: 18px;

  box-sizing: border-box;
  .containerInfo{
    width: 100%;
    height: 80%;
    overflow-y: auto;
    scrollbar-width: none;
  }

  @media (max-width: 600px) {
    gap: 15px;
  }

  @media (max-width: 400px) {
    gap: 12px;
  }
`;

export const PromotionInfo = styled.div`
  width: 100%;

  display: flex;

  flex-direction: column;

  gap: 10px;

  box-sizing: border-box;

  h3 {
    margin: 0 0 5px;

    color: var(--app-primary);

    font-size: 20px;

    font-weight: 700;
  }

  p {
    margin: 0;

    color: var(--app-primary);

    font-size: 14px;

    line-height: 1.5;
  }

  > div {
    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 15px;

    padding: 10px 12px;

    background-color: var(--app-surface-soft);

    border-radius: 7px;

    span {
      color: var(--app-primary);

      font-size: 13px;
    }

    strong {
      color: var(--app-primary);

      font-size: 14px;

      text-align: right;
    }
  }

  > strong {
    color: var(--app-primary);

    font-size: 15px;
  }

  @media (max-width: 500px) {
    gap: 8px;

    h3 {
      font-size: 18px;
    }

    p {
      font-size: 13px;
    }

    > div {
      padding: 9px 10px;

      span,
      strong {
        font-size: 12px;
      }
    }
  }
`;

export const PromotionItems = styled.div`
  width: 100%;

  display: flex;

  flex-direction: column;

  gap: 10px;

  h3 {
    margin: 0 0 4px;

    color: var(--app-primary);

    font-size: 1.05rem;

    font-weight: 700;
  }

  @media (max-width: 600px) {
    gap: 8px;

    h3 {
      font-size: 0.98rem;
    }
  }

  @media (max-width: 400px) {
    gap: 7px;

    h3 {
      font-size: 0.92rem;
    }
  }
`;

export const PromotionItem = styled.div`
  width: 100%;

  display: flex;

  flex-direction: column;

  gap: 12px;

  box-sizing: border-box;

  padding: 13px 14px;

  border: 1px solid var(--app-surface-soft);

  border-radius: 9px;

  background-color: var(--app-white);

  > div {
    display: flex;

    flex-direction: column;

    gap: 5px;
  }

  strong {
    color: var(--app-primary);

    font-size: 0.95rem;

    font-weight: 700;

    line-height: 1.3;
  }

  span {
    color: var(--app-muted-dark);

    font-size: 0.82rem;

    font-weight: 600;
  }

  p {
    margin: 0;

    padding: 6px 9px;

    border: 1px solid var(--app-surface-soft);

    border-radius: 6px;

    background-color: var(--app-white);

    color: var(--app-primary);

    font-size: 0.82rem;

    line-height: 1.4;

    overflow-wrap: anywhere;
  }

  @media (max-width: 600px) {
    gap: 9px;

    padding: 11px;

    strong {
      font-size: 0.88rem;
    }

    span {
      font-size: 0.76rem;
    }

    p {
      padding: 6px 8px;

      font-size: 0.78rem;
    }
  }

  @media (max-width: 400px) {
    gap: 8px;

    padding: 10px;

    strong {
      font-size: 0.84rem;
    }

    span {
      font-size: 0.72rem;
    }

    p {
      padding: 5px 7px;

      font-size: 0.74rem;
    }
  }
`;

export const PromotionActions = styled.div`
  width: 100%;

  display: flex;

  gap: 10px;

  box-sizing: border-box;

  > div {
    display: flex;

    gap: 8px;

    width: 100%;
  }

  button {
    flex: 1;
  }

  @media (max-width: 500px) {
    > div {
      flex-direction: column;
    }
  }
`;

export const ActionButton = styled.button`
  min-height: 40px;

  padding: 10px 15px;

  border: none;

  border-radius: 7px;

  background-color: #794026;
  color: var(--app-white);

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background-color: var(--app-accent);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const CancelButton = styled.button`
  min-height: 40px;

  padding: 10px 15px;

  border: 1px solid var(--app-border);

  border-radius: 7px;

  background-color: var(--app-surface-soft);

  color: var(--app-primary);

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: var(--app-surface-soft);

    border-color: var(--app-border);
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }
`;

