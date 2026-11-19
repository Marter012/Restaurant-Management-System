import styled from "styled-components";

export const PromoBackdrop = styled.div`
  position: fixed; inset: 0; z-index: 180; display: grid; place-items: center;
  padding: 16px; background: rgba(17, 25, 20, .62); backdrop-filter: blur(6px);
`;
export const PromoDialog = styled.section`
  width: min(100%, 520px); max-height: min(88dvh, 760px); overflow: hidden;
  display: flex; flex-direction: column; border: 1px solid var(--app-border);
  border-radius: 20px; background: var(--app-surface); color: var(--app-ink);
  box-shadow: 0 28px 90px #0004;
`;
export const PromoHeader = styled.header`
  display:flex; align-items:flex-start; justify-content:space-between; gap:12px;
  padding:18px 20px; border-bottom:1px solid var(--app-border);
  .eyebrow{color:var(--app-accent);font-size:.65rem;font-weight:950;letter-spacing:.13em}
  h2{margin:5px 0;color:var(--app-primary);font-size:1.18rem;line-height:1.25}
  p{margin:0;color:var(--app-muted);font-size:.78rem;line-height:1.45}
  button{flex:none;display:grid;place-items:center;width:34px;height:34px;border:1px solid var(--app-border);border-radius:50%;background:white;color:var(--app-primary);cursor:pointer}
`;
export const PromoGroups = styled.div`
  display:grid;gap:14px;padding:16px 20px;overflow:auto;
`;
export const PromoGroup = styled.section`
  padding:13px;border:1px solid var(--app-border);border-radius:14px;background:#fff;
  .group-head{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:10px}
  h3{margin:0;color:var(--app-primary);font-size:.9rem}
  .required{padding:5px 8px;border-radius:30px;background:var(--app-canvas);color:var(--app-primary);font-size:.68rem;font-weight:900;white-space:nowrap}
  .choices{display:grid;gap:7px}
`;
export const PromoProductRow = styled.div`
  display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:10px;
  padding:8px 0;border-top:1px solid #eff0eb;
  .product{min-width:0;display:grid;gap:3px}
  strong{overflow:hidden;color:var(--app-ink);font-size:.78rem;text-overflow:ellipsis;white-space:nowrap}
  small{color:var(--app-muted);font-size:.7rem}
  .quantity{display:flex;align-items:center;gap:8px}
  .quantity button{display:grid;place-items:center;width:29px;height:29px;border:1px solid var(--app-border);border-radius:9px;background:#fff;color:var(--app-primary);cursor:pointer}
  .quantity button:disabled{opacity:.35;cursor:not-allowed}
  output{min-width:15px;text-align:center;color:var(--app-primary);font-size:.82rem;font-weight:900}
`;
export const PromoFooter = styled.footer`
  display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 20px;
  border-top:1px solid var(--app-border);background:var(--app-surface);
  .price{display:grid;gap:3px}.price span{color:var(--app-muted);font-size:.68rem}.price strong{color:var(--app-primary);font-size:1.12rem}
  .actions{display:flex;gap:8px}
  button{min-height:42px;padding:0 13px;border:1px solid var(--app-border);border-radius:11px;background:#fff;color:var(--app-primary);font-size:.76rem;font-weight:850;cursor:pointer}
  button.primary{border-color:var(--app-primary);background:var(--app-primary);color:#fff}
  button:disabled{opacity:.45;cursor:not-allowed}
  @media(max-width:440px){align-items:stretch;flex-direction:column;.actions button{flex:1}}
`;
