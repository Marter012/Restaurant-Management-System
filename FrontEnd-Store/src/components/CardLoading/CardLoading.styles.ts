import styled, { keyframes } from "styled-components";
const spin=keyframes`to{transform:rotate(360deg)}`;
export const LoadingCard=styled.section`display:flex;flex-direction:column;align-items:center;justify-content:center;gap:15px;width:min(100% - 32px,430px);margin:auto;padding:36px 30px;border:1px solid var(--app-border);border-radius:24px;background:var(--app-surface);box-shadow:var(--app-shadow);text-align:center;`;
export const LoadingIcon=styled.div`display:grid;place-items:center;width:58px;height:58px;border-radius:18px;background:var(--app-surface-strong);color:var(--app-primary);font-size:26px;`;
export const LoadingRing=styled.span`width:30px;height:30px;border:3px solid var(--app-border);border-top-color:var(--app-accent);border-radius:50%;animation:${spin} .8s linear infinite;`;
export const LoadingMessage=styled.p`margin:0;color:var(--app-primary);font-size:.94rem;font-weight:850;`;
export const LoadingTrack=styled.div`width:100%;height:7px;overflow:hidden;border-radius:99px;background:var(--app-surface-strong);`;
export const LoadingProgress=styled.div<{$progress:number}>`width:${({$progress})=>Math.max(0,Math.min(100,$progress))}%;height:100%;border-radius:inherit;background:var(--app-accent);transition:width .3s ease;`;
