import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputMask from "react-input-mask";
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Resizer from 'react-image-file-resizer';
import base from '../../../hooks/BaseUrlApi';

import { handleUnauthorized } from '../../../hooks/LogOut';
import { BsInfoCircleFill } from "react-icons/bs";

const RowForm = styled.div`
    width: 100%;
    height: auto;
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
    },
    '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-disabled': { marginLeft: '7px' },
};

const InputPesquisa = styled.div`
    width: 100%;

    & > button {
        width: auto;
        padding: 0 50px;
    }

    @media (max-width: 606px) {
        & > button{
            width: 100%;
        }
    }
`;

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

export default function AutorizacaoPosto() {
    const [valorNegociado, setValorNegociado] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [dadosAbastecimento, setDadosAbastecimento] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [nomeMotorista, setNomeMotorista] = useState('');
    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [__openModalPhoto, setOpenModalPhoto] = React.useState(false);
    const [errorInput, setErrorInput] = React.useState(false);
    const [authToken, __setAuthToken] = useState(localStorage.getItem('authToken'));
    const [disabledInput, setDisabledInput] = React.useState(true);
    /*  const [imagemRedimensionada, setImagemRedimensionada] = useState(null); */

    const [alert, setAlert] = useState({
        messageAlert: '',
        typeAlert: '',
        show: false
    });

    const resizeImage = (imageData) => {
        return new Promise((resolve, reject) => {
            // Convertendo a string base64 para um Blob
            const byteCharacters = atob(imageData);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });

            Resizer.imageFileResizer(
                blob,
                400,
                500,
                'JPEG',
                80,
                0,
                (uri) => {
                    resolve(uri);
                },
                'base64'
            );
        });
    };

    /*
        // Função para carregar e redimensionar a imagem
        const loadAndResizeImage = async () => {
            if (dadosAbastecimento?.imagens.length > 0) {
                try {
                    const resizedImage = await resizeImage(dadosAbastecimento.imagens[0]);
                    console.log(resizedImage)
                    setImagemRedimensionada(resizedImage);
                } catch (error) {
                    console.error('Erro ao redimensionar imagem:', error);
                    console.log(dadosAbastecimento.imagens[0])
                }
            }
        }; 
    */ 

    const handleValorNegociadoChange = (event) => {
        setValorNegociado(event.target.value);
    };

    const handleModalInfoOpen = () => setOpenModalInfo(true);
    const handleModalInfoCLose = () => setOpenModalInfo(false);

    const handleOpen = () => setOpenModalPhoto(true);
    const handleClose = () => setOpenModalPhoto(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    };

    const buscarDadosAbastecimento = async () => {
        setIsLoading(true);

        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            };

            const response = await fetch(`${base.URL_BASE_API}/Motorista/BuscaAbastecimentoMotoristaPorToken/${inputValue}`, requestOptions);

            if (response.status == 401) {
                handleUnauthorized();
                throw new Error('Unauthorized');
            };

            const data = await response.json();

            // Verificar se statusCode é 200 e data é null
            if (response.status === 200 && data.data === null) {
                setAlert({
                    messageAlert: "Token já atualizado ou não criado.",
                    typeAlert: 'error',
                    show: true
                });
            } else {

                setDadosAbastecimento(data.data);
                const responseMotorista = await fetch(`${base.URL_BASE_API}/Motorista/BuscaMotorista/${data.data.motoristaid}`, requestOptions);
                const dataMotorista = await responseMotorista.json();
                setNomeMotorista(dataMotorista.data.motoristanome);
                setAlert({ show: false });

            }
        } catch (error) {
            console.error('Erro ao buscar dados de abastecimento:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const autorizarAbastecimento = () => {
        setIsLoading(true);
        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        };

        fetch(`${base.URL_BASE_API}/Posto/AutorizarAbastecimentoPorToken/${inputValue}`, {
            method: 'GET',
            headers: headers
        })
            .then(response => {
                if (response.status == 401) {
                    handleUnauthorized();
                    throw new Error('Unauthorized');
                }
                if (!response.ok) {
                    throw new Error('Erro ao criar abastecimento');
                }
                return response.json();
            })
            .then(data => {
                setAlert({
                    messageAlert: "Token autorizado com sucesso!",
                    typeAlert: 'success',
                    show: true
                });
                setDisabledInput(true);
                setTimeout(() => {
                    setDadosAbastecimento('');
                }, 5000);
                setTimeout(() => {
                    location.reload();
                }, 10000);
            })
            .catch(error => {
                if (error.message !== 'Unauthorized') {
                    setDisabledInput(true);
                    setAlert({
                        messageAlert: "Erro ao autorizar abastecimento, tente novamente em instantes ou procure o suporte.",
                        typeAlert: 'error',
                        show: true,
                    });
                }
            })
            .finally(() => {
                setDisabledInput(true)
                setIsLoading(false);
            });
    };

    const handleAutorizarClick = () => {
        if (parseFloat(valorNegociado) === dadosAbastecimento.valorunitario) {
            autorizarAbastecimento();
            setErrorInput(false)
        } else {
            setAlert({
                messageAlert: "Erro ao autorizar abastecimento, valor unitario não condiz com o negociado.",
                typeAlert: 'error',
                show: true,
            });
            setDisabledInput(true)
            setErrorInput(true)
        }
    };

    const handleInputBlur = () => {
        // Verifica se o valor do input não está vazio antes de buscar os dados
        if (inputValue) {
            buscarDadosAbastecimento();
        }
    };

    useEffect(() => {
        if (valorNegociado === '' || valorNegociado === null || valorNegociado.trim() === '') {
            setDisabledInput(true);
        } else {
            setDisabledInput(false);
        }
    }, [valorNegociado]);

    /*     useEffect(() => {
            loadAndResizeImage();
        }, [dadosAbastecimento]); */

    return (
        <React.Fragment>
            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ marginLeft: '-12px', marginBottom: '10px' }}>Solicite ao motorista o número do token que está aparecendo na tela do seu celular.</Typography>
                    <BsInfoCircleFill color='#2d61dd' onClick={handleModalInfoOpen} />
                </div>
                <InputMask
                    mask="9999999999"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    style={{ border: 'none', outline: 'none' }}
                    maskChar={null}
                >
                    {() => (
                        <TextField
                            id="token"
                            label="Token"
                            name="Token"
                            inputProps={{
                                style: { paddingLeft: '10px' }
                            }}
                        />
                    )}
                </InputMask>
            </div>

            {isLoading ? (
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>
                    <CircularProgress />
                </Box>
            ) : (
                alert.show && (
                    <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
                        <div>
                            <Alert severity={alert.typeAlert}>{alert.messageAlert}</Alert>
                            {!alert.messageAlert.startsWith('Erro')}
                        </div>
                    </div>
                )
            )}

            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0' }}>
                <Typography sx={{ marginLeft: '-12px', marginBottom: '10px' }}>Informações do abastecimento aparecerão abaixo. Depois de conferir os detalhes, clique em autorizar para gerar o abastecimento.</Typography>

                <RowForm>
                    <TextField
                        disabled
                        label="Nome do motorista"
                        name="kmAnterios"
                        value={nomeMotorista}
                        inputProps={{ style: { paddingLeft: '10px' } }}
                        sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                    />
                </RowForm>

                <RowForm>
                    <TextField
                        disabled
                        label="KM anterior"
                        name="kmAnterios"
                        value={dadosAbastecimento?.kmanterior ?? 'Km anterior'}
                        inputProps={{ style: { paddingLeft: '10px' } }}
                        sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                    />
                    <TextField
                        disabled
                        label="KM atual"
                        name="kmAtual"
                        value={dadosAbastecimento?.quilometragem ?? 'Km atual'}
                        inputProps={{ style: { paddingLeft: '10px' } }}
                        sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                    />
                </RowForm>

                <RowForm>
                    <TextField
                        disabled
                        label="Litros abastecidos"
                        name="litrosAbastecidos"
                        value={dadosAbastecimento?.litros ?? 'Litros abastecidos'}
                        inputProps={{ style: { paddingLeft: '10px' } }}
                        sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                    />
                    <TextField
                        disabled
                        label="Total calculado"
                        name="Total calculado"
                        value={dadosAbastecimento?.valortotal ?? 'R$' ?? 'Total calculado'}
                        inputProps={{ style: { paddingLeft: '10px' } }}
                        sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                    />
                </RowForm>

                <RowForm>
                    <TextField
                        disabled
                        label="Placa caminhão"
                        name="placaCaminhao"
                        inputProps={{ style: { paddingLeft: '10px' } }}
                        sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                    />
                    <TextField
                        disabled
                        label="Media do abastecimento"
                        name="tokenFornecido"
                        value={dadosAbastecimento?.media ?? 'Media'}
                        inputProps={{ style: { paddingLeft: '10px' } }}
                        sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                    />
                    <TextField
                        disabled
                        label="Token fornecido"
                        name="tokenFornecido"
                        value={dadosAbastecimento?.token ?? 'Token fornecido'}
                        inputProps={{ style: { paddingLeft: '10px' } }}
                        sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                    />
                    {/*                     <div style={{ width: 'auto', marginTop: '10px', }} onClick={handleOpen}>
                        <IconButton color="primary" aria-label="add an alarm">
                            <CameraAltIcon /><p>Visualizar anexo</p>
                        </IconButton>
                    </div> */}
                </RowForm>
            </div>

            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0' }}>
                <Typography sx={{ marginLeft: '-12px', marginBottom: '10px' }}>Informe o valor unitario negociado</Typography>
                <RowForm>
                    <InputMask
                        mask="9.99"
                        maskChar={null}
                        value={valorNegociado}
                        onChange={handleValorNegociadoChange}
                        onBlur={handleInputBlur}
                        style={{ border: 'none', outline: 'none' }}
                    >
                        {() => (
                            <TextField
                                error={errorInput}
                                sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                                label="Valor negociado"
                                name="Digite o valor negociado"
                                inputProps={{
                                    style: { paddingLeft: '10px' }
                                }}
                            />
                        )}
                    </InputMask>
                </RowForm>
            </div>

            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
                <InputPesquisa>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ height: 40 }}
                        onClick={handleAutorizarClick}
                        disabled={disabledInput}
                    >
                        {isLoading ? 'Carregando...' : 'Autorizar'}
                    </Button>
                </InputPesquisa>
            </div>

            <Modal
                open={openModalInfo}
                onClose={handleModalInfoCLose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Duvidas
                        <Typography>Duvidas gerais</Typography>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex', flexDirection: 'column', }}>
                        <Box sx={{ marginTop: '15px' }}>
                            <BsInfoCircleFill color='#2d61dd' onClick={handleOpen} /> O token sempre será gerado pelo motorista em seu aplicativo.
                        </Box>
                        <Box sx={{ marginTop: '15px' }}>
                            <BsInfoCircleFill color='#2d61dd' onClick={handleOpen} /> As informações de abastecimento devem ser condizentes com os parâmetros autorizados pelo posto.
                        </Box>
                        <Box sx={{ marginTop: '15px' }}>
                            <BsInfoCircleFill color='#2d61dd' onClick={handleOpen} /> Em caso de o valor de abastecimento não condizer com o valor negociado anteriormente, o abastecimento não será autorizado.
                        </Box>

                        <Box sx={{ marginTop: '15px' }}>
                            <BsInfoCircleFill color='#2d61dd' onClick={handleOpen} /> O aplicativo que o motorista utiliza é mantido e atualizado pela <a href='https://www.combutech.com.br' target='_blank'>Combutech.</a> Em caso de necessidade de ajuda, entre em nossos canais de atendimento.
                        </Box>

                        <Box sx={{ marginTop: '15px' }}>
                            <p>combutech@combutech.com.br</p>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </React.Fragment>

    );
}

