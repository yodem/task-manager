import { createFileRoute } from '@tanstack/react-router'
import { useUsers } from '../../../api/queries'
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material'
import { RouterButton } from '../../../components/RouterComponents'

export const Route = createFileRoute('/_authenticated/users/')({
  component: UsersListComponent,
})

function UsersListComponent() {
  const { data: users, isLoading, error } = useUsers()

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
        <Alert severity="error">Error loading users</Alert>
      </Container>
    )
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Users
      </Typography>
      <List>
        {users?.map((user) => (
          <ListItem key={user.id} disablePadding>
            <RouterButton
              fullWidth
              sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
              to={'/users/$userId'}
              params={{ userId: user.id }}
            >
              <ListItemText
                primary={user.email}
                secondary={`Tasks: ${user.tasks.length}`}
              />
            </RouterButton>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}
