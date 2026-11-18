import CardLoading from "../CardLoading/CardLoading.tsx";
import { FaStore } from "../../utils/icons.ts";
import { LoadingPage } from "./LoadingScreenStyles.ts";
export const LoadingScreen = () => (
  <LoadingPage>
    <CardLoading
      icon={<FaStore />}
      text="Estamos preparando la carta para vos…"
      progress={72}
    />
  </LoadingPage>
);
