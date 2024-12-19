import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ILoginResponse } from "../../interface";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<ILoginResponse | null>(null);
  const logoutHandler = () => {
    navigate("/");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="navbar">
      <div className="username">{user?.name}</div>
      <button className="logout" onClick={logoutHandler}>
        logout
      </button>
    </div>
  );
};

export default Navbar;
