import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import base from '../../../../hooks/BaseUrlApi';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { MainCriarAlocacaoStyle, ContainerButtonSend, ContainerInfo } from './CriarAlocacao-style';
import { Autocomplete } from '@mui/material';
import { handleUnauthorized } from '../../../../hooks/LogOut';
import { GoPeople } from "react-icons/go";
import { CiDeliveryTruck } from "react-icons/ci";
import { handlePlacaChange, verificarPlaca, handleMotoristaChange, verificarMotorista } from './AlocacaoFunctions/FuncoesUtilitarias';


const defaultInputStyle = {
    flex: 1,
    marginTop: 0,
    height: '40px',
    '& input': {
        marginLeft: 0,

        border: 0,
        paddingLeft: 0,
    },
    '& input:focus': {
        backgroundColor: '#fff',
        border: 0,
    }
};

const defaultInputsAutoComplete = {
    '& label.Mui-focused': { paddingLeft: 0 },
    '& .css-16e8wmc-MuiAutocomplete-root, & .MuiOutlinedInput-root, & .MuiAutocomplete-input': { padding: 0, height: '35px' },
    '& .css-1q60rmi-MuiAutocomplete-endAdornment': { top: 0 },
    '& .MuiAutocomplete-hasPopupIcon.css-6c6kjn-MuiAutocomplete-root, & .MuiOutlinedInput-root, & .MuiAutocomplete-hasClearIcon.css-6c6kjn-MuiAutocomplete-root, & .MuiOutlinedInput-root': { height: '50px' },
    '& .MuiButtonBase-root, & .MuiIconButton-root & .MuiIconButton-sizeMedium & .MuiAutocomplete-popupIndicator & .css-qzbt6i-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator': { display: 'none' },
    '& .label.Mui-focused': { marginTop: 50 }
};

export default function MainCriarAlocacao() {
    const [motoristaTransportadora, setMotoristaTransportadora] = useState([]);
    const [nomeMotorista, setNomeMotorista] = useState([]);
    const [motoristaDigitado, setMotoristaDigitado] = useState('');

    const [veiculoTransportadora, setVeiculoTransportadora] = useState([]);
    const [placaVeiculo, setPlacaVeiculo] = useState([]);
    const [placaDigitada, setPlacaDigitada] = useState('');

    const [disabledInputs, setDisabledInputs] = useState(true);
    const [disabledButtonSend, setDisabledButtonSend] = useState(true);

    const transportadoraId = Cookies.get('transportadoraId');
    const [dadosFormulario, setDadosFormulario] = React.useState({
        motoristaid: null,
        veiculoid: null
    });

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

            if (resposta.status === 401) {
                handleUnauthorized();
                return;
            }

            const dados = await resposta.json();
            callback(dados.data || []);
            setDisabledInputs(false)
        } catch (erro) {
            setAlert({
                messageAlert: "Erro ao carregar os dados, tente novamente mais tarde",
                typeAlert: 'error',
                show: true
            });
        }
    };

    /* envio dos dados */
    const handleSubmit = (event) => {
        event.preventDefault();
        const authToken = localStorage.getItem('authToken');
        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        };

        fetch(`${base.URL_BASE_API}/Veiculo/RegistraAlocacaoVeiculo`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                motoristaid: dadosFormulario.motoristaid || 0,
                veiculoid: dadosFormulario.veiculoid || 0
            })
        })
            .then(response => {
                if (response.status === 401) {
                    handleUnauthorized();
                    return;
                }
                if (!response.ok) throw new Error(`Erro na requisição. Código de status: ${response.status}`); 
                return response.json();
            })
            .then(result => {
                setAlert({ messageAlert: "Veículo vinculado com sucesso!", typeAlert: 'success', show: true });
                setDadosFormulario({ motoristaid: null,  veiculoid: null });
                setMotoristaDigitado('');
                setPlacaDigitada('');
            })
            .catch(error => {
                setAlert({
                    messageAlert: "Esse veiculo já tem uma alocação criada, por favor exclua a alocação antiga na tela de alocações.",
                    typeAlert: 'error',
                    show: true
                });
            });
    };

    useEffect(() => {
        GetApiDados(`/Veiculo/BuscaVeiculosPorTransportadora/${transportadoraId}`, (dados) => {
            setVeiculoTransportadora(dados);
        });

        GetApiDados(`/Motorista/BuscaMotoristasPorTransportadora/${transportadoraId}`, (dados) => {
            setMotoristaTransportadora(dados);
        });
    }, []);

    /* habilita os input de envio com o preenchimento dos dados do state de POST */
    useEffect(() => {
        if (dadosFormulario.motoristaid !== null && dadosFormulario.veiculoid !== null) {
            setDisabledButtonSend(false);
        } else {
            setDisabledButtonSend(true);
        }
    }, [dadosFormulario]);

    return <>
        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
            <p>Alocação de veiculos</p>
        </div>

        {alert.show ? (
            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
                <div>
                    <Alert severity={alert.typeAlert}>{alert.messageAlert}</Alert>
                    {!alert.messageAlert.startsWith('Erro')}
                </div>
            </div>
        ) : (null)}

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>

            <MainCriarAlocacaoStyle>
                <div>
                    <span>
                        <GoPeople size={25}/>
                        <p>Selecione um Motorista</p>
                    </span>
                    <div>
                        <div>
                            <p>Faça a busca pelo nome do motorista da sua transportadora</p>
                        </div>
                        <Autocomplete
                            disabled={disabledInputs}
                            freeSolo
                            sx={{ ...defaultInputStyle, paddingX: 1, ...defaultInputsAutoComplete }}
                            options={motoristaTransportadora}
                            getOptionLabel={(option) => option.motoristanome || 'Motorista'}
                            onChange={(event, newValue) => handleMotoristaChange(event, newValue, setMotoristaDigitado, setDadosFormulario)}
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
                                    onBlur={() => verificarMotorista(motoristaTransportadora, motoristaDigitado, setNomeMotorista, setDadosFormulario)}
                                />
                            )}
                            filterOptions={(options, { inputValue }) => options.filter((option) => option.motoristanome.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 5)}
                        />
                    </div>
                </div>

                <div>
                    <span>
                        <CiDeliveryTruck size={28} />
                        <p>Selecione um Veículo</p>
                    </span>
                    <div>
                        <div>
                            <p> Faça a busca pela placa do veículo da sua transportadora</p>
                        </div>
                        <Autocomplete
                            disabled={disabledInputs}
                            freeSolo
                            sx={{ ...defaultInputStyle, paddingX: 1, ...defaultInputsAutoComplete }}
                            options={veiculoTransportadora}
                            getOptionLabel={(option) => option.veiculoplaca || 'Veículo'}
                            onChange={(event, newValue) => handlePlacaChange(event, newValue, setPlacaDigitada, setDadosFormulario)}
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
                                    onBlur={() => verificarPlaca(veiculoTransportadora, placaDigitada, setPlacaVeiculo, setDadosFormulario)}
                                />
                            )}
                            filterOptions={(options, { inputValue }) => options.filter((option) => option.veiculoplaca.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 5)}
                        />
                    </div>
                </div>
            </MainCriarAlocacaoStyle>

            <ContainerInfo>
                <p>Ao selecionar o motorista, você estará alocando-o à frota. Essa ação estabelecerá a relação dos registros, permitindo um controle mais eficaz e um monitoramento detalhado das operações. Com isso, você garante que todas as atividades sejam acompanhadas de perto, melhorando a eficiência e a organização da sua transportadora.</p>
            </ContainerInfo>

            <ContainerButtonSend>
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={disabledButtonSend}>
                    Alocar
                </Button>
            </ContainerButtonSend>
        </div>
    </>
};