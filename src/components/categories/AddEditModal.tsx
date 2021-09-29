import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, DialogContent } from '@mui/material';
import { selectCurrentCategory, selectIsModalType, addCategory, updateCategory, selectIsInputModalOpen, closeModal } from '../../slices/CategoriesSlice';
import ActionModal from '../common/ActionModal';

const AddEditModal: React.FC = () => {
    const currentCategory = useSelector(selectCurrentCategory);
    const modalType = useSelector(selectIsModalType);
    const isModalOpen = useSelector(selectIsInputModalOpen)
    const dispatch = useDispatch();
    const [newCategory, setNewCategory] = useState<string>(currentCategory || "");
    const onClose = () => {
        setNewCategory("");
        dispatch(closeModal())
    }

    useEffect(() => {
        currentCategory && modalType === "edit" && setNewCategory(currentCategory);
    }, [currentCategory, modalType])

    const handleSave = () => {
        dispatch(modalType === "add" ? addCategory(newCategory) : updateCategory(currentCategory || "", newCategory))
    }

    return <ActionModal
        isModalOpen={isModalOpen}
        onAction={handleSave}
        onClose={onClose}
        title={`${modalType} category`}
        content={
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Category name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={newCategory}
                    onChange={(e) => {
                        setNewCategory(e.target.value)
                    }}
                />
            </DialogContent>
        }
        disabled={newCategory === ""}
        actionName="Save"
    />
}

export default AddEditModal;

