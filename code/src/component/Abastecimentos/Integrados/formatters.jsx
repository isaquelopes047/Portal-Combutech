
/* Formatação para numero sem pontos ou virgulas */
export const formatNumberDefault = (value) => {
    return value.replace(/\D/g, '');
};

/* Formatação para numero 9.999.999.999.999 */
export const formatNumberForKm = (value) => {
    const formattedValue = value.replace(/\D/g, '');
    return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const normalNumber = (value) => {
    const valueNormal = value
    return valueNormal
};

/* 009.999.999,999 */
export const formatNumberForLitros = (value) => {
    // Remove todos os caracteres que não são dígitos
    const cleanedValue = value.replace(/\D/g, '');

    // Remove os zeros à esquerda
    let trimmedValue = cleanedValue.replace(/^0+/, '');

    // Extrai a parte inteira e a parte decimal
    let integerPart = trimmedValue.slice(0, -3) || '0';
    const decimalPart = trimmedValue.slice(-3);

    // Adiciona os pontos de milhares
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Junta a parte inteira e a parte decimal com a vírgula
    let formattedValue = integerPart + ',' + decimalPart;

    // Verifica se o comprimento total excede 15 caracteres
    if (formattedValue.length > 15) {
        // Se exceder, limita a formatação ao máximo de 15 caracteres
        formattedValue = formattedValue.substring(0, 15);
    }

    return formattedValue;
};

/* 009.999.999,999 */
export const formatNumberForValorUnitario = (value) => {
    // Remove todos os caracteres que não são dígitos
    const cleanedValue = value.replace(/\D/g, '');

    // Remove os zeros à esquerda
    let trimmedValue = cleanedValue.replace(/^0+/, '');

    // Extrai a parte inteira e a parte decimal
    let integerPart = trimmedValue.slice(0, -2) || '0';
    const decimalPart = trimmedValue.slice(-2);

    // Adiciona os pontos de milhares se o número for maior do que mil
    if (integerPart.length > 3) {
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    // Junta a parte inteira e a parte decimal com a vírgula
    let formattedValue = integerPart + ',' + decimalPart;

    // Verifica se o comprimento total excede 8 caracteres (considerando duas casas decimais)
    if (formattedValue.length > 5) {
        // Se exceder, limita a formatação ao máximo de 8 caracteres
        formattedValue = formattedValue.substring(0, 5);
    }

    return formattedValue;
};

export const formatReal = (value) => {
    // Remove todos os caracteres que não são dígitos
    const cleanedValue = value.replace(/\D/g, '');

    // Limita o número de dígitos a 4
    const trimmedValue = cleanedValue.slice(0, 4);

    // Extrai a parte inteira e a parte decimal
    let integerPart = trimmedValue.slice(0, 1) || '0';
    const decimalPart = trimmedValue.slice(1).padEnd(3, '0'); // Garante que há até três casas decimais

    // Junta a parte inteira e a parte decimal com o ponto
    let formattedValue = integerPart + '.' + decimalPart;

    return formattedValue;
};