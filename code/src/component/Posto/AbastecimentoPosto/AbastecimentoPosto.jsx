import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputMask from "react-input-mask";
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { BsInfoCircleFill } from "react-icons/bs";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

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
    }
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
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function AutorizacaoPosto() {
    const [inputValue, setInputValue] = useState('');
    const [dadosAbastecimento, setDadosAbastecimento] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [alert, setAlert] = useState({
        messageAlert: '',
        typeAlert: '',
        show: false
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (event) => { setInputValue(event.target.value) };

    // Função para buscar os dados de abastecimento
    const buscarDadosAbastecimento = async () => {
        try {
            const requestOptions = { method: 'GET', headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' } };
            const response = await fetch(`https://api.combutech.com.br/api/Motorista/BuscaAbastecimentoMotoristaPorToken/${inputValue}`, requestOptions);
            const data = await response.json();
            setDadosAbastecimento(data.data);
        } catch (error) { console.error('Erro ao buscar dados de abastecimento:', error) }
    };

    const autorizarAbastecimento = () => {
        setIsLoading(true);
        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        };

        fetch(`https://api.combutech.com.br/api/Posto/AutorizarAbastecimentoPorToken/${inputValue}`, {
            method: 'GET',
            headers: headers
        })
            .then(response => { if (!response.ok) { throw new Error('Erro ao criar abastecimento') } return response.json() })
            .then(data => {
                setAlert({
                    messageAlert: "Token autorizado com sucesso!",
                    typeAlert: 'success',
                    show: true
                });
            })
            .catch(error => {
                setAlert({
                    messageAlert: "Erro ao autorizar abastecimento, tente novamente em instantes ou procure o suporte.",
                    typeAlert: 'error',
                    show: true,
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Função para lidar com o clique no botão de autorização
    const handleAutorizarClick = () => {
        autorizarAbastecimento();
    };

    // Efeito para executar a busca quando o valor de inputValue mudar
    useEffect(() => {
        if (inputValue) {
            buscarDadosAbastecimento();
        }
    }, [inputValue]);

    // Função para lidar com a perda de foco no input
    const handleInputBlur = () => {
        // Verifica se o valor do input não está vazio antes de buscar os dados
        if (inputValue) {
            buscarDadosAbastecimento();
        }
    };

    return (
        <React.Fragment>
            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ marginLeft: '-12px', marginBottom: '10px' }}>Solicite ao motorista o número do token que está aparecendo na tela do seu celular.</Typography>
                    <BsInfoCircleFill color='#2d61dd' onClick={handleOpen} />
                </div>
                <InputMask
                    mask="9999999999"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    style={{ border: 'none', outline: 'none' }}
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

            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0' }}>
                <Typography sx={{ marginLeft: '-12px', marginBottom: '10px' }}>Informações do abastecimento aparecerão abaixo. Depois de conferir os detalhes, clique em autorizar para gerar o abastecimento.</Typography>
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
                </RowForm>
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

            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
                <InputPesquisa>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ height: 40 }}
                        onClick={handleAutorizarClick}
                    >
                        {isLoading ? 'Carregando...' : 'Autorizar'}
                    </Button>
                </InputPesquisa>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
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
                            <p>+55 47 999078865</p>
                            <p>combutech@combutech.com.br</p>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </React.Fragment>

    );
}

