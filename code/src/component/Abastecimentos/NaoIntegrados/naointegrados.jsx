import * as React from 'react';
import { useEffect } from 'react'
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaPencil } from "react-icons/fa6";
import { TbEyeSearch } from "react-icons/tb";
import { FaFilter } from "react-icons/fa";
import { BiSolidArrowToTop } from "react-icons/bi";
import { BiSolidArrowFromTop } from "react-icons/bi";
import PrimatyTable from "../../Tables/PrimatyTable";
import OptionsButton from "../../OptionButton";
import DefautlLoadingTable from '../../loadings/loadingsTables/defaultLoadingTables';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const columns = [
    { id: 'Options', label: `Opções`, minWidth: 100 },
    { id: 'laiData', label: 'Data abastecimento', minWidth: 170 },
    { id: 'laiPlacaVeiculo', label: 'Veículo', minWidth: 170 },
    { id: 'laicpfMotorista', label: 'CPF do Motorista', minWidth: 170 },
    { id: 'laiNomeMotorista', label: 'Motorista', minWidth: 170 },
    { id: 'laicnpjPosto', label: 'CNPJ do posto', minWidth: 170 },
    { id: 'laiRazaoPosto', label: 'Razão social', minWidth: 390 },
    { id: 'laiCodigoProduto', label: 'Codigo produto', minWidth: 170 },
    { id: 'laiLitros', label: 'Litros', minWidth: 170 },
    { id: 'laiValorUnitario', label: 'Valor Unitário', minWidth: 170 },
    { id: 'laikm', label: 'Quilometragem', minWidth: 170 },
    { id: 'laiNumeroDocumento', label: 'N° Documento', minWidth: 170 },
    { id: 'laiAbastecimentoIntegrado', label: 'Integrado', minWidth: 170 },
];

export default function MainAbastecimentoNaoIntegrado() {

    const [sortedRows, setSortedRows] = useState([]);
    const [dadosOriginais, setDadosOriginais] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedRow, setSelectedRow] = useState(null);
    const [dadosLoading, setDadosLoading] = useState(true);
    const [isChecked, setIsChecked] = useState(true);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const label = {
        inputProps: {
            'aria-label': 'Checkbox demo',
            style: {
                cursor: 'not-allowed'
            }
        }
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

    const updatedRows = sortedRows.map((row) => ({
        ...row,
        laiAbastecimentoIntegrado: (
            <div style={{ pointer: 'not-allowed'}}>
                {row.laiAbastecimentoIntegrado === 'True' ?
                    <Checkbox {...label} checked={isChecked} sx={{ '& .MuiSvgIcon-root': { marginLeft: '-20px'}}} /> :
                    <Checkbox {...label} checked={!isChecked} sx={{ '& .MuiSvgIcon-root': { marginLeft: '-20px'}}} />
                }
            </div>
        )
    }));

    const handleRowDetalhes = (laiCodigo) => {
        const rowData = sortedRows.find(row => row.laiCodigo === laiCodigo);
        navigate(`/auth/abastecimentos/naointegrados/edit/${laiCodigo}`, {
            state: { dados: rowData }
        });
    };

    const handleChangeFiltro = (event) => {
        const valorFiltro = event.target.value;
        setFiltro(valorFiltro);
    };

    /* GET dos dados */
    useEffect(() => {
        const url = 'http://localhost:86/api/IntegracaoAbastecimento/NaoIntegrados';
        const authToken = localStorage.getItem('authToken');
        const transportadoraValur = localStorage.getItem('transportadora')

        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        };

        const transportadoraId = {
            transportadoraId: [transportadoraValur]
        };

        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(transportadoraId)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na requisição. Código de status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const sortedData = [...data.data].sort((a, b) => {
                    const dateA = new Date(a.laiData.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}:\d{2}:\d{2})/, '$3-$2-$1T$4'));
                    const dateB = new Date(b.laiData.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}:\d{2}:\d{2})/, '$3-$2-$1T$4'));
                    return dateB - dateA;
                });
                console.log(data)
                setSortedRows(sortedData);
                setDadosOriginais(sortedData);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setDadosLoading(false);
            });
    }, []);

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
        {/* Importação da tabela recebendo os dados por props */}
        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <OptionsButton titleOption={<FaFilter />}>
                    <MenuItem onClick={() => sortRows('abastecimentoId')}>
                        <BiSolidArrowToTop />
                        Crescente
                    </MenuItem>
                    <MenuItem onClick={() => sortRows('abastecimentoId')}>
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
                    dadosRows={updatedRows}
                    rowsLength={sortedRows.length}
                    idChavePrincipal='laiCodigo'
                    idKey="laiCodigo"
                    opcoesSubMenu={(rowId) => (
                        <>
                            <MenuItem onClick={() => handleRowDetalhes(rowId)} style={{ display: 'flex', alignItems: 'center', }}>
                                <FaPencil size={15} />
                                Editar
                            </MenuItem>
                            <MenuItem onClick={() => handleOpen(sortedRows[rowId])} style={{ display: 'flex', alignItems: 'center', }}>
                                <TbEyeSearch size={20} />
                                Visualizar
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

