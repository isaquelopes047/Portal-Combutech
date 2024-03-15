import React, { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Autocomplete } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import base from '../../../hooks/BaseUrlApi';
import 'moment/locale/pt-br';
import 'dayjs/locale/en-gb';

import { formatNumberForKm, formatNumberDefault, formatNumberForLitros, formatNumberForValorUnitario } from './formatters'

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

const defaultInputsAutoComplete = {
    '& label.Mui-focused': { paddingLeft: 0 },
    '& .css-16e8wmc-MuiAutocomplete-root, & .MuiOutlinedInput-root, & .MuiAutocomplete-input': { paddingLeft: 1, paddingTop: 0, height: '40px' },
    '& .css-1q60rmi-MuiAutocomplete-endAdornment': { top: 0 },
    '& .MuiAutocomplete-hasPopupIcon.css-6c6kjn-MuiAutocomplete-root, & .MuiOutlinedInput-root, & .MuiAutocomplete-hasClearIcon.css-6c6kjn-MuiAutocomplete-root, & .MuiOutlinedInput-root': { height: '50px' },
};

const styleLoad = {
    position: 'absolute',
    zIndex: '99999999',
    width: '97%',
    height: '320px',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

export default function CriarAbastecimentoIntegrado() {
    const [errors, setErrors] = useState({});
    const [fieldClicked, setFieldClicked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [placasVeiculo, setPlacasVeiculo] = useState([]);
    const [motoristas, setMotoristas] = useState([]);
    const [posto, setPosto] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [placaDigitada, setPlacaDigitada] = useState('');
    const [motoristaDigitado, setMotoristaDigitado] = useState('');
    const [postoDigitado, setPostoDigitado] = useState('');
    const [produtosDigitado, setProdutosDigitado] = useState('');
    const [veiculoEncontrado, setVeiculoEncontrado] = useState(null);
    const [motoristaEncontrado, setMotoristaEncontrado] = useState(null);
    const [postoEncontrado, setPostoEcontrado] = useState(null);
    const [produtosEncontrado, setProdutosEncontrados] = useState(null);
    const [dadosFormulario, setDadosFormulario] = React.useState({
        dataAbastecimento: dayjs(),
        idVeiculo: '',
        idMotorista: '',
        idPosto: '',
        idProduto: '',
        numeroDocumento: '',
        quilometragem: '',
        litros: '',
        valorUnitario: '',
    })
    console.log(dadosFormulario);
    const [alert, setAlert] = useState({
        messageAlert: '',
        typeAlert: '',
        show: false
    });

    /* Função callback de get dos dados */
    const GetApiDados = async (UrlRequest, callback) => {
        const authToken = localStorage.getItem('authToken');
        const headers = { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' };
        try {
            const resposta = await fetch(`${base.URL_BASE_API}${UrlRequest}`, { method: 'GET', headers: headers });
            const dados = await resposta.json();
            callback(dados.data || []);
        } catch (erro) {
            console.error('Erro ao carregar placas da API:', erro);
        }
    };

    useEffect(() => {
        GetApiDados('/Veiculo/BuscaVeiculos', (dados) => {
            setPlacasVeiculo(dados);
        });

        GetApiDados('/Motorista/BuscaMotoristas', (dados) => {
            setMotoristas(dados);
        });

        GetApiDados('/Posto/BuscaPostos', (dados) => {
            setPosto(dados);
        });

        GetApiDados('/Produto/BuscaProdutos', (dados) => {
            setProdutos(dados);
        });
    }, []);

    useEffect(() => {
        const verificarComprimentoCampos = () => {
            const camposComErro = {};
            Object.keys(dadosFormulario).forEach((campo) => {
                camposComErro[campo] = fieldClicked[campo] && (!dadosFormulario[campo] || dadosFormulario[campo].length === 0);
            });
            setErrors(camposComErro);
        };

        verificarComprimentoCampos();
        const camposInputListener = () => {
            verificarComprimentoCampos();
        };
        document.addEventListener('input', camposInputListener);
        return () => {
            document.removeEventListener('input', camposInputListener);
        };
    }, [dadosFormulario, fieldClicked]);

    /* Tratamento dos dados para os VEICULOS */
    const handlePlacaChange = (event) => {
        const novaPlacaDigitada = event.target.value.toUpperCase();
        setPlacaDigitada(novaPlacaDigitada);
        setDadosFormulario({
            ...dadosFormulario,
            erro: false
        });
    };
    const verificarPlaca = () => {
        const veiculoEncontrado = placasVeiculo.find(item => item.veiculoplaca === placaDigitada);
        if (veiculoEncontrado) {
            setVeiculoEncontrado(veiculoEncontrado);
            setDadosFormulario({
                ...dadosFormulario,
                idVeiculo: veiculoEncontrado.veiculoid,
                erro: false
            });
        } else {
            setDadosFormulario({
                ...dadosFormulario,
                erro: true
            });
        }
    };
    /* Fim */

    /* Tratamento dos dados para os MOTORISTAS */
    const handleMotoristaChange = (event) => {
        const novaMotoristaDigitado = event.target.value.toUpperCase();
        setMotoristaDigitado(novaMotoristaDigitado);
        setDadosFormulario({
            ...dadosFormulario,
            erro: false
        });
    };
    const verificarMotorista = () => {
        const motoristaEncontrado = motoristas.find(item => item.motoristanome === motoristaDigitado);
        if (motoristaEncontrado) {
            setMotoristaEncontrado(motoristaEncontrado);
            setDadosFormulario({
                ...dadosFormulario,
                idMotorista: motoristaEncontrado.motoristaid,
                erro: false
            });
        } else {
            setDadosFormulario({
                ...dadosFormulario,
                erro: true
            });
        }
    };
    /* Fim */

    /* Tratamento dos dados para os POSTOS */
    const handlePostoChange = (event) => {
        const novaPostoDigitado = event.target.value.toUpperCase();
        setPostoDigitado(novaPostoDigitado);
        setDadosFormulario({
            ...dadosFormulario,
            erro: false
        });
    };
    const verificarPosto = () => {
        const postoEncontrado = posto.find(item => item.postonomefantasia === postoDigitado);
        if (postoEncontrado) {
            setPostoEcontrado(postoEncontrado);
            setDadosFormulario({
                ...dadosFormulario,
                idPosto: postoEncontrado.postoid,
                erro: false
            });
        } else {
            setDadosFormulario({
                ...dadosFormulario,
                erro: true
            });
        }
    };
    /* Fim */

    /* Tratamento dos dados para os PRODUTOS */
    const handleProdutosChange = (event) => {
        const novoProdutoDigitado = event.target.value.toUpperCase();
        setProdutosDigitado(novoProdutoDigitado);
        setDadosFormulario({
            ...dadosFormulario,
            erro: false
        });
    };
    const verificarProdutos = () => {
        const produtoEncontrado = produtos.find(item => item.produtodescricao === produtosDigitado);
        if (produtoEncontrado) {
            setPostoEcontrado(produtoEncontrado);
            setDadosFormulario({
                ...dadosFormulario,
                idProduto: produtoEncontrado.produtoid,
                erro: false
            });
        } else {
            setDadosFormulario({
                ...dadosFormulario,
                erro: true
            });
        }
    };
    /* Fim */

    /* handle para formatação da data */
    const handleChange = (campo, event) => {
        const valor = event ? dayjs(event) : null;
        const dataFormatada = valor ? valor.format('YYYY-MM-DDTHH:mm:ss') : null;

        setFieldClicked((prevFieldClicked) => ({
            ...prevFieldClicked,
            [campo]: true
        }));

        setDadosFormulario((prevDadosFormulario) => ({
            ...prevDadosFormulario,
            [campo]: dataFormatada
        }));
    };

    /* handle para formatação de input type number */
    const handleChangeForNumber = (campo, valor, formatter) => {
        setFieldClicked(prevFieldClicked => ({
            ...prevFieldClicked,
            [campo]: true
        }));

        const formattedValue = formatter(valor);

        setDadosFormulario(prevDadosFormulario => ({
            ...prevDadosFormulario,
            [campo]: formattedValue
        }));
    };

    /* Envio do formulario */
    const handleSubmit = () => {
        setLoading(true);

        const dadosParaEnvio = {
            ...dadosFormulario,
            /* idPosto: parseFloat(dadosFormulario.idPosto.replace(/[,.]/g, '')), */
            numeroDocumento: parseFloat(dadosFormulario.numeroDocumento.replace(/[,.]/g, '')),
            quilometragem: parseFloat(dadosFormulario.quilometragem.replace(/[,.]/g, '')),
            litros: parseFloat(dadosFormulario.litros.replace(/[,.]/g, '')),
            valorUnitario: parseFloat(dadosFormulario.valorUnitario.replace(/[,.]/g, ''))
        };

        const authToken = localStorage.getItem('authToken');
        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        };
        fetch(`${base.URL_BASE_API}/IntegracaoAbastecimento/CriaAbastecimento`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(dadosParaEnvio)
        })
            .then(response => { if (!response.ok) { throw new Error('Erro ao criar abastecimento') } return response.json() })
            .then(data => {
                setAlert({
                    messageAlert: "Abastecimento criado com sucesso!",
                    typeAlert: 'success',
                    show: true
                });
            })
            .catch(error => {
                setAlert({
                    messageAlert: "Erro ao criar abastecimento, tente novamente em instantes ou procure o suporte.",
                    typeAlert: 'error',
                    show: true,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return <>
        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
            <p>Informações gerais</p>
        </div>

        {alert.show ? (
            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
                <Alert severity={alert.typeAlert}>{alert.messageAlert}</Alert>
            </div>
        ) : (
            null
        )}

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
            <div>
                {loading ? (
                    <div style={{ ...styleLoad }}>
                        <CircularProgress />
                    </div>
                ) : (
                    null
                )}
            </div>

            <RowForm>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                    <Stack spacing={2} sx={{ ...defaultInputStyle, paddingX: 0 }}>
                        <DateTimePicker
                            value={dadosFormulario.dataAbastecimento || ''}
                            onChange={(event) => handleChange('dataAbastecimento', event)}
                            label="Data abastecimento"
                            slotProps={{ textField: { variant: 'outlined' } }}
                        />
                    </Stack>
                </LocalizationProvider>
                <Autocomplete
                    sx={{ ...defaultInputStyle, paddingX: 1, ...defaultInputsAutoComplete }}
                    options={placasVeiculo}
                    getOptionLabel={(option) => option.veiculoplaca || 'Veículo'}
                    onChange={(event, newValue) => {
                        if (newValue) { handlePlacaChange({ target: { value: newValue.veiculoplaca } }) }
                    }}
                    renderOption={(props, option) => (
                        <li {...props} key={option.veiculoid}>
                            {option.veiculoplaca}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Veículo'
                            value={placaDigitada}
                            error={dadosFormulario.erro}
                            helperText={dadosFormulario.erro ? 'Placa não encontrada' : ''}
                            onBlur={verificarPlaca}
                        />
                    )}
                    filterOptions={(options, { inputValue }) => options.filter((option) => option.veiculoplaca.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 5)} />
                <Autocomplete
                    sx={{ ...defaultInputStyle, paddingX: 1, ...defaultInputsAutoComplete }}
                    options={motoristas}
                    getOptionLabel={(option) => option.motoristanome || 'Motorista'}
                    onChange={(event, newValue) => {
                        if (newValue) { handleMotoristaChange({ target: { value: newValue.motoristanome } }) }
                    }}
                    renderOption={(props, option) => (
                        <li {...props} key={option.motoristaid}>
                            {option.motoristanome}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Motorista'
                            value={motoristaDigitado}
                            error={dadosFormulario.erro}
                            helperText={dadosFormulario.erro ? 'Motorista não encontrada' : ''}
                            onBlur={verificarMotorista}
                        />
                    )}
                    filterOptions={(options, { inputValue }) => options.filter((option) => option.motoristanome.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 5)}
                />
            </RowForm>

            <RowForm>
                <Autocomplete
                    sx={{ ...defaultInputStyle, paddingX: 0, ...defaultInputsAutoComplete }}
                    options={posto}
                    getOptionLabel={(option) => option.postorazaosocial || 'Posto'}
                    onChange={(event, newValue) => { if (newValue) { handlePostoChange({ target: { value: newValue.postorazaosocial } }) } }}
                    renderOption={(props, option) => (
                        <li {...props} key={option.postoid}>
                            {option.postorazaosocial}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Posto'
                            value={postoDigitado}
                            error={dadosFormulario.erro}
                            helperText={dadosFormulario.erro ? 'Posto não encontrada' : ''}
                            onBlur={verificarPosto}
                        />
                    )}
                    filterOptions={(options, { inputValue }) => options.filter((option) => option.postorazaosocial.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 5)}
                />
                <Autocomplete
                    sx={{
                        ...defaultInputStyle, paddingX: 1,
                        ...defaultInputsAutoComplete
                    }}
                    options={produtos}
                    getOptionLabel={(option) => option.produtodescricao || 'Produto'}
                    onChange={(event, newValue) => { if (newValue) { handleProdutosChange({ target: { value: newValue.produtodescricao } }) } }}
                    renderOption={(props, option) => (
                        <li {...props} key={option.produtoid}>
                            {option.produtodescricao}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Produtos'
                            value={produtosDigitado}
                            error={dadosFormulario.erro}
                            helperText={dadosFormulario.erro ? 'Produto não encontrada' : ''}
                            onBlur={verificarProdutos}
                        />
                    )}
                    filterOptions={(options, { inputValue }) => options.filter((option) => option.produtodescricao.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 5)}
                />
            </RowForm>

            <RowForm>
                <TextField
                    label="Número Documento"
                    value={dadosFormulario.numeroDocumento}
                    error={errors.numeroDocumento}
                    onChange={(event) => handleChangeForNumber('numeroDocumento', event.target.value, formatNumberDefault)}
                    sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                />
                <TextField
                    disabled
                    label="Quilometragem Anterior"
                    value={dadosFormulario.QuilometragemAnterior}
                    error={errors.QuilometragemAnterior}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                />
                <TextField
                    label="Quilometragem"
                    value={dadosFormulario.quilometragem}
                    error={errors.quilometragem}
                    onChange={(event) => handleChangeForNumber('quilometragem', event.target.value, formatNumberForKm)}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                />
            </RowForm>

            <RowForm>
                <TextField
                    label="Litros"
                    value={dadosFormulario.litros}
                    error={errors.litros}
                    onChange={(event) => handleChangeForNumber('litros', event.target.value, formatNumberForLitros)}
                    sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                />
                <TextField
                    id="valorUnitario"
                    label="Valor Unitário"
                    value={dadosFormulario.valorUnitario}
                    error={errors.valorUnitario}
                    onChange={(event) => handleChangeForNumber('valorUnitario', event.target.value, formatNumberForValorUnitario)}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                />
            </RowForm>

            <RowForm>
                <TextField
                    disabled
                    id="valorTotal"
                    label="Valor Total"
                    value={dadosFormulario.valorTotal}
                    error={errors.valorTotal}
                    onChange={(event) => handleChangeForNumber('valorTotal', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                />
                <TextField
                    disabled
                    id="media"
                    label="Média (KM/L)"
                    value={dadosFormulario.media}
                    error={errors.media}
                    onChange={(event) => handleChangeForNumber('media', event.target.value)}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                />
            </RowForm>
        </div>

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
            <div style={{ display: 'flex', width: '20vw' }}>
                <Button onClick={handleSubmit} variant="contained" color="success" sx={{ height: 40 }} disable>
                    Criar
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
