import { createSlice } from "@reduxjs/toolkit";

interface IUsersState {
  data: IUser[];
}

const usersSlice = createSlice({
  name: "users",
  initialState: <IUsersState>{},
  reducers: {
    addUser: (state, action) => {
      const {
        id,
        active,
        firstName,
        lastName,
        patronymic,
        post,
        role,
        email,
        userGroup,
        department,
      } = action.payload;
      state.data.push({
        id,
        active,
        firstName,
        lastName,
        patronymic,
        post,
        role,
        email,
        userGroup,
        department,
      });
    },
  },
});

export const { addUser } = usersSlice.actions;

export const selectAllUsers = (state: IUsersState) => state.data;

export default usersSlice.reducer;
