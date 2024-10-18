
export const formatDate = (dateString: number): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }
  
  const date = new Date(dateString)
  return date.toLocaleString('en-GB', options).replace(',', '')
}