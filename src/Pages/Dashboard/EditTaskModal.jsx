import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const EditTaskModal = ({ task, onClose, onUpdated }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: task.title,
            description: task.description,
            dueDate: task.dueDate?.substring(0, 10),
        },
    });
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        try {
            await axiosSecure.put(`/api/tasks/${task._id}`, data);

            Swal.fire({
                icon: "success",
                title: "Task updated successfully!",
                timer: 1500,
                showConfirmButton: false,
            });

            onUpdated(); // refresh tasks
            onClose();   // close modal
        } catch (err) {
            console.error("Update failed:", err);
            Swal.fire({
                icon: "error",
                title: "Failed to update task",
                text: err.response?.data?.message || "Something went wrong",
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full">
                <h2 className="text-xl font-bold text-primary mb-4">Edit Task</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Title</label>
                        <input
                            {...register("title", { required: true })}
                            className="w-full px-3 py-2 border rounded-xl"
                        />
                        {errors.title && <p className="text-red-500 text-sm">Required</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            {...register("description")}
                            rows={3}
                            className="w-full px-3 py-2 border rounded-xl"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Due Date</label>
                        <input
                            type="date"
                            {...register("dueDate", { required: true })}
                            className="w-full px-3 py-2 border rounded-xl"
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl border text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-indigo-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTaskModal;
