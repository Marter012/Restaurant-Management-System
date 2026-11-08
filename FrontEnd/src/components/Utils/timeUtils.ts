export const normalizeTimeInput = (value: string): string => {
  let digits = value.replace(/\D/g, "");

  if (!digits) return "";

  // Si ingresan más de cuatro números, conserva los últimos cuatro.
  digits = digits.slice(-4);

  // Controla las horas completas: 00 a 23.
  if (digits.length >= 2) {
    const hours = Number(digits.slice(0, 2));

    if (hours > 23) {
      digits = `23${digits.slice(2)}`;
    }
  }

  // Controla los minutos completos: 00 a 59.
  if (digits.length >= 4) {
    const minutes = Number(digits.slice(2, 4));

    if (minutes > 59) {
      digits = `${digits.slice(0, 2)}59`;
    }
  }

  if (digits.length <= 2) return digits;

  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
};


export const isValidTime = (value: string): boolean => {
  const match = value.match(/^(\d{2}):(\d{2})$/);

  if (!match) return false;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
};