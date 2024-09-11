import React, { useEffect } from 'react'
import PrimatyTable from "../../Tables/PrimatyTable";
import base from '../../../hooks/BaseUrlApi';
import OptionsButton from "../../OptionButton";
import DefautlLoadingTable from '../../loadings/loadingsTables/defaultLoadingTables';
import Checkbox from '@mui/material/Checkbox';
import Cookies from 'js-cookie';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';

import { useState } from 'react';
import { TbEyeSearch } from "react-icons/tb";
import { FaFilter } from "react-icons/fa";
import { BiSolidArrowToTop } from "react-icons/bi";
import { BiSolidArrowFromTop } from "react-icons/bi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaHouseChimney } from "react-icons/fa6";
import { handleUnauthorized } from '../../../hooks/LogOut';
import { FaRegAddressCard } from "react-icons/fa";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const columns = [
    { id: 'Options', label: `Opções`, minWidth: 100 },
    { id: 'postocnpj', label: `CNPJ`, minWidth: 100 },
    { id: 'postorazaosocial', label: `Posto`, minWidth: 100 },
    { id: 'produtoid', label: 'Produto solicitado', minWidth: 170 },
    { id: 'produtopostopreconegociado', label: 'Preço solicitado', minWidth: 170 },
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

const defaultInputStyle = {
    border: 'none',
    '& input': {
        backgroundColor: '#fff',
        border: 'none',
    },
    '& input:focus': {
        backgroundColor: '#fff',
        border: 'none',
    }
};

export default function ValoresAprovar() {
    const [transportadoraId, setTransportadoraId] = useState(Cookies.get('transportadoraId'));
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [sortedRows, setSortedRows] = useState([]);
    const [dadosOriginais, setDadosOriginais] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [countPages, setCountPages] = React.useState(10);
    const [pagina, setPagina] = useState(1);
    const [filtro, setFiltro] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [dadosLoading, setDadosLoading] = useState(true);
    const [isChecked, setIsChecked] = useState(true);
    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const label = {
        inputProps: {
            'aria-label': 'Checkbox demo',
            style: {
                cursor: 'not-allowed'
            }
        }
    };
    const [alert, setAlert] = useState({
        messageAlert: '',
        typeAlert: '',
        show: false
    });

    const handleChange = (event) => { setCountPages(event.target.value) };

    const handleAdd = () => { setPagina(prevPagina => Math.max(prevPagina + 1, 1)) };

    const handleReduce = () => { setPagina(prevPagina => Math.max(prevPagina - 1, 1)) };

    const handleClose = () => { setOpenModalInfo(false) };

    const sortRows = (property) => {
        const sorted = [...sortedRows].sort((a, b) => {
            const comparison = a[property] - b[property];
            return sortOrder === 'asc' ? comparison : -comparison;
        });
        setSortedRows(sorted);
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleOpen = (rowData) => {
        setOpenModalInfo(true);
        setSelectedRow(rowData);
        console.log(rowData);
    };

    const updatedRows = sortedRows.map((row) => ({
        ...row,
        produtoid: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <BsFillFuelPumpFill color="grey" style={{ marginRight: 4 }} />
                {productMapping[row.produtoid] || row.produtoid}
            </div>
        ),
        postocnpj: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaRegAddressCard color="grey" style={{ marginRight: 4 }} />
                {row.posto.postocnpj}
            </div>
        ),
        postorazaosocial: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaHouseChimney color="grey" style={{ marginRight: 4 }} />
                {row.posto.postorazaosocial}
            </div>
        ),
        produtopostopreconegociado: (
            <Chip style={{ display: 'flex', alignItems: 'center', width: '100px', }} label={<>
                <MdOutlineAttachMoney color="green" style={{ marginRight: 4 }} />
                {productMapping[row.produtopostopreconegociado] || row.produtopostopreconegociado}
            </>
            } />
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

    const fetchProdutosPosto = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        };

        fetch(`${base.URL_BASE_API}/Posto/AprovarSolicitacao/${selectedRow}`, requestOptions)
            .then(response => {

                if (response.status == 401) {
                    handleUnauthorized();
                    console.log('erro')
                    return;
                };
            })
            .then(data => {
                setAlert({
                    messageAlert: "Valor alterado com sucesso!",
                    typeAlert: 'success',
                    show: true
                });
            })
            .catch(error => {
                setAlert({
                    messageAlert: "Erro ao autorizado o valor!",
                    typeAlert: 'error',
                    show: true
                });
            });
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

                if (response.status === 401) {
                    handleUnauthorized();
                    console.log('erro')
                    return;
                };

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

    useEffect(() => {
        if (alert.show) {
            const timer = setTimeout(() => {
                setAlert(prevAlert => ({
                    ...prevAlert,
                    show: false
                }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert.show]);

    return <>

        {alert.show ? (
            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
                <div>
                    <Alert severity={alert.typeAlert}>{alert.messageAlert}</Alert>
                    {!alert.messageAlert.startsWith('Erro')}
                </div>
            </div>
        ) : (null)}

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
            </div>

            {dadosLoading ? (
                <DefautlLoadingTable />
            ) : (
                <PrimatyTable
                    dadosCollunas={columns}
                    dadosRows={updatedRows}
                    rowsLength={sortedRows.length}
                    idChavePrincipal='id'
                    idKey="produtoid"
                    more={handleAdd}
                    less={handleReduce}
                    numberPage={pagina}
                    quantidadeRegistro={countPages}
                    handleChange={handleChange}
                    opcoesSubMenu={(rowId) => (
                        <>
                            <MenuItem
                                key={rowId.id}
                                onClick={() => handleOpen(rowId)}
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <TbEyeSearch size={20} />
                                Aprovar
                            </MenuItem>
                        </>
                    )}
                />
            )}
        </div>

        {/* Modal de aprovação de alteração de valor */}
        <Modal
            open={openModalInfo}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ ...defaultInputStyle }}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Aprovar alteração
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '12px', padding: '20px 0px', }}>
                    Ao aprovar a alteração do valor unitário, você estará modificando diretamente o valor negociado com a Combutech. Esta ação é significativa, pois afetará os termos financeiros previamente estabelecidos. Certifique-se de revisar cuidadosamente os novos valores antes de confirmar a alteração para garantir que estejam de acordo com as expectativas e requisitos do contrato. A aprovação desta mudança implicará em um ajuste automático nos registros de negociação, refletindo o novo valor unitário acordado.
                </Typography>

                <Box sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    gap: '30px',
                }}>
                    <button style={{ backgroundColor: '#2169b2', color: '#fff' }} onClick={() => {
                        fetchProdutosPosto();
                        handleClose();
                    }}>
                        Aprovar
                    </button>
                    <button onClick={handleClose}>Voltar</button>
                </Box>
            </Box>
        </Modal>
    </>;
}

