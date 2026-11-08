import { useState } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "../store/store.ts";

import { printOrderAPI } from "../services/printAgentService.ts";
import {
  isPrintServer,
  requestPrintFromPrintServer,
} from "../websocket/websocketService.ts";
import { getAxiosErrorMessage } from "../components/Utils/ErrorAxios.tsx";

const usePrintAgent = () => {
  const [printing, setPrinting] = useState(false);
  const [showPrinterModal, setShowPrinterModal] = useState(false);

  const printerActive = useSelector(
    (state: RootState) => state.printAgent.printerActive,
  );

  const agentConnected = useSelector(
    (state: RootState) => state.printAgent.agentConnected,
  );

  const printTicket = async (ticket: string) => {
    if (!printerActive) {
      setShowPrinterModal(true);
      return false;
    }

    try {
      setPrinting(true);

      if (isPrintServer()) {
        await printOrderAPI(ticket);
      } else {
        const success = await requestPrintFromPrintServer(ticket);

        if (!success) {
          setShowPrinterModal(true);
          return false;
        }
      }

      return true;
    } catch (error) {
      getAxiosErrorMessage(error);
      return false;
    } finally {
      setPrinting(false);
    }
  };

  return {
    printTicket,
    printing,
    printerActive,
    agentConnected,
    showPrinterModal,
    setShowPrinterModal,
  };
};

export default usePrintAgent;
