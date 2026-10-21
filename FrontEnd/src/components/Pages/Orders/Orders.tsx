import { useEffect, useState } from "react";

import { FaPlus, FaClipboardList, FaCashRegister } from "react-icons/fa";

import { useSelector } from "react-redux";

import ManageOrder from "../../ManageOrder/ManageOrder.tsx";
import NewOrder from "../../NewOrder/NewOrder.tsx";

import {
  CashMessage,
  CashMessageLink,
  ContainerOrder,
} from "./OrdersStyles.ts";

import type { RootState } from "../../../store/store.ts";

import { getDateOnly } from "../../Utils/Formats.tsx";

import PageHeader from "../../PageHeaders/PageHeaders.tsx";

import { Tab } from "../../PageHeaders/PageHeadersStyles.ts";

import { ContainerPage } from "../PageStyles.ts";
import { OpenCashContainer } from "../../CashDay/CashDayStyles.ts";
import { useLocation } from "react-router-dom";

const Orders = () => {
  const [selected, setSelected] = useState<"create" | "manage">("manage");

  const location = useLocation();

  const orderToEdit = location.state?.orderId as string | undefined;

  useEffect(() => {
    if (orderToEdit) {
      setSelected("manage");
    }
  }, [orderToEdit]);

  const { day, shift } = useSelector((state: RootState) => state.daySelected);

  const cashRegisters = useSelector(
    (state: RootState) => state.cashRegister.cashRegister,
  );

  const cashRegister = cashRegisters.find(
    (item) => getDateOnly(item.date) === day && item.shift === shift,
  );

  if (cashRegister?.status === false) {
    return (
      <ContainerPage className="products-page">
        <PageHeader
          title="Comandas"
          description="Control y gestión de comandas por día."
        />

        <OpenCashContainer>
          <CashMessage>
            <FaCashRegister />

            <h2>Caja cerrada</h2>

            <p>
              La caja del turno{" "}
              <strong>{shift === "morning" ? "mañana" : "noche"}</strong> está
              cerrada.
            </p>

            <span>
              Debés abrir la caja primero para poder gestionar las comandas.
            </span>
          </CashMessage>
        </OpenCashContainer>
      </ContainerPage>
    );
  }

  return (
    <ContainerPage className="products-page">
      <PageHeader
        title="Comandas"
        description="Control y gestión de comandas por día."
      >
        <Tab
          type="button"
          className={selected === "manage" ? "active" : ""}
          onClick={() => setSelected("manage")}
        >
          <FaClipboardList />

          <span>Gestionar comandas</span>
        </Tab>

        {cashRegister?.status_cash_register === "open" ? (
          <Tab
            type="button"
            className={`new-order-tab ${selected === "create" ? "active" : ""}`}
            onClick={() => setSelected("create")}
          >
            <FaPlus /> Nueva comanda
          </Tab>
        ) : null}
      </PageHeader>

      {cashRegister?.status === true ? (
        <ContainerOrder>
          {selected === "create" ? (
            <NewOrder $setSelected={setSelected} />
          ) : (
            <ManageOrder orderIdToEdit={orderToEdit} />
          )}
        </ContainerOrder>
      ) : (
        <CashMessageLink to="/cashRegister">
          <CashMessage>
            <FaCashRegister />

            <h2>No hay una caja disponible</h2>

            <p>No existe una caja para el día y turno seleccionados.</p>

            <span>Abrí una caja antes de gestionar las comandas.</span>
          </CashMessage>
        </CashMessageLink>
      )}
    </ContainerPage>
  );
};

export default Orders;
