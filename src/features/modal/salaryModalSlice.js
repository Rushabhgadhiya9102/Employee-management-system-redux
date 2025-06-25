import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    selectedEmployee: null
}

const salaryModalSlice = createSlice({
    name:"salaryModal",
    initialState,
    reducers:{
            openSalaryModal:(state,action) =>{
                state.isOpen = true;
                state.selectedEmployee = action.payload
            },

            closeSalaryModal:(state) => {
                state.isOpen = false;
                state.selectedEmployee = null
            }
    }

})

export const {openSalaryModal,closeSalaryModal} = salaryModalSlice.actions
export default salaryModalSlice.reducer 