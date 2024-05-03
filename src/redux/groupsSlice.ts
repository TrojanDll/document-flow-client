import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async function () {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");

  const data = await response.json();
  return data;
});

interface IGroupsState {
  groups: string[];
}

const groupsSlice = createSlice({
  name: "todos",
  initialState: <IGroupsState>{
    groups: ["Группа 1", "Группа 2", "Группа 3", "Группа 4"],
  },
  reducers: {
    addGroup(state, action) {
      state.groups.push(action.payload.group);
    },
  },
  // extraReducers: {
  //   [fetchTodos.pending]: (state) => {
  //     (state.status = "loading"), (state.error = null);
  //   },
  //   [fetchTodos.fulfilled]: (state, action) => {
  //     state.status = "resolved";
  //     state.todos = action.payload;
  //   },
  //   [fetchTodos.rejected]: (state, action) => {},
  // },
});

export const { addGroup } = groupsSlice.actions;

export default groupsSlice.reducer;
