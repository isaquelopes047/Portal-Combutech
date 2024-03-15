import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import CircularProgress from '@mui/material/CircularProgress';

const DefaultContainer = {
    width: '100%',
    height: '400px',
    backgroundColor: '#fff',
    marginTop: '30px',
    borderRadius: '10px',
    paddingTop: '1px',

    titleChart: {
        marginLeft: '30px',
        marginTop: '20px',
    }
}

const DolarToRealChart = () => {
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime'
            }
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentDate = new Date();
                const thirtyDaysAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
                const formattedDate = `${thirtyDaysAgo.getDate()}/${thirtyDaysAgo.getMonth() + 1}/${thirtyDaysAgo.getFullYear()}`;

                const apiUrl = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.10813/dados?formato=json&dataInicial=${formattedDate}`;

                const response = await fetch(apiUrl);
                const data = await response.json();

                const last30DaysData = data.filter(entry => {
                    const entryDate = new Date(entry.data.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
                    return entryDate >= thirtyDaysAgo && entryDate <= currentDate;
                });

                const chartDataFormatted = last30DaysData.map(entry => ({
                    x: new Date(entry.data.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1')).getTime(),
                    y: parseFloat(entry.valor)
                }));

                setChartData({
                    ...chartData,
                    series: [{
                        name: 'USD to BRL',
                        data: chartDataFormatted
                    }]
                });
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar dados da API do Banco Central do Brasil:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={DefaultContainer}>
            <div style={DefaultContainer.titleChart}>
                <p>Cotação do dolar</p>
            </div>
            <div id="chart">
                {loading ? 
                    <CircularProgress /> : 
                    <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={350}
                />}
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default DolarToRealChart;
