export default function truncate(str: string | undefined) {
  if (!str) return '';

  const LIMIT = 15;

  if (str.length <= LIMIT) return str;

  const result = str.slice(0, LIMIT).split(' ').slice(0, -1).join(' ');

  return result + '...';
}
