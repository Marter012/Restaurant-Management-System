import type { ReactNode } from "react";
import { LoadingCard, LoadingIcon, LoadingRing, LoadingTrack, LoadingProgress, LoadingMessage } from "./CardLoadingStyles.ts";
interface Props { icon: ReactNode; text: string; progress?: number; }
const CardLoading = ({ icon, text, progress }: Props) => (
  <LoadingCard role="status" aria-live="polite">
    <LoadingIcon>{icon}</LoadingIcon><LoadingRing aria-hidden="true" /><LoadingMessage>{text}</LoadingMessage>
    <LoadingTrack><LoadingProgress $progress={progress ?? 68} /></LoadingTrack>
  </LoadingCard>
);
export default CardLoading;
