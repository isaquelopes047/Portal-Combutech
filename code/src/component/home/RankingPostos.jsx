import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import base from '../../hooks/BaseUrlApi';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { GoPersonFill } from "react-icons/go";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { RiFileExcelLine } from "react-icons/ri";
import * as XLSX from 'xlsx';

const defaultPosition = {
    marginRight: '10px',
    color: '#555555',
}

const DefaultContainer = {
    width: '49%',
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

const RankingPostos = ({ transportadoraId, dataInicial, dataFinal, quantidadeRegistro }) => {

    const [rankingPostos, setRankingPostos] = React.useState([]);
    const [loading, setLoading] = useState(true);

    const downloadExcel = () => {
        const excelData = rankingPostos.map((driver) => ({
            "Razao social": driver.posto.postorazaosocial,
            "CNPJ": driver.posto.postocnpj,
            "Litros": driver.litros,
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'rankingPostos');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'rankingPostos.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const IconBox = () => {
        return (
            <Box
                onClick={downloadExcel}
                style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#fff',
                    border: '1px solid #3b7c1d',
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}>
                <RiFileExcelLine color="#3b7c1d" />
            </Box>
        );
    };

    useEffect(() => {
        if (!dataInicial || !dataFinal) return;
        const fetchData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) return
            setLoading(true);
            try {
                const response = await fetch(`${base.URL_BASE_API}/Dashboard/BuscaDashboardRankingPostosAbastecimentosIntegrados`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        periodoInicial: dataInicial,
                        periodoFinal: dataFinal,
                        transportadoraId: [transportadoraId],
                        quantidadePorPagina: quantidadeRegistro,
                        pagina: 1,
                    }),
                });

                if (!response.ok) throw new Error('Erro ao buscar dados da API');

                const result = await response.json();
                setRankingPostos(result.data.ranking)

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [transportadoraId, dataInicial, dataFinal, quantidadeRegistro]);

    return (
        <>
            <div style={DefaultContainer}>
                <TableContainer component={Paper} style={{ width: '100%' }}>

                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box sx={{ ...DefaultContainer.defaultScroll, height: '400px' }}>
                            <Box sx={{
                                margin: '20px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <Box>
                                    <Typography>Ranking de Postos</Typography>
                                </Box>

                                <IconBox />
                            </Box>
                            <Table sx={{ minWidth: '100%' }} aria-label="ranking de motoristas">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Motorista</TableCell>
                                        <TableCell align="right">CPF</TableCell>
                                        <TableCell align="right">Litros</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rankingPostos.map((row, index) => (
                                        <TableRow key={index} sx={{ fontSize: '13px' }}>
                                            <TableCell sx={{ fontSize: '13px' }} align="left"><GoPersonFill style={{ ...defaultPosition }} />{row.posto.postorazaosocial}</TableCell>
                                            <TableCell sx={{ fontSize: '12px' }} align="right">{row.posto.postocnpj}</TableCell>
                                            <TableCell sx={{ fontSize: '13px' }} align="right"><BsFillFuelPumpFill style={{ ...defaultPosition }} />{row.litros}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    )}
                </TableContainer>
            </div>
        </>
    );
};

export default RankingPostos;
