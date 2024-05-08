import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { styled } from '@mui/system';
import { FiMenu } from "react-icons/fi";
import TablePaginationDefault from '../menu/TablePagination';

function OptionsButton({ opcoesSubMenu, row }) {
    return (
        <Dropdown>
            <MenuButton sx={{ 
                width: '40px', 
                height: '40px', 
                padding: 0, 
                backgroundColor: '#ffffff', 
                border: 'none', 
                    '&:hover': { backgroundColor: '#f8f8f8' } 
                }}>
                <FiMenu size={15} color='#23638d' />
            </MenuButton>
            <Menu slots={{ listbox: Listbox }} style={{ width: '50px' }}>
                {opcoesSubMenu(row)}
            </Menu>
        </Dropdown>
    );
}

/* 
    PROPS:

    dadosCollunas: (Set the columns of the table in importation)
    dadosRows: (Set the rows of the table in importation)
    rowsLength: (Definition for the pagination)
    directionLink: (Link for to custom rota in the click on button of the edition)
*/  

export default function PrimatyTable({ dadosCollunas, dadosRows, rowsLength, opcoesSubMenu, idChavePrincipal, more, less, numberPage, quantidadeRegistro, handleChange }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(30);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }} style={{
                maxHeight: 400,
                overflowY: 'auto',
                overflowX: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: '#a8a8a8 #ffffff',
            }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {dadosCollunas.map((column) => (
                                <TableCell
                                    key={column.id}
                                    sx={{ minWidth: column.minWidth, fontWeight: 'bold', paddingLeft: 0.5 }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dadosRows && dadosRows.length > 0 ? (
                            dadosRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.Modelo}>
                                        {dadosCollunas.map((column, columnIndex) => {

                                            const value = row[column.id];
                                            const idKey = idChavePrincipal;
                                            const idValue = row[idKey];

                                            return (
                                                <TableCell key={column.id} align={column.align} sx={{ padding: 0.5 }}>
                                                    {columnIndex === 0 ? (
                                                        <OptionsButton row={idValue} opcoesSubMenu={opcoesSubMenu} />
                                                    ) : (
                                                        column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={dadosCollunas.length + 1}>Nada a apresentar!</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePaginationDefault 
                more={more} 
                less={less} 
                numberPage={numberPage} 
                quantidadeRegistro={quantidadeRegistro} 
                handleChange={handleChange}
            />
        </Paper>
    );
}

const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#99CCF3',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E6',
    700: '#0059B3',
    800: '#004C99',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Listbox = styled('ul')(({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  z-index: 1;
  `,
);

const MenuButton = styled(BaseMenuButton)(({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
  `,
);
