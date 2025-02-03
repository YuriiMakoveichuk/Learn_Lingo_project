import { createAsyncThunk } from "@reduxjs/toolkit";
import { INSTANCE } from "../teachers/operations.js";

export const fetchTeachersAll = createAsyncThunk(
  "teachersAll/fetchTeachersAll",
  async (__, thunkApi) => {
    try {
      const response = await INSTANCE.get("/teachers.json");
      const data = response.data;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
