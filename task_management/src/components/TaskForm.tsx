import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Task } from '../types';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id'>) => void;
  initialTask?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ open, onClose, onSubmit, initialTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [status, setStatus] = useState<'To Do' | 'In Progress' | 'Completed'>('To Do');

  // Efect pentru a preumple formularul cu datele din `initialTask`
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setDueDate(initialTask.dueDate);
      setStatus(initialTask.status);
    } else {
      // Resetează formularul dacă nu există `initialTask`
      setTitle('');
      setDescription('');
      setDueDate(null);
      setStatus('To Do');
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, dueDate, status });
    if (!initialTask) {
      setTitle('');
      setDescription('');
      setDueDate(null);
      setStatus('To Do');
    }
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
            multiline // Activează textarea
            rows={4} // Numărul de rânduri vizibile
            sx={{ mb: 2 }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due Date"
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
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