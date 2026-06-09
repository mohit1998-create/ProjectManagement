import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("formData", formData);
    e.preventDefault();

    try {
      const response = await loginUser(formData);
      console.log("resp",response);

      login(
        response.data.token,
        response.data.user
      );

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };


return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-white/80 mb-8">
          Login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              placeholder="john@example.com"
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none border border-white/30"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Password</label>

            <div className="relative">
              <input
                type="password"
                onChange={handleChange}
                name="password"
                placeholder="********"
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none border border-white/30"
              />


            </div>
          </div>

          <div className="flex justify-between text-sm text-white">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Login
          </button>

          <p className="text-center text-white">
            Don't have an account?{" "}
            <a href="/signup" className="font-bold underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );


}

export default Login;