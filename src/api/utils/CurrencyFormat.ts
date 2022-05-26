export function presentCurrency(currency: number) {
  const locale = Intl.NumberFormat('es-CO');
  return locale.format(currency);
}
