import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Task } from '../types';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id'>) => void;
  initialTask?: Task | null; 
}

const TaskForm: React.FC<TaskFormProps> = ({ open, onClose, onSubmit, initialTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [status, setStatus] = useState<'To Do' | 'In Progress' | 'Completed'>('To Do');


  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setDueDate(initialTask.dueDate);
      setStatus(initialTask.status);
    } else {

      setTitle('');
      setDescription('');
      setDueDate(null);
      setStatus('To Do');
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, dueDate, status });
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due Date"
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
              sx={{ mb: 2 }}
            />
          </LocalizationProvider>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'To Do' | 'In Progress' | 'Completed')}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {initialTask ? 'Update Task' : 'Add Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;