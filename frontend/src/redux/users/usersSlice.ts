import {
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { User } from "../../models/models";

const userAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

export const usersSlice = createSlice({
  name: "users",
  initialState: userAdapter.getInitialState(),
  reducers: {
    addOne: userAdapter.addOne,
  },
});

// const allUsers = userAdapter.getSelectors();
export const { selectById: selectUserById } = userAdapter.getSelectors();
