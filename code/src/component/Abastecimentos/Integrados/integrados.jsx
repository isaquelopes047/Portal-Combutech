import React, { useState, useEffect } from 'react';

import UtilBar from "../../UtilBar/UtilBar";
import PrimatyTable from "../../Tables/PrimatyTable";
import OptionsButton from "../../OptionButton";
import DefautlLoadingTable from '../../loadings/loadingsTables/defaultLoadingTables';
import base from '../../../hooks/BaseUrlApi';
import Cookies from 'js-cookie';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';

import { LinkMenuItem } from '../../Controle/AlocacaoVeiculo/AlocacaoViculo-style';
import { FaPlusCircle } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BiSolidArrowFromTop } from "react-icons/bi";
import { FaPencil } from "react-icons/fa6";
import { TbEyeSearch } from "react-icons/tb";
import { FaFilter } from "react-icons/fa";
import { BiSolidArrowToTop } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { handleUnauthorized } from '../../../hooks/LogOut';

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
    { id: 'abastecimentoLitros', label: 'Litros', minWidth: 170 },
    { id: 'abastecimentoValorUnitario', label: 'Valor Unitário', minWidth: 170 },
    { id: 'abastecimentoValorTotal', label: 'Valor Total', minWidth: 170 },
    { id: 'abastecimentoQuilometragem', label: 'Quilometragem', minWidth: 170 },
    { id: 'abastecimentoKMAnterior', label: 'QuilometragemAnterior', minWidth: 190 },
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

export default function MainAbastecimentoIntegrado() {
    
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
                    if (!response.ok) { throw new Error(`Erro na requisição. Código de status: ${response.status}`)};
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
                const url = `${base.URL_BASE_API}/IntegracaoAbastecimento/Integrados`;
                const authToken = localStorage.getItem('authToken');
                const transportadoraValue = Cookies.get('transportadoraId');

                const headers = { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' };

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

                if (response.status === 401) {
                    handleUnauthorized();
                    return;
                }

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
                {(() => {
                    let inconsistenciasArray;
                    try {
                        inconsistenciasArray = JSON.parse(row.abastecimentoInconsistencias);
                    } catch (e) {
                        // Caso a string não seja um JSON válido
                        inconsistenciasArray = null;
                    }
                    return Array.isArray(inconsistenciasArray) && inconsistenciasArray.length === 0 ?
                        <IoIosCheckmarkCircle size={iconsSize} color="green" /> :
                        <RiErrorWarningFill size={iconsSize} color="red" />;
                })()}
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
                <LinkMenuItem>
                    <a href="/auth/abastecimentos/integrados/cad">
                        <FaPlusCircle size={iconsSize} />
                        <p>Criar abastecimento</p>
                    </a>
                </LinkMenuItem>
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
                    idChavePrincipal='abastecimentoId'
                    idKey="abastecimentoId"
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
