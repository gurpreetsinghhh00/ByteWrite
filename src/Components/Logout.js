import React from "react";
import { useDispatch } from "react-redux";
import authService from "../appwrite/authService";
import { logout } from "../Utils/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
    navigate("/");
  };
  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
