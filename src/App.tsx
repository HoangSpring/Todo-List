import { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import type { Task, Priority, Category } from './types';
import { format } from 'date-fns';
import { Toaster, toast } from 'sonner';

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Finalize presentation for Q3 review',
    completed: false,
    priority: 'high',
    category: 'Work',
    dueDate: new Date(new Date().setHours(14, 0, 0, 0)),
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Design new landing page concepts',
    completed: false,
    priority: 'medium',
    category: 'Design',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Book flights for conference',
    completed: true,
    priority: 'low',
    category: 'Personal',
    dueDate: new Date(),
    createdAt: new Date(),
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeTab, setActiveTab] = useState('today');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addTask = (title: string, priority: Priority, category: Category, dueDate: Date | null) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      priority,
      category,
      dueDate,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
    toast.success('Task created successfully');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const completed = !t.completed;
        if (completed) toast.success('Task completed!');
        return { ...t, completed };
      }
      return t;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast.error('Task deleted');
  };

  const filteredTasks = useMemo(() => {
    switch (activeTab) {
      case 'today':
        // Simplified today filter
        return tasks.filter(t => !t.completed);
      case 'completed':
        return tasks.filter(t => t.completed);
      case 'upcoming':
        return tasks.filter(t => !t.completed && t.dueDate && t.dueDate > new Date());
      case 'all':
      default:
        return tasks;
    }
  }, [tasks, activeTab]);

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercentage = tasks.length === 0 ? 100 : Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Toaster theme="dark" position="bottom-right" />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-border glass sticky top-0 z-30">
          <h1 className="font-bold text-white text-lg">Focus</h1>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-text hover:bg-surface rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-10 md:py-16">
          <header className="mb-12">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-text-muted mb-2 font-medium tracking-wide text-sm">{format(new Date(), 'EEEE, MMMM do')}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Focus on what matters.</h1>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-3xl font-bold text-white">{progressPercentage}%</p>
                <p className="text-xs text-text-muted uppercase tracking-wider font-medium">Completed</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-surface-lighter rounded-full overflow-hidden mt-6">
              <div
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </header>

          <TaskInput onAdd={addTask} />

          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-white">
                {activeTab === 'today' ? "Today's Tasks" :
                  activeTab === 'completed' ? "Completed Tasks" :
                    activeTab === 'upcoming' ? "Upcoming Tasks" : "All Tasks"}
              </h2>
              <span className="text-xs font-medium text-text-muted bg-surface-lighter px-2 py-1 rounded-md">
                {filteredTasks.length} tasks
              </span>
            </div>

            <TaskList
              tasks={filteredTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
