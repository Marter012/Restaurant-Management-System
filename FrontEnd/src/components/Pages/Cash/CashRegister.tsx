import { useState } from "react";
import CashDay from "../../CashDay/CashDay.tsx";
import HistoryCash from "../../HistoryCash/HistoryCash.tsx";
import PageHeader from "../../PageHeaders/PageHeaders.tsx";
import { Tab } from "../../PageHeaders/PageHeadersStyles.ts";
import { ContainerPage } from "../PageStyles.ts";

const CashRegister = () => {
  const [activeTab, setActiveTab] = useState<"today" | "history">("today");

  return (
    <ContainerPage>
      <PageHeader title="Caja" description="Control y gestión de cajas">
        <Tab
          className={activeTab === "today" ? "active" : ""}
          onClick={() => setActiveTab("today")}
        >
          Caja del día
        </Tab>

        <Tab
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          Historial de cajas
        </Tab>
      </PageHeader>
      {activeTab === "today" ? (
        <CashDay setActiveTab={setActiveTab} />
      ) : (
        <HistoryCash />
      )}
    </ContainerPage>
  );
};

export default CashRegister;
