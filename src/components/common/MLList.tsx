import React, { useState } from 'react';
import { DataGrid, GridColumns, GridRowData } from '@mui/x-data-grid';
import { ClearOutlined } from '@mui/icons-material';

import "./list.css";
import CategoriesPicker from './CategoriesPicker';

type Props = {
    columns: GridColumns,
    rows: GridRowData[],
    handleChooseRow: (row: GridRowData) => void,
    handleSearch?: (text?: string) => void
    clearSearch?: () => void
}

type SearchProps = {
    title: string,
    category: string,
    onSelect: (text: string) => void,
    clear: () => void
}
const MLList: React.FC<Props> = ({ rows, columns, handleChooseRow, handleSearch, clearSearch }) => {

    const Search: React.FC<SearchProps> = ({ clear, ...props }) => {

        return (
            <div className="search">
                <CategoriesPicker {...props} />
                <ClearOutlined onClick={clear} />
            </div>
        )
    }
    const [searchText, setSearchText] = useState<string | undefined>('');

    const activateSearch = (text?: string) => {
        setSearchText(text);
        handleSearch && handleSearch(text)
    }

    return <div className="list-container">
        <DataGrid
            components={handleSearch && { Toolbar: Search }}
            componentsProps={{
                toolbar: {
                    title: "Filter by category",
                    category: searchText,
                    onSelect: (text: string) => activateSearch(text),
                    clear: () => activateSearch()
                },
            }}
            rows={rows}
            columns={columns}
            disableColumnSelector
            onRowClick={(item) => {
                handleChooseRow(item.row);

            }}
        />
    </div>
}

export default MLList;

