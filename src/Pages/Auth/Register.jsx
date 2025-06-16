import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import auth from '../../Firebase/Firebase.config'

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // redirect on success
    } catch (err) {
      console.error("Registration error:", err.message);
      alert(err.message); // simple error handling
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
        <h2 className="text-2xl font-bold mb-6 text-primary font-offside text-center">Create Account</h2>
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-xl hover:bg-indigo-600 transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-text">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">Login</a>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
