import { createSlice } from '@reduxjs/toolkit';

// ------------- intial state -------------

const initialState = {
    salarySlips: []
};

// ------------ slice reducer -------------

const salarySlipSlice = createSlice({
  name: 'salarySlip',
  initialState,
  reducers: {

    generateSlip : (state, action) =>{
        state.salarySlips.push(action.payload);
    },

    resetSalarySlip: () => initialState
  },
});

export const { generateSlip , resetSalarySlip } = salarySlipSlice.actions;
export default salarySlipSlice.reducer;