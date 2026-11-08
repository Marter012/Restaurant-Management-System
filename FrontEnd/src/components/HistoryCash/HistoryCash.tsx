import { useEffect, useMemo, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store.ts";
import type { ICashRegister, IUpdateCashRegister } from "../../interfaces/CashRegister.ts";
import { formatDate, getDateOnly } from "../Utils/Formats.tsx";
import { MdPrint } from "react-icons/md";
import {
  MdArrowForwardIos, MdCalendarMonth, MdCheckCircle, MdChevronLeft,
  MdChevronRight, MdClose, MdInfoOutline, MdInventory2, MdPayments,
  MdReceiptLong, MdTrendingUp, MdWarningAmber, MdWbSunny,
  MdNightlightRound, MdAccountBalanceWallet, MdArrowDownward,
  MdArrowUpward, MdEdit, MdSave, MdLock,
} from "react-icons/md";
import { buildCashTicket } from "../Tickets/CashTicket.ts";
import usePrintAgent from "../../hooks/usePrintOrder.ts";
import ModalPrintFalse from "../ModalPrintFalse/ModalPrintFalse.tsx";
import { getMe, type User } from "../../services/authService.ts";
import { updateCashRegisterAPI } from "../../services/cashRegisterService.ts";
import { updateCashRegister } from "../../store/slices/cashRegisterSlice.ts";
import {
  HistoryContainer, HistoryExplorer, HistoryHeader, HeaderTitleGroup,
  HeaderIcon, HeaderTitle, HeaderDescription, MonthSelector, MonthButton,
  MonthTitle, HistoryStatsGrid, HistoryStatCard, HistoryStatIcon,
  HistoryStatLabel, HistoryStatValue, HistoryList, HistoryListHeader,
  HistoryRow, HistoryRowMain, RowDate, RowShift, RowSales, RowStatus,
  RowArrow, PrintAction, EmptyMessage, DetailPanel, DetailEmptyState,
  DetailEmptyIcon, DetailEmptyTitle, DetailEmptyDescription, DetailHeader,
  DetailHeaderTitle, DetailHeaderIcon, DetailHeaderDescription,
  DetailHeaderActions, DetailCloseButton, PrintDetailButton, CashIdentityCard,
  CashIdentityMain, CashIdentityDate, CashIdentityMeta, SummaryStatus,
  SummarySection, SummarySectionHeader, SummarySectionTitle, SummaryGrid,
  SummaryCard, SummaryCardLabel, SummaryCardValue, DetailColumns, DetailGrid,
  DetailItem, DetailItemLabel, DetailItemValue, DetailItemIcon,
  CashCalculation, CalculationTitle, CalculationRow, CalculationResult,
  DifferenceBox, DifferenceLabel, DifferenceValue, ShiftBadge, SectionTag,
  TurnInfoGrid, TurnInfoCard, EditCashButton, EditModalOverlay, EditModal,
  EditModalHeader, EditModalTitle, EditModalClose, EditForm, EditField,
  EditActions, EditCancelButton, EditSaveButton, EditNotice, EditError,
} from "./HistoryCashStyles.ts";

const currency = (value: number | null | undefined) =>
  `$${(value ?? 0).toLocaleString("es-AR", { maximumFractionDigits: 0 })}`;

const localDateTimeValue = (value?: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 16);
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16);
};

const HistoryCash = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cashRegisters = useSelector((state: RootState) => state.cashRegister.cashRegister);
  const [user, setUser] = useState<User | null>(null);
  const [userResolved, setUserResolved] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedCashRegisterId, setSelectedCashRegisterId] = useState<string | null>(null);
  const [printingCashRegisterId, setPrintingCashRegisterId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const [form, setForm] = useState({
    date: "", shift: "morning" as "morning" | "night",
    opened_at: "", opening_amount: "0", closed_at: "",
    closing_amount: "", status_cash_register: "close" as "open" | "close",
    status: true,
  });

  const isAdmin = user?.role === "admin";
  const { printTicket, showPrinterModal, setShowPrinterModal } = usePrintAgent();

  useEffect(() => {
    let active = true;
    void getMe()
      .then((currentUser) => { if (active) setUser(currentUser); })
      .catch((error) => console.error("No se pudo verificar el usuario:", error))
      .finally(() => { if (active) setUserResolved(true); });
    return () => { active = false; };
  }, []);

  const currentYear = currentMonth.getFullYear();
  const currentMonthNumber = currentMonth.getMonth();
  const monthName = useMemo(() => {
    const name = currentMonth.toLocaleDateString("es-AR", { month: "long", year: "numeric" });
    return name.charAt(0).toUpperCase() + name.slice(1);
  }, [currentMonth]);

  const monthCashRegisters = useMemo(() => cashRegisters
    .filter((cash) => {
      const [year, month] = (cash.date || "").slice(0, 10).split("-").map(Number);
      return year === currentYear && month === currentMonthNumber + 1;
    })
    .sort((a, b) => {
      const byDate = b.date.slice(0, 10).localeCompare(a.date.slice(0, 10));
      if (byDate) return byDate;
      return a.shift === b.shift ? 0 : a.shift === "night" ? -1 : 1;
    }), [cashRegisters, currentYear, currentMonthNumber]);

  const selectedCashRegister = useMemo(
    () => cashRegisters.find((cash) => cash.id === selectedCashRegisterId) ?? null,
    [cashRegisters, selectedCashRegisterId],
  );

  const monthlySales = monthCashRegisters.reduce((sum, cash) => sum + (cash.sales_total ?? 0), 0);
  const averageSales = monthCashRegisters.length ? monthlySales / monthCashRegisters.length : 0;

  const changeMonth = (amount: number) => setCurrentMonth((current) => {
    const next = new Date(current);
    next.setMonth(next.getMonth() + amount);
    return next;
  });

  const formatShift = (shift: ICashRegister["shift"]) => shift === "morning" ? "Mañana" : "Noche";
  const formatStatus = (status: ICashRegister["status_cash_register"]) => status === "close" ? "Cerrada" : "Abierta";
  const differenceTone = (value: number | null | undefined): "positive" | "negative" | "neutral" =>
    (value ?? 0) > 0 ? "positive" : (value ?? 0) < 0 ? "negative" : "neutral";
  const differenceLabel = (value: number | null | undefined) =>
    (value ?? 0) > 0 ? "Sobrante" : (value ?? 0) < 0 ? "Faltante" : "Caja exacta";
  const renderDifference = (value: number | null | undefined) =>
    `${(value ?? 0) > 0 ? "+" : ""}${currency(value)}`;

  const openEdit = (cash: ICashRegister) => {
    if (!isAdmin) return;
    setForm({
      date: cash.date.slice(0, 10),
      shift: cash.shift,
      opened_at: localDateTimeValue(cash.opened_at),
      opening_amount: String(cash.opening_amount ?? 0),
      closed_at: localDateTimeValue(cash.closed_at),
      closing_amount: cash.closing_amount == null ? "" : String(cash.closing_amount),
      status_cash_register: cash.status_cash_register,
      status: cash.status,
    });
    setEditError("");
    setEditing(true);
  };

  const closeEdit = () => {
    if (saving) return;
    setEditing(false);
    setEditError("");
  };

  const handleEditSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isAdmin || !selectedCashRegister || saving) return;

    const openingAmount = Number(form.opening_amount);
    const closingAmount = form.closing_amount === "" ? undefined : Number(form.closing_amount);
    if (!form.date || !Number.isFinite(openingAmount) || openingAmount < 0) {
      setEditError("Verificá la fecha y el efectivo de apertura.");
      return;
    }
    if (form.status_cash_register === "close" &&
        (closingAmount === undefined || !Number.isFinite(closingAmount) || closingAmount < 0)) {
      setEditError("Una caja cerrada debe tener un importe de cierre válido.");
      return;
    }

    const payload: IUpdateCashRegister = {
      date: form.date,
      shift: form.shift,
      opened_at: form.opened_at || undefined,
      opening_amount: openingAmount,
      closed_at: form.closed_at || undefined,
      closing_amount: closingAmount,
      status_cash_register: form.status_cash_register,
      status: form.status,
    };

    setSaving(true);
    setEditError("");
    try {
      const updated = await updateCashRegisterAPI(selectedCashRegister.id, payload);
      dispatch(updateCashRegister(updated));
      setEditing(false);
    } catch (error) {
      console.error("Error actualizando caja:", error);
      setEditError("No se pudo guardar la caja. Revisá los datos e intentá nuevamente.");
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = async (cash: ICashRegister) => {
    try {
      setPrintingCashRegisterId(cash.id);
      await printTicket(buildCashTicket(cash));
    } finally {
      setPrintingCashRegisterId(null);
    }
  };

  const handleRowKeyDown = (event: KeyboardEvent<HTMLDivElement>, id: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedCashRegisterId(id);
    }
  };

  const expectedCash = selectedCashRegister
    ? (selectedCashRegister.opening_amount ?? 0) +
      (selectedCashRegister.sales_cash ?? 0) +
      (selectedCashRegister.manual_income_cash ?? 0) -
      (selectedCashRegister.manual_expense_cash ?? 0)
    : 0;

  return (
    <HistoryContainer>
      <ModalPrintFalse show={showPrinterModal} setShow={setShowPrinterModal} />
      <HistoryExplorer>
        <HistoryHeader>
          <HeaderTitleGroup>
            <HeaderIcon><MdAccountBalanceWallet /></HeaderIcon>
            <div>
              <HeaderTitle>Historial de cajas</HeaderTitle>
              <HeaderDescription>Consultá cierres, movimientos y resultados de cada turno.</HeaderDescription>
            </div>
          </HeaderTitleGroup>
          <MonthSelector aria-label="Seleccionar mes del historial">
            <MonthButton type="button" onClick={() => changeMonth(-1)} aria-label="Mes anterior"><MdChevronLeft /></MonthButton>
            <MonthTitle><MdCalendarMonth />{monthName}</MonthTitle>
            <MonthButton type="button" onClick={() => changeMonth(1)} aria-label="Mes siguiente"><MdChevronRight /></MonthButton>
          </MonthSelector>
        </HistoryHeader>

        <HistoryStatsGrid>
          <HistoryStatCard><HistoryStatIcon $tone="primary"><MdInventory2 /></HistoryStatIcon><div><HistoryStatLabel>Registros del mes</HistoryStatLabel><HistoryStatValue>{monthCashRegisters.length}</HistoryStatValue></div></HistoryStatCard>
          <HistoryStatCard><HistoryStatIcon $tone="accent"><MdTrendingUp /></HistoryStatIcon><div><HistoryStatLabel>Ventas registradas</HistoryStatLabel><HistoryStatValue>{currency(monthlySales)}</HistoryStatValue></div></HistoryStatCard>
          <HistoryStatCard><HistoryStatIcon $tone="soft"><MdPayments /></HistoryStatIcon><div><HistoryStatLabel>Promedio por caja</HistoryStatLabel><HistoryStatValue>{currency(averageSales)}</HistoryStatValue></div></HistoryStatCard>
        </HistoryStatsGrid>

        <HistoryList>
          <HistoryListHeader><span>Fecha y turno</span><span>Ventas</span><span>Estado</span><span /></HistoryListHeader>
          {monthCashRegisters.length === 0 ? (
            <EmptyMessage><MdInfoOutline /><strong>No hay cajas registradas</strong><span>No se encontraron cierres durante {monthName}.</span></EmptyMessage>
          ) : monthCashRegisters.map((cash) => {
            const selected = selectedCashRegisterId === cash.id;
            return (
              <HistoryRow key={cash.id} $selected={selected}>
                <HistoryRowMain role="button" tabIndex={0} aria-pressed={selected}
                  onClick={() => setSelectedCashRegisterId(cash.id)}
                  onKeyDown={(event) => handleRowKeyDown(event, cash.id)}>
                  <RowDate><span><MdCalendarMonth /></span><div><strong>{formatDate(cash.date)}</strong><RowShift $night={cash.shift === "night"}>{cash.shift === "night" ? <MdNightlightRound /> : <MdWbSunny />}{formatShift(cash.shift)}</RowShift></div></RowDate>
                  <RowSales>{currency(cash.sales_total)}</RowSales>
                  <RowStatus $closed={cash.status_cash_register === "close"}>{formatStatus(cash.status_cash_register)}</RowStatus>
                  <RowArrow><MdArrowForwardIos /></RowArrow>
                </HistoryRowMain>
                <PrintAction type="button" title="Imprimir cierre de caja" aria-label={`Imprimir cierre del ${formatDate(cash.date)}`}
                  onClick={() => void handlePrint(cash)} disabled={printingCashRegisterId === cash.id}>
                  <MdPrint />{printingCashRegisterId === cash.id && <span>...</span>}
                </PrintAction>
              </HistoryRow>
            );
          })}
        </HistoryList>
      </HistoryExplorer>

      <DetailPanel>
        {selectedCashRegister ? (
          <>
            <DetailHeader>
              <div>
                <DetailHeaderTitle><DetailHeaderIcon><MdReceiptLong /></DetailHeaderIcon>Detalle del cierre</DetailHeaderTitle>
                <DetailHeaderDescription>Información completa del registro seleccionado.</DetailHeaderDescription>
              </div>
              <DetailHeaderActions>
                {isAdmin && <EditCashButton type="button" onClick={() => openEdit(selectedCashRegister)}><MdEdit />Editar caja</EditCashButton>}
                <PrintDetailButton type="button" onClick={() => void handlePrint(selectedCashRegister)} disabled={printingCashRegisterId === selectedCashRegister.id}>
                  <MdPrint />{printingCashRegisterId === selectedCashRegister.id ? "Imprimiendo..." : "Imprimir cierre"}
                </PrintDetailButton>
                <DetailCloseButton type="button" onClick={() => setSelectedCashRegisterId(null)} aria-label="Cerrar detalle" title="Cerrar detalle"><MdClose /></DetailCloseButton>
              </DetailHeaderActions>
            </DetailHeader>

            <CashIdentityCard>
              <CashIdentityMain>
                <CashIdentityDate>{formatDate(selectedCashRegister.date)}</CashIdentityDate>
                <CashIdentityMeta>Turno <ShiftBadge $night={selectedCashRegister.shift === "night"}>{selectedCashRegister.shift === "night" ? <MdNightlightRound /> : <MdWbSunny />}{formatShift(selectedCashRegister.shift)}</ShiftBadge></CashIdentityMeta>
              </CashIdentityMain>
              <SummaryStatus $closed={selectedCashRegister.status_cash_register === "close"}>
                {selectedCashRegister.status_cash_register === "close" ? <MdCheckCircle /> : <MdWarningAmber />}{formatStatus(selectedCashRegister.status_cash_register)}
              </SummaryStatus>
            </CashIdentityCard>

            <SummarySection>
              <SummarySectionHeader><SummarySectionTitle><MdPayments />Resumen del turno</SummarySectionTitle><SectionTag>Totales</SectionTag></SummarySectionHeader>
              <SummaryGrid>
                <SummaryCard><SummaryCardLabel>Efectivo de apertura</SummaryCardLabel><SummaryCardValue>{currency(selectedCashRegister.opening_amount)}</SummaryCardValue></SummaryCard>
                <SummaryCard><SummaryCardLabel>Ventas totales</SummaryCardLabel><SummaryCardValue>{currency(selectedCashRegister.sales_total)}</SummaryCardValue></SummaryCard>
                <SummaryCard><SummaryCardLabel>Efectivo esperado</SummaryCardLabel><SummaryCardValue>{currency(selectedCashRegister.expected_amount ?? expectedCash)}</SummaryCardValue></SummaryCard>
                <SummaryCard><SummaryCardLabel>Efectivo contado</SummaryCardLabel><SummaryCardValue>{currency(selectedCashRegister.closing_amount)}</SummaryCardValue></SummaryCard>
              </SummaryGrid>
            </SummarySection>

            <DetailColumns>
              <SummarySection>
                <SummarySectionHeader><SummarySectionTitle><MdPayments />Ventas por método de pago</SummarySectionTitle><SectionTag>{currency(selectedCashRegister.sales_total)}</SectionTag></SummarySectionHeader>
                <DetailGrid>
                  <DetailItem><DetailItemLabel><DetailItemIcon>💵</DetailItemIcon>Efectivo</DetailItemLabel><DetailItemValue>{currency(selectedCashRegister.sales_cash)}</DetailItemValue></DetailItem>
                  <DetailItem><DetailItemLabel><DetailItemIcon>🏦</DetailItemIcon>Transferencia</DetailItemLabel><DetailItemValue>{currency(selectedCashRegister.sales_transfer)}</DetailItemValue></DetailItem>
                  <DetailItem><DetailItemLabel><DetailItemIcon>▦</DetailItemIcon>QR</DetailItemLabel><DetailItemValue>{currency(selectedCashRegister.sales_qr)}</DetailItemValue></DetailItem>
                  <DetailItem><DetailItemLabel><DetailItemIcon>💳</DetailItemIcon>Débito</DetailItemLabel><DetailItemValue>{currency(selectedCashRegister.sales_debit_card)}</DetailItemValue></DetailItem>
                </DetailGrid>
              </SummarySection>
              <SummarySection>
                <SummarySectionHeader><SummarySectionTitle><MdAccountBalanceWallet />Movimientos manuales</SummarySectionTitle></SummarySectionHeader>
                <DetailGrid>
                  <DetailItem><DetailItemLabel><DetailItemIcon><MdArrowUpward /></DetailItemIcon>Ingresos totales</DetailItemLabel><DetailItemValue>{currency(selectedCashRegister.manual_income)}</DetailItemValue></DetailItem>
                  <DetailItem><DetailItemLabel><DetailItemIcon><MdArrowDownward /></DetailItemIcon>Egresos totales</DetailItemLabel><DetailItemValue>{currency(selectedCashRegister.manual_expense)}</DetailItemValue></DetailItem>
                  <DetailItem><DetailItemLabel><DetailItemIcon><MdArrowUpward /></DetailItemIcon>Ingresos en efectivo</DetailItemLabel><DetailItemValue>{currency(selectedCashRegister.manual_income_cash)}</DetailItemValue></DetailItem>
                  <DetailItem><DetailItemLabel><DetailItemIcon><MdArrowDownward /></DetailItemIcon>Egresos en efectivo</DetailItemLabel><DetailItemValue>{currency(selectedCashRegister.manual_expense_cash)}</DetailItemValue></DetailItem>
                </DetailGrid>
              </SummarySection>
            </DetailColumns>

            <SummarySection>
              <SummarySectionHeader><SummarySectionTitle><MdAccountBalanceWallet />Control de efectivo</SummarySectionTitle></SummarySectionHeader>
              <CashCalculation>
                <CalculationTitle>Cálculo del efectivo esperado</CalculationTitle>
                <CalculationRow><span>Efectivo de apertura</span><strong>{currency(selectedCashRegister.opening_amount)}</strong></CalculationRow>
                <CalculationRow><span>+ Ventas en efectivo</span><strong>{currency(selectedCashRegister.sales_cash)}</strong></CalculationRow>
                <CalculationRow><span>+ Ingresos manuales en efectivo</span><strong>{currency(selectedCashRegister.manual_income_cash)}</strong></CalculationRow>
                <CalculationRow><span>− Egresos manuales en efectivo</span><strong>{currency(selectedCashRegister.manual_expense_cash)}</strong></CalculationRow>
                <CalculationResult><span>Efectivo esperado</span><strong>{currency(selectedCashRegister.expected_amount ?? expectedCash)}</strong></CalculationResult>
                <CalculationRow><span>Efectivo contado al cierre</span><strong>{currency(selectedCashRegister.closing_amount)}</strong></CalculationRow>
                <DifferenceBox $tone={differenceTone(selectedCashRegister.difference)}>
                  <DifferenceLabel><strong>{differenceLabel(selectedCashRegister.difference)}</strong><span>Diferencia de caja</span></DifferenceLabel>
                  <DifferenceValue>{renderDifference(selectedCashRegister.difference)}</DifferenceValue>
                </DifferenceBox>
              </CashCalculation>
            </SummarySection>

            <SummarySection>
              <SummarySectionHeader><SummarySectionTitle><MdCalendarMonth />Información del turno</SummarySectionTitle></SummarySectionHeader>
              <TurnInfoGrid>
                <TurnInfoCard><span>Apertura</span><strong>{selectedCashRegister.opened_at ? getDateOnly(selectedCashRegister.opened_at) : "—"}</strong></TurnInfoCard>
                <TurnInfoCard><span>Cierre</span><strong>{selectedCashRegister.closed_at ? getDateOnly(selectedCashRegister.closed_at) : "—"}</strong></TurnInfoCard>
              </TurnInfoGrid>
            </SummarySection>
          </>
        ) : (
          <DetailEmptyState>
            <DetailEmptyIcon><MdReceiptLong /></DetailEmptyIcon>
            <DetailEmptyTitle>Detalle del cierre de caja</DetailEmptyTitle>
            <DetailEmptyDescription>Seleccioná un registro del historial para consultar los importes, los medios de pago y el control de efectivo del turno.</DetailEmptyDescription>
          </DetailEmptyState>
        )}
      </DetailPanel>

      {editing && selectedCashRegister && isAdmin && (
        <EditModalOverlay onMouseDown={(event) => { if (event.target === event.currentTarget) closeEdit(); }}>
          <EditModal role="dialog" aria-modal="true" aria-labelledby="edit-cash-title">
            <EditModalHeader>
              <div><EditModalTitle id="edit-cash-title"><MdEdit />Modificar caja</EditModalTitle><p>Los cambios quedarán registrados en el historial.</p></div>
              <EditModalClose type="button" onClick={closeEdit} disabled={saving} aria-label="Cerrar"><MdClose /></EditModalClose>
            </EditModalHeader>
            <EditNotice><MdLock />Edición habilitada exclusivamente para administradores.</EditNotice>
            <EditForm onSubmit={handleEditSubmit}>
              <EditField><label htmlFor="cash-date">Fecha</label><input id="cash-date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required /></EditField>
              <EditField><label htmlFor="cash-shift">Turno</label><select id="cash-shift" value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value as "morning" | "night" })}><option value="morning">Mañana</option><option value="night">Noche</option></select></EditField>
              <EditField><label htmlFor="cash-opened">Fecha y hora de apertura</label><input id="cash-opened" type="datetime-local" value={form.opened_at} onChange={(e) => setForm({ ...form, opened_at: e.target.value })} /></EditField>
              <EditField><label htmlFor="cash-opening">Efectivo de apertura</label><input id="cash-opening" type="number" min="0" step="0.01" value={form.opening_amount} onChange={(e) => setForm({ ...form, opening_amount: e.target.value })} required /></EditField>
              <EditField><label htmlFor="cash-status">Estado de caja</label><select id="cash-status" value={form.status_cash_register} onChange={(e) => setForm({ ...form, status_cash_register: e.target.value as "open" | "close" })}><option value="open">Abierta</option><option value="close">Cerrada</option></select></EditField>
              <EditField><label htmlFor="cash-closed">Fecha y hora de cierre</label><input id="cash-closed" type="datetime-local" value={form.closed_at} onChange={(e) => setForm({ ...form, closed_at: e.target.value })} /></EditField>
              <EditField><label htmlFor="cash-closing">Efectivo contado al cierre</label><input id="cash-closing" type="number" min="0" step="0.01" value={form.closing_amount} onChange={(e) => setForm({ ...form, closing_amount: e.target.value })} disabled={form.status_cash_register === "open"} placeholder="Importe contado" /></EditField>
              <EditField><label htmlFor="cash-active">Registro</label><select id="cash-active" value={String(form.status)} onChange={(e) => setForm({ ...form, status: e.target.value === "true" })}><option value="true">Activo</option><option value="false">Inactivo</option></select></EditField>
              {editError && <EditError role="alert">{editError}</EditError>}
              <EditActions><EditCancelButton type="button" onClick={closeEdit} disabled={saving}>Cancelar</EditCancelButton><EditSaveButton type="submit" disabled={saving || !userResolved || !isAdmin}><MdSave />{saving ? "Guardando..." : "Guardar cambios"}</EditSaveButton></EditActions>
            </EditForm>
          </EditModal>
        </EditModalOverlay>
      )}
    </HistoryContainer>
  );
};

export default HistoryCash;
