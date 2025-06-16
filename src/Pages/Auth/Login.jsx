import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import { axiosPublic } from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { signIn, googleSignIn, loading, setLoading } = useAuth();

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await signIn(email, password);
      if (res) {
        try {
          const response = await axiosPublic.post(`/api/auth/login`, { email, password });

          // Save token in localStorage or context
          localStorage.setItem("token", response.data.token);

          navigate("/dashboard");
          setLoading(false);
          return toast.success("Login Successful");
        } catch (err) {
          console.error("Login failed:", err.response?.data || err.message);
          setLoading(false);
          return toast.error(err.response?.data?.message || "Login failed");
        }
      }
    } catch (err) {
      console.error(err.message);
      setLoading(false);
      return toast.error("Invalid credentials");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login failed:", err.message);
      alert("Google login failed");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-background flex items-center justify-center px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-soft">
        <h2 className="text-2xl font-bold mb-6 text-primary font-offside text-center">Welcome Back</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required", minLength: 6 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-xl hover:bg-indigo-600 transition"
          >
            {loading ? "Logging..." : "Login"}
          </button>
        </form>

        {/* Google Login */}
        <div className="mt-6 text-center">
          <p className="text-text mb-2">Or sign in with</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-xl hover:bg-gray-50 transition"
          >
            <FcGoogle className="text-2xl" />
            <span className="text-text font-medium">Google</span>
          </button>
        </div>

        <p className="mt-4 text-sm text-center text-text">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">Register</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
