import styled from "styled-components";
import { SecondaryButton } from "../../styles/AppStyles.ts";
export const ClosedScreen = styled.div`display:grid;place-items:center;gap:12px;min-height:55vh;padding:30px;color:var(--app-muted);text-align:center;strong{display:block;color:var(--app-primary);font-size:1.4rem;}p{max-width:450px;line-height:1.6;}`;
export const RetryButton = styled(SecondaryButton)``;
