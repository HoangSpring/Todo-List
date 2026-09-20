import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import type { Priority, Category } from '../types';
import { cn } from '../lib/utils';

interface TaskInputProps {
  onAdd: (title: string, priority: Priority, category: Category, dueDate: Date | null) => void;
}

const CATEGORIES: Category[] = ['Work', 'Personal', 'Health', 'Design', 'Development'];
const PRIORITIES: Priority[] = ['low', 'medium', 'high'];

export const TaskInput: React.FC<TaskInputProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('Work');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), priority, category, new Date());
      setTitle('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "glass rounded-xl p-3 mb-8 transition-all duration-300",
        isFocused ? "ring-2 ring-primary/50 shadow-[0_0_20px_rgba(139,92,246,0.15)]" : "hover:border-primary/30"
      )}
    >
      <div className="flex items-center gap-3 px-2">
        <div className="w-5 h-5 rounded-md border-2 border-border/80 flex-shrink-0" />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="What needs to be done?"
          className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-text-muted/60 text-lg"
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className={cn(
        "flex items-center gap-2 mt-4 px-2 overflow-hidden transition-all duration-300",
        isFocused || title.trim() ? "max-h-12 opacity-100" : "max-h-0 opacity-0 mt-0"
      )}>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="bg-surface-lighter text-xs text-text-muted rounded-md px-2 py-1.5 outline-none border border-border/50 hover:border-border transition-colors appearance-none cursor-pointer"
        >
          {PRIORITIES.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)} Priority</option>)}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="bg-surface-lighter text-xs text-text-muted rounded-md px-2 py-1.5 outline-none border border-border/50 hover:border-border transition-colors appearance-none cursor-pointer"
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <button type="button" className="flex items-center gap-1.5 bg-surface-lighter text-xs text-text-muted rounded-md px-2 py-1.5 border border-border/50 hover:border-border transition-colors">
          <CalendarIcon className="w-3 h-3" />
          Today
        </button>
      </div>
    </form>
  );
};
