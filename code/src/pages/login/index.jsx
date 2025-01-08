import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import base from '../../hooks/BaseUrlApi';
import LoginForm from "../../component/form/LoginForm";
import CircularProgress from '@mui/material/CircularProgress';

function Login() {

  const navigate = useNavigate();

  const [AlertLogin, setAlertLogin] = useState('none');
  const [isLoading, setIsLoading] = useState(false);

  const alertErrorLogin = () => {
    setAlertLogin('block')
    setTimeout(() => {
      setAlertLogin('none')
    }, 5000)
  };

  const handleLogin = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${base.URL_BASE_API}/users/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.status === 400 && data.errors && data.errors.includes("Sua conta não esta ativada, verifique a caixa de entrega ou spam do email")) {
        navigate('/posto/confirm-password');
        setIsLoading(false); // Desativa o estado de carregamento
        return true;
      }

      if (response.status === 200) {
        const modulosString = JSON.stringify(data.data.user.perfil.modulos);

        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('emailUsuario', data.data.user.nome);
        localStorage.setItem('optionsMenu', modulosString);
        localStorage.setItem('amountDriverRanking', 10);

        const logo = data?.data?.user?.transportadora?.transportadoralogo;
        logo ? localStorage.setItem('img', logo) : null;

        const postoid = data?.data?.user?.posto?.postoid ?? null;

        if (postoid) {
          localStorage.setItem('postoid', postoid);
        } else {
          console.warn('Postoid não encontrado para o usuário');
        }

        /* Verificação de transportadora */
        if (data.data.user.transportadora === null) {
          Cookies.set('transportadoraId', 1, { secure: true, sameSite: 'strict' });
          Cookies.set('__StrictMode', 0, { secure: true, sameSite: 'strict' });
        } else {
          Cookies.set('transportadoraId', data.data.user.transportadora.transportadoraid, { secure: true, sameSite: 'strict' });
        }

        if (data.data.user.posto != null) {
          Cookies.set('__StrictModePosto', 1, { secure: true, sameSite: 'strict' });
        } else {
          Cookies.set('__StrictModePosto', 0, { secure: true, sameSite: 'strict' });
        }

        navigate('/posto/auth');
        return true;
      }

      alertErrorLogin();
      return false;

    } catch (error) {
      alertErrorLogin();
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress  />
      ) : (
        <LoginForm onLogin={handleLogin} AlertError={AlertLogin} />
      )}
    </div>
  )
}

export default Login;
