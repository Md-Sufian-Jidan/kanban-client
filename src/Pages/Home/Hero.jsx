import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="py-24 px-6 text-center">
            <motion.h1
                className="text-4xl md:text-5xl font-bold text-primary font-offside"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Organize Your Work, Effortlessly
            </motion.h1>
            <p className="mt-4 max-w-xl mx-auto text-lg text-gray-600">
                Your personal Kanban board to stay focused, track tasks, and hit goals — all in one place.
            </p>
            <Link
                to="/register"
                className="mt-8 inline-block bg-primary text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-600 transition"
            >
                Get Started
            </Link>
        </section>
    );
};

export default Hero;
