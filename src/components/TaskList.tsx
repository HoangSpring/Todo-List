import React from 'react';
import type { Task } from '../types';
import { TaskItem } from './TaskItem';
import { Layers } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 mb-6 rounded-full glass flex items-center justify-center shadow-2xl relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <Layers className="w-10 h-10 text-primary relative z-10" />
        </div>
        <h3 className="text-xl font-medium text-white mb-2">You're all caught up.</h3>
        <p className="text-text-muted max-w-sm">Enjoy the moment or create a new task to keep the momentum going.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
