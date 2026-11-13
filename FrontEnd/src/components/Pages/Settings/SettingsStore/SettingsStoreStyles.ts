import styled from "styled-components";

export const StoreSettingsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-width: 0;
  color: var(--color-text);

  .store-page-header {
    padding: 4px 0 2px;
    span { color: var(--color-accent); font-size: .7rem; font-weight: 900; letter-spacing: .13em; }
    h2 { margin: 7px 0; font-size: clamp(1.45rem, 2.5vw, 2rem); }
    p { max-width: 780px; margin: 0; color: var(--color-text-secondary); line-height: 1.55; }
  }

  iframe { width: 100%; min-height: 560px; border: 1px solid var(--color-border); border-radius: 14px; background: white; }
  .store-color-control { display: flex; align-items: center; gap: 10px; }
  .store-color-control input { width: 48px; height: 40px; padding: 2px; border: 1px solid var(--color-border); border-radius: 9px; background: var(--color-surface); cursor: pointer; }
  .store-color-control code { color: var(--color-text-secondary); font-size: .78rem; }
  .store-discount-field { max-width: 340px; }
  .store-selection-summary { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; color: var(--color-text-secondary); font-size: .78rem; }
  .store-selection-summary strong { color: var(--color-primary); font-size: .95rem; }
  .store-filter-toolbar, .store-discount-tools { display: grid; grid-template-columns: minmax(220px, 1fr) minmax(170px, 220px) minmax(150px, 190px); gap: 10px; }
  .store-search, .store-filter-select { display: flex; align-items: center; gap: 9px; min-width: 0; min-height: 42px; padding: 0 11px; border: 1px solid var(--color-border); border-radius: 10px; background: var(--color-surface); color: var(--color-text-secondary); box-sizing: border-box; }
  .store-search:focus-within, .store-filter-select:focus-within { border-color: var(--color-accent); outline: 2px solid var(--color-primary-soft); }
  .store-search input, .store-filter-select select { width: 100%; min-width: 0; border: 0; outline: 0; background: transparent; color: var(--color-text); font: inherit; font-size: .8rem; }
  .store-filter-select select { cursor: pointer; }
  .store-search button { display: grid; place-items: center; flex: 0 0 auto; width: 27px; height: 27px; border: 0; border-radius: 7px; background: var(--color-surface-hover); color: var(--color-text-secondary); cursor: pointer; }
  .store-bulk-actions { display: flex; flex-wrap: wrap; gap: 8px; }
  .store-bulk-actions button { display: inline-flex; align-items: center; gap: 7px; min-height: 34px; padding: 7px 11px; border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-surface-hover); color: var(--color-primary); font: inherit; font-size: .74rem; font-weight: 750; cursor: pointer; }
  .store-bulk-actions button:hover { border-color: var(--color-accent); background: var(--color-primary-soft); }
  .store-product-discounts { display: grid; gap: 9px; margin-top: 4px; max-height: 430px; overflow: auto; padding-right: 3px; }
  .store-product-discounts label { display: grid; grid-template-columns: minmax(0, 1fr) minmax(240px, 340px); align-items: center; gap: 12px; padding: 10px 12px; border: 1px solid var(--color-border); border-radius: 10px; background: var(--color-surface); font-size: .82rem; }
  .discount-product-name { display: grid; gap: 3px; min-width: 0; font-weight: 700; }
  .discount-product-name small { color: var(--color-text-secondary); font-size: .68rem; font-weight: 500; }
  .discount-product-control { display: flex; align-items: center; gap: 7px; min-width: 0; }
  .store-product-discounts input { width: 100%; min-width: 0; min-height: 38px; padding: 7px 9px; border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-surface); color: var(--color-text); }
  .discount-product-control > span { color: var(--color-text-secondary); font-weight: 800; }
  .discount-product-control button { flex: 0 0 auto; min-height: 34px; padding: 6px 9px; border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-surface-hover); color: var(--color-primary); font: inherit; font-size: .68rem; font-weight: 750; cursor: pointer; }
  .store-discount-panel { display: grid; gap: 13px; padding: 16px; border: 1px solid var(--color-border); border-radius: 13px; background: var(--color-surface-hover); }
  .store-discount-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .store-discount-heading strong { color: var(--color-text); font-size: .9rem; }
  .store-discount-heading p { margin-top: 4px; }
  .store-discount-heading.individual { padding-top: 13px; border-top: 1px solid var(--color-border); }
  .discount-badge, .discount-count { flex: 0 0 auto; padding: 7px 11px; border-radius: 99px; background: var(--color-primary-soft); color: var(--color-primary); font-size: .78rem; font-weight: 850; }
  .discount-count { font-size: .7rem; }
  .store-discount-input { display: flex; align-items: center; max-width: 180px; gap: 8px; }
  .store-discount-input input { width: 100%; min-height: 42px; padding: 8px 10px; border: 1px solid var(--color-border); border-radius: 9px; background: var(--color-surface); color: var(--color-text); }
  .store-discount-input span { font-weight: 800; color: var(--color-text-secondary); }
  .discount-empty { padding: 14px; border: 1px dashed var(--color-border); border-radius: 9px; color: var(--color-text-secondary); }
  .store-preview-empty { margin: 0; padding: 22px; border: 1px dashed var(--color-border); border-radius: 12px; color: var(--color-text-secondary); text-align: center; }

  @media (max-width: 900px) {
    .store-filter-toolbar, .store-discount-tools { grid-template-columns: 1fr 1fr; }
    .store-filter-toolbar .store-search, .store-discount-tools .store-search { grid-column: 1 / -1; }
  }
  @media (max-width: 600px) {
    gap: 14px;
    iframe { min-height: 420px; }
    .store-filter-toolbar, .store-discount-tools { grid-template-columns: 1fr; }
    .store-filter-toolbar .store-search, .store-discount-tools .store-search { grid-column: auto; }
    .store-product-discounts label { grid-template-columns: 1fr; }
    .store-discount-heading { align-items: flex-start; }
    .store-discount-panel { padding: 12px; }
  }
`;

export const StoreSettingsNotice = styled.div`
  padding: 13px 15px;
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-accent);
  border-radius: 11px;
  background: var(--color-surface-hover);
  color: var(--color-text-secondary);
  font-size: .82rem;
  line-height: 1.5;
`;

export const StoreSettingsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 0;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);

  h3 { margin: 0; color: var(--color-text); font-size: 1rem; }
  p { margin: 4px 0 0; color: var(--color-text-secondary); font-size: .78rem; line-height: 1.5; }
  @media (max-width: 600px) { padding: 14px; }
`;

export const StoreSettingsSectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

export const StoreSettingsSectionIcon = styled.div`
  display: grid;
  place-items: center;
  flex: 0 0 42px;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: 1rem;
`;

export const StoreSettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  @media (max-width: 650px) { grid-template-columns: 1fr; }
`;

export const StoreSettingsField = styled.label<{ $wide?: boolean }>`
  display: grid;
  grid-column: ${({ $wide }) => $wide ? "1 / -1" : "auto"};
  gap: 7px;
  min-width: 0;
  color: var(--color-text);
  font-size: .83rem;
  font-weight: 750;

  input:not([type="color"]), textarea {
    width: 100%;
    min-width: 0;
    min-height: 42px;
    padding: 10px 12px;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    background: var(--color-surface);
    color: var(--color-text);
    font: inherit;
    font-weight: 500;
    box-sizing: border-box;
    &:focus { outline: 2px solid var(--color-primary-soft); border-color: var(--color-accent); }
  }
  textarea { min-height: 92px; resize: vertical; }
  small { color: var(--color-text-secondary); font-size: .7rem; font-weight: 500; }
`;

export const StoreSettingsToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface-hover);
  color: var(--color-text);
  font-size: .82rem;
  font-weight: 700;
  cursor: pointer;
  input { width: 17px; height: 17px; flex: 0 0 auto; accent-color: var(--color-primary); }
`;

export const StoreSettingsOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
  gap: 9px;
  label {
    display: flex;
    align-items: center;
    gap: 9px;
    min-width: 0;
    padding: 10px 11px;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    background: var(--color-surface);
    color: var(--color-text);
    font-size: .8rem;
    input { flex: 0 0 auto; accent-color: var(--color-primary); }
    span { min-width: 0; overflow-wrap: anywhere; }
    small { margin-left: auto; color: var(--color-text-secondary); font-size: .68rem; white-space: nowrap; }
  }
  > p { grid-column: 1 / -1; padding: 12px; border: 1px dashed var(--color-border); border-radius: 9px; }
`;

export const StoreSettingsStatus = styled.div<{ $error?: boolean }>`
  padding: 12px 14px;
  border: 1px solid ${({ $error }) => $error ? "var(--color-danger)" : "var(--color-success)"};
  border-radius: 10px;
  background: ${({ $error }) => $error ? "var(--color-danger-soft)" : "var(--color-success-soft)"};
  color: ${({ $error }) => $error ? "var(--color-danger)" : "var(--color-success)"};
  font-size: .82rem;
  line-height: 1.5;
`;

export const StoreSettingsActions = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    min-height: 46px;
    padding: 10px 19px;
    border: 1px solid var(--color-primary);
    border-radius: 11px;
    background: var(--color-primary);
    color: var(--color-white);
    font: inherit;
    font-size: .84rem;
    font-weight: 800;
    cursor: pointer;
    &:hover:not(:disabled) { background: var(--color-primary-hover); }
    &:disabled { opacity: .42; cursor: not-allowed; transform: none; }
  }
  @media (max-width: 600px) { button { width: 100%; } }
`;


export const StoreSettingsLoading = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  min-height: min(68vh, 680px);
  padding: 32px 18px;
  box-sizing: border-box;
  background:
    radial-gradient(circle at 15% 15%, rgba(183, 131, 78, .10), transparent 32%),
    radial-gradient(circle at 85% 85%, rgba(74, 40, 24, .07), transparent 34%);

  .loading-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: min(100%, 470px);
    padding: 42px 38px 36px;
    border: 1px solid var(--color-border);
    border-radius: 24px;
    background: var(--color-surface);
    box-shadow: 0 22px 60px rgba(45, 29, 18, .09);
    text-align: center;
    box-sizing: border-box;
    animation: store-card-enter .45s ease both;
  }

  .loading-icon {
    display: grid;
    place-items: center;
    width: 62px;
    height: 62px;
    margin-bottom: 23px;
    border: 1px solid rgba(183, 131, 78, .28);
    border-radius: 19px;
    background: rgba(183, 131, 78, .12);
    color: var(--color-primary);
    font-size: 1.55rem;
  }

  .loading-spinner {
    width: 30px;
    height: 30px;
    margin-bottom: 23px;
    border: 3px solid var(--color-border);
    border-top-color: var(--color-accent);
    border-radius: 50%;
    animation: store-spin .8s linear infinite;
  }

  .loading-eyebrow {
    color: var(--color-accent);
    font-size: .68rem;
    font-weight: 900;
    letter-spacing: .17em;
  }

  h2 {
    margin: 9px 0 8px;
    color: var(--color-text);
    font-size: clamp(1.35rem, 3vw, 1.7rem);
    font-weight: 850;
    letter-spacing: -.035em;
  }

  p {
    max-width: 340px;
    margin: 0;
    color: var(--color-text-secondary);
    font-size: .88rem;
    line-height: 1.65;
  }

  .loading-progress {
    overflow: hidden;
    width: min(100%, 230px);
    height: 5px;
    margin-top: 27px;
    border-radius: 99px;
    background: var(--color-border);

    span {
      display: block;
      width: 38%;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
      animation: store-progress 1.5s ease-in-out infinite;
    }
  }

  small {
    margin-top: 12px;
    color: var(--color-text-secondary);
    font-size: .72rem;
  }

  @keyframes store-spin { to { transform: rotate(360deg); } }
  @keyframes store-progress {
    0% { transform: translateX(-110%); }
    100% { transform: translateX(370%); }
  }
  @keyframes store-card-enter {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 520px) {
    min-height: 58vh;
    padding: 20px 10px;
    .loading-card { padding: 34px 22px 29px; border-radius: 19px; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
  }
`;
