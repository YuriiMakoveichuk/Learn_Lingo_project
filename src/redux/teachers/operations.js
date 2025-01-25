// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const INSTANCE = axios.create({
//   baseURL:
//     "https://react-learn-lingo-default-rtdb.europe-west1.firebasedatabase.app",
// });

// export const fetchTeachers = createAsyncThunk(
//   "teachers/fetchAll",
//   async (_, thunkApi) => {
//     try {
//       const { data } = await INSTANCE.get("/teachers.json");

//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );
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
      // Отримати всі дані про вчителів
      const response = await INSTANCE.get("/teachers.json");

      const data = response.data;
      // Перетворити дані на масив
      const teachersArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      // Знайти стартовий індекс на основі ідентифікатора startAfter
      const startIndex = startAfter
        ? teachersArray.findIndex((teacher) => teacher.id === startAfter) + 1
        : 0;

      // Створити пагінований масив вчителів
      const paginatedTeachers = teachersArray.slice(
        startIndex,
        startIndex + limit
      );

      // Повернути пагінованих вчителів та ідентифікатор останнього видимого вчителя
      return {
        teachers: paginatedTeachers,
        lastVisible: paginatedTeachers[paginatedTeachers.length - 1]?.id,
      };
    } catch (error) {
      // Повернути повідомлення про помилку, якщо запит не вдався
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
