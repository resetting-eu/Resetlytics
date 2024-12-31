'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Image from 'next/image'
import Link from 'next/link'

function Copyright() {
    return (
      <Typography whiteSpace={'nowrap'} variant="body2" color="text.secondary" sx={{display: { xs: 'none', md:'inline' }}}>
        {'Copyright © '}
        <Link className='md:hover:text-res_blue sm:hover:text-res_blue md:active:text-res_blue sm:active:text-res_blue' href="/">
             Resetlytics 
        </Link>
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const pages = [['TC', 'Terms & Conditions'],['Contact', 'Contact']];


function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [signInBool, setSignInBool] = React.useState(false)


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSignIn = () => {
        setSignInBool((current) => !current)
    }
    return (
        
        <Container maxWidth="xl" className='position:relative left:0 bottom:0'>
            <Divider />
            <Toolbar disableGutters>
                {/* NAVBAR LOGO */}
                <Link href="/" className="flex-center">
                    <Image src='/assets/images/RES.png'
                        alt='RESETTING Logo'
                        width={20}  
                        height={20}
                        className='m-3' />
                    <Typography whiteSpace={'nowrap'}
                        variant="h6"
                        sx={{
                            mr: 4,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'inter',
                            fontWeight: 700,
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        Resetlytics
                    </Typography>
                </Link>
                <Copyright />


                {/* NORMAL DEVICE NAVBAR */}
                <Box whiteSpace={'nowrap'} justifyContent="right" sx={{ flexGrow: 2, display: { xs: 'flex', md: 'flex', }, justifyContent:  {xs: 'flex-end' }}}>
                    {pages.map((page) => (
                        <Button
                            href={page[0]}
                            key={page}
                            onClick={handleCloseNavMenu}
                            className='md:hover:text-res_blue sm:hover:text-res_blue md:active:text-res_blue sm:active:text-res_blue'
                            sx={{
                                my: 3,
                                mx: 1,
                                color: 'black',
                                fontFamily: 'inter',
                                fontWeight: 500,
                                display: 'block',
                                textTransform: 'capitalize',
                                "&:hover": { backgroundColor: "#FFFFFF" }
                            }}
                        >
                            {page[1]}
                        </Button>
                    ))}
                </Box>

                
            </Toolbar>
            
        </Container>
        
    )
}

export default ResponsiveAppBar