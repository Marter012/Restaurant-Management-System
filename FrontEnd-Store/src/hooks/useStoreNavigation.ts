import { useCallback, useEffect, useState } from "react";
import type { StoreView } from "../components/BottomNavigation/BottomNavigation.tsx";

const VIEW_PATHS: Record<StoreView, string> = {
  home: "/",
  products: "/productos",
  promotions: "/promociones",
  account: "/cuenta",
};

const getViewFromPath = (pathname: string): StoreView => {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/productos") return "products";
  if (path === "/promociones") return "promotions";
  if (path === "/cuenta") return "account";
  return "home";
};

export const useStoreNavigation = () => {
  const [activeView, setActiveView] = useState<StoreView>(() =>
    getViewFromPath(window.location.pathname),
  );

  const navigate = useCallback((view: StoreView) => {
    const path = VIEW_PATHS[view];
    if (window.location.pathname !== path) {
      window.history.pushState({ storeView: view }, "", path);
    }
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onPopState = () => setActiveView(getViewFromPath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return { activeView, navigate };
};
