import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logout from "./Logout";

const Header = () => {
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "Login",
      url: "/login",
      active: !auth.status,
    },
    {
      name: "Signup",
      url: "/signup",
      active: !auth.status,
    },
    {
      name: "All Posts",
      url: "/all-posts",
      active: auth.status,
    },
    {
      name: "Add Post",
      url: "/add-post",
      active: auth.status,
    },
  ];

  return (
    <header className="py-3 shadow-lg border-t-2 border-orange-400">
      <nav className="flex flex-col md:flex-row justify-between text-lg font-bold mx-4 items-center">
        <div className="font-playball text-2xl md:text-3xl text-orange-500 font-bold">
          <Link to="/">ByteWrite</Link>
        </div>
        <ul className="flex gap-x-6 justify-between">
          {auth.status && (
            <li className="p-2 text-md  font-semibold w-40 overflow-hidden text-right ">
              Hi, {auth.userData?.name}
            </li>
          )}
          {navItems.map((item) => {
            return !item.active ? null : (
              <li
                onClick={() => navigate(item.url)}
                key={item.name}
                className="p-2"
              >
                {/* <button>{item.name}</button> */}
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-orange-500" : " hover:text-orange-500"
                  }
                  to={item.url}
                >
                  {item.name}
                </NavLink>
              </li>
            );
          })}
          {auth.status && (
            <li className="p-2">
              <NavLink className="hover:text-orange-500">
                <Logout />
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
