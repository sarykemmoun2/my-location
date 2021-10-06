import { Stack, Alert } from '@mui/material';
import React from 'react';

const ErrorAlert: React.FC<{ error: string | null, onClose: () => void }> = ({ error, onClose }) => {
    return error ? <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error" onClose={onClose}>{error}</Alert>
    </Stack> : null
}

export default ErrorAlert;

