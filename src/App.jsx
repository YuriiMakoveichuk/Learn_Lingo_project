import HomePage from "./pages/HomePage/HomePage.jsx";

import "./App.css";
import TeachersPage from "./pages/TeachersPage/TeachersPage.jsx";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
}

export default App;
