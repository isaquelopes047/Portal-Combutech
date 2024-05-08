import * as React from 'react';
import styled from 'styled-components';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const MainContainer = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    & > .ContainerPage {
        width: 60px;
        height: 40px;

        & > div {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center; 

            &:hover{
                background: #f5f5f5;
                cursor: pointer;
            }
        }
    }
`;

const PageSelected = styled.div`
    min-Width: 100px;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center; 
`

const InfosPerPage = styled.div`

`

export default function TablePaginationDefault({ more, less, numberPage, quantidadeRegistro, handleChange }) {
    return (
        <MainContainer>
            <InfosPerPage>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Registros</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={quantidadeRegistro}
                            label="Registros"
                            onChange={handleChange}
                            sx={{height:'40px'}}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </InfosPerPage>
            <PageSelected>
                Página: {numberPage}
            </PageSelected>
            <div className='ContainerPage'>
                <div onClick={less}>
                    <FaChevronLeft />
                </div>
            </div>
            <div className='ContainerPage'>
                <div onClick={more}>
                    <FaChevronRight />
                </div>
            </div>
        </MainContainer>
    );
}

