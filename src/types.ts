export type Priority = 'low' | 'medium' | 'high';
export type Category = 'Work' | 'Personal' | 'Health' | 'Design' | 'Development';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate: Date | null;
  createdAt: Date;
}
