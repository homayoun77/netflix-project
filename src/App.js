import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import Movies from "./pages/Movies";
import TvSeries from "./pages/TvSeries";
import MovieDetails from "./components/MovieDetails";
import SeriesDetails from "./components/SeriesDetails";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<MovieDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movies" element={<Movies/>} />
          <Route path="/movies/:id" element={<MovieDetails/>} />
          <Route path="/tvSeries" element={<TvSeries/>} />
          <Route path="/tvSeries/:id" element={<SeriesDetails/>} />
          <Route path="/account" element={<ProtectedRoute> <Account /> </ProtectedRoute>} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
