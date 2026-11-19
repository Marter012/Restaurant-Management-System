import CardLoading from "../CardLoading/CardLoading.tsx";
import { Storefront } from "../../utils/icons.ts";
import { LoadingPage } from "./LoadingScreen.styles.ts";
export const LoadingScreen = () => (
  <LoadingPage>
    <CardLoading
      icon={<Storefront />}
      text="Estamos preparando la carta para vos…"
      progress={72}
    />
  </LoadingPage>
);
