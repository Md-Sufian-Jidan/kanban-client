import Hero from "./Hero";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import CTA from "./CTA";

const Home = () => {
    return (
        <div className="bg-background text-text">
            <Hero />
            <Features />
            <HowItWorks />
            <CTA />
            {/* Footer */}
            <footer className="bg-white py-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} KanbanBoard. All rights reserved.
            </footer>
        </div>
    );
};


export default Home;
