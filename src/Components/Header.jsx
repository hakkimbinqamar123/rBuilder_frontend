import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

function Header() {
    const content = "A Resume Builder App is an essential tool for job seekers looking to create polished and effective resumes. By combining ease of use with professional design options, these apps empower users to present their qualifications confidently and increase their chances of landing job interviews."
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ ml: 2 }}
                        >
                        <img style={{width:"50px"}} src='./src/assets/Images/resume.png'/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                           <Link to={"/"} style={{textDecoration:"none", color:"white", fontSize:"30px"}}>rBuilder</Link>
                        </Typography>
                        <Tooltip title={content}><Button color="inherit">ABOUT US</Button></Tooltip>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Header
