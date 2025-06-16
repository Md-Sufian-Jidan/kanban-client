import { motion } from "framer-motion";

const HowItWorks = () => {
    return (
        <section className="py-20 px-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-center text-primary font-offside mb-10">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
                {["Create Tasks", "Organize Easily", "Track & Complete"].map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="bg-white p-6 rounded-xl shadow"
                    >
                        <div className="text-primary text-4xl font-bold mb-2">0{index + 1}</div>
                        <h3 className="text-lg font-semibold mb-2">{step}</h3>
                        <p className="text-gray-500 text-sm">
                            {step === "Create Tasks" ? "Add tasks with deadlines." :
                                step === "Organize Easily" ? "Drag them into different columns." :
                                    "Mark them complete when done."}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;