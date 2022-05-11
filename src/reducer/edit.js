import { createSlice } from "@reduxjs/toolkit";
const edit = createSlice({
  name: "edit",
  initialState: {
    id: "",
    status: false,
  },
  reducers: {
    setEdit: (state, actions) => {
      state.id = actions.payload;
      state.status = true;
    },
    setEditReset: (state) => {
      state.id = "";
      state.status = false;
    },
  },
});
export default edit.reducer;
export const { setEdit, setEditReset } = edit.actions;
