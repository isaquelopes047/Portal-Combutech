import React, { useState, useEffect } from 'react';
import PrimatyTable from "../../Tables/PrimatyTable";
import DefautlLoadingTable from '../../loadings/loadingsTables/defaultLoadingTables';
import UtilBar from "../../UtilBar/UtilBar";
import base from '../../../hooks/BaseUrlApi';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';

import { LinkMenuItem } from './AlocacaoViculo-style';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPlusCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

const columns = [
    { id: 'Options', label: `Opções`, minWidth: 0 },
    { id: 'motoristanome', label: `Motorista nome`, minWidth: 100 },
    { id: 'veiculoplaca', label: 'Veículo Placa', minWidth: 150 },
    { id: 'motoristasituacao', label: 'Situação do motorista', minWidth: 110 },
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
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

export default function MainAlocacaoVeiculo() {
    const [sortedRows, setSortedRows] = useState([]);
    const [dadosOriginais, setDadosOriginais] = useState([]);
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [dadosLoading, setDadosLoading] = useState(true);
    const [pagina, setPagina] = useState(1);
    const [isChecked, setIsChecked] = useState(true);
    const [countPages, setCountPages] = React.useState(10);
    const [modalOpen, setModalOpen] = useState(false);
    const [rowIdToDelete, setRowIdToDelete] = useState(null);
    const iconsSize = 25;
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

    // GET DE DADOS
    useEffect(() => {
        const buscarDados = async () => {
            try {
                setDadosLoading(true);
                const url = `${base.URL_BASE_API}/Veiculo/BuscaAlocacoesVeiculos`;
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
                };

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
    }, []);

    const updatedRows = sortedRows.map((row) => ({
        ...row,
        motoristanome: row.motorista.motoristanome || "Nome não disponível",
        veiculoplaca: row.veiculo.veiculoplaca || "Placa não disponível",
        veiculoplaca: row.veiculo.veiculoplaca || "Placa não disponível",
        motoristasituacao: (
            <div style={{ margin: 0, }}>
                {row.motorista.motoristasituacao === true ?
                    <Checkbox {...label} checked={isChecked} sx={{ '& .MuiSvgIcon-root': { marginLeft: '-30px', } }} />
                    : <Checkbox {...label} checked={!isChecked} sx={{ '& .MuiSvgIcon-root': { marginLeft: '-30px', } }} />
                }
            </div>
        )
    }));

    const handleChange = (event) => {
        setCountPages(event.target.value);
    };

    const handleAdd = () => {
        setPagina(prevPagina => Math.max(prevPagina + 1, 1));
    };

    const handleReduce = () => {
        setPagina(prevPagina => Math.max(prevPagina - 1, 1));
    };

    const handleOpenModal = (rowId) => {
        setRowIdToDelete(rowId);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleDelete = (id) => {
        fetch(`${base.URL_BASE_API}/Veiculo/ExcluiAlocacaoVeiculoPorId/${id}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setAlert({
                    messageAlert: "Alocação alterada com sucesso!",
                    typeAlert: 'success',
                    show: true
                });
                setSortedRows(sortedRows.filter(row => row.veiculoid !== id));
                setModalOpen(false);
            })
            .catch(error => {
                setAlert({
                    messageAlert: "Erro ao alterar a alocação",
                    typeAlert: 'error',
                    show: true
                });
            });
    };

    return <>
        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
            <p>Lista de alocação de veiculos</p>
        </div>

        <UtilBar titleButton={<GiHamburgerMenu />}>
            <MenuItem>
                <LinkMenuItem>
                    <a href="/auth/controle/alocacao/criaralocacao">
                        <FaPlusCircle size={iconsSize} />
                        <p>Criar alocação</p>
                    </a>
                </LinkMenuItem>
            </MenuItem>
        </UtilBar>

        {alert.show ? (
                    <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
                        <div>
                            <Alert severity={alert.typeAlert}>{alert.messageAlert}</Alert>
                            {!alert.messageAlert.startsWith('Erro')}
                        </div>
                    </div>
        ) : (null)}

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0' }} data-aos="fade-up">
            {dadosLoading ? (
                <DefautlLoadingTable />
            ) : (
                <PrimatyTable
                    dadosCollunas={columns}
                    dadosRows={updatedRows}
                    rowsLength={sortedRows.length}
                    idChavePrincipal='id'
                    idKey="id"
                    more={handleAdd}
                    less={handleReduce}
                    numberPage={pagina}
                    quantidadeRegistro={countPages}
                    handleChange={handleChange}
                    opcoesSubMenu={(rowId) => (
                        <>
                            <MenuItem onClick={() => handleOpenModal(rowId)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <FaPencil size={15} />
                                Excluir Alocação
                            </MenuItem>
                        </>
                    )}
                />
            )}
        </div>

        {/* Modal de aprovação de alteração de valor */}
        <Modal
            open={modalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ ...defaultInputStyle }}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2"> Excluir alocação </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '12px', padding: '20px 0px', }}>
                    Ao confirmar a exclusão do registro, você estará removendo permanentemente este item do sistema. Esta ação é irreversível e pode impactar os dados históricos e operacionais da sua transportadora. Certifique-se de que a exclusão é realmente necessária e que todos os efeitos dessa ação foram considerados. Revisar detalhadamente as implicações dessa exclusão antes de proceder é crucial para garantir que não haja perda de informações importantes. A confirmação desta exclusão atualizará automaticamente os registros do sistema, refletindo a remoção do item.
                </Typography>

                <Box sx={{ width: '100%', height: 'auto', display: 'flex', gap: '30px' }}>
                    <button style={{ backgroundColor: '#9c252b', color: '#fff' }} onClick={() => handleDelete(rowIdToDelete)}> Excluir alocação </button>
                    <button onClick={handleCloseModal}> Voltar </button>
                </Box>
            </Box>
        </Modal>
    </>
}

