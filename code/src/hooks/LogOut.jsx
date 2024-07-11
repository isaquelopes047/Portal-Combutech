import Cookies from 'js-cookie';

export function handleUnauthorized() {
    localStorage.clear();

    Cookies.remove('transportadoraId', { path: '/' });
    Cookies.remove('__StrictMode', { path: '/' });
    Cookies.remove('__StrictModePosto', { path: '/' });
    Cookies.remove('__StritCompany', { path: '/' });

    setTimeout(() => {
        window.location.href = '/';
    }, 100);
}