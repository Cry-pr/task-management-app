import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';


interface FilterTasksProps {
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}

const FilterTasks: React.FC<FilterTasksProps> = ({ statusFilter, onStatusFilterChange }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <FormControl fullWidth>
        <InputLabel>Filter by Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as string)}
          label="Filter by Status"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterTasks;