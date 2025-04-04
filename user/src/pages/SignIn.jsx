import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // page will not be refreshed once form submitted
    e.preventDefault();

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex items-center">
        <img src="love-sticker.png" className="w-[20px] h-[20px]" />
        <h1 className="font-nunito font-extrabold text-green-600 text-2xl lg:text-4xl w-full text-center py-10">
          It is Great to See You Again!
        </h1>
        <img src="love-sticker.png" className="w-[20px] h-[20px]" />
      </div>

      {error && (
        <p className="text-red-700 font-nunito font-semibold mb-5 text-center">*{error}</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border border-green-600 rounded-md p-3 font-nunito"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border border-green-600 rounded-md p-3 font-nunito"
          onChange={handleChange}
          required
        />

        <button
          disabled={loading}
          className="bg-green-600 text-white rounded-3xl p-3 font-nunito hover:bg-rose-400 uppercase"
        >
          {loading ? "Wait, loading" : "Sign In"}
        </button>

        <p className="text-center">- or -</p>
        <OAuth />
      </form>
      <div className="flex gap-1 mt-12 text-center">
        <p>Do not have an account?</p>
        <Link to="/sign-up" className="underline text-rose-400">
          Click here!
        </Link>
      </div>
    </div>
  );
}
