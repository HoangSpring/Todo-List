import React from 'react';
import { cn } from '../lib/utils';
import { Calendar, Inbox, CheckSquare, Clock, User, LogOut, CheckCircle2 } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  className?: string;
}

const navItems = [
  { id: 'today', label: 'Today', icon: Calendar },
  { id: 'upcoming', label: 'Upcoming', icon: Clock },
  { id: 'all', label: 'All Tasks', icon: Inbox },
  { id: 'completed', label: 'Completed', icon: CheckSquare },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, className }) => {
  return (
    <aside className={cn("flex flex-col w-64 h-screen border-r border-border glass p-6", className)}>
      <div className="flex items-center gap-3 mb-10">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
          <CheckCircle2 className="text-white w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">Focus</h1>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-text-muted hover:bg-surface-lighter hover:text-text"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-text-muted")} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-text-muted">Productivity</div>
          <div className="text-xs font-medium text-primary">82%</div>
        </div>
        <div className="w-full h-1.5 bg-surface-lighter rounded-full overflow-hidden mb-6">
          <div className="h-full bg-primary rounded-full w-[82%]" />
        </div>

        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-surface-lighter">
          <div className="w-8 h-8 rounded-full bg-surface-lighter border border-border flex items-center justify-center overflow-hidden">
            <User className="w-4 h-4 text-text-muted" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-medium text-white">Alex Doe</div>
            <div className="text-xs text-text-muted">Pro Plan</div>
          </div>
          <LogOut className="w-4 h-4 text-text-muted hover:text-white transition-colors" />
        </button>
      </div>
    </aside>
  );
};
