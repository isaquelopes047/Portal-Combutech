export const handleMotoristaChange = (event, setMotoristaDigitado, setDadosFormulario, dadosFormulario) => {
    const novaMotoristaDigitado = event.target.value.toUpperCase();
    setMotoristaDigitado(novaMotoristaDigitado);
    setDadosFormulario({
        ...dadosFormulario,
        erro: false
    });
};

export const verificarMotorista = (motoristas, motoristaDigitado, setMotoristaEncontrado, setDadosFormulario, dadosFormulario) => {
    const motoristaEncontrado = motoristas.find(item => item.motoristanome === motoristaDigitado);
    if (motoristaEncontrado) {
        setMotoristaEncontrado(motoristaEncontrado);
        setDadosFormulario({
            ...dadosFormulario,
            idMotorista: motoristaEncontrado.motoristaid,
            erro: false
        });
    } else {
        setDadosFormulario({
            ...dadosFormulario,
            erro: true
        });
    }
};