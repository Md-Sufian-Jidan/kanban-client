import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = ["#facc15", "#3b82f6", "#22c55e"];

const Overview = () => {
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({ todo: 0, inProgress: 0, completed: 0 });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axiosSecure.get('/api/tasks/stats');
                setStats(res.data);

                // const userStats = {
                //     todo: tasks.filter(t => t.status === "To Do").length,
                //     inProgress: tasks.filter(t => t.status === "In Progress").length,
                //     completed: tasks.filter(t => t.status === "Completed").length
                // };

                // setStats(userStats);
            } catch (err) {
                console.error("Failed to fetch tasks:", err);
            }
        };

        fetchTasks();
    }, [axiosSecure]);

    const chartData = [
        { name: "To Do", value: stats.todo },
        { name: "In Progress", value: stats.inProgress },
        { name: "Completed", value: stats.completed },
    ];

    return (
        <motion.div
            className="p-5 min-h-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-primary mb-6 font-offside">Task Overview</h2>

            <div className="grid grid-cols-1 gap-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow text-center">
                        <h3 className="text-sm font-medium text-gray-700">To Do</h3>
                        <p className="text-3xl font-bold text-yellow-500">{stats.todo}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow text-center">
                        <h3 className="text-sm font-medium text-gray-700">In Progress</h3>
                        <p className="text-3xl font-bold text-blue-500">{stats.inProgress}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow text-center">
                        <h3 className="text-sm font-medium text-gray-700">Completed</h3>
                        <p className="text-3xl font-bold text-green-500">{stats.completed}</p>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-4 rounded-xl shadow">
                    <h3 className="text-md font-medium text-center mb-4 text-gray-700">Status Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>
    );
};

export default Overview;
