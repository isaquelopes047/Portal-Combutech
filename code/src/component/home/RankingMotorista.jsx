import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FaTruck } from "react-icons/fa";
import { CgAlignMiddle } from "react-icons/cg";
import { BsPeopleFill } from "react-icons/bs";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
};

const rowsTableOne = [
    createData('1780', 'Carreta Trucada',  'ABC-1234', '5,472'),
    createData('46', 'Carreta Simples', 'XYZ-9876', '5,743'),
    createData('205', 'Truck', 'ABC-1234', '5,000'),
    createData('2117', 'Truck', 'GHI-4321', '3,590'),
    createData('205', 'Truck', 'ABC-1234', '5,000'),
    createData('2117', 'Truck', 'GHI-4321', '3,590'),
];

const rowsTableTwo = [
    createData('Maria da Silva',),
    createData('João Oliveira',),
    createData('Ana Souza',),
    createData('Pedro Santos',),
    createData('Pedro Santos',),
    createData('Pedro Santos',),
];

const DefaultContainer = {
    width: '100%',
    height: 'auto',
    backgroundColor: 'transparent',
    marginTop: '30px',
    borderRadius: '10px',
    paddingTop: '1px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',

    titleChart: {
        marginLeft: '30px',
        marginTop: '20px',
    },

    defaultScroll: {
        width: '100%',
        height: '360px',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
            width: '5px', // largura da barra de rolagem
        },
        '&::-webkit-scrollbar-track': {
            background: '#f1f1f1', // cor de fundo da área de rastreamento
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#cfcfcf', // cor do thumb (barra de rolagem)
        },
    }
};

const RankingMotoristas = () => {
    return (
        <>
            <div style={DefaultContainer}>
                <TableContainer component={Paper} style={{ width: '49%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                    <Box sx={{ ...DefaultContainer.defaultScroll }}>
                        <Box sx={{ margin: '20px', }}>
                            <Typography> Ranking de Frotas </Typography>
                        </Box>
                        <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Frota</TableCell>
                                    <TableCell align="right">Segmento</TableCell>
                                    <TableCell align="right">Placa</TableCell>
                                    <TableCell align="right">Média</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowsTableOne.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <FaTruck /> {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right"><CgAlignMiddle /> {row.carbs}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </TableContainer>

                <TableContainer component={Paper} style={{ width: '49%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                    <Box sx={{ ...DefaultContainer.defaultScroll }}>
                        <Box sx={{ margin: '20px', }}>
                            <Typography> Ranking de Motoristas </Typography>
                        </Box>
                        <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome completo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowsTableTwo.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <BsPeopleFill /> {row.name}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </TableContainer>
            </div>
        </>
    );
};

export default RankingMotoristas;
