import { Toolbar } from '@mui/material';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import React from 'react';

const TB: React.FC<AppBarProps> = ({ children, ...appBar }) => {
    return (<AppBar position="static" {...appBar}>
        <Toolbar variant="dense">
            {children}
        </Toolbar>
    </AppBar>)

}

export default TB;

