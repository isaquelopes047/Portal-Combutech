import React, { useState, useEffect } from 'react';
import UtilBar from "../../UtilBar/UtilBar";
import base from '../../../hooks/BaseUrlApi';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import DefautlLoadingTable from '../../loadings/loadingsTables/defaultLoadingTables';
import PrimatyTable from "../../Tables/PrimatyTable";
import Checkbox from '@mui/material/Checkbox';

import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { GiHamburgerMenu } from "react-icons/gi";
import { styled } from '@mui/system';
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaPencil } from "react-icons/fa6";

const columns = [
    { id: 'Options', label: `Opções`, minWidth: 100 },
    { id: 'nome', label: `Email`, minWidth: 100 },
    { id: 'usuario', label: 'Usuario', minWidth: 100 },
    { id: 'perfil', label: 'Perfil', minWidth: 100 },
    { id: 'autorizado', label: 'Autorizado', minWidth: 100 },
];

export default function ListaUsuarios() {
    const [countPages, setCountPages] = React.useState(20);
    const [pagina, setPagina] = useState(1);
    const [sortedRows, setSortedRows] = useState([]);
    const [dadosOriginais, setDadosOriginais] = useState([]);
    const [isChecked, setIsChecked] = useState(true);
    const [filtro, setFiltro] = useState('');
    const [dadosLoading, setDadosLoading] = useState(true);
    const navigate = useNavigate();
    const iconsSize = 25;
    const label = {
        inputProps: {
            'aria-label': 'Checkbox demo',
            style: {
                cursor: 'not-allowed'
            }
        }
    };

    const handleChangeFiltro = (event) => {
        const valorFiltro = event.target.value;
        setFiltro(valorFiltro);
    };

    const handleChange = (event) => {
        setCountPages(event.target.value);
    };

    const handleAdd = () => {
        setPagina(prevPagina => Math.max(prevPagina + 1, 1));
    };

    const handleReduce = () => {
        setPagina(prevPagina => Math.max(prevPagina - 1, 1));
    };

    const handleRowDetalhes = (id) => {
        const rowData = sortedRows.find(row => row.id === id);
        const rowDataWithoutAutorizado = { ...rowData };
        delete rowDataWithoutAutorizado.autorizado;
        navigate(`/auth/usuarios/usuarios/edit/${id}`, {
            state: { dados: rowDataWithoutAutorizado }
        });
    };

    /* GET dos dados */
    useEffect(() => {
        const buscarDados = async () => {
            try {
                const url = `${base.URL_BASE_API}/users/BuscaUsuariosPortal`;
                const authToken = localStorage.getItem('authToken');
                const headers = { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' };
                const transportadoraId = {
                    quantidadePorPagina: countPages,
                    pagina: pagina,
                };
                const response = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(transportadoraId)
                });
                if (!response.ok) {
                    throw new Error(`Erro na requisição. Código de status: ${response.status}`);
                };
                const data = await response.json();

                const dadosFormatados = data.data.map(item => {
                    return {
                        ...item,
                        perfil: item.perfil.nome,
                        autorizado: item.autorizado ? <Checkbox {...label} checked={isChecked} sx={{ '& .MuiSvgIcon-root': { marginLeft: '-20px', } }} />
                            : <Checkbox {...label} checked={!isChecked} sx={{ '& .MuiSvgIcon-root': { marginLeft: '-20px', } }} />
                    };
                });

                setSortedRows(dadosFormatados);
                setDadosOriginais(dadosFormatados);

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
                    Criar Usuario
                </a>
            </MenuItem>
        </UtilBar>

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0' }} data-aos="fade-up">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                    idChavePrincipal='id'
                    idKey="id"
                    more={handleAdd}
                    less={handleReduce}
                    numberPage={pagina}
                    quantidadeRegistro={countPages}
                    handleChange={handleChange}
                    opcoesSubMenu={(idRow) => (
                        <>
                            <MenuItem onClick={() => handleRowDetalhes(idRow)}>
                                <FaPencil size={15} /> Editar
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

