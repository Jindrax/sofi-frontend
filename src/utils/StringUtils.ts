export function normalizeName(name: string): string{
  const split = name.split(" ");
  const normalizeWords = split.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  return "".concat(...normalizeWords);
}
