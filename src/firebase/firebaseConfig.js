import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

import "firebase/compat/firestore";

const API_KEY = import.meta.env.VITE_API_KEY;
const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = import.meta.env.VITE_MESSAGING_SENDER_ID;
const APP_ID = import.meta.env.VITE_APP_ID;
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  databaseURL: DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const getFilteredTeachers = async (filters) => {
  const teachersRef = ref(db, "teachers");
  const snapshot = await get(teachersRef);
  const teachers = [];

  snapshot.forEach((childSnapshot) => {
    const teacher = childSnapshot.val();
    const price = parseInt(teacher.price_per_hour, 10);
    let newPrice = false;

    switch (filters.price_range) {
      case "10":
        newPrice = price >= 10 && price <= 19;
        break;
      case "20":
        newPrice = price >= 20 && price <= 29;
        break;
      case "25":
        newPrice = price >= 20 && price <= 29;
        break;
      case "30":
        newPrice = price >= 30 && price <= 39;
        break;
      case "40":
        newPrice = price >= 40;
        break;
      default:
        newPrice = false;
    }

    const newLanguage = teacher.languages.includes(filters.languages);

    const newLevel = teacher.levels.includes(filters.levels);

    if (newPrice && newLanguage && newLevel) {
      teachers.push(teacher);
    }
  });

  return teachers;
};
