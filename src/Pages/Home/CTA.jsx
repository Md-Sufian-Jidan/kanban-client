import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section className="py-20 px-6 text-center">
            <h2 className="text-2xl font-bold text-primary font-offside">Ready to boost your productivity?</h2>
            <p className="text-gray-600 mt-2">Join now and take control of your tasks.</p>
            <Link
                to="/register"
                className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-600 transition"
            >
                Create Your Board
            </Link>
        </section>
    );
};

export default CTA;