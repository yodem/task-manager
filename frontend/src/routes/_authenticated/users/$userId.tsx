import { createFileRoute } from '@tanstack/react-router'
import { useUser } from '../../../api/queries'
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material'

export const Route = createFileRoute('/_authenticated/users/$userId')({
  component: UserDetailsComponent,
})

function UserDetailsComponent() {
  const { userId } = Route.useParams()
  const { data: user, isLoading, error } = useUser(userId)

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error || !user) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">Error loading user details</Alert>
      </Container>
    )
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Details
      </Typography>
      <Box>
        <Typography variant="h6">Email: {user.email}</Typography>
        <Typography variant="body1">
          Number of tasks: {user.tasks.length}
        </Typography>
      </Box>
    </Container>
  )
}
