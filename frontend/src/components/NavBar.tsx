import * as React from 'react';
import { AppBar, Toolbar, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { RouterButton } from './RouterComponents';

export const NavBar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = React.useState(false);

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                </Box>
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
                    <RouterButton color="inherit" to="/users">Users</RouterButton>
                    <RouterButton color="inherit" to="/tasks">Tasks</RouterButton>
                    {/* Add more RouterButtons as needed */}
                </Box>
            </Toolbar>
        </AppBar>
    );
};
