import styled, { keyframes } from "styled-components";
const spin=keyframes`to{transform:rotate(360deg)}`;
export const LoadingCard=styled.section`display:flex;flex-direction:column;align-items:center;justify-content:center;gap:15px;width:min(100% - 32px,430px);margin:auto;padding:34px 30px;border:1px solid var(--color-border);border-radius:22px;background:var(--color-surface);box-shadow:var(--shadow-md);text-align:center;`;
export const LoadingIcon=styled.div`display:grid;place-items:center;width:54px;height:54px;border-radius:17px;background:var(--color-primary-soft);color:var(--color-primary);font-size:25px;`;
export const LoadingRing=styled.span`width:28px;height:28px;border:3px solid var(--color-primary-soft);border-top-color:var(--color-primary);border-radius:50%;animation:${spin} .8s linear infinite;`;
export const LoadingMessage=styled.p`margin:0;color:var(--color-text);font-size:.94rem;font-weight:750;`;
export const LoadingTrack=styled.div`width:100%;height:7px;overflow:hidden;border-radius:99px;background:var(--color-primary-soft);`;
export const LoadingProgress=styled.div<{$progress:number}>`width:${({$progress})=>Math.max(0,Math.min(100,$progress))}%;height:100%;border-radius:inherit;background:var(--color-primary);transition:width .3s ease;`;
