import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import CashDay from "../../CashDay/CashDay.tsx";
import HistoryCash from "../../HistoryCash/HistoryCash.tsx";
import PageHeader from "../../PageHeaders/PageHeaders.tsx";
import { ContainerPage } from "../PageStyles.ts";

import type { RootState, AppDispatch } from "../../../store/store.ts";
import {
  selectDay,
  selectShift,
} from "../../../store/slices/daySelectedSlice.ts";
import { getDateOnly, formatDate } from "../../Utils/Formats.tsx";

import {
  CashBlockedContent,
  CashBlockedIllustration,
  CashBlockedInformation,
  CashBlockedDetails,
  CashBlockedDetailRow,
} from "./CashRegisterStyles.ts";

import {
  CashRegisterNotice,
  CashRegisterNoticeIcon,
  CashRegisterNoticeContent,
  CashRegisterNoticeDetails,
  CashRegisterNoticeDetail,
} from "./CashRegisterNoticeStyles.ts";

import { Warning, CalendarBlank, Clock } from "@phosphor-icons/react";

import { CashRegister as CashRegisterIcon, Lock } from "@phosphor-icons/react";
import ModalForm from "../../ModalForm/ModalForm.tsx";

import { CashBlockedConfirmButton } from "./CashRegisterStyles.ts";

type ActiveTab = "today" | "history";
type CashRegisterItem = RootState["cashRegister"]["cashRegister"][number];

const CashRegister = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [activeTab, setActiveTab] = useState<ActiveTab>("today");

  // Conserva los datos de la caja abierta.
  const [pendingCashRegister, setPendingCashRegister] =
    useState<CashRegisterItem | null>(null);

  // Controla independientemente la visibilidad del modal.
  const [showBlockedModal, setShowBlockedModal] = useState(false);

  // Controla la visibilidad del aviso.
  const [showBlockedNotice, setShowBlockedNotice] = useState(false);

  // Controla que el modal solo aparezca una vez por montaje de la página.
  const hasShownBlockedModal = useRef(false);

  const handleBlockedByOpenCash = useCallback(
    (cashRegister: CashRegisterItem) => {
      setPendingCashRegister(cashRegister);

      if (!hasShownBlockedModal.current) {
        hasShownBlockedModal.current = true;

        setShowBlockedNotice(false);
        setShowBlockedModal(true);

        return;
      }

      // Si el modal ya apareció, mostrar directamente el aviso habitual.
      setShowBlockedModal(false);
      setShowBlockedNotice(true);
    },
    [],
  );

  // Cerrar el modal conserva los datos de la caja abierta.
  const handleCloseBlockedModal = () => {
    setShowBlockedModal(false);
    setShowBlockedNotice(true);
  };

  // Navegar hacia la caja que actualmente está abierta.
  const handleGoToOpenCash = () => {
    if (!pendingCashRegister) return;

    const cashDate = pendingCashRegister.date
      ? getDateOnly(pendingCashRegister.date)
      : getDateOnly(pendingCashRegister.opened_at);

    setShowBlockedModal(false);
    setShowBlockedNotice(false);

    dispatch(selectDay(cashDate));
    dispatch(selectShift(pendingCashRegister.shift));

    setPendingCashRegister(null);
  };

  const blockedCashDate = pendingCashRegister
    ? pendingCashRegister.date
      ? getDateOnly(pendingCashRegister.date)
      : getDateOnly(pendingCashRegister.opened_at)
    : "";

  return (
    <ContainerPage>
      <PageHeader title="Caja" description="Control y gestión de cajas" />

      {/* AVISO DE CAJA ABIERTA */}
      {activeTab === "today" && showBlockedNotice && (
        <CashRegisterNotice role="status" aria-live="polite">
          <CashRegisterNoticeIcon>
            <Warning />
          </CashRegisterNoticeIcon>

          <CashRegisterNoticeContent>
            <h2>No se puede abrir una nueva caja</h2>

            <p>
              Actualmente existe otra caja abierta. Debés cerrarla antes de
              poder abrir una nueva.
            </p>

            {pendingCashRegister && (
              <CashRegisterNoticeDetails>
                <CashRegisterNoticeDetail>
                  <CalendarBlank />
                  <span>
                    <strong>Día:</strong> {formatDate(blockedCashDate)}
                  </span>
                </CashRegisterNoticeDetail>

                <CashRegisterNoticeDetail>
                  <Clock />
                  <span>
                    <strong>Turno:</strong>{" "}
                    {pendingCashRegister.shift === "morning"
                      ? "Mañana"
                      : "Noche"}
                  </span>
                </CashRegisterNoticeDetail>
              </CashRegisterNoticeDetails>
            )}
          </CashRegisterNoticeContent>

          <CashBlockedConfirmButton type="button" onClick={handleGoToOpenCash}>
            <CashRegisterIcon />
            Ir a la caja abierta
          </CashBlockedConfirmButton>
        </CashRegisterNotice>
      )}

      {/* CONTENIDO PRINCIPAL */}
      {activeTab === "today" ? (
        <CashDay
          setActiveTab={setActiveTab}
          onBlockedByOpenCash={handleBlockedByOpenCash}
        />
      ) : (
        <HistoryCash />
      )}

      {/* MODAL DE CAJA ABIERTA */}
      {showBlockedModal && pendingCashRegister && (
        <ModalForm
          isOpen={showBlockedModal}
          title="No se puede abrir una nueva caja"
          onClose={handleCloseBlockedModal}
          size="compact"
          footerActions={
            <CashBlockedConfirmButton
              type="button"
              onClick={handleGoToOpenCash}
            >
              <CashRegisterIcon />
              Ir a la caja abierta
            </CashBlockedConfirmButton>
          }
        >
          <CashBlockedContent>
            <CashBlockedIllustration>
              <div className="illustration-circle">
                <CashRegisterIcon className="register-icon" />

                <div className="lock-icon">
                  <Lock />
                </div>
              </div>
            </CashBlockedIllustration>

            <CashBlockedInformation>
              <p>
                Actualmente hay una caja abierta y debe cerrarse antes de poder
                abrir otra.
              </p>

              <CashBlockedDetails>
                <CashBlockedDetailRow>
                  <CalendarBlank />
                  <strong>Día:</strong>
                  <span>{formatDate(blockedCashDate)}</span>
                </CashBlockedDetailRow>

                <CashBlockedDetailRow>
                  <Clock />
                  <strong>Turno:</strong>

                  <span>
                    {pendingCashRegister.shift === "morning"
                      ? "Mañana"
                      : "Noche"}
                  </span>
                </CashBlockedDetailRow>
              </CashBlockedDetails>
            </CashBlockedInformation>
          </CashBlockedContent>
        </ModalForm>
      )}
    </ContainerPage>
  );
};

export default CashRegister;
