import styled from "styled-components";

export const Shade = styled.div`
  position: fixed; inset: 0; z-index: 160; display: grid; place-items: center;
  padding: 16px; background: rgba(19, 30, 24, .62); backdrop-filter: blur(8px);
`;
export const Panel = styled.section`
  width: min(100%, 560px); max-height: min(88dvh, 820px); overflow: hidden;
  display: flex; flex-direction: column; color: #26352d; background: #fffefa;
  border: 1px solid rgba(255,255,255,.7); border-radius: 24px;
  box-shadow: 0 28px 90px rgba(0,0,0,.24);
`;
export const Header = styled.header`
  display:flex; align-items:center; justify-content:space-between; gap:16px;
  padding:22px 24px; border-bottom:1px solid #eee9df;
  h2{display:flex;align-items:center;gap:10px;margin:0;font-size:1.18rem;letter-spacing:-.03em}
  h2 svg{color:#a8794f}
  button{display:grid;place-items:center;width:38px;height:38px;border:0;border-radius:12px;background:#f3f0e9;color:#39443b;cursor:pointer}
`;
export const Body = styled.div`
  overflow:auto; padding:22px 24px 26px; overscroll-behavior:contain;
  p{color:#788078;font-size:.9rem;line-height:1.6;margin:0 0 18px}
  @media(max-width:520px){padding:18px}
`;
export const Field = styled.label`
  display:grid;gap:7px;margin:14px 0;color:#39443b;font-size:.78rem;font-weight:800;
  input{width:100%;height:48px;box-sizing:border-box;padding:0 14px;border:1px solid #e5dfd3;border-radius:13px;background:#fff;color:#26352d;font:inherit;font-size:.92rem;outline:none;transition:border-color .18s,box-shadow .18s}
  input:focus{border-color:#a8794f;box-shadow:0 0 0 3px rgba(168,121,79,.13)}
`;
export const HelperText = styled.p`
  margin-top: 13px !important;
  font-size: .76rem !important;
`;
export const Primary = styled.button`
  width:100%;height:48px;margin-top:10px;border:0;border-radius:13px;background:#263f34;color:white;font-weight:800;cursor:pointer;
  &:disabled{opacity:.55;cursor:not-allowed}
`;
export const AccountIntro = styled.div`
  display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px;
  p{margin:0}
  button{display:flex;align-items:center;gap:7px;flex:none;border:1px solid #e8e1d5;border-radius:11px;background:#fff;padding:9px 11px;color:#435148;font-weight:750;cursor:pointer}
`;
export const OrderList = styled.div`display:grid;gap:12px`;
export const OrderCard = styled.article`
  padding:15px;border:1px solid #ece7dd;border-radius:16px;background:#fff;
`;
export const OrderTop = styled.div`
  display:flex;justify-content:space-between;align-items:flex-start;gap:12px;
  strong{display:flex;align-items:center;gap:7px;font-size:.92rem;color:#26352d}
  b{font-size:.95rem;white-space:nowrap}
`;
export const OrderMeta = styled.p`
  margin:7px 0 12px!important;font-size:.78rem!important;color:#858b83!important;
`;
export const ItemList = styled.div`
  display:grid;gap:4px;margin:0 0 12px;color:#5e685f;font-size:.82rem;
`;
export const Status = styled.span<{ $tone:"success"|"warning"|"muted" }>`
  display:inline-flex;align-items:center;padding:5px 9px;border-radius:999px;font-size:.7rem;font-weight:850;
  color:${p=>p.$tone==="success"?"#276344":p.$tone==="warning"?"#8a5a18":"#68736a"};
  background:${p=>p.$tone==="success"?"#e9f5ec":p.$tone==="warning"?"#fff3d9":"#f0f1ed"};
`;
export const RefundButton = styled.button`
  display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:42px;
  margin-top: 12px;
  border:1px solid #ead8d0;border-radius:12px;background:#fff8f5;color:#9a4935;font-weight:800;cursor:pointer;
  &:disabled{opacity:.6;cursor:wait}
`;
export const Empty = styled.div`
  display:grid;justify-items:center;gap:8px;padding:30px 18px;border:1px dashed #ddd6c9;border-radius:16px;text-align:center;
  color:#778078;svg{font-size:28px;color:#a8794f}strong{color:#36443a}
`;
export const Logout = styled.button`
  display:flex;align-items:center;gap:8px;margin:20px auto 0;padding:10px;border:0;background:transparent;color:#9b5142;font-weight:800;cursor:pointer;
`;
export const ConfirmShade = styled.div`
  position: fixed; inset: 0; z-index: 190; display: grid; place-items: center;
  padding: 18px; background: rgba(13, 23, 18, .52); backdrop-filter: blur(5px);
`;
export const ConfirmCard = styled.section`
  width: min(100%, 410px); padding: 24px; border-radius: 20px; background: #fffefa;
  box-shadow: 0 24px 80px rgba(0,0,0,.25); text-align: center;
  h3 { margin: 12px 0 8px; color: #26352d; font-size: 1.12rem; }
  p { margin: 0; color: #788078; font-size: .87rem; line-height: 1.55; }
  .icon { display: grid; place-items: center; width: 48px; height: 48px; margin: 0 auto; border-radius: 15px; background: #fff0e9; color: #a34f38; font-size: 25px; }
  .actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; }
  button { min-height: 45px; border-radius: 12px; font-weight: 800; cursor: pointer; }
  .cancel { border: 1px solid #e5dfd3; background: white; color: #536056; }
  .confirm { border: 1px solid #9a4935; background: #9a4935; color: white; }
`;
