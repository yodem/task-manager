import { createFileRoute } from '@tanstack/react-router'
import { useTask } from '../../../api/queries'
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Chip,
  Box,
} from '@mui/material'

export const Route = createFileRoute('/_authenticated/tasks/$taskId')({
  component: TaskDetailComponent,
})

function TaskDetailComponent() {
  const { taskId } = Route.useParams()
  const { data: task, isLoading, error } = useTask(taskId)

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">Error loading task</Alert>
      </Container>
    )
  }

  return (
    <Container sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {task?.description}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Chip
              label={task?.status}
              color={
                task?.status === 'DONE'
                  ? 'success'
                  : task?.status === 'IN_PROGRESS'
                    ? 'warning'
                    : 'default'
              }
            />
          </Box>
          <Typography color="textSecondary" gutterBottom>
            Due Date:{' '}
            {task?.dueDate && new Date(task.dueDate).toLocaleDateString()}
          </Typography>
          <Typography color="textSecondary">
            Assigned to: {task?.user.email}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}
