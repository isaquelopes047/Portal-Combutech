import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import LinearDeterminate from '../../loadings/progressBar/progressBar';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import base from '../../../hooks/BaseUrlApi';
import Cookies from 'js-cookie';
import 'moment/locale/pt-br';

import { handleUnauthorized } from '../../../hooks/LogOut';
import { Autocomplete } from '@mui/material';
import { formatNumberForKm, formatNumberForLitros } from '../Integrados/formatters'
import { handlePlacaChange, verificarPlaca } from '../Integrados/funcoesUtilitarias/PlacaVeiculo';
import { handleMotoristaChange, verificarMotorista } from '../Integrados/funcoesUtilitarias/Motorista';
import { handleProdutosChange, verificarProdutos } from './Produtos';

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
    '& .css-16e8wmc-MuiAutocomplete-root, & .MuiOutlinedInput-root, & .MuiAutocomplete-input': { paddingLeft: 1, paddingTop: 0, height: '40px' },
    '& .css-1q60rmi-MuiAutocomplete-endAdornment': { top: 0 },
    '& .MuiAutocomplete-hasPopupIcon.css-6c6kjn-MuiAutocomplete-root, & .MuiOutlinedInput-root, & .MuiAutocomplete-hasClearIcon.css-6c6kjn-MuiAutocomplete-root, & .MuiOutlinedInput-root': { height: '50px' },
    '& .MuiButtonBase-root, & .MuiIconButton-root & .MuiIconButton-sizeMedium & .MuiAutocomplete-popupIndicator & .css-qzbt6i-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator': { display: 'none' },
    '& .label.Mui-focused': { marginTop: 50 },
    '& .css-1kbl4sy-MuiAutocomplete-root, & .MuiOutlinedInput-root, & .MuiAutocomplete-input': { paddingTop: '10.5px' }
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

export default function CriarAbastecimentoContingencia() {
    const [errors, setErrors] = useState({ numeroDocumento: false, quilometragem: false, litros: false, valorUnitario: false, });
    const [idPosto, setIdPostos] = useState(localStorage.getItem('postoid'));
    const [fieldClicked, setFieldClicked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [placasVeiculo, setPlacasVeiculo] = useState([]);
    const [motoristas, setMotoristas] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [produtosPortal, setProdutosPortal] = useState([]);
    const [placaDigitada, setPlacaDigitada] = useState('');
    const [motoristaDigitado, setMotoristaDigitado] = useState('');
    const [produtosDigitado, setProdutosDigitado] = useState('');
    const [veiculoEncontrado, setVeiculoEncontrado] = useState(null);
    const [motoristaEncontrado, setMotoristaEncontrado] = useState(null);
    const [produtosEncontrado, setProdutosEncontrados] = useState(null);
    const transportadoraId = Cookies.get('transportadoraId');
    const [dadosFormulario, setDadosFormulario] = React.useState({
        idVeiculo: '',
        idMotorista: '',
        idPosto: idPosto,
        idProdutoPosto: '',
        quilometragem: '',
        litros: '',
        imagem: '',
        motivo: ''
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
        setLoading(true);
        try {
            const resposta = await fetch(`${base.URL_BASE_API}${UrlRequest}`, { method: 'GET', headers });
    
            if (resposta.status === 401) {
                handleUnauthorized();
                setLoading(false); // Desativa o loading em caso de erro
                return;
            }
    
            const dados = await resposta.json();
            callback(dados.data || []);
        } catch (erro) {
            console.error('Erro ao carregar placas da API:', erro);
        } finally {
            setLoading(false); // Desativa o loading após a requisição
        }
    };

    useEffect(() => {
        GetApiDados(`/Veiculo/BuscaVeiculosPorTransportadora/${transportadoraId}`, (dados) => {
            setPlacasVeiculo(dados);
        });

        GetApiDados(`/Motorista/BuscaMotoristasPorTransportadora/${transportadoraId}`, (dados) => {
            setMotoristas(dados);
        });

        GetApiDados(`/Posto/BuscaProdutosPosto/${idPosto}`, (dados) => {
            setProdutos(dados);
        });

        GetApiDados(`/Produto/BuscaProdutos`, (dados) => {
            setProdutosPortal(dados);
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
        const dadosParaEnvio = {
            ...dadosFormulario,
            quilometragem: parseFloat(dadosFormulario.quilometragem.replace(/[,.]/g, '')),
            litros: parseFloat(dadosFormulario.litros.replace(/[,.]/g, '')),
        };
        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        };
        fetch(`${base.URL_BASE_API}/Contingencia/CriarAbastecimentoContingencia`, {
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
        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto', display: 'flex', gap: '30px', }}>
            <p>Informações gerais</p>
            <p>Esta tela deve ser utilizada somente em situações adversas, quando houver falha no funcionamento do aplicativo principal. O uso desta funcionalidade é excepcional e estará sujeito a uma autorização prévia da transportadora responsável. Certifique-se de comunicar a transportadora antes de prosseguir com o abastecimento.</p>
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

                <Autocomplete
                    sx={{ ...defaultInputStyle, paddingX: 0, ...defaultInputsAutoComplete }}
                    options={placasVeiculo}
                    getOptionLabel={(option) => option.veiculoplaca || 'Veículo'}
                    onChange={(event, newValue) => {
                        if (newValue) { handlePlacaChange({ target: { value: newValue.veiculoplaca } }, setPlacaDigitada, setDadosFormulario, dadosFormulario) }
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
                        if (newValue) { handleMotoristaChange({ target: { value: newValue.motoristanome } }, setMotoristaDigitado, setDadosFormulario, dadosFormulario) }
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
                    options={produtos}
                    getOptionLabel={(option) => {
                        // Procura o nome do produto correspondente no estado produtosPortal
                        const produtoPortal = produtosPortal.find(
                            (p) => p.produtoid === option.produtoid
                        );
                        return produtoPortal?.produtodescricao || "Produto";
                    }}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            setDadosFormulario((prevState) => ({
                                ...prevState,
                                idProdutoPosto: newValue.produtopostoid,
                            }));

                            // Atualiza o valor digitado (opcional)
                            const produtoPortal = produtosPortal.find(
                                (p) => p.produtoid === newValue.produtoid
                            );
                            setProdutosDigitado(produtoPortal?.produtodescricao || "");
                        }
                    }}
                    renderOption={(props, option) => {
                        // Exibe o código interno e o nome do produto
                        const produtoPortal = produtosPortal.find(
                            (p) => p.produtoid === option.produtoid
                        );
                        return (
                            <li {...props} key={option.produtopostoid}>
                                {option.produtopostocodigointerno} - {produtoPortal?.produtodescricao || "Sem descrição"}
                            </li>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Produto"
                            value={produtosDigitado}
                            onBlur={() =>
                                verificarProdutos(
                                    produtos,
                                    produtosDigitado,
                                    setProdutosEncontrados,
                                    setDadosFormulario,
                                    dadosFormulario
                                )
                            }
                        />
                    )}
                    filterOptions={(options, { inputValue }) =>
                        options
                            .filter((option) =>
                                option.produtopostocodigointerno
                                    .toLowerCase()
                                    .includes(inputValue.toLowerCase())
                            )
                            .slice(0, 5)
                    }
                />
            </RowForm>
            <RowForm>
                <TextField
                    label="Quilometragem"
                    value={dadosFormulario.quilometragem}
                    error={errors.quilometragem}
                    helperText={errors.quilometragem ? 'Digite uma quilometragem valída' : ''}
                    onFocus={() => setErrors({ ...errors, quilometragem: false })}
                    onBlur={() => setErrors({ ...errors, quilometragem: !dadosFormulario.quilometragem.trim() })}
                    onChange={(event) => handleChangeForNumber('quilometragem', event.target.value, formatNumberForKm)}
                    sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
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
            </RowForm>
        </div>

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
            <div style={{ display: 'flex', width: '10vw' }}>
                <Button onClick={handleSubmit} variant="contained" color="success" sx={{ height: 40 }} disable>
                    Criar
                </Button>
            </div>
        </div>
    </>;
};
