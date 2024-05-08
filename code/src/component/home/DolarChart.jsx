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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
};

const rows = [
    createData('OLEO DIESEL S10', '2.213.798', '12.112.799,96', '5,472'),
    createData('OLEO DIESEL S500', '1.788,80', '10.272,58', '5,743'),
    createData('ARLA 32', '6,00', '510,00', '85,000'),
    createData('ARLA', '842,70', '3.025,17', '3,590'),
    createData('', '2.216.435,70', '12.126.607,71', '5,471'),
];

const DefaultContainer = {
    width: '100%',
    height: 'auto',
    backgroundColor: '#fff',
    marginTop: '30px',
    borderRadius: '10px',
    paddingTop: '1px',

    titleChart: {
        marginLeft: '30px',
        marginTop: '20px',
    }
};

const RankingProdutos = () => {
    return (
        <>
            <div style={DefaultContainer}>
                <TableContainer component={Paper}>
                    <Box sx={{ margin: '20px', }}>
                        <Typography> Ranking de Produtos </Typography>
                    </Box>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Produtos</TableCell>
                                <TableCell align="right">Volume (L)</TableCell>
                                <TableCell align="right">Custo Total (R$)</TableCell>
                                <TableCell align="right">Preço Médio/L</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export default RankingProdutos;
