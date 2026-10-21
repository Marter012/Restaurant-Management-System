import NavBar from "../NavBar/NavBar.tsx";
import Router from "../Router/Routes.tsx";
import { LayoutContainer } from "./LayoutStyles.ts";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store.ts";

const Layout = () => {
  const isUser = useSelector(
    (state: RootState) => state.user.isLoginUser
  );

  return (
    <LayoutContainer>
      {isUser && <NavBar />}
      <Router />
    </LayoutContainer>
  );
};

export default Layout;