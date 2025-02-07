import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
  beforeLoad: async () => {
    const token = localStorage.getItem('auth_token')
    if (!token) {
      throw redirect({
        to: '/login',
      })
    }
  },
})

function HomeComponent() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}
