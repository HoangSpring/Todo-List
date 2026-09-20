import React from 'react';
import { Check, Trash2, Clock, Tag } from 'lucide-react';
import type { Task } from '../types';
import { cn } from '../lib/utils';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  low: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  medium: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  high: 'bg-red-500/10 text-red-500 border-red-500/20'
};

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "group flex items-center gap-4 p-4 glass rounded-xl transition-all duration-200 border border-border/40 hover:border-border/80 hover:shadow-md",
        task.completed && "opacity-60 bg-surface/30"
      )}
    >
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0",
          task.completed
            ? "bg-primary border-primary"
            : "border-border/80 group-hover:border-primary/50"
        )}
      >
        <motion.div
          initial={false}
          animate={{ scale: task.completed ? 1 : 0, opacity: task.completed ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Check className="w-4 h-4 text-white" strokeWidth={3} />
        </motion.div>
      </button>

      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-base font-medium text-white truncate transition-all duration-300",
          task.completed && "line-through text-text-muted"
        )}>
          {task.title}
        </p>

        <div className="flex items-center gap-3 mt-1.5 overflow-x-auto pb-1 scrollbar-none">
          <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border uppercase tracking-wider", priorityColors[task.priority])}>
            {task.priority}
          </div>
          <div className="flex items-center gap-1 text-xs text-text-muted">
            <Tag className="w-3 h-3" />
            <span>{task.category}</span>
          </div>
          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-text-muted">
              <Clock className="w-3 h-3" />
              <span>{format(task.dueDate, 'MMM d, h:mm a')}</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
