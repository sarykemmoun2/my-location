import { Stack, Alert } from '@mui/material';
import React from 'react';

const ErrorAlert: React.FC<{ error: string, onClose: () => void }> = ({ error, onClose }) => {
    return <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error" onClose={onClose}>{error}</Alert>
    </Stack>
}

export default ErrorAlert;

