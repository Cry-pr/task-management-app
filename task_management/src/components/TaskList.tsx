import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Task } from '../types';
import FilterTasks from './FilterTasks';
import SortTasks from './SortTasks';

interface TaskListProps {
  tasks: Task[];
  onEdit: (id: number, task: Partial<Task>) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  const [statusFilter, setStatusFilter] = React.useState<string>('All');
  const [sortOrder, setSortOrder] = React.useState<string>('asc');

  // Filtrare sarcini după status
  const filteredTasks = tasks.filter(task => 
    statusFilter === 'All' ? true : task.status === statusFilter
  );

  // Sortare sarcini după dată
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime();
    } else {
      return new Date(b.dueDate!).getTime() - new Date(a.dueDate!).getTime();
    }
  });

  return (
    <div>
        <div style={{display: 'flex', gap: '10px'}}>
      <FilterTasks 
        statusFilter={statusFilter} 
        onStatusFilterChange={setStatusFilter} 
      />
      <SortTasks 
        sortOrder={sortOrder} 
        onSortOrderChange={setSortOrder} 
      />
      </div>
      <Grid container spacing={3}>
        {sortedTasks.length === 0 ? (
          <Typography variant="body1" sx={{ ml: 2 }}>No tasks available.</Typography>
        ) : (
          sortedTasks.map(task => (
            <Grid item key={task.id} xs={12} sm={6} md={4}>
              <Card sx={{ width: 300, height: 230, display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {task.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom 
                  sx={{
                         display: '-webkit-box',
                         WebkitBoxOrient: 'vertical',
                         WebkitLineClamp: 2, // Setează numărul maxim de linii
                          overflow: 'hidden',
                    }}>
                    {task.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Due: {task.dueDate?.toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {task.status}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Button 
                    onClick={() => {onEdit(task.id, task)}} 
                    variant="contained" 
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button 
                    onClick={() => onDelete(task.id)} 
                    variant="outlined"
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default TaskList;