import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

interface SortTasksProps {
  sortOrder: string;
  onSortOrderChange: (order: string) => void;
}

const SortTasks: React.FC<SortTasksProps> = ({ sortOrder, onSortOrderChange }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <FormControl fullWidth>
        <InputLabel>Sort by Due Date</InputLabel>
        <Select
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value as string)}
          label="Sort by Due Date"
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortTasks;