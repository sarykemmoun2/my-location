import Button, { ButtonProps } from '@material-ui/core/Button'
import React from 'react';

const Btn: React.FC<ButtonProps> = ({ title, color = "inherit", ...props }) => {
    return (<Button color={color} {...props} >
        {title}
    </Button>)
}

export default Btn;

