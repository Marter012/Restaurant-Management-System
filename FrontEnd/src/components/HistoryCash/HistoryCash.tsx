import { useMemo, useState } from "react";

import { useSelector } from "react-redux";

import type { RootState } from "../../store/store.ts";

import type { ICashRegister } from "../../interfaces/CashRegister.ts";

import { formatDate, getDateOnly } from "../Utils/Formats.tsx";

import ModalForm from "../ModalForm/ModalForm.tsx";

import { MdPrint } from "react-icons/md";

import { buildCashTicket } from "../Tickets/CashTicket.ts";

import {
  HistoryContainer,
  HistoryHeader,
  MonthSelector,
  MonthButton,
  MonthTitle,
  HistoryList,
  HistoryRow,
  EmptyMessage,
  SummaryHeader,
  SummaryStatus,
  SummarySection,
  SummarySectionHeader,
  SummaryGrid,
  SummaryCard,
  DetailGrid,
  DetailItem,
  CashCalculation,
  CalculationTitle,
  CalculationRow,
  CalculationResult,
  DifferenceBox,
  DifferenceLabel,
  DifferenceValue,
} from "./HistoryCashStyles.ts";
import usePrintAgent from "../../hooks/usePrintOrder.ts";
import ModalPrintFalse from "../ModalPrintFalse/ModalPrintFalse.tsx";

const HistoryCash = () => {
  const cashRegisters = useSelector(
    (state: RootState) => state.cashRegister.cashRegister,
  );

  const [currentMonth, setCurrentMonth] = useState(() => new Date());

  const [selectedCashRegisterId, setSelectedCashRegisterId] = useState<
    string | null
  >(null);

  const [printingCashRegisterId, setPrintingCashRegisterId] = useState<
    string | null
  >(null);

  const currentYear = currentMonth.getFullYear();

  const currentMonthNumber = currentMonth.getMonth();

  const monthName = useMemo(() => {
    const name = currentMonth.toLocaleDateString("es-AR", {
      month: "long",
      year: "numeric",
    });

    return name.charAt(0).toUpperCase() + name.slice(1);
  }, [currentMonth]);

  const monthCashRegisters = useMemo(() => {
    return cashRegisters
      .filter((cashRegister) => {
        const cashDate = cashRegister.date.substring(0, 10);

        const [year, month] = cashDate.split("-").map(Number);

        return year === currentYear && month === currentMonthNumber + 1;
      })
      .sort((a, b) => {
        const dateCompare = b.date
          .substring(0, 10)
          .localeCompare(a.date.substring(0, 10));

        if (dateCompare !== 0) {
          return dateCompare;
        }

        if (a.shift === "night" && b.shift === "morning") {
          return -1;
        }

        if (a.shift === "morning" && b.shift === "night") {
          return 1;
        }

        return 0;
      });
  }, [cashRegisters, currentYear, currentMonthNumber]);

  const selectedCashRegister = useMemo(() => {
    if (!selectedCashRegisterId) {
      return null;
    }

    return (
      cashRegisters.find(
        (cashRegister) => cashRegister.id === selectedCashRegisterId,
      ) ?? null
    );
  }, [cashRegisters, selectedCashRegisterId]);

  const changeMonth = (amount: number) => {
    setCurrentMonth((current) => {
      const newDate = new Date(current);

      newDate.setMonth(newDate.getMonth() + amount);

      return newDate;
    });
  };

  const formatCurrency = (value: number | null | undefined) => {
    return `$${(value ?? 0).toLocaleString("es-AR")}`;
  };

  const formatShift = (shift: ICashRegister["shift"]) => {
    return shift === "morning" ? "Mañana" : "Noche";
  };

  const formatStatus = (status: ICashRegister["status_cash_register"]) => {
    return status === "close" ? "Cerrada" : "Abierta";
  };

  const getDifferenceLabel = (difference: number | null | undefined) => {
    const value = difference ?? 0;

    if (value > 0) {
      return "Sobrante";
    }

    if (value < 0) {
      return "Faltante";
    }

    return "Caja exacta";
  };

  const getDifferenceClass = (difference: number | null | undefined) => {
    const value = difference ?? 0;

    if (value > 0) {
      return "positive";
    }

    if (value < 0) {
      return "negative";
    }

    return "zero";
  };

  const handleSelectCashRegister = (cashRegisterId: string) => {
    setSelectedCashRegisterId(cashRegisterId);
  };

  const handleCloseModal = () => {
    setSelectedCashRegisterId(null);
  };

  const { printTicket, showPrinterModal, setShowPrinterModal } =
    usePrintAgent();

  const handlePrint = async (cash: ICashRegister) => {
    try {
      setPrintingCashRegisterId(cash.id);

      const ticket = buildCashTicket(cash);

      await printTicket(ticket);
    } finally {
      setPrintingCashRegisterId(null);
    }
  };

  return (
    <>
      <HistoryContainer>
        <ModalPrintFalse
          show={showPrinterModal}
          setShow={setShowPrinterModal}
        />

        <HistoryHeader>
          <div className="header-info">
            <h3>Historial de cajas</h3>

            <span>Seleccioná una caja para consultar su resumen completo</span>
          </div>

          <MonthSelector>
            <MonthButton
              type="button"
              onClick={() => changeMonth(-1)}
              aria-label="Mes anterior"
            >
              ‹
            </MonthButton>

            <MonthTitle>{monthName}</MonthTitle>

            <MonthButton
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="Mes siguiente"
            >
              ›
            </MonthButton>
          </MonthSelector>
        </HistoryHeader>

        <HistoryList>
          <HistoryRow $header>
            <span>Fecha</span>
            <span>Turno</span>
            <span>Apertura</span>
            <span>Ventas</span>
            <span>Esperado</span>
            <span>Cierre</span>
            <span>Diferencia</span>
            <span>Estado</span>
            <span>Acciones</span>
          </HistoryRow>

          {monthCashRegisters.length === 0 ? (
            <EmptyMessage>
              No hay cajas registradas durante {monthName}.
            </EmptyMessage>
          ) : (
            monthCashRegisters.map((cash) => {
              const difference = cash.difference ?? 0;

              return (
                <HistoryRow
                  key={cash.id}
                  onClick={() => handleSelectCashRegister(cash.id)}
                >
                  <strong>{formatDate(cash.date)}</strong>

                  <span>{formatShift(cash.shift)}</span>

                  <span>{formatCurrency(cash.opening_amount)}</span>

                  <span>{formatCurrency(cash.sales_total)}</span>

                  <span>{formatCurrency(cash.expected_amount)}</span>

                  <span>{formatCurrency(cash.closing_amount)}</span>

                  <strong className={getDifferenceClass(difference)}>
                    {difference > 0 ? "+" : ""}
                    {formatCurrency(difference)}
                  </strong>

                  <span
                    className={
                      cash.status_cash_register === "close" ? "closed" : "open"
                    }
                  >
                    {formatStatus(cash.status_cash_register)}
                  </span>
                  <button
                    type="button"
                    className="print-button"
                    title="Imprimir cierre de caja"
                    onClick={(event) => {
                      event.stopPropagation();
                      handlePrint(cash);
                    }}
                  >
                    <MdPrint />

                    {printingCashRegisterId === cash.id && <span>...</span>}
                  </button>
                </HistoryRow>
              );
            })
          )}
        </HistoryList>
      </HistoryContainer>

      {selectedCashRegister && (
        <ModalForm
          isOpen={true}
          title="Resumen de caja"
          onClose={handleCloseModal}
        >
          <SummaryHeader>
            <div>
              <h3>{formatDate(selectedCashRegister.date)}</h3>

              <span>Turno {formatShift(selectedCashRegister.shift)}</span>
            </div>

            <SummaryStatus
              className={
                selectedCashRegister.status_cash_register === "close"
                  ? "closed"
                  : "open"
              }
            >
              {formatStatus(selectedCashRegister.status_cash_register)}
            </SummaryStatus>
          </SummaryHeader>

          <SummarySection>
            <SummarySectionHeader>
              <h4>Resumen del turno</h4>
            </SummarySectionHeader>

            <SummaryGrid>
              <SummaryCard>
                <span>Efectivo de apertura</span>

                <strong>
                  {formatCurrency(selectedCashRegister.opening_amount)}
                </strong>
              </SummaryCard>

              <SummaryCard>
                <span>Ventas totales</span>

                <strong>
                  {formatCurrency(selectedCashRegister.sales_total)}
                </strong>
              </SummaryCard>

              <SummaryCard>
                <span>Efectivo esperado</span>

                <strong>
                  {formatCurrency(selectedCashRegister.expected_amount)}
                </strong>
              </SummaryCard>

              <SummaryCard>
                <span>Efectivo contado</span>

                <strong>
                  {formatCurrency(selectedCashRegister.closing_amount)}
                </strong>
              </SummaryCard>
            </SummaryGrid>
          </SummarySection>

          <SummarySection>
            <SummarySectionHeader>
              <h4>Ventas por método de pago</h4>

              <strong>
                {formatCurrency(selectedCashRegister.sales_total)}
              </strong>
            </SummarySectionHeader>

            <DetailGrid>
              <DetailItem>
                <div>
                  <span className="icon">💵</span>

                  <span>Efectivo</span>
                </div>

                <strong>
                  {formatCurrency(selectedCashRegister.sales_cash)}
                </strong>
              </DetailItem>

              <DetailItem>
                <div>
                  <span className="icon">🏦</span>

                  <span>Transferencia</span>
                </div>

                <strong>
                  {formatCurrency(selectedCashRegister.sales_transfer)}
                </strong>
              </DetailItem>

              <DetailItem>
                <div>
                  <span className="icon">📱</span>

                  <span>QR</span>
                </div>

                <strong>{formatCurrency(selectedCashRegister.sales_qr)}</strong>
              </DetailItem>

              <DetailItem>
                <div>
                  <span className="icon">💳</span>

                  <span>Débito</span>
                </div>

                <strong>
                  {formatCurrency(selectedCashRegister.sales_debit_card)}
                </strong>
              </DetailItem>
            </DetailGrid>
          </SummarySection>

          <SummarySection>
            <SummarySectionHeader>
              <h4>Movimientos manuales</h4>
            </SummarySectionHeader>

            <DetailGrid>
              <DetailItem>
                <div>
                  <span className="icon">➕</span>

                  <span>Ingresos totales</span>
                </div>

                <strong>
                  {formatCurrency(selectedCashRegister.manual_income)}
                </strong>
              </DetailItem>

              <DetailItem>
                <div>
                  <span className="icon">➖</span>

                  <span>Egresos totales</span>
                </div>

                <strong>
                  {formatCurrency(selectedCashRegister.manual_expense)}
                </strong>
              </DetailItem>

              <DetailItem>
                <div>
                  <span className="icon">💵</span>

                  <span>Ingresos en efectivo</span>
                </div>

                <strong>
                  {formatCurrency(selectedCashRegister.manual_income_cash)}
                </strong>
              </DetailItem>

              <DetailItem>
                <div>
                  <span className="icon">💸</span>

                  <span>Egresos en efectivo</span>
                </div>

                <strong>
                  {formatCurrency(selectedCashRegister.manual_expense_cash)}
                </strong>
              </DetailItem>
            </DetailGrid>
          </SummarySection>

          <SummarySection>
            <SummarySectionHeader>
              <h4>Control de efectivo</h4>
            </SummarySectionHeader>

            <CashCalculation>
              <CalculationTitle>Cálculo del efectivo esperado</CalculationTitle>

              <CalculationRow>
                <span>Efectivo de apertura</span>

                <strong>
                  {formatCurrency(selectedCashRegister.opening_amount)}
                </strong>
              </CalculationRow>

              <CalculationRow>
                <span>+ Ventas en efectivo</span>

                <strong>
                  {formatCurrency(selectedCashRegister.sales_cash)}
                </strong>
              </CalculationRow>

              <CalculationRow>
                <span>+ Ingresos manuales en efectivo</span>

                <strong>
                  {formatCurrency(selectedCashRegister.manual_income_cash)}
                </strong>
              </CalculationRow>

              <CalculationRow>
                <span>− Egresos manuales en efectivo</span>

                <strong>
                  {formatCurrency(selectedCashRegister.manual_expense_cash)}
                </strong>
              </CalculationRow>

              <CalculationResult>
                <span>Efectivo esperado</span>

                <strong>
                  {formatCurrency(selectedCashRegister.expected_amount)}
                </strong>
              </CalculationResult>

              <CalculationRow>
                <span>Efectivo contado al cierre</span>

                <strong>
                  {formatCurrency(selectedCashRegister.closing_amount)}
                </strong>
              </CalculationRow>

              <DifferenceBox
                className={getDifferenceClass(selectedCashRegister.difference)}
              >
                <DifferenceLabel>
                  <strong>
                    {getDifferenceLabel(selectedCashRegister.difference)}
                  </strong>

                  <span>Diferencia de caja</span>
                </DifferenceLabel>

                <DifferenceValue>
                  {(selectedCashRegister.difference ?? 0) > 0 ? "+" : ""}
                  {formatCurrency(selectedCashRegister.difference)}
                </DifferenceValue>
              </DifferenceBox>
            </CashCalculation>
          </SummarySection>

          <SummarySection>
            <SummarySectionHeader>
              <h4>Información del turno</h4>
            </SummarySectionHeader>

            <DetailGrid>
              <DetailItem>
                <div>
                  <span>Apertura</span>
                </div>

                <strong>
                  {selectedCashRegister.opened_at
                    ? getDateOnly(selectedCashRegister.opened_at)
                    : "—"}
                </strong>
              </DetailItem>

              <DetailItem>
                <div>
                  <span>Cierre</span>
                </div>

                <strong>
                  {selectedCashRegister.closed_at
                    ? getDateOnly(selectedCashRegister.closed_at)
                    : "—"}
                </strong>
              </DetailItem>
            </DetailGrid>
          </SummarySection>
        </ModalForm>
      )}
    </>
  );
};

export default HistoryCash;
