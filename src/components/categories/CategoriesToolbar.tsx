import { AppBar, Button, Toolbar } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCategory, openModal, ModalType } from '../../slices/CategoriesSlice';

const CategoriesToolbar: React.FC = () => {
  const currentCategory = useSelector(selectCurrentCategory);
  const dispatch = useDispatch();

  const open = (type: ModalType) => {
    dispatch(openModal(type));
  }
  return (<AppBar position="static">
    <Toolbar variant="dense">
      <Button color="inherit" onClick={() => open("add")}>ADD</Button>
      {currentCategory && <>
        <Button color="inherit" onClick={() => open("edit")}>EDIT</Button>
        <Button color="inherit" onClick={() => open("delete")}>DELETE</Button>
      </>}
      <div className="toolbar-title">
        {currentCategory || "Categories"}
      </div>
    </Toolbar>
  </AppBar>)

}

export default CategoriesToolbar;

