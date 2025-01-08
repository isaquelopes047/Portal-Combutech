import base from '../../hooks/BaseUrlApi';
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { handleUnauthorized } from '../../hooks/LogOut';
import { Bar } from 'react-chartjs-2';
import { Box } from '@mui/system';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const RankingProdutos = ({ transportadoraId, dataInicial, dataFinal }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!dataInicial || !dataFinal) return;

        const fetchData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) return;
            setLoading(true);
            try {
                const response = await fetch(`${base.URL_BASE_API}/Dashboard/BuscaDashboardRankingProdutosAbastecimentosIntegrados`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        periodoInicial: dataInicial,
                        periodoFinal: dataFinal,
                        transportadoraId: [transportadoraId],
                        quantidadePorPagina: 20,
                        pagina: 1,
                    }),
                });
                
                if (response.status === 401) {
                    handleUnauthorized();
                    return;
                }

                if (!response.ok) throw new Error('Erro ao buscar dados da API');


                const result = await response.json();
                const rankingData = result?.data?.ranking || [];

                const labels = rankingData.map(item => item?.produto?.produtodescricao || 'Produto desconhecido');
                const dataLitros = rankingData.map(item => parseFloat(item?.litros || 0));

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Volume de Litros por Produto',
                            data: dataLitros,
                            backgroundColor: '#35949487',
                            borderColor: '#35949487',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [transportadoraId, dataInicial, dataFinal]);

    return (
        <div style={{
            width: '100%',
            height: 'auto',
            backgroundColor: '#fff',
            marginTop: '30px',
        }}>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                    <CircularProgress />
                </Box>
            ) : (
                chartData ? (
                    <div style={{
                        width: '100%',
                        height: '490px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '15px 0',
                    }}>
                        <Bar
                            style={{ margin: '30px 0' }}
                            data={chartData}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Ranking de Produtos - Volume em Litros',
                                    },
                                },
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Produtos'
                                        }
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            text: 'Volume em Litros'
                                        },
                                        beginAtZero: true
                                    }
                                }
                            }}
                        />
                    </div>
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                        <p>Dados indisponíveis para exibição do gráfico.</p>
                    </Box>
                )
            )}
        </div>
    );
};

export default RankingProdutos;
