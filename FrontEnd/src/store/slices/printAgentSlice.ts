import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { PrinterStatus } from "../../interfaces/PrintAgent.ts";

interface PrintState {
  printerActive: boolean;
  agentConnected: boolean;
  printerStatus: PrinterStatus | null;
  lastStatusUpdate: string | null;
}

const INITIALSTATE: PrintState = {
  printerActive: false,
  agentConnected: false,
  printerStatus: null,
  lastStatusUpdate: null,
};

const PrintAgentSlice = createSlice({
  name: "printAgent",

  initialState: INITIALSTATE,

  reducers: {
    setPrinterActive: (state, action: PayloadAction<boolean>) => {
      state.printerActive = action.payload;
    },

    setPrintAgentStatus: (
      state,
      action: PayloadAction<{
        connected: boolean;
        status: PrinterStatus | null;
        timestamp?: string;
      }>,
    ) => {

      state.agentConnected = action.payload.connected;
      state.printerStatus = action.payload.status;

      state.printerActive = Boolean(
        action.payload.connected &&
        action.payload.status?.connected &&
        action.payload.status?.online,
      );

      state.lastStatusUpdate = action.payload.timestamp ?? null;
    },
  },
});

export const { setPrinterActive, setPrintAgentStatus } =
  PrintAgentSlice.actions;

export default PrintAgentSlice.reducer;
