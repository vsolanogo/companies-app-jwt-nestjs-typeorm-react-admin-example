import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/models";

const userAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

export const usersSlice = createSlice({
  name: "users",
  initialState: userAdapter.getInitialState(),
  reducers: {
    addOne: userAdapter.addOne,
    upsertOne: userAdapter.upsertOne,
    upsertMany: userAdapter.upsertMany,
    removeOne: userAdapter.removeOne,
    removeAll: userAdapter.removeAll,
    addMany: userAdapter.addMany,
  },
});

export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers,
  selectById: selectUserById,
} = userAdapter.getSelectors();
