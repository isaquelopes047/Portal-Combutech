
import React, { useState, useEffect } from 'react';
import UtilBar from "../../UtilBar/UtilBar";
import PrimatyTable from "../../Tables/PrimatyTable";
import OptionsButton from "../../OptionButton";
import DefautlLoadingTable from '../../loadings/loadingsTables/defaultLoadingTables';
import base from '../../../hooks/BaseUrlApi';
import Cookies from 'js-cookie';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { FaRegFilePdf } from "react-icons/fa";
import { RiFileExcelLine } from "react-icons/ri";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { BiSolidArrowFromTop } from "react-icons/bi";
import { FaPencil } from "react-icons/fa6";
import { TbEyeSearch } from "react-icons/tb";
import { FaFilter } from "react-icons/fa";
import { BiSolidArrowToTop } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";

const columns = [
    { id: 'Options', label: `Opções`, minWidth: 0 },
    { id: 'motoristanome', label: 'Nome Completo', minWidth: 170 },
];

export default function MainAbastecimentoIntegrado() {

    const [pagina, setPagina] = useState(1);
    const [countPages, setCountPages] = React.useState(10);
    const [sortedRows, setSortedRows] = useState([]);
    const [dadosOriginais, setDadosOriginais] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [allDados, setAllDados] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedRow, setSelectedRow] = useState(null);
    const [dadosLoading, setDadosLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const iconsSize = 25;

    const handleChange = (event) => {
        setCountPages(event.target.value);
    };

    const handleAdd = () => {
        setPagina(prevPagina => Math.max(prevPagina + 1, 1));
    };

    const handleReduce = () => {
        setPagina(prevPagina => Math.max(prevPagina - 1, 1));
    };

    const handleOpen = (row) => {
        setOpen(true);
        setSelectedRow(row);
    };

    const sortRows = (property) => {
        const sorted = [...sortedRows].sort((a, b) => {
            const comparison = a[property] - b[property];
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        setSortedRows(sorted);
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleRowDetalhes = (idAbastecimento) => {
        const rowData = sortedRows.find(row => row.abastecimentoId === idAbastecimento);
        navigate(`/auth/abastecimentos/integrados/edit/${idAbastecimento}`, {
            state: { dados: rowData }
        });
    };

    const handleChangeFiltro = (event) => {
        const valorFiltro = event.target.value;
        setFiltro(valorFiltro);
    };

    /* GET dos dados */
    useEffect(() => {
        const buscarDados = async () => {
            try {
                const transportadoraValue = Cookies.get('transportadoraId');
                const url = `${base.URL_BASE_API}/Motorista/BuscaMotoristasPorTransportadora/${transportadoraValue}`;
                const authToken = localStorage.getItem('authToken');
                const headers = { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' };

                // Removendo o corpo da requisição
                const response = await fetch(url, {
                    method: 'GET',
                    headers: headers
                });

                if (!response.ok) {
                    throw new Error(`Erro na requisição. Código de status: ${response.status}`);
                };

                const data = await response.json();

                const sortedData = [...data.data].reverse();

                setSortedRows(sortedData);
                setDadosOriginais(sortedData);

            } catch (error) {
                console.error(error);
            } finally {
                setDadosLoading(false);
            }
        };
        buscarDados();
    }, [pagina, countPages]);

    useEffect(() => {
        // Filtrar os dados com base no filtro
        if (filtro.trim() === '') {
            setSortedRows(dadosOriginais);
        } else {
            const linhasFiltradas = dadosOriginais.filter(row => {
                return Object.values(row).some(value => {
                    if (value !== null && value !== undefined) {
                        return value.toString().toLowerCase().includes(filtro.toLowerCase());
                    }
                    return false;
                });
            });
            setSortedRows(linhasFiltradas);
        }
    }, [filtro, dadosOriginais]);

    return <>
        <UtilBar titleButton={<GiHamburgerMenu />}>
            <MenuItem>
                <a href="/auth/abastecimentos/integrados/cad">
                    <FaPlusCircle size={iconsSize} />
                    Criar Registro
                </a>
            </MenuItem>
            <MenuItem>
                <FaRegFilePdf size={iconsSize} />
                Gerar PDF
            </MenuItem>
            <MenuItem>
                <RiFileExcelLine size={iconsSize} />
                Gerar Excell
            </MenuItem>
        </UtilBar>

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0' }} data-aos="fade-up">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <OptionsButton titleOption={<FaFilter />}>
                    <MenuItem onClick={() => sortRows('motoristaid')}>
                        <BiSolidArrowToTop />
                        Crescente
                    </MenuItem>
                    <MenuItem onClick={() => sortRows('motoristaid')}>
                        <BiSolidArrowFromTop />
                        Descrecente
                    </MenuItem>
                </OptionsButton>

                <TextField
                    helperText=" "
                    id="outlined-basic"
                    variant="outlined"
                    label="Pesquisar"
                    InputProps={{
                        startAdornment: (
                            <SearchIcon sx={{ marginRight: 1, color: 'action.active' }} />
                        ),
                    }}
                    sx={{ width: '260px' }}
                    value={filtro}
                    onChange={handleChangeFiltro}
                />
            </div>
            {dadosLoading ? (
                <DefautlLoadingTable />
            ) : (
                <PrimatyTable
                    dadosCollunas={columns}
                    dadosRows={sortedRows}
                    rowsLength={sortedRows.length}
                    idChavePrincipal='motoristaid'
                    idKey="motoristaid"
                    more={handleAdd}
                    less={handleReduce}
                    numberPage={pagina}
                    quantidadeRegistro={countPages}
                    handleChange={handleChange}
                    opcoesSubMenu={(rowId) => (
                        <>
                            <MenuItem onClick={() => handleRowDetalhes(rowId)} style={{ display: 'flex', alignItems: 'center', }}>
                                <FaPencil size={15} />
                                Editar
                            </MenuItem>
                            <MenuItem onClick={() => handleOpen(sortedRows[rowId])} style={{ display: 'flex', alignItems: 'center', }}>
                                <TbEyeSearch size={20} />
                                Observações
                            </MenuItem>
                        </>
                    )}
                />
            )}

        </div>
    </>
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

const MenuItem = styled(BaseMenuItem)(({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }
  `,
);

