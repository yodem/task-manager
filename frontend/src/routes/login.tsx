import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { api } from '../api';
import { useAuth } from '../context/Auth';
import { Box, Button, TextField, Typography } from '@mui/material';

export const Route = createFileRoute('/login')({
    component: LoginComponent,
});

function LoginComponent() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<{ email: string; password: string }>();

    const loginMutation = useMutation({
        mutationFn: (data: { email: string; password: string }) =>
            api.login(data.email, data.password),
        onSuccess: (data) => {
            login(data.token);
            navigate({ to: '/' });
        },
    });

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
            <Typography variant="h4" gutterBottom>Login</Typography>
            <form onSubmit={handleSubmit((data) => loginMutation.mutate(data))}>
                <TextField
                    {...register('email')}
                    label="Email"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    {...register('password')}
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={loginMutation.isPending}
                >
                    Login
                </Button>
            </form>
        </Box>
    );
}
