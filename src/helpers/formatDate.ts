export default function formatDate(
  intlLocale: string,
  date: string | Date,
): string {
  if (!(date instanceof Date)) {
    return new Intl.DateTimeFormat(intlLocale).format(new Date(date));
  }

  return new Intl.DateTimeFormat(intlLocale).format(date);
}
