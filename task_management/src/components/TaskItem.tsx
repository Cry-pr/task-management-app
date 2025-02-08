import React, { useState } from 'react';
import { ListItem, ListItemText, Button, Dialog } from '@mui/material';
import TaskForm from './TaskForm';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onEdit: (id: number, task: Partial<Task>) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);

  const handleEdit = (updatedTask: Partial<Task>) => {
    onEdit(task.id, updatedTask); 
    setOpen(false); 
  };

  return (
    <>
      <ListItem>
        <ListItemText primary={task.title} secondary={`${task.description} - Due: ${task.dueDate?.toLocaleDateString()} - Status: ${task.status}`} />
        <Button onClick={() => setOpen(true)}>Edit</Button>
        <Button onClick={() => onDelete(task.id)}>Delete</Button>
      </ListItem>
      <Dialog open={open} onClose={() => setOpen(false)}>
  <TaskForm 
    open={open} 
    onSubmit={handleEdit}
    onClose={() => setOpen(false)}  
    initialTask={task}
  />
</Dialog>
    </>
  );
};

export default TaskItem;