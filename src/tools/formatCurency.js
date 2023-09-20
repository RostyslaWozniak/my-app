const CURRENCY_FORMATER = new Intl.NumberFormat(undefined, {
    currency: "PLN",
    style: "currency",
});

export const formatCurency = (number) => {
    return CURRENCY_FORMATER.format(number)
}