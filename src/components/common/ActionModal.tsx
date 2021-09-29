import React, { ReactNode } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

interface Props {
    onAction: () => void;
    onClose: () => void;
    title: string;
    content?: ReactNode;
    disabled?: boolean;
    actionName: string;
    isModalOpen: boolean;
}
const ActionModal: React.FC<Props> = ({ onAction, onClose, title, content, disabled, actionName, isModalOpen }) => {
    const handleCloseModal = () => {
        onClose();
    }

    const handleAction = () => {
        onAction();
        handleCloseModal();
    }

    return <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{title}</DialogTitle>
        {content}
        <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button disabled={disabled} onClick={handleAction}>{actionName}</Button>
        </DialogActions>
    </Dialog>

}

export default ActionModal;

