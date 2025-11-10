import React, { useState } from 'react';
import AlertLoginError from "../Alerts/LoginAlertError";

function LoginForm({ onLogin, AlertError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const handleSenhaChange = (event) => {
    const newSenha = event.target.value;
    setPassword(newSenha);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    onLogin({ email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="crancy-wc__heading">
        <h3 className="crancy-wc__form-title crancy-wc__form-title__one">
          Realizar o login
        </h3>
      </div>
      <form className="crancy-wc__form-main" >
        <div className="form-group">
          <div className="form-group__input">
            <input
              className="crancy-wc__form-input"
              type="text"
              name="email"
              placeholder="Usuario"
              onChange={handleEmailChange}
              value={email}
              required="required"
              style={{ width: '450px' }}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-group__input">
            <input
              className="crancy-wc__form-input"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              id="password-field"
              type={showPassword ? 'text' : 'password'}
              name="password"
              maxLength="30"
              onChange={handleSenhaChange}
              value={password}
              required="required"
            />
            <span className="crancy-wc__toggle" onClick={togglePasswordVisibility}>
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} id="toggle-icon"></i>
            </span>
          </div>
        </div>
        <div className="form-group">
          <div className="crancy-wc__check-inline">
            <div className="crancy-wc__checkbox">
              <input
                className="crancy-wc__form-check"
                id="checkbox"
                name="checkbox"
                type="checkbox"
              />
              <label htmlFor="checkbox">Lembrar de mim</label>
            </div>
            <div className="crancy-wc__forgot">
              <a href="/posto/forget-password" className="forgot-pass">
                Esqueceu o login?
              </a>
            </div>
          </div>
        </div>
        <a className="crancy-btn__default full-width-btn" style={{ width: '100%' }} onClick={handleLogin}>Login</a>

        <div >
          <a 
            href="https://yulog.com.br/" 
            className="forgot-pass" 
            style={{ 
              width: '100%', 
              height: '60px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '10px',
            }}>
            Powered By
              <span style={{
                backgroundColor: '#3464ac',
                color: '#fff',
                padding: '2px 2px',
                width: '60px',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                borderRadius: '10px',
              
              }}>
                <p style={{color: '#fff'}}>
                  YuLog
                </p>
              </span>
          </a>
        </div>

        <div className="form-group" style={{ height: '60px', display: AlertError }}>
          <AlertLoginError />
        </div>
      </form>
    </>
  );
}

export default LoginForm;
