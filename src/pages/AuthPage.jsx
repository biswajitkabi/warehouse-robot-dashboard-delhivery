import React, { useState } from "react";
import { useStore } from "../stores/useStore";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

export default function AuthPage() {
  const login = useStore((s) => s.login);
  const signup = useStore((s) => s.signup);
  const navigate = useNavigate();
  
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (isSignup && !form.name.trim()) {
      e.name = "Name is required";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      e.email = "Enter a valid email";
    }
    if (form.password.length < 6) {
      e.password = "Password must be at least 6 characters";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;

    const user = {
      id: form.email,
      name: form.name || form.email.split("@")[0],
      email: form.email,
    };

    if (isSignup) {
      signup(user);
    } else {
      login(user);
    }

    // Navigate to dashboard after successful login/signup
    navigate("/dashboard");
  }

  function toggleMode() {
    setIsSignup(!isSignup);
    setErrors({});
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide mb-2">
            Delhivery
          </h1>
          <p className="text-gray-400 text-sm">Warehouse Robot Dashboard</p>
        </div>

        {/* Auth Card - Centered with max-width */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-2xl max-w-md">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field (only for signup) */}
              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition`}
                  />
                  {errors.name && (
                    <div className="text-xs text-red-600 mt-1">{errors.name}</div>
                  )}
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition`}
                />
                {errors.email && (
                  <div className="text-xs text-red-600 mt-1">{errors.email}</div>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition`}
                />
                {errors.password && (
                  <div className="text-xs text-red-600 mt-1">{errors.password}</div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-3 rounded-lg transition-colors duration-200 shadow-lg mt-6"
              >
                {isSignup ? "Sign Up" : "Login"}
              </button>

              {/* Toggle Login/Signup */}
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  {isSignup
                    ? "Already have an account? Login"
                    : "New here? Create an account"}
                </button>
              </div>
            </form>
          </Card>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs">
            Demo: Use any email & password (min 6 chars)
          </p>
        </div>
      </div>
    </div>
  );
}