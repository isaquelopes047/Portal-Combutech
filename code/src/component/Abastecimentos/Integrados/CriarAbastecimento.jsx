import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import LinearDeterminate from '../../loadings/progressBar/progressBar';
import styled from 'styled-components';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import base from '../../../hooks/BaseUrlApi';
import Cookies from 'js-cookie';
import 'moment/locale/pt-br';
import 'dayjs/locale/en-gb';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { handleUnauthorized } from '../../../hooks/LogOut';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Autocomplete } from '@mui/material';
import { formatNumberForKm, formatNumberDefault, formatNumberForLitros, formatNumberForValorUnitario } from './formatters'
import { handlePlacaChange, verificarPlaca } from './funcoesUtilitarias/PlacaVeiculo';
import { handleMotoristaChange, verificarMotorista } from './funcoesUtilitarias/Motorista';
import { handlePostoChange, verificarPosto } from './funcoesUtilitarias/Posto';
import { handleProdutosChange, verificarProdutos } from './funcoesUtilitarias/Produtos';

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
    height: '65px',
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
    '& .css-16e8wmc-MuiAutocomplete-root, & .MuiOutlinedInput-root, & .MuiAutocomplete-input': {paddingLeft: 1, paddingTop: 0, height: '40px'},
    '& .css-1q60rmi-MuiAutocomplete-endAdornment': {top: 0},
    '& .MuiAutocomplete-hasPopupIcon.css-6c6kjn-MuiAutocomplete-root, & .MuiOutlinedInput-root, & .MuiAutocomplete-hasClearIcon.css-6c6kjn-MuiAutocomplete-root, & .MuiOutlinedInput-root': {height: '50px'},
    '& .MuiButtonBase-root, & .MuiIconButton-root & .MuiIconButton-sizeMedium & .MuiAutocomplete-popupIndicator & .css-qzbt6i-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator': {display: 'none'},
    '& .label.Mui-focused': { marginTop: 50 }
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
}; 

export default function CriarAbastecimentoIntegrado() {
    const [errors, setErrors] = useState({ numeroDocumento: false, quilometragem: false, litros: false, valorUnitario: false,  });
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
    const transportadoraId = Cookies.get('transportadoraId');
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
    const [alert, setAlert] = useState({
        messageAlert: '',
        typeAlert: '',
        show: false
    });

    /* Função callback de get dos dados */
    const GetApiDados = async (UrlRequest, callback) => {
        const authToken = localStorage.getItem('authToken');
        const headers = {
            'Authorization': `Bearer ${authToken}`, 
            'Content-Type': 'application/json' 
        };
        try {
            const resposta = await fetch(`${base.URL_BASE_API}${UrlRequest}`, { method: 'GET', headers: headers });

            if (resposta.status == 401) {
                handleUnauthorized();
                return;
            };

            const dados = await resposta.json();
            callback(dados.data || []);
        } catch (erro) {
            console.error('Erro ao carregar placas da API:', erro);
        }
    };

    useEffect(() => {
        GetApiDados(`/Veiculo/BuscaVeiculosPorTransportadora/${transportadoraId}`, (dados) => {
            setPlacasVeiculo(dados);
        });

        GetApiDados(`/Motorista/BuscaMotoristasPorTransportadora/${transportadoraId}`, (dados) => {
            setMotoristas(dados);
        });

        GetApiDados(`/Posto/BuscaPostosPorTransportadora/${transportadoraId}`, (dados) => {
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
        const authToken = localStorage.getItem('authToken');
        const valorUnitarioFormatado = dadosFormulario.valorUnitario.replace(/[^\d,]/g, '');
        const dadosParaEnvio = {
            ...dadosFormulario,
            /* idPosto: parseFloat(dadosFormulario.idPosto.replace(/[,.]/g, '')), */
            numeroDocumento: parseFloat(dadosFormulario.numeroDocumento.replace(/[,.]/g, '')),
            quilometragem: parseFloat(dadosFormulario.quilometragem.replace(/[,.]/g, '')),
            litros: parseFloat(dadosFormulario.litros.replace(/[,.]/g, '')),
            valorUnitario: parseFloat(valorUnitarioFormatado.replace(',', '.'))
        };
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
                setTimeout(() => { window.location.reload() }, 3000);
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
                <div>
                    <Alert severity={alert.typeAlert}>{alert.messageAlert}</Alert>
                    {!alert.messageAlert.startsWith('Erro') && <LinearDeterminate />}
                </div>
            </div>
        ) : (null)}

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }} data-aos="fade-up-left">
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
                        if (newValue) { handlePlacaChange({ target: { value: newValue.veiculoplaca }}, setPlacaDigitada, setDadosFormulario, dadosFormulario) }
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
                            onBlur={() => verificarPlaca(placasVeiculo, placaDigitada, setVeiculoEncontrado, setDadosFormulario, dadosFormulario)}
                        />
                    )}
                    filterOptions={(options, { inputValue }) => options.filter((option) => option.veiculoplaca.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 5)}
                />

                <Autocomplete
                    sx={{ ...defaultInputStyle, paddingX: 1, ...defaultInputsAutoComplete }}
                    options={motoristas}
                    getOptionLabel={(option) => option.motoristanome || 'Motorista'}
                    onChange={(event, newValue) => {
                        if (newValue) { handleMotoristaChange({ target: { value: newValue.motoristanome }}, setMotoristaDigitado, setDadosFormulario, dadosFormulario) }
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
                            onBlur={() => verificarMotorista(motoristas, motoristaDigitado, setMotoristaEncontrado, setDadosFormulario, dadosFormulario)}
                        />
                    )}
                    filterOptions={(options, { inputValue }) => options.filter((option) => option.motoristanome.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 5)}
                />
            </RowForm>

            <RowForm>
                <Autocomplete
                    sx={{ ...defaultInputStyle, paddingX: 0, ...defaultInputsAutoComplete }}
                    options={posto}
                    getOptionLabel={(option) => option.postonomefantasia || 'Posto'}
                    onChange={(event, newValue) => {
                        if (newValue) { handlePostoChange({ target: { value: newValue.postonomefantasia }}, setPostoDigitado, setDadosFormulario, dadosFormulario) }
                    }}
                    renderOption={(props, option) => (
                        <li {...props} key={option.postoid}>
                            {option.postonomefantasia}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Posto'
                            value={postoDigitado}
                            onBlur={() => verificarPosto(posto, postoDigitado, setPostoEcontrado, setDadosFormulario, dadosFormulario)}
                        />
                    )}
                    filterOptions={(options, { inputValue }) => options.filter((option) => option.postonomefantasia.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 5)}
                />

                <Autocomplete
                    sx={{ ...defaultInputStyle, paddingX: 1, ...defaultInputsAutoComplete }}
                    options={produtos}
                    getOptionLabel={(option) => option.produtodescricao || 'Produto'}
                    onChange={(event, newValue) => {
                        if (newValue) { handleProdutosChange({ target: { value: newValue.produtodescricao }}, setProdutosDigitado, setDadosFormulario, dadosFormulario) }
                    }}
                    renderOption={(props, option) => (
                        <li {...props} key={option.produtoid}>
                            {option.produtodescricao}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Produto'
                            value={produtosDigitado}
                            onBlur={() => verificarProdutos(produtos, produtosDigitado, setProdutosEncontrados, setDadosFormulario, dadosFormulario)}
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
                    helperText={errors.numeroDocumento ? 'Digite um número de documento' : ''}
                    onFocus={() => setErrors({ ...errors, numeroDocumento: false })}
                    onBlur={() => setErrors({ ...errors, numeroDocumento: !dadosFormulario.numeroDocumento.trim()})}
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
                    helperText={errors.quilometragem ? 'Digite uma quilometragem valída' : ''}
                    onFocus={() => setErrors({ ...errors, quilometragem: false })}
                    onBlur={() => setErrors({ ...errors, quilometragem: !dadosFormulario.quilometragem.trim() })}
                    onChange={(event) => handleChangeForNumber('quilometragem', event.target.value, formatNumberForKm)}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                />
            </RowForm>

            <RowForm>
                <TextField
                    label="Litros"
                    value={dadosFormulario.litros}
                    error={errors.litros}
                    helperText={errors.litros ? 'Quantidade de litros invalída' : ''}
                    onFocus={() => setErrors({ ...errors, litros: false })}
                    onBlur={() => setErrors({ ...errors, litros: !dadosFormulario.litros.trim() })}
                    onChange={(event) => handleChangeForNumber('litros', event.target.value, formatNumberForLitros)}
                    sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                />
                <TextField
                    label="Valor Unitário"
                    value={`R$ ${dadosFormulario.valorUnitario}`}
                    error={errors.valorUnitario}
                    helperText={errors.valorUnitario ? 'Valor unitario invalído' : ''}
                    onFocus={() => setErrors({ ...errors, valorUnitario: false })}
                    onBlur={() => setErrors({ ...errors, valorUnitario: !dadosFormulario.valorUnitario.trim() })}
                    onChange={(event) => handleChangeForNumber('valorUnitario', event.target.value, formatNumberForValorUnitario)}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 }, '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root': { marginLeft: 1 } }}
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
