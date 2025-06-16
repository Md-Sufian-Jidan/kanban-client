import { useEffect, useState } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import TaskCard from "./TaskCard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import EditTaskModal from "./EditTaskModal";
import DroppableColumn from "./DroppableColumn";

const COLUMN_TYPES = ["To Do", "In Progress", "Completed"];

const SortableItem = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group" // used for showing handle
    >
      {/* We'll pass drag listeners via context */}
      {children(listeners, attributes)}
    </div>
  );
};


const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const sensors = useSensors(useSensor(PointerSensor));
  const axiosSecure = useAxiosSecure();
  const [editingTask, setEditingTask] = useState(null);


  const fetchTasks = async () => {
    try {
      const res = await axiosSecure.get(`/api/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err.message);
    }
  };

  const refreshTasks = () => fetchTasks();
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const taskId = active.id;
    const newStatus = over?.id;

    // Only continue if user dropped into a column (not a task card)
    if (!COLUMN_TYPES.includes(newStatus)) return;

    // Update locally
    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // Update on backend
    axiosSecure.put(`/api/tasks/${taskId}`, { status: newStatus })
      .catch(err => console.error("Status update failed:", err));
  };

  const getTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status);

  const handleDelete = async (task) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: `This will permanently delete "${task.title}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirmed.isConfirmed) {
      try {
        await axiosSecure.delete(`/api/tasks/${task._id}`);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          showConfirmButton: false,
          timer: 1200,
        });
        fetchTasks(); // refresh task list
      } catch (err) {
        console.error("Delete failed:", err);
        Swal.fire({
          icon: 'error',
          title: 'Error deleting task',
          text: err.response?.data?.error || 'Something went wrong',
        });
      }
    }
  };


  return (
    <motion.div
      className="grid md:grid-cols-3 gap-6 p-5 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {COLUMN_TYPES.map((status) => (
          <DroppableColumn key={status} id={status}>
            <div>
              <h2 className="text-lg font-semibold text-primary mb-2">{status}</h2>
              <div className="bg-gray-50 p-3 rounded-2xl min-h-[300px] space-y-3">
                <SortableContext
                  items={getTasksByStatus(status).map((task) => task._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {getTasksByStatus(status).map((task) => (
                    <SortableItem key={task._id} id={task._id}>
                      {(listeners, attributes) => (
                        <TaskCard
                          task={task}
                          onEdit={setEditingTask}
                          onDelete={handleDelete}
                          dragListeners={listeners}
                          dragAttributes={attributes}
                        />
                      )}
                    </SortableItem>
                  ))}
                </SortableContext>
              </div>
            </div>
          </DroppableColumn>
        ))}
      </DndContext>
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdated={refreshTasks}
        />
      )}
    </motion.div>
  );
};

export default MyTasks;
