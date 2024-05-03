// import { createSlice } from "@reduxjs/toolkit";

// interface IregistrationDataFields {
//   firstName: string;
//   lastName: string;
//   patronymic: string;
//   department: string;
//   post: string;
//   email: string;
//   password: string;
// }

// interface registrationDataSlice {
//   fields: IregistrationDataFields;
// }

// const registrationDataSlice = createSlice({
//   name: "registrationDataSlice",
//   initialState: <registrationDataSlice>{
//     fields: {
//       firstName: "",
//       lastName: "",
//       patronymic: "",
//       department: "",
//       post: "",
//       email: "",
//       password: "",
//     },
//   },
//   reducers: {
//     addField(state, action) {
//       const { firstName, lastName, patronymic, department, post, email, password } = action.payload;
//       state.fields.firstName = firstName;
//       state.fields.lastName = lastName;
//       state.fields.patronymic = patronymic;
//       state.fields.department = department;
//       state.fields.post = post;
//       state.fields.email = email;
//       state.fields.password = password;
//     },
//   },
//   // extraReducers: {
//   //   [fetchTodos.pending]: (state) => {
//   //     (state.status = "loading"), (state.error = null);
//   //   },
//   //   [fetchTodos.fulfilled]: (state, action) => {
//   //     state.status = "resolved";
//   //     state.todos = action.payload;
//   //   },
//   //   [fetchTodos.rejected]: (state, action) => {},
//   // },
// });

// export const { addField } = registrationDataSlice.actions;

// export default registrationDataSlice.reducer;
