import React from 'react';
import { ListItem } from '@mui/material';
import classnames from "classnames";
import "./list.css";

const LI: React.FC<{ handleChoose: () => void, isChosen: boolean }> = ({ handleChoose, isChosen, children }) => {

    return <ListItem className={classnames("listItem", isChosen && "chosenListItem")} onClick={handleChoose}>{children}</ListItem>
}

export default LI;

