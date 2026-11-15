import styled from "styled-components";

export const NewOrderPageShell = styled.section`
  display:flex; flex-direction:column; gap:16px; width:100%; min-width:0; min-height:calc(100dvh - 150px);
`;
export const NewOrderPageHeader = styled.header`
  display:flex; align-items:center; justify-content:space-between; gap:16px; padding:18px 20px;
  border:1px solid var(--color-border); border-radius:var(--radius-lg); background:var(--color-surface);
  span{color:var(--color-accent);font-size:.72rem;font-weight:850;letter-spacing:.12em}
  h1{margin:5px 0;color:var(--color-primary);font-size:clamp(1.35rem,2.5vw,1.9rem)}
  p{margin:0;color:var(--color-text-secondary)}
  button{min-height:40px;padding:8px 14px;border:1px solid var(--color-border);border-radius:var(--radius-md);background:var(--color-surface);color:var(--color-text);font-weight:750;cursor:pointer}
  @media(max-width:650px){align-items:stretch;flex-direction:column;}
`;
export const NewOrderPageContent = styled.div`
  flex:1; min-height:560px; height:calc(100dvh - 310px); overflow:hidden; border:1px solid var(--color-border);border-radius:var(--radius-lg);background:var(--color-background);
  >div{height:100%;}
  @media(max-width:900px){height:auto;min-height:650px;}
`;
export const NewOrderPageFooter = styled.footer`
  display:flex;justify-content:flex-end;gap:12px;padding:12px 0;
  @media(max-width:600px){>button{width:100%;}}
`;
