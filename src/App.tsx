import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import Banners from "./components/Banners/Banners";
import Register from "./components/Register/Register";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout/Layout";

function App() {
  const isLoggedIn = localStorage.getItem("authToken");
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <Layout />}
      <div className="content">
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/categories"
            element={isLoggedIn ? <Categories /> : <Navigate to="/" />}
          />
          <Route
            path="/products"
            element={isLoggedIn ? <Products /> : <Navigate to="/" />}
          />
          <Route
            path="/banners"
            element={isLoggedIn ? <Banners /> : <Navigate to="/" />}
          />
          <Route
            index
            path="/admin-register"
            element={isLoggedIn ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
