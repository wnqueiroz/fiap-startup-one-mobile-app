const uppercaseWeekday = (str: string): string => str.replace(/^(.*)\.,/g, (c) => c.toUpperCase());

const prettyWeekday = (str: string): string => uppercaseWeekday(str).replace('.,', '.');

export const prettyTime = (startTime: string, endTime: string): string => {
  const removeLastZeros = (str: string): string => str.split(':').slice(0, -1).join(':');

  return `${removeLastZeros(startTime)} - ${removeLastZeros(endTime)}`;
};

export const prettyDate = (date: string): string => prettyWeekday(
  new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric', month: 'long', weekday: 'short',
  }).format(new Date(date)),
);
