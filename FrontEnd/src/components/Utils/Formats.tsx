export const formatDate = (date: string | Date): string => {
  if (!date) return "";

  if (typeof date === "string") {
    const dateOnly = date.substring(0, 10);

    const [year, month, day] = dateOnly.split("-");

    if (!year || !month || !day) return "";

    return `${day}/${month}/${year}`;
  }

  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const getDateOnly = (date: string | Date): string => {
  if (!date) return "";

  if (typeof date === "string") {
    return date.substring(0, 10);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getDateTime = (date: string | Date): string => {
  if (!date) return "";

  if (typeof date === "string") {
    return date;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";

  const offsetHours = String(
    Math.floor(Math.abs(offsetMinutes) / 60)
  ).padStart(2, "0");

  const offsetMinutesPart = String(
    Math.abs(offsetMinutes) % 60
  ).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}000${sign}${offsetHours}:${offsetMinutesPart}`;
};