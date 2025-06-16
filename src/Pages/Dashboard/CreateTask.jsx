import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useState } from 'react';

const CreateTask = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [loading, setLoading]= useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        const task = {
            title: data.title,
            description: data.description,
            dueDate: data.dueDate,
            userEmail: user.email
        };
        try {
            await axiosSecure.post(`/api/tasks`, task);
            Swal.fire({
                icon: 'success',
                title: 'Task created successfully!',
                showConfirmButton: false,
                timer: 1500,
            });
            setLoading(false);
            reset();
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Failed to create task',
                text: err.response?.data?.error || 'Something went wrong',
            });
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="max-w-xl mx-auto min-h-screen p-5"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-primary font-offside mb-6">Create a New Task</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        {...register("title", { required: "Title is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        rows="3"
                        {...register("description")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Due Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                        type="date"
                        {...register("dueDate", { required: "Due date is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.dueDate && <p className="text-sm text-red-500 mt-1">{errors.dueDate.message}</p>}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-xl hover:bg-indigo-600 transition"
                >
                    {loading ? "Creating Task..." : "Create Task"}
                </button>
            </form>
        </motion.div>
    );
};

export default CreateTask;
