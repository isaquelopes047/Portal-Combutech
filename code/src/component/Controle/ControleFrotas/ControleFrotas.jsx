import React, { useState, useEffect } from 'react';
import { MainCardTrava, CardTravaSubMenu, InputEnvio } from './ControleFrotas-style';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Cookies from 'js-cookie';

const DivMainContainer = {
    width: '100%',
    height: 'auto',
    marginTop: '20px',
}

export default function MainControleFrotas() {

    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [travas, setTravas] = useState([])
    const [selectedValidacoes, setSelectedValidacoes] = useState([]);

    /* Get produtos travas */
    useEffect(() => {
        const fetchProdutosPosto = async () => {
            const transportadora = Cookies.get('transportadoraId');
            try {
                const requestOptions = { method: 'GET', headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' } };
                const response = await fetch(`https://api.combutech.com.br/api/Transportadora/BuscaValidacoesTransportadora/${transportadora}`, requestOptions);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setTravas(data.data.validacoes);
            } catch (error) {
                console.error('Fetch error:', error);
            }

        };

        fetchProdutosPosto();
    }, []);

    const handleCheckboxChange = (id) => {
        setSelectedValidacoes(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(validacaoId => validacaoId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSubmit = () => {
        setLoading(true);
        const authToken = localStorage.getItem('authToken');
        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        };
        const dadosParaEnvio = {
            idTransportadora: Cookies.get('transportadoraId'),
            idValidacao: selectedValidacoes
        };

        const url = `${base.URL_BASE_API}/api/Transportadora/RegistraValidacaoTransportadora`;

        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(dadosParaEnvio)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao criar abastecimento');
                }
                return response.json();
            })
            .then(data => {
                setAlert({
                    messageAlert: "Abastecimento criado com sucesso!",
                    typeAlert: 'success',
                    show: true
                });
                setTimeout(() => { window.location.reload(); }, 3000);
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

    /* Componente de CARD */
    const CardTrava = ({ children }) => {
        return (
            <MainCardTrava>
                <div>
                    <div>
                        <h4>Geral</h4>
                    </div>
                </div>
                <div>
                    {children}
                </div>
            </MainCardTrava>
        );
    };

    return <>
        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
            <p>Validações e travas das frotas</p>

            <div style={{ ...DivMainContainer }}>
                <CardTrava>
                    {travas.map((item, index) => (
                        <CardTravaSubMenu
                            key={index}>
                            <div>
                                <h4>{item.validacao.nome}</h4>
                            </div>
                            <div>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedValidacoes.includes(item.validacao.id)}
                                                onChange={() => handleCheckboxChange(item.validacao.id)}
                                            />
                                        }
                                        label="Status da trava"
                                    />
                                </div>
                            </div>
                        </CardTravaSubMenu>
                    ))}
                </CardTrava >
            </div>

            <InputEnvio>
                <button> Salvar </button>
            </InputEnvio> 

        </div>
    </>
}

