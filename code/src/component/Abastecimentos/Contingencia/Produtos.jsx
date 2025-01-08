export const handleProdutosChange = (event, setProdutosDigitado, setDadosFormulario, dadosFormulario) => {
    const novoProdutoDigitado = event.target.value.toUpperCase();
    setProdutosDigitado(novoProdutoDigitado);
    if (!novoProdutoDigitado) {
        setDadosFormulario({
            ...dadosFormulario,
            erro: false
        });
    }
};

export const verificarProdutos = (produtos, produtosDigitado, setProdutoEncontrado, setDadosFormulario, dadosFormulario) => {
    if (!produtosDigitado) {
        setDadosFormulario({
            ...dadosFormulario,
            erro: false
        });
        return;
    }

    const produtoEncontrado = produtos.find(item => item.produtodescricao === produtosDigitado);
    if (produtoEncontrado) {
        setProdutoEncontrado(produtoEncontrado);
        setDadosFormulario({
            ...dadosFormulario,
            idProdutoPosto: produtoEncontrado.produtoid,
            erro: false
        });
    } else {
        setDadosFormulario({
            ...dadosFormulario,
            erro: true
        });
    }
};