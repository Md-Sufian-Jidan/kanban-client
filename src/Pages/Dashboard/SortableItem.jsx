// src/Pages/Dashboard/SortableItem.jsx
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = ({ id, task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-background p-4 mb-3 rounded-xl shadow-md cursor-grab"
    >
      <h3 className="text-md font-bold text-text">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-xs text-gray-400 mt-1">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>
    </div>
  );
};
