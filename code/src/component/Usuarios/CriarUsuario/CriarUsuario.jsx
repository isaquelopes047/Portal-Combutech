import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import base from '../../../hooks/BaseUrlApi';
import { handleUnauthorized } from '../../../hooks/LogOut';
import Alert from '@mui/material/Alert';

const RowForm = styled.div`
    width: 100%;
    height: auto;
    padding-top: 10px;
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

const ModalMain = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    background-color: #fff;
    box-shadow: 24;
    padding: 25px;

    @media (max-width: 620px) {
        width: 80vw;
    }
`

const ButtonAccept = styled.div`
    width: 100%;
    height: 50px;
    background-color: #0a82fd;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: #3772ad
    }
`;

export default function CriarUsuario() {
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [dadosCriar, setDadosCriar] = useState({
        email: '',
        user: '',
        password: '',
        passwordConfirm: ''
    })
    const [alert, setAlert] = useState({
        messageAlert: '',
        typeAlert: '',
        show: false
    });
    const [errors, setErrors] = useState({
        password: '',
        passwordConfirm: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDadosCriar({
            ...dadosCriar,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { password, passwordConfirm } = dadosCriar;
        const newErrors = validatePasswords(password, passwordConfirm);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch(`${base.URL_BASE_API}/users/Registrar`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosCriar)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Network response was not ok: ${JSON.stringify(errorData)}`);
                }

                const data = await response.json();

                setAlert({
                    messageAlert: "Usuario criado com sucesso!",
                    typeAlert: 'success',
                    show: true
                });
            } catch (error) {
                console.error('Error details:', error.message);
                setAlert({
                    messageAlert: "Erro ao autorizado o valor!",
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

    const validatePasswords = (password, passwordConfirm) => {
        const errors = {};
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

        if (!passwordRegex.test(password)) {
            errors.password = 'A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial.';
        }
        if (password !== passwordConfirm) {
            errors.password = 'As senhas não correspondem.';
        }

        return errors;
    };

    return <>
        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
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

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }} data-aos="fade-up-left">
            <p>Dados do usuario</p>
            <RowForm>
                <TextField
                    label='Email'
                    name='email'
                    value={dadosCriar.email}
                    onChange={handleChange}
                    sx={{ ...defaultInputStyle, paddingX: 0, '& label.Mui-focused': { marginLeft: 0 } }}
                    required
                />
                <TextField
                    label='Usuario'
                    name='user'
                    value={dadosCriar.user}
                    onChange={handleChange}
                    sx={{ ...defaultInputStyle, paddingX: 1, '& label.Mui-focused': { marginLeft: 1 } }}
                    required
                />
            </RowForm>
        </div>

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }} data-aos="fade-up-left">
            <p>Senha</p>
            <RowForm>
                <TextField
                    label='Senha'
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={dadosCriar.password}
                    onChange={handleChange}
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
                    onChange={handleChange}
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

        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
            <div style={{ display: 'flex', width: '20vw' }}>
                <Button onClick={handleSubmit} variant="contained" color="success" sx={{ height: 40 }} disable>
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