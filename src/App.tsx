import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import Banners from "./components/Banners/Banners";
import Register from "./components/Register/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/banners" element={<Banners />} />
          <Route index path="/" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
