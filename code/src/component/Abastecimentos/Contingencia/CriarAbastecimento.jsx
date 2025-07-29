import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import LinearDeterminate from '../../loadings/progressBar/progressBar';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import base from '../../../hooks/BaseUrlApi';
import 'moment/locale/pt-br';

import { handleUnauthorized } from '../../../hooks/LogOut';
import { Autocomplete } from '@mui/material';
import { formatNumberForKm, formatNumberForLitros, normalNumber } from '../Integrados/formatters'
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

    const [cpfmotorista, setCpfMotorista] = useState('');
    const [dadosMotorista, setDadosMotorista] = useState({});
    

    const [fieldClicked, setFieldClicked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [produtosPortal, setProdutosPortal] = useState([]);
    const [produtosDigitado, setProdutosDigitado] = useState('');
    const [produtosEncontrado, setProdutosEncontrados] = useState(null);
    const [produtosComplementares, setProdutosComplementares] = useState(null);
    const [dadosFormulario, setDadosFormulario] = React.useState({
        idVeiculo: '',
        idMotorista: '',
        idPosto: idPosto,
        idProdutoPosto: '',
        quilometragem: '',
        litros: '',
        imagem: '',
        motivo: '',
        idProdutoArlaPosto: null,
        litrosArla: null
    })
    const [alert, setAlert] = useState({
        messageAlert: '',
        typeAlert: '',
        show: false
    });

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
                setLoading(false);
                return;
            }

            const dados = await resposta.json();
            callback(dados.data || []);
        } catch (erro) {
            console.error('Erro ao carregar placas da API:', erro);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetApiDados(`/Produto/BuscaProdutos`, (dados) => {
            setProdutosPortal(dados);
        });
    }, []);

    useEffect(() => {
        if (dadosMotorista.motorista?.motoristatransportadoraid) {
            const transportadoraId = dadosMotorista.motorista.motoristatransportadoraid;

            GetApiDados(`/Posto/BuscaProdutosPosto/${idPosto}/${transportadoraId}`, (dados) => {
                setProdutos(dados);
            });
        }
    }, [dadosMotorista.motorista?.motoristatransportadoraid, idPosto]);

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

    useEffect(() => {
        if (dadosMotorista.motorista) {
            setDadosFormulario(prev => ({
                ...prev,
                idVeiculo: dadosMotorista.motorista.veiculo?.veiculoid || '',
                idMotorista: dadosMotorista.motorista.motoristaid || ''
            }));
        }
    }, [dadosMotorista]);

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

    const formatarCPF = (cpf) => {
        return cpf
            .replace(/\D/g, '')
            .replace(/^(\d{3})(\d)/, '$1.$2')
            .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1-$2')
            .slice(0, 14);
    };

    const handleCpfChange = (event) => {
        const valorDigitado = event.target.value;
        const cpfFormatado = formatarCPF(valorDigitado);
    
        setCpfMotorista(cpfFormatado);
    
        if (cpfFormatado.length === 14) {
            GetApiDados(`/users/BuscaUsuarioMotoristaPortal/${cpfFormatado}`, (dados) => {
                console.log('Retorno da API:', dados);
                if (dados && typeof dados === 'object') {
                    setDadosMotorista(dados); 
                } else {
                    console.error('Erro: API retornou um formato inválido:', dados);
                }
            });
        }
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

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
            <p>Digite o CPF do motorista</p>
            <div style={{ display: 'flex', width: '90vw' }}>
                <TextField
                    label="CPF do motorista"
                    value={cpfmotorista}
                    onChange={handleCpfChange}
                    sx={{ ...defaultInputStyle, marginTop: '30px', width: '300px', paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                />
            </div>
        </div>

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }} data-aos="fade-up-left">

            <RowForm>
                <TextField
                    label="Nome do motorista"
                    value={dadosMotorista?.motorista?.motoristanome || 'Não encontrado'}
                    disabled={true}
                    sx={{ ...defaultInputStyle, paddingX: 0, marginRight: 2, '& label.Mui-focused': { marginLeft: 0 } }}
                />

                <TextField
                    label="Placa do veículo"
                    value={dadosMotorista?.motorista?.veiculo?.veiculoplaca || 'Não encontrado'}
                    disabled={true}
                    sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                />
            </RowForm>
            <RowForm>
                <Autocomplete
                    sx={{ ...defaultInputStyle, paddingX: 0, ...defaultInputsAutoComplete }}
                    options={produtos}
                    getOptionLabel={(option) => {
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
                    onChange={(event) => handleChangeForNumber('litros', event.target.value, normalNumber)}
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
