'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { ListItem, Button, Stack, Menu, MenuItem, ListItemButton, ListItemText, ListItemIcon, Tooltip, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
//import InboxIcon from '@mui/icons-material/MoveToInbox';
//import MailIcon from '@mui/icons-material/Mail';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useSelectedLayoutSegment } from 'next/navigation';

import Image from 'next/image';
import { menus, type Item_menu } from '../basics/MenuItems';

import Logout from "@/components/ui/auth/signout";

export default function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    let user = null; // email, password, name
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
    );

    //const pathname = usePathname();
    //const pathDirect = pathname;
    const segment = useSelectedLayoutSegment();

    return (
        <Box sx={{ flexGrow: 1, mt: 1, mb: 1 }}>
            <AppBar position="static" style={{
                backgroundColor: "transparent", // transparent, gray
                color: "black",
                boxShadow: "1px 1px 0px 0px"

            }}>
                <Toolbar>
                    <Image
                        src='/images/logo-resetting-cropped.png'
                        width={50}
                        height={50}
                        alt="Resetting logo"
                        priority
                    />
                    <Tooltip title="Start" placement="bottom-end" arrow>
                        <Button component={Link} variant="text" disableElevation href="/" color="inherit"
                        >
                            Resetlytics
                        </Button>
                    </Tooltip>
                    <Stack sx={{ paddingLeft: 6 }} direction="row" spacing={4}>
                        {menus.map((section) => (
                            <List
                                //component='nav' sx={{ pt: 0 }}
                                dense={true}
                                key={section.name}
                            >
                                <Typography>{section.name}</Typography>
                                {section.items.map((item) => (

                                    <Tooltip key={item.id} title={item.description} placement="right-start" arrow>
                                        <ListItemButton
                                            key={item.slug}
                                            disableGutters={true}
                                            sx={{ padding: 0 }}
                                            component={Link}
                                            href={`/${item.slug}`}
                                            selected={segment === `/${item.slug}`}
                                        >
                                            <ListItemText secondary={item.name} />
                                        </ListItemButton>
                                    </Tooltip>
                                ))}
                            </List>
                        ))}
                    </Stack>
                    <Box sx={{ paddingLeft: 4 }}>
                        {user && (<Logout />)}
                        {!user && (
                            <>
                            <Link
                                href="/login"
                            >
                            Sign In
                            </Link>
                                    <IconButton
                                        size="large"
                                        sx={{ paddingLeft: 1 }}
                                        edge="end"
                                    >
                                        <LoginOutlinedIcon />
                                    </IconButton>
                                </>
                                )
                        }
                        <Tooltip title="User" placement="bottom-end" arrow>
                            <IconButton // ver a app do Modernize-nextjs.free
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                                sx={{ paddingLeft: 2 }}
                            >
                                <AccountCircle />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
                <Divider />
            </AppBar>
            {renderMenu}
        </Box>
    );
}

// variant="contained"  disableElevation 
// href={`/${item.slug}`}
/*
import { redirect } from "next/navigation";

const HomePage = async () => {
    const session = await auth();

    if (!session?.user) redirect("/");

    return (
        <div className="flex flex-col items-center m-4">
            {session?.user?.name && session?.user?.image ? (
        
*/