import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Layout from "./components/Layout/Layout.tsx";
import { BrowserRouter } from "react-router-dom";

import { GlobalStyles } from "./components/Utils/GlobalStyles.ts";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import SessionInitializer from "./initialization/sessionInitializar.tsx";
import GlobalConfigInputs from "./components/Utils/GlobalConfigInputs.tsx";

// Evita exponer datos operativos y errores técnicos en la consola del cliente.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SessionInitializer>
          <Layout />
        </SessionInitializer>
        <GlobalStyles />
        <GlobalConfigInputs />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
