import * as React from 'react';
import { useEffect } from 'react'
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { FaRegFilePdf } from "react-icons/fa";
import { RiFileExcelLine } from "react-icons/ri";
import { FaPlusCircle } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useState } from 'react';
import { FaPencil } from "react-icons/fa6";
import { TbEyeSearch } from "react-icons/tb";
import { FaFilter } from "react-icons/fa";
import { BiSolidArrowToTop } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSolidArrowFromTop } from "react-icons/bi";
import UtilBar from "../../UtilBar/UtilBar";
import PrimatyTable from "../../Tables/PrimatyTable";
import OptionsButton from "../../OptionButton";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DefautlLoadingTable from '../../loadings/loadingsTables/defaultLoadingTables';
import Checkbox from '@mui/material/Checkbox';
import base from '../../../hooks/BaseUrlApi';

const columns = [
    { id: 'Options', label: `Opções`, minWidth: 100 },
    { id: 'abastecimentoInconsistencias', label: `Inconsistência`, minWidth: 100 },
    { id: 'abastecimentoDateTime', label: 'Data abastecimento', minWidth: 170 },
    { id: 'veiculoPlaca', label: 'Veículo', minWidth: 110 },
    { id: 'veiculoNroFrota', label: 'Frota', minWidth: 80 },
    { id: 'motoristaNome', label: 'Motorista', minWidth: 350 },
    { id: 'abastecimentoDocumento', label: 'N° Documento', minWidth: 170 },
    { id: 'postoCNPJ', label: 'CNPJ', minWidth: 170 },
    { id: 'postoNomeFantasia', label: 'Posto', minWidth: 300 },
    { id: 'produtoDescricao', label: 'Produto', minWidth: 170 },
    { id: 'LitrabastecimentoLitrosos', label: 'Litros', minWidth: 170 },
    { id: 'abastecimentoValorUnitario', label: 'Valor Unitário', minWidth: 170 },
    { id: 'abastecimentoValorTotal', label: 'Valor Total', minWidth: 170 },
    { id: 'abastecimentoQuilometragem', label: 'Quilometragem', minWidth: 170 },
    { id: 'QuilometragemAnterior', label: 'QuilometragemAnterior', minWidth: 190 },
    { id: 'abastecimentoMedia', label: 'Média', minWidth: 90 },
    { id: 'abastecimentoSituacao', label: 'Situação', minWidth: 0 },
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
};

export default function MainAbastecimentoIntegrado() {
    const [sortedRows, setSortedRows] = useState([]);
    const [dadosOriginais, setDadosOriginais] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedRow, setSelectedRow] = useState(null);
    const [dadosLoading, setDadosLoading] = useState(true);
    const [isChecked, setIsChecked] = useState(true);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
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

    /* GET dos dados */
    useEffect(() => {
        const url = `${base.URL_BASE_API}/IntegracaoAbastecimento/Integrados`;
        const authToken = localStorage.getItem('authToken');
        const transportadoraValue = localStorage.getItem('transportadora');

        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        };

        const transportadoraId = {
            transportadoraId: [transportadoraValue]
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
                    const dateA = new Date(a.abastecimentoDateTime.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}:\d{2}:\d{2})/, '$3-$2-$1T$4'));
                    const dateB = new Date(b.abastecimentoDateTime.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}:\d{2}:\d{2})/, '$3-$2-$1T$4'));
                    return dateB - dateA;
                });
                setSortedRows(sortedData);
                console.log(sortedData)
                setDadosOriginais(sortedData);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setDadosLoading(false);
            });
    }, []);

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

    const updatedRows = sortedRows.map((row) => ({
        ...row,
        abastecimentoInconsistencias: (
            <React.Fragment>
                {row.abastecimentoInconsistencias != null ?
                    <RiErrorWarningFill size={iconsSize} color="red" />
                    : <IoIosCheckmarkCircle size={iconsSize} color="green" />
                }
            </React.Fragment>
        ),

        abastecimentoSituacao: (
            <div style={{ margin: 0, }}>
                {row.abastecimentoSituacao === 'True' ?
                    <Checkbox {...label} checked={isChecked} sx={{ '& .MuiSvgIcon-root': { marginLeft: '-20px', } }} />
                    : <Checkbox {...label} checked={!isChecked} sx={{ '& .MuiSvgIcon-root': { marginLeft: '-20px', } }} />
                }
            </div>
        )
    }));

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
                    idChavePrincipal='abastecimentoId'
                    idKey="abastecimentoId"
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

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Observações
                </Typography>
                <div id="modal-modal-description" sx={{ mt: 2 }}>
                    {selectedRow ? (
                        <Typography component="div">
                            {selectedRow.abastecimentoObservacao ? (
                                <p> {selectedRow.abastecimentoObservacao}</p>
                            ) : (
                                <p>Nenhuma observação disponível.</p>
                            )}
                        </Typography>
                    ) : (
                        <Typography component="div">
                            <p>Nenhuma observação disponível.</p>
                        </Typography>
                    )}
                </div>
            </Box>
        </Modal>
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

