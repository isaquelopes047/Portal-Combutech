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
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import base from '../../../hooks/BaseUrlApi';
import Cookies from 'js-cookie';

const defaultInputStyle = {
    flex: 1,
    marginTop: 1.5,
    height: '65px',
    '& input': {
        marginLeft: 0,
        backgroundColor: '#fff',
        border: 0,
        paddingLeft: 1,
    },
    '& input:focus': {
        backgroundColor: '#fff',
        border: 0,
    }
};

const defaultInputsAutoComplete = {
    '& label.Mui-focused': { paddingLeft: 0 },
    '& .css-16e8wmc-MuiAutocomplete-root, & .MuiOutlinedInput-root, & .MuiAutocomplete-input': { paddingLeft: 1, paddingTop: 0, height: '40px' },
    '& .css-1q60rmi-MuiAutocomplete-endAdornment': { top: 0 },
    '& .MuiAutocomplete-hasPopupIcon.css-6c6kjn-MuiAutocomplete-root, & .MuiOutlinedInput-root, & .MuiAutocomplete-hasClearIcon.css-6c6kjn-MuiAutocomplete-root, & .MuiOutlinedInput-root': { height: '50px' },
    '& .MuiButtonBase-root, & .MuiIconButton-root & .MuiIconButton-sizeMedium & .MuiAutocomplete-popupIndicator & .css-qzbt6i-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator': { display: 'none' },
    '& .label.Mui-focused': { marginTop: 50 }
};

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
    const [transportadorasDados, setTransportadorasDados] = useState([]);
    const [transportadoraId, setTransportadoraId] = useState(Cookies.get('transportadoraId'));
    const [transportadoraName, setTransportadoraName] = useState('');
    const [strictUser, setStrictUser] = useState(Cookies.get('__StrictMode'));

    const [pagina, setPagina] = useState(1);
    const [countPages, setCountPages] = React.useState(10);
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

    const handleChange = (event) => {
        setCountPages(event.target.value);
    };

    const handleAdd = () => {
        setPagina(prevPagina => Math.max(prevPagina + 1, 1));
    };

    const handleReduce = () => {
        setPagina(prevPagina => Math.max(prevPagina - 1, 1));
    };

    /* GET DE TRANSPORTADORAS */
    useEffect(() => {
        const buscarDados = async () => {
            try {
                setDadosLoading(true);
                const authToken = localStorage.getItem('authToken');
                const __StrictMode = Cookies.get('__StrictMode');

                if (__StrictMode === '0') {
                    const url = `${base.URL_BASE_API}/Transportadora/BuscaTransportadoras`;
                    const headers = { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' };
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: headers,
                    });
                    if (!response.ok) { throw new Error(`Erro na requisição. Código de status: ${response.status}`) };
                    const data = await response.json();
                    setTransportadorasDados(data.data);
                }

            } catch (error) {
                console.error(error);
            } finally {
                setDadosLoading(false);
            }
        };

        buscarDados();
    }, []);

    /* GET dos dados */
    useEffect(() => {
        const buscarDados = async () => {
            try {
                setDadosLoading(true);
                const url = `${base.URL_BASE_API}/IntegracaoAbastecimento/NaoIntegrados`;
                const authToken = localStorage.getItem('authToken');
                const transportadoraValue = Cookies.get('transportadoraId');

                const headers = {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                };
                const transportadoraId = {
                    transportadoraId: [transportadoraValue],
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
                }
                const data = await response.json();
                setSortedRows(data.data);
                setDadosOriginais(data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setDadosLoading(false);
            }
        };
        buscarDados();
    }, [pagina, countPages, transportadoraId]);

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
            <div style={{ pointer: 'not-allowed' }}>
                {row.laiAbastecimentoIntegrado === 'True' ?
                    <Checkbox {...label} checked={isChecked} sx={{ '& .MuiSvgIcon-root': { marginLeft: '-20px' } }} /> :
                    <Checkbox {...label} checked={!isChecked} sx={{ '& .MuiSvgIcon-root': { marginLeft: '-20px' } }} />
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

    const handleAutocompleteChange = (event, value) => {
        if (value) {
            const transportadoraSelecionada = transportadorasDados.find(transportadora => transportadora.transportadorarazaosocial === value);
            if (transportadoraSelecionada) {
                const idSelecionado = transportadoraSelecionada.transportadoraid;
                const nomeSelecionado = transportadoraSelecionada.transportadorarazaosocial;
                Cookies.set('transportadoraId', idSelecionado);
                Cookies.set('__StritCompany', nomeSelecionado);
                setTransportadoraId(idSelecionado);
            }
        }
    };

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

                {
                    strictUser == 0 ?
                        <Stack spacing={2} sx={{ width: 300 }}>
                            <Autocomplete
                                sx={{ ...defaultInputStyle, paddingX: 1, ...defaultInputsAutoComplete }}
                                options={transportadorasDados.map((option) => option.transportadorarazaosocial)}
                                value={Cookies.get('__StritCompany')}
                                onChange={handleAutocompleteChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Pesquisar transportadoras"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                    />
                                )}
                            />
                        </Stack>
                        :
                        null
                } 

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

