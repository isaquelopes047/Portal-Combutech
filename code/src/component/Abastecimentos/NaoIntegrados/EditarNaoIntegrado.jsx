import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import styled from 'styled-components';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'dayjs/locale/en-gb';

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

export default function EditarNaoIntegrado() {
    const location = useLocation();
    const [dadosItemParam, setDadosItemParam] = React.useState(null);
    const [dadosFormulario, setDadosFormulario] = React.useState({
        laiData: null,
        laicnpjPosto: '',
        laicpfMotorista: '',
        laiCodigoProduto: '',
        laiPlacaVeiculo: '',
        laikm: '',
        laiLitros: '',
        laiValorUnitario: '',
        laiNumeroDocumento: '',
        laiMensagem: '',
    })

    useEffect(() => {
        const carregarDadosDaLocalizacao = () => {
            const dadosParam = location.state?.dados || null;
            setDadosItemParam(dadosParam);
        };

        carregarDadosDaLocalizacao();
    }, [location.state?.dados]);

    useEffect(() => {
        if (dadosItemParam) {
            setDadosFormulario({
                laiData: dadosItemParam.laiData ? moment(dadosItemParam.abastecimentoDateTime, 'DD/MM/YYYY HH:mm') : null,
                laicnpjPosto: dadosItemParam.laicnpjPosto || '',
                laicpfMotorista: dadosItemParam.laicpfMotorista || '',
                laiPlacaVeiculo: dadosItemParam.laiPlacaVeiculo || '',
                laikm: dadosItemParam.laikm || '',
                laiLitros: dadosItemParam.laiLitros || '',
                laiValorUnitario: dadosItemParam.laiValorUnitario || '',
                laiNumeroDocumento: dadosItemParam.laiNumeroDocumento || '',
                laiMensagem: dadosItemParam.laiMensagem || '',
                laiCodigoProduto: dadosFormulario.laiCodigoProduto || '',
            });
        }
    }, [dadosItemParam]);

    /* tratamento dos dados ao state */
    const handleChange = (campo, valor) => {
        setDadosFormulario((prevDadosFormulario) => {
            const novoEstado = {
                ...prevDadosFormulario,
                [campo]: valor
            };
            return novoEstado;
        });
    };

    /* Envio do formulario */
    const handleSubmit = () => {
        console.log("Dados do Formulário:", dadosFormulario);
    };

    return <>
        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
            <p>Informações gerais</p>
        </div>

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
            <RowForm>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                    <Stack spacing={2} sx={{ ...defaultInputStyle, paddingX: 0 }}>
                        <DateTimePicker
                            disabled
                            value={dadosFormulario.abastecimentoDateTime ? dayjs(dadosFormulario.abastecimentoDateTime) : null}
                            onChange={(event) => handleChange('DataAbastecimento', event.target.value)}
                            label="Data abastecimento"
                        />
                    </Stack>
                </LocalizationProvider>
                <TextField
                    disabled
                    label='CNPJ do posto'
                    value={dadosFormulario.laicnpjPosto}
                    onChange={(event) => handleChange('laicnpjPosto', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                />
                <TextField
                    disabled
                    label='CPF Motorista'
                    value={dadosFormulario.laicpfMotorista}
                    onChange={(event) => handleChange('laicpfMotorista', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                />
            </RowForm>

            <RowForm>
                <TextField
                    label='Código do Produto'
                    value={dadosFormulario.laiCodigoProduto}
                    onChange={(event) => handleChange('laiCodigoProduto', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                />
                <TextField
                    disabled
                    label='Placa Veículo'
                    value={dadosFormulario.laiPlacaVeiculo}
                    onChange={(event) => handleChange('laiPlacaVeiculo', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                />
            </RowForm>

            <RowForm>
                <TextField
                    disabled
                    label="Quilometragem"
                    value={dadosFormulario.laikm}
                    onChange={(event) => handleChange('laikm', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                />
                <TextField
                    disabled
                    label="Litros"
                    value={dadosFormulario.laiLitros}
                    onChange={(event) => handleChange('laiLitros', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                />
                <TextField
                    disabled
                    label="Valor Unitário"
                    value={dadosFormulario.laiValorUnitario}
                    onChange={(event) => handleChange('laiValorUnitario', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                />
            </RowForm>

            <RowForm>
                <TextField
                    disabled
                    id="litros"
                    label="N° Documento"
                    value={dadosFormulario.laiNumeroDocumento}
                    onChange={(event) => handleChange('laiNumeroDocumento', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 1 } }}
                />
            </RowForm>

            <RowForm>
                <TextField
                    disabled
                    label="Mensagem"
                    value={dadosFormulario.laiMensagem}
                    onChange={(event) => handleChange('laiMensagem', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                />
            </RowForm>
        </div>

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
            <div style={{ display: 'flex', width: '20vw' }}>
                <Button onClick={handleSubmit} variant="contained" color="success" sx={{ height: 40 }}>
                    Atualizar
                </Button>
                <a href="/auth/abastecimentos/naointegrados" style={{ backgroundColor: 'transparent', color: '#fff', }}>
                    <Button sx={{ backgroundColor: 'grey', color: 'white', height: 40, marginLeft: 1 }}>
                        Voltar
                    </Button>
                </a>
            </div>
        </div>
    </>;
};
