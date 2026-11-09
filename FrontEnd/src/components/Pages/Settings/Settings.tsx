import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaCashRegister,
  FaCog,
  FaPrint,
  FaUsers,
  FaStore,
} from "react-icons/fa";

import ManageUser from "../../ManageUsers/ManageUser.tsx";
import HistoryCash from "../../HistoryCash/HistoryCash.tsx";
import PrintStatus from "../../PrintStatusModal/PrintStatusModal.tsx";
import SettingsGeneral from "./SettingsGeneral.tsx";

import { SettingsTabs, SettingsTab, SettingsPanel } from "./SettingsStyles.ts";

import { ContainerPage } from "../PageStyles.ts";
import type { RootState } from "../../../store/store.ts";
import SettingsCommercial from "./SettingsCommercial.tsx";

type SettingsSection = "general" | "commercial" | "users" | "printing" | "cash";

interface SettingsLocationState {
  section?: unknown;
  forceCredentialUpdate?: unknown;
}

const getSectionFromState = (state: unknown): SettingsSection => {
  if (!state || typeof state !== "object") return "general";
  const section = (state as SettingsLocationState).section;
  if (
    section === "general" ||
    section === "users" ||
    section === "printing" ||
    section === "cash"
  )
    return section;
  return "general";
};

const Settings = () => {
  const location = useLocation();
  const mustChangeCredentials = useSelector(
    (state: RootState) => state.user.mustChangeCredentials,
  );
  const forceCredentialUpdate = mustChangeCredentials;

  const [activeSection, setActiveSection] = useState<SettingsSection>(() =>
    forceCredentialUpdate ? "users" : getSectionFromState(location.state),
  );

  useEffect(() => {
    setActiveSection(
      forceCredentialUpdate ? "users" : getSectionFromState(location.state),
    );
  }, [location.key, location.state, forceCredentialUpdate]);

  return (
    <ContainerPage>
      {!forceCredentialUpdate && (
        <SettingsTabs role="tablist" aria-label="Secciones de configuración">
          <SettingsTab
            id="settings-tab-general"
            type="button"
            role="tab"
            aria-selected={activeSection === "general"}
            aria-controls="settings-panel"
            tabIndex={activeSection === "general" ? 0 : -1}
            $active={activeSection === "general"}
            onClick={() => setActiveSection("general")}
          >
            <FaCog /> <span>General</span>
          </SettingsTab>
          <SettingsTab
            id="settings-tab-commercial"
            type="button"
            role="tab"
            aria-selected={activeSection === "commercial"}
            aria-controls="settings-panel"
            tabIndex={activeSection === "commercial" ? 0 : -1}
            $active={activeSection === "commercial"}
            onClick={() => setActiveSection("commercial")}
          >
            <FaStore /> <span>Establecimiento</span>
          </SettingsTab>
          <SettingsTab
            id="settings-tab-users"
            type="button"
            role="tab"
            aria-selected={activeSection === "users"}
            aria-controls="settings-panel"
            tabIndex={activeSection === "users" ? 0 : -1}
            $active={activeSection === "users"}
            onClick={() => setActiveSection("users")}
          >
            <FaUsers /> <span>Usuarios</span>
          </SettingsTab>
          <SettingsTab
            id="settings-tab-printing"
            type="button"
            role="tab"
            aria-selected={activeSection === "printing"}
            aria-controls="settings-panel"
            tabIndex={activeSection === "printing" ? 0 : -1}
            $active={activeSection === "printing"}
            onClick={() => setActiveSection("printing")}
          >
            <FaPrint /> <span>Impresión</span>
          </SettingsTab>
          <SettingsTab
            id="settings-tab-cash"
            type="button"
            role="tab"
            aria-selected={activeSection === "cash"}
            aria-controls="settings-panel"
            tabIndex={activeSection === "cash" ? 0 : -1}
            $active={activeSection === "cash"}
            onClick={() => setActiveSection("cash")}
          >
            <FaCashRegister /> <span>Cajas</span>
          </SettingsTab>
        </SettingsTabs>
      )}

      <SettingsPanel
        id="settings-panel"
        role="tabpanel"
        aria-labelledby={
          forceCredentialUpdate ? undefined : `settings-tab-${activeSection}`
        }
        tabIndex={0}
      >
        {forceCredentialUpdate ? (
          <ManageUser forceCredentialUpdate />
        ) : (
          <>
            {activeSection === "general" && <SettingsGeneral />}
            {activeSection === "commercial" && <SettingsCommercial />}
            {activeSection === "users" && <ManageUser />}
            {activeSection === "printing" && <PrintStatus />}
            {activeSection === "cash" && <HistoryCash />}
          </>
        )}
      </SettingsPanel>
    </ContainerPage>
  );
};

export default Settings;
