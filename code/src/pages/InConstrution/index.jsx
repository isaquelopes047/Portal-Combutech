import React from "react";
import img from "../../assets/img/logo-icon2.png";
import { Link } from "react-router-dom";

const styleMain = {
  width: '100%',
  height: '40vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

const divConteint = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

const styleTitle = {
  marginTop: '25px',
  fontSize: '23px',
}

const styleButton = {
  marginTop: '30px',
  fontSize: '23px',
  backgroundColor: '#103c5f',
  color: '#fff',
  fontSize: '16px',
  width: '200px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '7px'
}

export default function PageConstruction() {
  return (
    <section style={{ ...styleMain }}>
      <div style={{ ...divConteint }}>
        <img className="" src={img} alt="page not found" style={{width: '300px',}}/>
        <p style={{ ...styleTitle }} className="crancy-error__title">Pagina em construção, volte mais tarde!</p>
        <Link to="/auth" style={{ ...styleButton }}>
          Voltar
        </Link>
      </div>
    </section>
  );
}


