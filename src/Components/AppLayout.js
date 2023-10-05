import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import authService from "../appwrite/authService.js";
import { login, logout } from "../Utils/authSlice";
import Footer from "../Components/Footer";
import Header from "./Header.js";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  };

  return loading === true ? null : (
    <div className="min-h-screen">
      <div className="w-full">
        <Header />
        <main className="min-h-[82vh] bg-paper-bg bg-opacity-25">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
