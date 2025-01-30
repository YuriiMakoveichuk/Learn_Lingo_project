import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage.jsx";
import TeachersPage from "./pages/TeachersPage/TeachersPage.jsx";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";

import { PrivateRoute } from "./components/PrivateRoute.jsx";

import "./App.css";

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route
            path="/favorites"
            element={<PrivateRoute component={<FavoritesPage />} />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
