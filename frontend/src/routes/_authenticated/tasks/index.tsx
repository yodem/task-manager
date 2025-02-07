import { createFileRoute } from '@tanstack/react-router'
import { useTasks } from '../../../api/queries'
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Chip,
  Grid,
} from '@mui/material'

export const Route = createFileRoute('/_authenticated/tasks/')({
  component: TasksListComponent,
})

function TasksListComponent() {
  const { data: tasks, isLoading, error } = useTasks()
  const navigate = Route.useNavigate()
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
        <Alert severity="error">Error loading tasks</Alert>
      </Container>
    )
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tasks
      </Typography>
      <Grid container spacing={2}>
        {tasks?.map((task) => (
          <Grid item xs={12} md={6} lg={4} key={task.id}>
            <Card>
              <CardContent
                onClick={() =>
                  navigate({
                    to: `/tasks/${task.id}`,
                    params: { taskId: task.id },
                  })
                }
                sx={{ cursor: 'pointer' }}
              >
                <Typography variant="h6" gutterBottom>
                  {task.description}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </Typography>
                <Typography color="textSecondary">
                  Assigned to: {task.user.email}
                </Typography>
                <Chip
                  label={task.status}
                  color={
                    task.status === 'DONE'
                      ? 'success'
                      : task.status === 'IN_PROGRESS'
                        ? 'warning'
                        : 'default'
                  }
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
