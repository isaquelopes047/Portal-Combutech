import React, { useState } from 'react';
import LoginForm from "../../component/form/LoginForm";
import { useNavigate } from 'react-router-dom';
import base from '../../hooks/BaseUrlApi';

function Login() {
  const navigate = useNavigate();

  const [AlertLogin, setAlertLogin] = useState('none');
  const [AlertEmailVerify, setAlertEmailVerify] = useState(false);

  /* Função para retorno de alert de erro */
  const alertErrorLogin = () => {
    setAlertLogin('block')
    setTimeout(() => {
      setAlertLogin('none')
    }, 5000)
  };

  const handleLogin = async ({ email, password }) => {
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
        navigate('/confirm-password');
        return true;
      }

      if (response.status === 200) {
        const modulosString = JSON.stringify(data.data.user.perfil.modulos);
        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('emailUsuario', data.data.user.nome);
        localStorage.setItem('optionsMenu', modulosString);

        /* Ferificação de transportadora */
        if (data.data.user.transportadora === null){
          localStorage.setItem('transportadora', null)
        } else {
          localStorage.setItem('transportadora', data.data.user.transportadora.transportadoraid)
        }

        navigate('/auth');
        return true;
      }

      alertErrorLogin();
      return false;

    } catch (error) {
      alertErrorLogin();
      return false;
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} AlertError={AlertLogin} />
    </div>
  )
}

export default Login;
