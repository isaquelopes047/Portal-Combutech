import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import base from '../hooks/BaseUrlApi';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();
        const location = useLocation();

        const TokenValidation = async () => {
            const Token = JSON.parse(localStorage.getItem('authToken'));

            if (!Token) {
                alert('Faça o login primeiro');
                navigate("/");
            } else {
                try {
                    const response = await fetch(`${base.URL_BASE_API}/Motorista/BuscaMotoristas`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${Token}`
                        }
                    });
                    const responseData = await response.json();

                    if (responseData.statusCode === 200) {
                        // Continue com a navegação se a rota é protegida
                    } else {
                        navigate('/');
                    }
                } catch (error) {
                    navigate('/');
                }
            }
        };

        useEffect(() => {
            TokenValidation();
        }, [location.pathname]); // Executar sempre que houver uma mudança de rota

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
