import { Spinner } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSilce";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("please fill all the fields"));
    }

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/home");
      }
    } catch (error) {
      dispatch(signInFailure(data.message));
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
    <img
       src=""
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover"
    />

    <div className="relative bg-white bg-opacity-60 shadow-sm shadow-black w-[600px] max-w-[600px] p-6 md:p-8 rounded-3xl border border-opacity-50 flex flex-col items-center">
      <h1 className="text-4xl font-serif opacity-70 text-gray-800 mb-8">
        Login
      </h1>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="font-semibold text-gray-700 ml-1">
            Email
          </label>
          <input
            className="bg-slate-100 bg-opacity-40 border-black shadow-sm border-opacity-50 p-3 rounded-lg w-full h-11"
            type="email"
            placeholder="name@company.com"
            id="email"
            onChange={handlchange}
          />
        </div>
        <div>
          <label htmlFor="password" className="font-semibold text-gray-700 ml-1">
            Password
          </label>
          <input
            className="bg-slate-100 bg-opacity-40 border-black shadow-sm border-opacity-50 p-3 rounded-lg w-full h-11"
            type="password"
            placeholder="Password"
            id="password"
            onChange={handlchange}
          />
        </div>
        <button
          className="bg-[#254af0] shadow-lg mt-6 bg-opacity-80 border-white border border-opacity-50 text-white p-3 rounded-lg w-full h-11 hover:opacity-90"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Loading...</span>
            </>
          ) : (
            <div className="flex items-center justify-center font-serif text-xl opacity-75">
              Sign In
            </div>
          )}
        </button>
      </form>

      <div className="flex gap-2 text-sm mt-2">
        <span>Don't have an account?</span>
        <Link to="/sign-up" className="text-blue-500">
          Sign Up
        </Link>
      </div>

      {errorMessage && (
        <p className="mt-5 text-red-600 bg-red-300 w-full h-7 rounded-lg text-center">
          {errorMessage}
        </p>
      )}
    </div>
  </div>
  );
}
