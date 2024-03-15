import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputMask from "react-input-mask";
import styled from 'styled-components';

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

export default function AutorizacaoPosto() {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <React.Fragment>
            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0' }}>
                <InputMask
                    mask="999.999.999"
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
                <RowForm>
                    <TextField
                        disabled
                        id="nomeCompleto"
                        label="Nome Completo"
                        name="nomeCompleto"
                        inputProps={{style: { paddingLeft: '10px' }}}
                        sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                    />
                    <TextField
                        disabled
                        id="kmAtual"
                        label="KM Atual"
                        name="kmAtual"
                        inputProps={{ style: { paddingLeft: '10px' }}}
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

            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0' }}>
                
            </div>
        </React.Fragment>

    );
}

