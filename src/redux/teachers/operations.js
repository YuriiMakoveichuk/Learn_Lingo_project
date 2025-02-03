import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getFilteredTeachers } from "../../firebase/firebaseConfig.js";

export const INSTANCE = axios.create({
  baseURL:
    "https://react-learn-lingo-default-rtdb.europe-west1.firebasedatabase.app",
});

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchAll",
  async ({ startAfter, limit = 4, filters }, thunkApi) => {
    try {
      const filteredTeachers = await getFilteredTeachers(filters);

      console.log("Filtered teachers after backend call:", filteredTeachers);

      const startIndex = startAfter
        ? filteredTeachers.findIndex((teacher) => teacher.id === startAfter) + 1
        : 0;

      const paginatedTeachers = filteredTeachers.slice(
        startIndex,
        startIndex + limit
      );

      console.log(paginatedTeachers);

      return {
        teachers: paginatedTeachers,
        lastVisible: paginatedTeachers[paginatedTeachers.length - 1]?.id,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
