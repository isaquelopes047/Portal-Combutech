export const handlePlacaChange = (event, setPlacaDigitada, setDadosFormulario, dadosFormulario) => {
    const novaPlacaDigitada = event.target.value.toUpperCase();
    setPlacaDigitada(novaPlacaDigitada);
    setDadosFormulario({
        ...dadosFormulario,
        erro: false
    });
};

export const verificarPlaca = (placasVeiculo, placaDigitada, setVeiculoEncontrado, setDadosFormulario, dadosFormulario) => {
    const veiculoEncontrado = placasVeiculo.find(item => item.veiculoplaca === placaDigitada);
    if (veiculoEncontrado) {
        setVeiculoEncontrado(veiculoEncontrado);
        setDadosFormulario({
            ...dadosFormulario,
            idVeiculo: veiculoEncontrado.veiculoid,
            erro: false
        });
    } else {
        setDadosFormulario({
            ...dadosFormulario,
            erro: true
        });
    }
};