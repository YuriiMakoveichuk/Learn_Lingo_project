import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "firebase/compat/firestore";

const API_KEY = import.meta.env.VITE_API_KEY;
const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = import.meta.env.VITE_MESSAGING_SENDER_ID;
const APP_ID = import.meta.env.VITE_APP_ID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const fetchTeachers = async (selectedLanguage) => {
  try {
    const teachersRef = collection(db, "teachers");
    const q = query(
      teachersRef,
      where("languages", "array-contains", selectedLanguage)
    );
    const querySnapshot = await getDocs(q);

    const teachers = [];
    querySnapshot.forEach((doc) => {
      teachers.push({ id: doc.id, ...doc.data() });
    });

    console.log("Fetched Teachers:", teachers);
    return teachers;
  } catch (error) {
    console.error("Error fetching teachers:", error);
  }
};

fetchTeachers("French");
