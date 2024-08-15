import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import base from '../../../hooks/BaseUrlApi';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputMask from "react-input-mask";
import Cookies from 'js-cookie';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { RowForm, DefaultCabecalho } from './CriarUsuarioStyle/CriarUsuario-style';

const defaultInputStyle = {
    flex: 1,
    marginTop: 1.5,
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

export default function CriarUsuario() {
    const [strictUser, setStrictUser] = useState(Cookies.get('__StrictMode'));
    const [showPassword, setShowPassword] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [dadosLoading, setDadosLoading] = useState(true);
    const [transportadorasDados, setTransportadorasDados] = useState([]);
    const [transportadoraSelecionada, setTransportadoraSelecionada] = useState([]);
    const [message, setMessage] = useState('');
    const [typeUser, setTypeUser] = useState('');
    const [dadosCriar, setDadosCriar] = useState({
        email: '',
        user: '',
        password: '',
        passwordConfirm: '',
        idTransportadora: null
    });
    const [alert, setAlert] = useState({
        messageAlert: '',
        typeAlert: '',
        show: false
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDadosCriar((prevDadosCriar) => ({
            ...prevDadosCriar,
            [name]: value
        }));
    };

    const handleAutocompleteChange = (event, value) => {
        if (value) {
            const transportadoraId = value.transportadoraid;
            setTransportadoraSelecionada(value);
            setDadosCriar((prevDadosCriar) => ({
                ...prevDadosCriar,
                idTransportadora: transportadoraId
            }));
        } else {
            setTransportadoraSelecionada(null);
            setDadosCriar((prevDadosCriar) => ({
                ...prevDadosCriar,
                idTransportadora: null
            }));
        }
    };

    const handleChangeUser = (event) => {
        setTypeUser(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validatePasswords(dadosCriar);
        const authToken = localStorage.getItem('authToken');
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch(`${base.URL_BASE_API}/users/Registrar`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosCriar)
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Network response was not ok: ${JSON.stringify(errorData)}`);
                }
                setAlert({
                    messageAlert: "Usuario criado com sucesso!",
                    typeAlert: 'success',
                    show: true
                });
            } catch (error) {
                setAlert({
                    messageAlert: "Erro ao criar o usuario!",
                    typeAlert: 'error',
                    show: true
                });
            }
        } else {
            setErrors(newErrors);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const validatePasswords = (dadosCriar) => {
        const errors = {};
        const { email, password, passwordConfirm } = dadosCriar;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

        if (!email || !emailRegex.test(email)) {
            errors.email = 'E-mail inválido.';
        }
        if (!passwordRegex.test(password)) {
            errors.password = 'A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial.';
        }
        if (password !== passwordConfirm) {
            errors.passwordConfirm = 'As senhas não correspondem.';
        }

        return errors;
    };

    const getMask = (type) => {
        switch (type) {
            case 'motorista':
                return '999.999.999-99';
            case 'posto':
                return '99.999.999/9999-99';
            case 'transportadora':
                return '**********************';
            case 'Integração':
                return '**********************';
            default:
                return '';
        }
    };

    useEffect(() => {
        setDadosCriar({
            email: '',
            user: '',
            password: '',
            passwordConfirm: '',
            idTransportadora: null
        });
    }, [typeUser]);

    /* GET DE TRANSPORTADORAS */
    useEffect(() => {
        const buscarDados = async () => {
            try {
                setDadosLoading(true);
                const authToken = localStorage.getItem('authToken');
                const __StrictMode = Cookies.get('__StrictMode');

                if (__StrictMode === '0') {
                    const url = `${base.URL_BASE_API}/Transportadora/BuscaTransportadoras`;
                    const headers = { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' };
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: headers,
                    });
                    if (!response.ok) { throw new Error(`Erro na requisição. Código de status: ${response.status}`) };
                    const data = await response.json();
                    setTransportadorasDados(data.data);
                }

            } catch (error) {
                console.error(error);
            } finally {
                setDadosLoading(false);
            }
        };

        buscarDados();
    }, []);

    useEffect(() => {
        const allFieldsFilled = Object.values(dadosCriar).every(value => value !== '' && value !== 0);
        setDisabled(!allFieldsFilled);
    }, [dadosCriar]);

    const shouldShowInput = () => {
        return strictUser === '0' && ['transportadora', 'motorista', 'integração'].includes(typeUser);
    };

    return <>
        <div className="crancy-teams crancy-page-inner mg-top-30 row">
            <p>Criar usuario</p>
        </div>

        {alert.show ? (
            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
                <div>
                    <Alert severity={alert.typeAlert}>{alert.messageAlert}</Alert>
                    {!alert.messageAlert.startsWith('Erro')}
                </div>
            </div>
        ) : (null)}

        <div className="crancy-teams crancy-page-inner mg-top-30 row">
            <DefaultCabecalho>
                <FaUser size={20} color='#4e4e4e' />
                <p>Dados do usuario</p>
            </DefaultCabecalho>
            <RowForm>
                <FormControl sx={{
                    ...defaultInputStyle,
                    paddingX: 0,
                    '& label.Mui-focused': { marginLeft: 1 },
                    '& .MuiInputBase-root': { height: '50px' },
                    '& .MuiOutlinedInput-root': {
                        height: '50px'
                    }
                }}>
                    <InputLabel id="demo-simple-select-label">Tipo de usuario</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Tipo de usuario"
                        value={typeUser}
                        onChange={handleChangeUser}
                    >
                        <MenuItem value={'transportadora'}>Transportadora</MenuItem>
                        <MenuItem value={'motorista'}>Motorista</MenuItem>
                        <MenuItem value={'posto'}>Posto</MenuItem>
                        <MenuItem value={'integração'}>Integração</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label='Email'
                    name='email'
                    value={dadosCriar.email}
                    onChange={handleInputChange}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                />
            </RowForm>
            <RowForm>
                <InputMask
                    required
                    mask={getMask(typeUser)}
                    value={dadosCriar.user}
                    onChange={handleInputChange}
                    maskChar={null}
                >
                    {(inputProps) => (
                        <TextField
                            id="outlined-basic"
                            label="Usuario"
                            variant="outlined"
                            name='user'
                            sx={{ width: '100%', marginRight: 2, ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                            {...inputProps}
                        />
                    )}
                </InputMask>
            </RowForm>
            <RowForm>
                {
                    shouldShowInput() && (
                        <Stack spacing={2} sx={{ width: '99%', marginTop: '10px' }}>
                            <Autocomplete
                                sx={{ ...defaultInputStyle, paddingX: 0, ...defaultInputsAutoComplete }}
                                options={transportadorasDados}
                                getOptionLabel={(option) => option.transportadorarazaosocial || 'Transportadora'}
                                onChange={handleAutocompleteChange}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.transportadoraid}>
                                        {option.transportadorarazaosocial}
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Pesquisar transportadoras"
                                    />
                                )}
                            />
                        </Stack>
                    )
                }
            </RowForm>
        </div>

        <div className="crancy-teams crancy-page-inner mg-top-30 row">
            <DefaultCabecalho>
                <FaKey size={20} color='#4e4e4e' />
                <p>Dados do usuario</p>
            </DefaultCabecalho>
            <RowForm>
                <TextField
                    label='Senha'
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={dadosCriar.password}
                    onChange={handleInputChange}
                    sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                    required
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </RowForm>
            <RowForm>
                <TextField
                    label='Repita a senha'
                    type={showPassword ? 'text' : 'password'}
                    name='passwordConfirm'
                    value={dadosCriar.passwordConfirm}
                    onChange={handleInputChange}
                    sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                    required
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">

                            </InputAdornment>
                        )
                    }}
                />
                {message && <p>{message}</p>}
            </RowForm>
            <RowForm>
                <p>A senha deve conter <br /> Letra maiuscula* <br /> Numero* <br /> Caracter especial*</p>
            </RowForm>
        </div>

        <div className="crancy-teams crancy-page-inner mg-top-30 row">
            <div style={{ display: 'flex', width: '20vw' }}>
                <Button onClick={handleSubmit} variant="contained" color="success" sx={{ height: 40 }} disabled={disabled}>
                    Criar
                </Button>
                <a href="/auth/abastecimentos/integrados" style={{ backgroundColor: 'transparent', color: '#fff', }}>
                    <Button sx={{ backgroundColor: 'grey', color: 'white', height: 40, marginLeft: 1 }}>
                        Voltar
                    </Button>
                </a>
            </div>
        </div>
    </>;
}
