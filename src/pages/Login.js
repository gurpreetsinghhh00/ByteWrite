import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../appwrite/authService";
import { login as storeLogin } from "../Utils/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Button from "../Components/Button";
import Input from "../Components/Input";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin({ userData }));
        }
        navigate("/home");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 px-2">
      <div
        className={`mx-auto bg-white w-full max-w-sm sm:max-w-md  md:max-w-lg  rounded-xl p-8 border border-black/10 shadow-lg`}
      >
        <div className="font-playball text-3xl text-orange-500 font-bold">
          <div className="mb-4 flex justify-center">ByteWrite</div>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don't have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-lg transition-all duration-200 hover:underline cursor-pointer"
          >
            Sign up
          </Link>
        </p>
        {error && <p className="text-red-500 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-4">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
                      value
                    ) || "Email address must be valid address",
                },
              })}
            />
            <Input
              label="Password: "
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit">Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
