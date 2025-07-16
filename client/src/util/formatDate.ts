export default function formatDate(dateString: string) {
  const date = new Date(dateString);

  try {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  } catch {
    return 'Invalid Date';
  }
}
