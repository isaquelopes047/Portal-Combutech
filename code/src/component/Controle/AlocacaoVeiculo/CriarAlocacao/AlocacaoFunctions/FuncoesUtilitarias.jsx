export const handlePlacaChange = (event, newValue, setPlacaDigitada, setDadosFormulario) => {
    if (newValue) {
        setPlacaDigitada(newValue.veiculoplaca);
        setDadosFormulario(prevState => ({
            ...prevState,
            veiculoid: newValue.veiculoid
        }));
    }
};

export const verificarPlaca = (veiculoTransportadora, placaDigitada, setPlacaVeiculo, setDadosFormulario) => {
    const veiculoEncontrado = veiculoTransportadora.find(veiculo => veiculo.veiculoplaca === placaDigitada);
    if (veiculoEncontrado) {
        setPlacaVeiculo(veiculoEncontrado);
        setDadosFormulario(prevState => ({
            ...prevState,
            veiculoid: veiculoEncontrado.veiculoid
        }));
    }
};

export const handleMotoristaChange = (event, newValue, setMotoristaDigitado, setDadosFormulario) => {
    if (newValue) {
        setMotoristaDigitado(newValue.motoristanome);
        setDadosFormulario(prevState => ({
            ...prevState,
            motoristaid: newValue.motoristaid
        }));
    }
};

export const verificarMotorista = (motoristaTransportadora, motoristaDigitado, setNomeMotorista, setDadosFormulario) => {
    const motoristaEncontrado = motoristaTransportadora.find(motorista => motorista.motoristanome === motoristaDigitado);
    if (motoristaEncontrado) {
        setNomeMotorista(motoristaEncontrado);
        setDadosFormulario(prevState => ({
            ...prevState,
            motoristaid: motoristaEncontrado.motoristaid
        }));
    }
};