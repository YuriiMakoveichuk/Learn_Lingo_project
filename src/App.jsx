import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader.jsx";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const TeachersPage = lazy(() =>
  import("./pages/TeachersPage/TeachersPage.jsx")
);
const FavoritesPage = lazy(() =>
  import("./pages/FavoritesPage/FavoritesPage.jsx")
);

const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

// import HomePage from "./pages/HomePage/HomePage.jsx";
// import TeachersPage from "./pages/TeachersPage/TeachersPage.jsx";
// import FavoritesPage from "./pages/FavoritesPage/FavoritesPage.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";

import { PrivateRoute } from "./components/PrivateRoute.jsx";

import "./App.css";

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route
              path="/favorites"
              element={<PrivateRoute component={<FavoritesPage />} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </Suspense>
    </>
  );
}

export default App;
