import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const INSTANCE = axios.create({
  baseURL:
    "https://react-learn-lingo-default-rtdb.europe-west1.firebasedatabase.app",
});

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchAll",
  async ({ startAfter, limit }, thunkApi) => {
    try {
      const response = await INSTANCE.get("/teachers.json");

      const data = response.data;

      const teachersArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      const startIndex = startAfter
        ? teachersArray.findIndex((teacher) => teacher.id === startAfter) + 1
        : 0;

      const paginatedTeachers = teachersArray.slice(
        startIndex,
        startIndex + limit
      );

      return {
        teachers: paginatedTeachers,
        lastVisible: paginatedTeachers[paginatedTeachers.length - 1]?.id,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
