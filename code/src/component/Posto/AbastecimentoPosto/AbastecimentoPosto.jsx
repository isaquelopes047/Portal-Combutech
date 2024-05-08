import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputMask from "react-input-mask";
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
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
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (event) => { setInputValue(event.target.value) };

    return (
        <React.Fragment>
            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ marginLeft: '-12px', marginBottom: '10px' }}>Solicite ao motorista o número do token que está aparecendo na tela do seu celular.</Typography>
                    <BsInfoCircleFill color='#2d61dd' onClick={handleOpen} />
                </div>
                <InputMask
                    mask="999999"
                    value={inputValue}
                    onChange={handleInputChange}
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
                        id="nomeCompleto"
                        label="Nome Completo"
                        name="nomeCompleto"
                        inputProps={{ style: { paddingLeft: '10px' } }}
                        sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                    />
                    <TextField
                        disabled
                        id="kmAtual"
                        label="KM Atual"
                        name="kmAtual"
                        inputProps={{ style: { paddingLeft: '10px' } }}
                        sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                    />
                </RowForm>

                <RowForm>
                    <TextField
                        disabled
                        id="totalAastecido"
                        label="Total Abastecido"
                        name="totalAastecido"
                        inputProps={{ style: { paddingLeft: '10px' } }}
                        sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                    />
                </RowForm>

                <RowForm>
                    <TextField
                        disabled
                        id="placaCaminhao"
                        label="Placa caminhão"
                        name="placaCaminhao"
                        inputProps={{ style: { paddingLeft: '10px' } }}
                        sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                    />
                    <TextField
                        disabled
                        id="totalAutorizado"
                        label="Total Autorizado"
                        name="totalAutorizado"
                        inputProps={{ style: { paddingLeft: '10px' } }}
                        sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                    />
                    <TextField
                        disabled
                        id="tokenFornecido"
                        label="Token fornecido"
                        name="tokenFornecido"
                        inputProps={{ style: { paddingLeft: '10px' } }}
                        sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                    />
                </RowForm>
            </div>

            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
                <InputPesquisa>
                    <Button variant="contained" color="success" sx={{ height: 40 }} disable>
                        Autorizar
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

