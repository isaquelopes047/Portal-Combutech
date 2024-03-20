export const handlePostoChange = (event, setPostoDigitado, setDadosFormulario, dadosFormulario) => {
    const novoPostoDigitado = event.target.value.toUpperCase();
    setPostoDigitado(novoPostoDigitado);
    setDadosFormulario({
        ...dadosFormulario,
        erro: false
    });
};

export const verificarPosto = (postos, postoDigitado, setPostoEncontrado, setDadosFormulario, dadosFormulario) => {
    const postoEncontrado = postos.find(item => item.postonomefantasia === postoDigitado);
    if (postoEncontrado) {
        setPostoEncontrado(postoEncontrado);
        setDadosFormulario({
            ...dadosFormulario,
            idPosto: postoEncontrado.postoid,
            erro: false
        });
    } else {
        setDadosFormulario({
            ...dadosFormulario,
            erro: true
        });
    }
};