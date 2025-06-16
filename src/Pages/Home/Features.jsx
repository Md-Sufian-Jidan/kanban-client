import { motion } from "framer-motion";
import { LayoutDashboard, ListChecks, CheckCircle } from "lucide-react";

const Features = () => {
    return (
        <section className="py-20 bg-white px-6">
            <h2 className="text-2xl font-bold text-center text-primary font-offside mb-10">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <FeatureCard
                    icon={<LayoutDashboard size={32} />}
                    title="Dashboard Overview"
                    desc="See your progress with clean, visual summaries and real-time updates."
                />
                <FeatureCard
                    icon={<ListChecks size={32} />}
                    title="Organize Tasks"
                    desc="Add, edit, delete, and drag tasks across To Do, In Progress, and Completed."
                />
                <FeatureCard
                    icon={<CheckCircle size={32} />}
                    title="Achieve More"
                    desc="Stay motivated and productive with simple tools that just work."
                />
            </div>
        </section>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="bg-gray-50 p-6 rounded-xl text-center shadow hover:shadow-md transition">
        <div className="text-primary mb-4 flex justify-center">{icon}</div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
    </div>
);

export default Features;