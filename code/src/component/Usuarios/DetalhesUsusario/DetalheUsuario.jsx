import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from '@mui/material/Modal';
import base from '../../../hooks/BaseUrlApi';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const RowForm = styled.div`
    width: 100%;
    height: auto;
    padding-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 606px) {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin: 0;
        padding: 0;

        & > * {
            width: 100%;
            padding-left: 0 !important;
            padding-right: 0 !important;
        }
    }
`;

const defaultInputStyle = {
    flex: 1,
    marginTop: 1.5,
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

const ModalMain = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    background-color: #fff;
    box-shadow: 24;
    padding: 25px;

    @media (max-width: 620px) {
        width: 80vw;
    }
`

const ButtonAccept = styled.div`
    width: 100%;
    height: 50px;
    background-color: #0a82fd;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: #3772ad
    }
`;

export default function DetalhesUsuarios() {
    const location = useLocation();
    const [dadosItemParam, setDadosItemParam] = React.useState(null);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const label = {
        inputProps: {
            'aria-label': 'Checkbox demo',
            style: {
                cursor: 'not-allowed'
            }
        }
    };

    /* Verificação de perfil posto */
    useEffect(() => {
        if (dadosItemParam?.perfil.trim() === "Posto") {
            setIsCheckboxChecked(true);
        } else {
            setIsCheckboxChecked(false);
        }
    }, [dadosItemParam]);

    useEffect(() => {
        const carregarDadosDaLocalizacao = () => {
            const dadosParam = location.state?.dados || null;
            setDadosItemParam(dadosParam);
        };

        carregarDadosDaLocalizacao();
    }, [location.state?.dados]);

    /* POST para alterar o tipo de perfil do usuario */
    const alterarPerfil = async () => {
        try {
            if (!dadosItemParam || !dadosItemParam.id) {
                throw new Error('dadosItemParam ou dadosItemParam.id não estão definidos.');
            }
            const url = `${base.URL_BASE_API}/users/AplicaPerfilPostoUsuarioPortal/${dadosItemParam.id}`;
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

            window.location.reload(false);

        } catch (error) {
            console.error('Erro na solicitação:', error.message);
        }
    };

    // Renderizando as propriedades do objeto individualmente
    return <>
        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
            <p>Informações gerais</p>
        </div>

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }} data-aos="fade-up-left">
            {dadosItemParam && (
                <>
                    <p>Dados do usuario</p>
                    <RowForm>
                        <TextField
                            disabled
                            label='Email'
                            value={dadosItemParam?.nome || ''}
                            sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                        />
                        <TextField
                            disabled
                            label='Usuario'
                            value={dadosItemParam?.usuario || ''}
                            sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                        />
                    </RowForm>

                    <RowForm>
                        <TextField
                            disabled
                            label="Tipo de Perfil"
                            value={dadosItemParam?.perfil || ''}
                            sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                        />
                        <TextField
                            disabled
                            label="Transportadora"
                            value={dadosItemParam?.transportadora || ''}
                            sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                        />
                    </RowForm>

                    <RowForm>

                        {dadosItemParam && (
                            <RowForm>
                                {isCheckboxChecked ? (
                                    <FormControlLabel
                                        control={<Checkbox  {...label} onClick={isCheckboxChecked ? undefined : handleOpen} checked={isCheckboxChecked} sx={{ '& .MuiSvgIcon-root': { marginLeft: '-20px' } }} />}
                                        label="Tornar esse usuario com o perfil de Posto?"
                                    />
                                ) : (
                                    <FormControlLabel
                                        control={<Checkbox onClick={handleOpen} checked={isCheckboxChecked} sx={{ '& .MuiSvgIcon-root': { marginLeft: '-20px' } }} />}
                                        label="Tornar esse usuario com o perfil de Posto?"
                                    />
                                )}
                            </RowForm>
                        )}

                    </RowForm>
                </>
            )}
        </div>

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }} data-aos="fade-up-left">
            {dadosItemParam && (
                <>
                    <p>Senha</p>
                    <RowForm>
                        <TextField
                            label='Nova senha'
                            value=''
                            sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                        />
                        <TextField
                            label='Repita a senha'
                            value=''
                            sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                        />
                    </RowForm>
                </>
            )}
        </div>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ ...defaultInputStyle }}
        >
            <ModalMain>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Alterar perfil
                </Typography>
                <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', }}>
                    <ButtonAccept onClick={alterarPerfil}>
                        <p style={{ color: '#fff' }}>Confirmar a mudança do tipo de perfil</p>
                        <IoCheckmarkCircleSharp size={25} color='#fff' />
                    </ButtonAccept>
                </Box>
                <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '12px', }}>
                    Atenção essa opção vai mudar o tipo de perfil do usuario {dadosItemParam?.nome} para o perfil de Posto, suas permissões serão somente para autorização de abastecimento e solicitação para renegociação de combustivel.
                </Typography>
            </ModalMain>
        </Modal>
    </>;
}