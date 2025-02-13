export interface Task {
    id: number;
    title: string;
    description?: string;
    dueDate: Date | null;
    status: 'To Do' | 'In Progress' | 'Completed';
  }

  