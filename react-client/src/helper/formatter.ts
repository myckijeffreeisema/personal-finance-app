export function formatAmount(amount: number): string {
  const value = (amount / 100).toFixed(2);
  const formatter = Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return formatter.format(Number(value));
}

export function parseAmount(amount: string) {
  const parsed = amount
    .replace("R$", "")
    .replace(",", "")
    .trim()
    .replaceAll(".", "");
  return Number(parsed);
}

export function formatDate(date?: string) {
  if (!date) {
    return;
  }
  const objectDate = new Date(date);
  const formatter = Intl.DateTimeFormat("PT-BR", {
    dateStyle: "full",
    timeStyle: "medium",
  });

  return formatter.format(objectDate);
}
