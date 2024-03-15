import React, { useState } from 'react';
import { MainUser, InfosUser } from './style.jsx';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';

const inputStyle = {
    flex: 1,
    margin: '10px',
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
}

export default function InfosUsuario() {

    const [dadosUser, setDadosUser] = useState({
        nomeUsuario: 'Posto',
        emailUsuario: 'Posto@posto.com.br',
        nomeUsuario: 'Posto',
        sobrenomeUsuario: 'Posto',
        sexoUsuario: 'Masculino',
        dataAbastecimento: dayjs(),
        telefoneUsuario: '47 999078865'
    })

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return <React.Fragment>
        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', display: 'flex', flexDirection: 'column', height: 'auto', }}>
            <MainUser>
                <div>
                    {/* Imagem do perfil, background acessar pelo style */}
                </div>
            </MainUser>

            <InfosUser>
                <Box sx={{ width: '100%', display: 'flex', }}>
                    <TextField
                        value={dadosUser.nomeUsuario}
                        id="outlined-basic"
                        label="Nome do usuario"
                        sx={{ ...inputStyle }}
                    />
                    <TextField
                        value={dadosUser.emailUsuario}
                        id="outlined-basic"
                        label="Email"
                        sx={{ ...inputStyle }}
                    />
                </Box>
                <Box sx={{ width: '100%', display: 'flex' }}>
                    <TextField
                        value={dadosUser.nomeUsuario}
                        id="outlined-basic"
                        label="Nome"
                        sx={{ ...inputStyle }}
                    />
                    <TextField
                        value={dadosUser.sobrenomeUsuario}
                        id="outlined-basic"
                        label="Sobrenome"
                        sx={{ ...inputStyle }}
                    />
                    <Select
                        sx={{ ...inputStyle }}
                        style={{ height: '50px', }}
                        value={dadosUser.sexoUsuario}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="">
                            <em>Sexo</em>
                        </MenuItem>
                        <MenuItem value={'Masculino'}>Masculino</MenuItem>
                        <MenuItem value={'Feminino'}>Feminino</MenuItem>
                        <MenuItem value={'Naoinformar'}>Não informar</MenuItem>
                    </Select>

                </Box>
                <Box sx={{ width: '100%', display: 'flex' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                        <Stack spacing={2} sx={{ ...inputStyle, paddingX: 0 }}>
                            <DateTimePicker
                                value={dadosUser.dataAbastecimento || ''}
                                onChange={(event) => handleChange('dataAbastecimento', event)}
                                label="Data abastecimento"
                                renderInput={(params) => <TextField {...params} sx={defaultInputStyle} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                    <TextField
                        id="outlined-basic"
                        label="Telefone" variant="outlined"
                        sx={{ ...inputStyle }}
                    />
                </Box>
                <Box sx={{ width: '100%', display: 'flex', marginTop: '100px', }}>
                    <Button variant="contained" sx={{ ...inputStyle }}>SALVAR</Button>
                </Box>
            </InfosUser>
        </div>
    </React.Fragment>
}

