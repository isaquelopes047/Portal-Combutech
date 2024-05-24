import React, { useEffect } from 'react'
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TbEyeSearch } from "react-icons/tb";
import { FaFilter } from "react-icons/fa";
import { BiSolidArrowToTop } from "react-icons/bi";
import { BiSolidArrowFromTop } from "react-icons/bi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BsFillFuelPumpFill } from "react-icons/bs";
import PrimatyTable from "../../Tables/PrimatyTable";
import OptionsButton from "../../OptionButton";
import DefautlLoadingTable from '../../loadings/loadingsTables/defaultLoadingTables';
import Checkbox from '@mui/material/Checkbox';
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
    { id: 'produtoid', label: 'Produto solicitado', minWidth: 170 },
    { id: 'produtopostopreconegociado', label: 'Preço solicitado', minWidth: 170 },
    { id: 'maximalitragem', label: 'Litragem solicitada', minWidth: 170 },
    { id: 'situacao', label: 'Situação', minWidth: 170 },
];

const productMapping = {
    1: "OLEO DIESEL S10",
    2: "OLEO DIESEL S500",
    3: "ARLA 32",
    4: "GASOLINA ADITIVADA",
    5: "GASOLINA COMUM",
    6: "GASOLINA C ADITIVADA",
    7: "ETANOL HIDRATADO COMUM",
    8: "QUEROSENE",
    9: "ARLA ",
    10: "ARLA",
    11: "820101030",
    12: "ARLA BALDE 20LTS"
};

export default function ValoresAprovar() {
    const [transportadoraId, setTransportadoraId] = useState(Cookies.get('transportadoraId'));
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

    /* GET dos dados */
    useEffect(() => {
        const buscarDados = async () => {
            try {
                setDadosLoading(true);
                const url = `${base.URL_BASE_API}/Posto/BuscaSolicitacoes`;
                const authToken = localStorage.getItem('authToken');

                const headers = {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                };

                const response = await fetch(url, {
                    method: 'GET',
                    headers: headers,
                });

                if (!response.ok) {
                    throw new Error(`Erro na requisição. Código de status: ${response.status}`);
                }
                const data = await response.json();
                setSortedRows(data.data.reverse());
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
        produtoid: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <BsFillFuelPumpFill color="grey" style={{ marginRight: 4 }} />
                {productMapping[row.produtoid] || row.produtoid}
            </div>
        ),
        maximalitragem: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>{productMapping[row.maximalitragem] || row.maximalitragem} Litros</p>
            </div>
        ),
        produtopostopreconegociado: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <MdOutlineAttachMoney color="green" style={{ marginRight: 4 }} />
                {productMapping[row.produtopostopreconegociado] || row.produtopostopreconegociado}
            </div>
        ),
        situacao: (
            <div style={{ pointer: 'not-allowed' }}>
                {row.situacao === true ?
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Checkbox {...label} checked={isChecked} sx={{ '& .MuiSvgIcon-root': { marginLeft: '-20px' } }} />
                        <p>Aprovado</p>
                    </div>
                    :
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Checkbox {...label} checked={!isChecked} sx={{ '& .MuiSvgIcon-root': { marginLeft: '-20px' } }} />
                        <p>Aguardando</p>
                    </div>
                }
            </div>
        )
    }));

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

    return (
        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
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
                            <MenuItem onClick={() => handleOpen(sortedRows[rowId])} style={{ display: 'flex', alignItems: 'center', }}>
                                <TbEyeSearch size={20} />
                                Visualizar
                            </MenuItem>
                        </>
                    )}
                />
            )}
        </div>
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

