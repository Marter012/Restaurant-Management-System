import { createRoot } from "react-dom/client";

import Layout from "./components/Layout/Layout.tsx";
import { BrowserRouter } from "react-router-dom";

import { GlobalStyles } from "./components/Utils/GlobalStyles.ts";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import SessionInitializer from "./initialization/sessionInitializar.tsx";
import GlobalConfigInputs from "./components/Utils/GlobalConfigInputs.tsx";
import { AlertProvider } from "./components/context/AlertContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <AlertProvider>
        <SessionInitializer>
          <Layout />
        </SessionInitializer>

        <GlobalStyles />
        <GlobalConfigInputs />
      </AlertProvider>
    </Provider>
  </BrowserRouter>,
);
