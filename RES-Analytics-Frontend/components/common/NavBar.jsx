'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Grid } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Image from 'next/image'
import Link from 'next/link'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useLogoutMutation } from '@/redux/features/authApiSlice';
import { logout as setLogout } from '@/redux/features/authSlice';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';


const navLinks = [
    { name: 'Forecast', link: '/General/Forecast', submenu: 0 },
    { name: 'Service Quality', link: '/General/SQ', submenu: 0 },
    {
        name: 'Sentiment', link: '/General/SA', submenu: 0
    },
    { name: 'Sustainability', link: '/General/Sustainability', submenu: 0 },
    { name: 'Help', link: '/General/Help', submenu: 0 },
]

function WebNavLinks(props) {
    return (
        <ToggleButtonGroup
            value={props.pathname.split("/").length > 3 ? props.pathname.split("/").slice(0,3).join("/") : props.pathname}
            exclusive
        >
            {props.navLinks.map(function (item) {
                return (<ToggleButton
                    key={item.name}
                    value={item.link}
                    className={`nav_link`}
                    sx={{
                        my: 1,
                        mx: 5,
                        color: 'black',
                        fontFamily: 'inter',
                        fontWeight: 600,
                        fontSize: 18,
                        display: 'block',
                        textTransform: 'capitalize',
                        border: 'none',
                        outline: 'none',
                        "&:hover": { backgroundColor: "#FFFFFF" },
                        "&.MuiToggleButton-root.Mui-selected": {
                            color: "#46b3c2",
                            backgroundColor: "transparent",
                        },
                    }}
                >

                    {item.submenu != 0 ? (
                        <>
                            <Link href={item.link} className='py-5' aria-controls="menu-appbar"
                        aria-haspopup="true" onMouseEnter={(event) => props.handleOpenSubMenu(event)}>
                                {item.name}
                            </Link>
                            <SubMenu anchorElSubmenu={props.anchorElSubmenu} handleCloseSubMenu={props.handleCloseSubMenu} submenu={item.submenu} />
                        </>   
                    ) :
                        (<Link href={item.link} className='py-5'  >
                            {item.name}
                        </Link>
                        )}


                </ToggleButton>)
            })}
        </ToggleButtonGroup>
    )
}

function SubMenu(props) {
    return (
        <Menu
            id="menu-appbar"
            anchorEl={props.anchorElSubmenu}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={Boolean(props.anchorElSubmenu)}
            onClose={props.handleCloseSubMenu}
            onClick={props.handleCloseSubMenu}
            sx={{
                display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' },
            }}
        >


            {props.submenu.map((item) => (
                <Link key={item.name} href={item.link}>
                    <MenuItem key={item.name} onClick={props.handleCloseSubMenu} className='md:hover:text-res_blue sm:hover:text-res_blue md:active:text-res_blue sm:active:text-res_blue'>
                        <Typography textAlign="center">
                            {item.name}
                        </Typography>
                    </MenuItem>
                </Link>
            ))}
        </Menu>
    )
}

function ResponsiveAppBar() {
    const pathname = usePathname()
    const dispatch = useAppDispatch();
    const [logout] = useLogoutMutation();
    const { isAuthenticated } = useAppSelector(state => state.auth);
    const { data: user } = useRetrieveUserQuery();


    const [selectedLink, setSelectedLink] = React.useState(pathname);


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElSubmenu, setAnchorElSubmenu] = React.useState(null);

    const handleLogout = () => {
        logout(undefined)
            .unwrap()
            .then(() => {
                dispatch(setLogout());
            });
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleOpenSubMenu = (event) => {
        setAnchorElSubmenu(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseSubMenu = () => {
        setAnchorElSubmenu(null);
    };


    const handleSelectedLink = (event, newSelectedLink) => {
        if (newSelectedLink !== null) {
            setSelectedLink(newSelectedLink);
        }
    };

    function NavBarLogo() {
        return (
            <Link href="/" className="flex-center" onClick={() => handleSelectedLink('-1')} >
                <Image src='/assets/images/RES.png'
                    alt='RESETTING Logo'
                    width={25}
                    height={25}
                    className='m-3' />
                <Typography whiteSpace={'nowrap'}
                    variant="h5"
                    sx={{
                        display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex', },
                        fontFamily: 'inter',
                        fontWeight: 700,
                        color: 'black',
                        textDecoration: 'none',
                    }}
                >
                    RES-Analytics
                </Typography>
            </Link>
        )
    }

    

    

    function MobileNavLinks() {
        return (
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' },
                }}
            >
                {navLinks.map((item) => (
                    <Link key={item.name} href={item.link}>
                        <MenuItem key={item.name} onClick={handleCloseNavMenu} className='md:hover:text-res_blue sm:hover:text-res_blue md:active:text-res_blue sm:active:text-res_blue'>
                            <Typography textAlign="center">
                                {item.name}
                            </Typography>
                        </MenuItem>
                    </Link>

                ))}
            </Menu>
        )
    }



    return (
        <AppBar position="static" style={{ background: '#FFFFFF', boxShadow: "none" }} >
            <Container maxWidth="xl" >
                <Toolbar disableGutters>

                    {/* NAVBAR LOGO */}
                    <NavBarLogo />


                    {/* SMALL DEVICE NAVBAR */}
                    <Box whiteSpace={'nowrap'} sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="black"
                        >
                            <MenuIcon />
                        </IconButton>
                        <MobileNavLinks />
                    </Box>

                    {/* NORMAL DEVICE NAVBAR */}
                    <Box whiteSpace={'nowrap'} justifyContent="center" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex', } }}>
                        <WebNavLinks  selectedLink={selectedLink} 
                        handleSelectedLink={handleSelectedLink} 
                        navLinks={navLinks} 
                        anchorElSubmenu={anchorElSubmenu}
                        handleOpenSubMenu={handleOpenSubMenu}
                        handleCloseSubMenu={handleCloseSubMenu}
                        pathname={pathname}/>
                    </Box>

                    {/* LOGIN/PROFILE Menu */}
                    {isAuthenticated ? (
                        <Box whiteSpace={'nowrap'} sx={{ flexGrow: 1 }}>
                            <Button onClick={handleOpenUserMenu}
                                sx={{
                                    my: 1,
                                    mx: 1,
                                    color: 'black',
                                    fontFamily: 'inter',
                                    fontWeight: 500,
                                    display: 'block',
                                    textTransform: 'capitalize',
                                    "&:hover": { backgroundColor: "#FFFFFF" }
                                }}
                            >
                                Username {user.username}
                                <ArrowDropDownIcon sx={{ color: 'black' }} />
                            </Button>

                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <Link href='/'>
                                    <MenuItem key='Profile' onClick={handleCloseUserMenu}>
                                        <Typography className='md:hover:text-res_blue sm:hover:text-res_blue md:active:text-res_blue sm:active:text-res_blue' textAlign="center">
                                            Profile
                                        </Typography>
                                    </MenuItem>
                                </Link>
                                <Link href='/'>
                                    <MenuItem key='Settings' onClick={handleCloseUserMenu}>
                                        <Typography className='md:hover:text-res_blue sm:hover:text-res_blue md:active:text-res_blue sm:active:text-res_blue' textAlign="center">
                                            Settings
                                        </Typography>
                                    </MenuItem>
                                </Link>

                                <Divider light />
                                <MenuItem key='logOut' onClick={() => {
                                    handleCloseUserMenu();
                                    handleLogout();
                                }}>
                                    <Typography sx={{ color: "red" }} textAlign="center">
                                        Log Out
                                    </Typography>
                                </MenuItem>

                            </Menu>
                        </Box>
                    ) : (
                        <Button
                            href='/auth/login'
                            whiteSpace={'nowrap'}
                            sx={{
                                fontFamily: 'inter',
                                fontWeight: 700,
                                color: 'black',
                                textTransform: 'capitalize',

                            }} className="text-white bg-res_blue hover:bg-transparent hover:text-res_blue">
                            Log In
                        </Button>
                    )}
                </Toolbar>
                <Divider />

            </Container>
        </AppBar>

    );
}
export default ResponsiveAppBar;    