export default function formatDate(
  intlLocale: 'pt-br' | 'en',
  date: string | Date,
): string {
  if (!(date instanceof Date)) {
    return new Intl.DateTimeFormat(intlLocale).format(new Date(date));
  }

  return new Intl.DateTimeFormat(intlLocale).format(date);
}
