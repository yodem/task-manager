import { Outlet, createRootRoute } from '@tanstack/react-router'
import { AuthProvider } from '../context/Auth'
import { Container, Box, Fade } from '@mui/material'
import { NavBar } from '../components/NavBar'
export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <AuthProvider>
      <NavBar />
      <Fade in={true} timeout={800}>
        <Container maxWidth="lg">
          <Box
            sx={{
              mt: 4,
              minHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Outlet />
          </Box>
        </Container>
      </Fade>
    </AuthProvider>
  )
}
