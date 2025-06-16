import { GripVertical, Pencil, Trash2 } from "lucide-react";

const TaskCard = ({ task, onEdit, onDelete, dragListeners, dragAttributes }) => {
  return (
    <div className="bg-white p-3 rounded-xl shadow-md border border-gray-200 relative">
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
          className="text-gray-400 hover:text-primary"
          title="Edit"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task);
          }}
          className="text-gray-400 hover:text-rose-500"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Drag handle */}
      <div
        {...dragListeners}
        {...dragAttributes}
        className="absolute left-2 top-2 text-gray-300 hover:text-gray-500 cursor-grab"
        title="Drag"
      >
        <GripVertical size={16} />
      </div>

      <h3 className="font-semibold text-primary mt-4">{task.title}</h3>
      {task.description && (
        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
      )}
      {task.dueDate && (
        <p className="text-xs text-gray-400 mt-2">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default TaskCard;
