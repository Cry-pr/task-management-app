import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Wash dishes',
    description: 'Clean all the dishes in the kitchen',
    dueDate: new Date('2023-12-01'),
    status: 'To Do',
  },
  {
    id: 2,
    title: 'Edit resume',
    description: 'Update the resume with the latest experiences',
    dueDate: new Date('2023-12-05'),
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Finish Codedex course',
    description: 'Complete the remaining modules of the Codedex course',
    dueDate: new Date('2023-12-10'),
    status: 'Completed',
  },
];

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [openDialog, setOpenDialog] = useState(false);

  const addTask = (task: Omit<Task, 'id'>) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
    setOpenDialog(false); // Închide dialogul după adăugarea task-ului
  };

  const editTask = (id: number, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>Task Management</Typography>
      <Button 
      style={{marginBottom: '35px'}} 
      variant="contained" onClick={() => setOpenDialog(true)}>
        Add Task
      </Button>
      <TaskList tasks={tasks} onEdit={editTask} onDelete={deleteTask} />
      <TaskForm 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        onSubmit={ addTask} 
      />
    </Container>
  );
};

export default App;