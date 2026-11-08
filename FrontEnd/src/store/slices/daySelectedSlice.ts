import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getDateOnly } from "../../components/Utils/Formats.tsx";

export type ShiftType = "morning" | "night";

interface DaySelectedState {
  day: string;
  shift: ShiftType;
}

const initialState: DaySelectedState = {
  day: getDateOnly(new Date()),
  shift: "morning",
};

const daySelectedSlice = createSlice({
  name: "daySelected",

  initialState,

  reducers: {
    selectDay: (state, action: PayloadAction<string>) => {
      state.day = action.payload;
    },

    selectShift: (state, action: PayloadAction<ShiftType>) => {
      state.shift = action.payload;
    },
  },
});

export const {
  selectDay,
  selectShift,
} = daySelectedSlice.actions;

export default daySelectedSlice.reducer;