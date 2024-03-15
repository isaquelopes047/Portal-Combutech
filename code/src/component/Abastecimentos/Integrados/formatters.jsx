
/* Formatação para numero sem pontos ou virgulas */
export const formatNumberDefault = (value) => {
    return value.replace(/\D/g, '');
};

/* Formatação para numero 9.999.999.999.999 */
export const formatNumberForKm = (value) => {
    const formattedValue = value.replace(/\D/g, '');
    return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

/* 009.999.999,999 */
export const formatNumberForLitros= (value) => {
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