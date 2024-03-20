import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import styled from 'styled-components';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
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

export default function EditarIntegrado() {
    const location = useLocation();
    const [dadosItemParam, setDadosItemParam] = React.useState(null);
    console.log('dadosParam', dadosItemParam)
    const [dadosFormulario, setDadosFormulario] = React.useState({
        abastecimentoDateTime: null,
        veiculoPlaca: '',
        motoristaNome: '',
        postoNomeFantasia: '',
        produtoDescricao: '',
        abastecimentoDocumento: '',
        abastecimentoQuilometragem: '',
        QuilometragemAnterior: '',
        LitrabastecimentoLitrosos: '',
        abastecimentoValorUnitario: '',
        abastecimentoValorTotal: '',
        abastecimentoMedia: '',
        Observacoes: [{}],
        abastecimentoInconsistencias: ''
    });

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
                abastecimentoDateTime: dadosItemParam.abastecimentoDateTime ? moment(dadosItemParam.abastecimentoDateTime, 'DD/MM/YYYY HH:mm') : null,
                veiculoPlaca: dadosItemParam.veiculoPlaca || '',
                motoristaNome: dadosItemParam.motoristaNome || '',
                postoNomeFantasia: dadosItemParam.postoNomeFantasia || '',
                produtoDescricao: dadosItemParam.produtoDescricao || '',
                abastecimentoDocumento: dadosItemParam.abastecimentoDocumento || '',
                abastecimentoQuilometragem: dadosItemParam.abastecimentoQuilometragem || '',
                QuilometragemAnterior: dadosItemParam.QuilometragemAnterior || '',
                LitrabastecimentoLitrosos: dadosItemParam.LitrabastecimentoLitrosos || '',
                abastecimentoValorUnitario: dadosItemParam.abastecimentoValorUnitario || '',
                abastecimentoValorTotal: dadosItemParam.abastecimentoValorTotal || '',
                abastecimentoMedia: dadosItemParam.abastecimentoMedia || '',
                Observacoes: dadosItemParam.Observacoes || [{}],
                abastecimentoInconsistencias: dadosItemParam.abastecimentoInconsistencias || ''
            });
        }
    }, [dadosItemParam]);

    /* TRATA AS INCONSISTENCIAS DO REGISTROS */
    const Inconsistencias = ({ abastecimentoInconsistencias }) => {
        const mapeamentoMensagens = {
            1: 'A quantidade de litros inserida não condiz com a capacidade do tanque do caminhão.',
            2: 'A quilometragem inserida é menor que a do último abastecimento.',
            3: 'A média calculada não está entre a média mínima e a média máxima do caminhão.',
            4: 'O abastecimento não tem um Veículo informado.',
            5: 'O abastecimento não tem um Motorista informado.',
        };

        const extrairMensagens = (valor) => {
            try {
                const numeros = JSON.parse(valor);
                if (numeros.length === 0) {
                    return <Alert severity="success">Sem inconsistências.</Alert>;
                }
                return numeros.map((numero, index) => (
                    <Alert key={index} severity="error" style={{ marginTop: 2 }}>
                        {mapeamentoMensagens[numero]}
                    </Alert>
                ));
            } catch (error) {
                console.error('Erro ao processar abastecimentoInconsistencias:', error);
                return null;
            }
        };

        const mensagens = abastecimentoInconsistencias
            ? extrairMensagens(abastecimentoInconsistencias)
            : null;

        return (
            <>
                <h3>Inconsistências</h3>
                <ul>
                    {mensagens}
                </ul>
            </>
        );
    };

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

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }} data-aos="fade-up-left">
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
                    label='Veículo'
                    value={dadosFormulario.veiculoPlaca}
                    onChange={(event) => handleChange('veiculo', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                />
                <TextField
                    label='Motorista'
                    value={dadosFormulario.motoristaNome}
                    onChange={(event) => handleChange('motorista', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                />
            </RowForm>

            <RowForm>
                <TextField
                    disabled
                    label='Posto'
                    value={dadosFormulario.postoNomeFantasia}
                    onChange={(event) => handleChange('posto', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                />
                <TextField
                    disabled
                    label='Produto'
                    value={dadosFormulario.produtoDescricao}
                    onChange={(event) => handleChange('produto', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                />
            </RowForm>

            <RowForm>
                <TextField
                    disabled
                    label="Número Documento"
                    value={dadosFormulario.abastecimentoDocumento}
                    onChange={(event) => handleChange('numeroDocumento', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                />
                <TextField
                    disabled
                    label="Quilometragem Anterior"
                    value={dadosFormulario.QuilometragemAnterior}
                    onChange={(event) => handleChange('QuilometragemAnterior', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                />
                <TextField
                    disabled
                    label="Quilometragem"
                    value={dadosFormulario.abastecimentoQuilometragem}
                    onChange={(event) => handleChange('Quilometragem', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                />
            </RowForm>

            <RowForm>
                <TextField
                    disabled
                    id="litros"
                    label="Litros"
                    value={dadosFormulario.LitrabastecimentoLitrosos}
                    onChange={(event) => handleChange('litros', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                />
                <TextField
                    disabled
                    id="valorUnitario"
                    label="Valor Unitário"
                    value={dadosFormulario.abastecimentoValorUnitario}
                    onChange={(event) => handleChange('valorUnitario', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                />
            </RowForm>

            <RowForm>
                <TextField
                    disabled
                    id="valorTotal"
                    label="Valor Total"
                    value={dadosFormulario.abastecimentoValorTotal}
                    onChange={(event) => handleChange('valorTotal', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                />
                <TextField
                    disabled
                    id="media"
                    label="Média (KM/L)"
                    value={dadosFormulario.abastecimentoMedia}
                    onChange={(event) => handleChange('media', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                />
            </RowForm>
        </div>

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }} data-aos="fade-up-left">
            <Inconsistencias abastecimentoInconsistencias={dadosItemParam?.abastecimentoInconsistencias || ''} />
        </div>

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
            <div style={{ display: 'flex', width: '20vw' }}>
                <Button onClick={handleSubmit} variant="contained" color="success" sx={{ height: 40 }}>
                    Atualizar
                </Button>
                <a href="/auth/abastecimentos/integrados" style={{ backgroundColor: 'transparent', color: '#fff', }}>
                    <Button sx={{ backgroundColor: 'grey', color: 'white', height: 40, marginLeft: 1 }}>
                        Voltar
                    </Button>
                </a>
            </div>
        </div>
    </>;
};
