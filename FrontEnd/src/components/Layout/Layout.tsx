import Router from "../Router/Routes.tsx";
import { LayoutContainer } from "./LayoutStyles.ts";

const Layout = () => {
  return (
    <LayoutContainer>
      <Router />
    </LayoutContainer>
  );
};

export default Layout;