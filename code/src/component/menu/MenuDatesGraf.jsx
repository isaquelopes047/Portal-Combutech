import React, { useState, useEffect } from 'react';
import { FaFilter } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const MainContainer = styled.div`
    width: 100%;
    height: auto;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    border: 1px dashed #bbbbbb;

    & > div:nth-child(1){
        width: 30%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 5px;

        & > p {
            margin: 0;
            padding: 0;
        }
    }

    & > div:nth-child(2){
        width: 100%;
        display: flex;
        gap: 10px;
        margin-top: -5px;
    }
`

export default function MenuDateGraf() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [amount, setAmount] = React.useState(localStorage.getItem('amountDriverRanking') || '');

    const getDefaultDates = () => {
        const now = new Date();
        const end = new Date(now); // Data final é a data atual
        const start = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

        return {
            start: start.toISOString(),
            end: end.toISOString()
        };
    };

    const handleChange = (event) => {
        const newValue = event.target.value;
        setAmount(newValue);
        localStorage.setItem('amountDriverRanking', newValue);
    };

    useEffect(() => {
        const { start, end } = getDefaultDates();

        const storedStartDate = localStorage.getItem('startDate') || start;
        const storedEndDate = localStorage.getItem('endDate') || end;

        localStorage.setItem('startDate', storedStartDate);
        localStorage.setItem('endDate', storedEndDate);

        setStartDate(storedStartDate);
        setEndDate(storedEndDate);
    }, []);

    const handleStartDateChange = (event) => {
        const newStartDate = new Date(event.target.value);
        newStartDate.setHours(newStartDate.getHours() + 3);
        const isoStartDate = newStartDate.toISOString();
        setStartDate(isoStartDate);
        localStorage.setItem('startDate', isoStartDate);
    };

    const handleEndDateChange = (event) => {
        const newEndDate = new Date(event.target.value);
        newEndDate.setHours(newEndDate.getHours() + 3);
        const isoEndDate = newEndDate.toISOString();
        setEndDate(isoEndDate);
        localStorage.setItem('endDate', isoEndDate);
    };

    return (
        <MainContainer>
            <div>
                <FaFilter color='#5f5f5f' />
                <p>Filtro</p>
            </div>
            <div>
                <TextField
                    label="Data de Início"
                    type="datetime-local"
                    value={startDate ? startDate.slice(0, 16) : ''}
                    onChange={handleStartDateChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        sx: {
                            input: {
                                marginLeft: '10px',
                                backgroundColor: '#fff',
                                border: '0px',
                            },
                        },
                    }}
                    fullWidth
                />
                <TextField
                    label="Data de Término"
                    type="datetime-local"
                    value={endDate ? endDate.slice(0, 16) : ''}
                    onChange={handleEndDateChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        sx: {
                            input: {
                                marginLeft: '10px',
                                backgroundColor: '#fff',
                                border: '0px',
                            },
                        },
                    }}
                    fullWidth
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Quantidade</InputLabel>
                    <Select
                    sx={{ height: '52px'}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={amount}
                        label="Quantidade"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </MainContainer>
    )
}