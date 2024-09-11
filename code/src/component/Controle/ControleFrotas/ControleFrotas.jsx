import React, { useState, useEffect } from 'react';
import { MainCardTrava, CardTravaSubMenu, InputEnvio, MainContainer } from './ControleFrotas-style';
import { handleUnauthorized } from '../../../hooks/LogOut';
import { Button } from '@mui/material';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Cookies from 'js-cookie';
import base from '../../../hooks/BaseUrlApi';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

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

export default function MainControleFrotas() {

    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [travas, setTravas] = useState([]);
    const [selectedValidacoes, setSelectedValidacoes] = useState([]);
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({
        messageAlert: '',
        typeAlert: '',
        show: false
    });

    const descricoes = {
        1: 'Restrição em cima da média do caminhão',
        2: 'Restrição sobre a pacidade maxima do tanque',
        3: 'Trava sobre o maximo a ser abastecido',
    };

    /* Get produtos travas */
    useEffect(() => {
        const fetchProdutosPosto = async () => {
            const transportadora = Cookies.get('transportadoraId');
            try {
                const requestOptions = { method: 'GET', headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' } };
                const response = await fetch(`${base.URL_BASE_API}/Transportadora/BuscaValidacoesTransportadora/${transportadora}`, requestOptions);

                if (response.status === 401) {
                    handleUnauthorized();
                    return;
                }

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const travasComDescricoes = data.data.validacoes.map(validacao => ({
                    ...validacao,
                    descricao: descricoes[validacao.validacaoid] || 'Descrição não disponível'
                }));

                const validacoesAtivas = travasComDescricoes.filter(validacao => validacao.ativo).map(validacao => validacao.validacaoid);
                setSelectedValidacoes(validacoesAtivas);
                setTravas(travasComDescricoes);
            } catch (error) {
                console.error('Fetch error:', error);
            }

        };
        fetchProdutosPosto();
    }, [authToken]);

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

        const url = `${base.URL_BASE_API}/Transportadora/RegistraValidacaoTransportadora`;

        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(dadosParaEnvio)
        })
            .then(response => {

                if (response.status === 401) {
                    handleUnauthorized();
                    return;
                }

                if (!response.ok) {
                    throw new Error('Erro ao definir a validação.');
                }
                return response.json();
            })
            .then(data => {
                setAlert({
                    messageAlert: "Validação definida com sucesso!",
                    typeAlert: 'success',
                    show: true
                });
                setTimeout(() => { window.location.reload(); }, 5000);
            })
            .catch(error => {
                setAlert({
                    messageAlert: "Erro ao definir a validação, tente novamente em alguns instantes.",
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

            <div>
                {loading ? (
                    <div style={{ ...styleLoad }}>
                        <CircularProgress />
                    </div>
                ) : (
                    null
                )}
            </div>

            {alert.show ? (
                <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
                    <div>
                        <Alert severity={alert.typeAlert}>{alert.messageAlert}</Alert>
                        {!alert.messageAlert.startsWith('Erro')}
                    </div>
                </div>
            ) : (null)}

            <MainContainer>
                <CardTrava>
                    {travas.map((item, index) => (
                        <CardTravaSubMenu
                            key={index}>
                            <div>
                                <h4>{item.descricao}</h4>
                            </div>
                            <div>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedValidacoes.includes(item.validacaoid)}
                                                onChange={() => handleCheckboxChange(item.validacaoid)}
                                            />
                                        }
                                        label="Status da trava"
                                    />
                                </div>
                            </div>
                        </CardTravaSubMenu>
                    ))}
                </CardTrava>
            </MainContainer>

            <InputEnvio>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSubmit} 
                    disabled={selectedValidacoes.length === 0}
                >
                    Salvar
                </Button>
            </InputEnvio>
        </div>
    </>
}
