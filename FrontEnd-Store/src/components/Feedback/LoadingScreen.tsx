import { Page } from "../../styles/AppStyles.ts";
import { Loading } from "./LoadingScreenStyles.ts";
export const LoadingScreen = () => <Page><Loading role="status" aria-live="polite"><span className="brand">Boutique de Sabores</span><span className="message">Estamos preparando algo rico para vos…</span><span className="dots" aria-hidden="true"><i/><i/><i/></span></Loading></Page>;
