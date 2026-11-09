import { useEffect } from "react";

export default function GlobalConfigInputs() {
  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      const input = event.target;

      if (
        input instanceof HTMLInputElement &&
        input.type === "number"
      ) {
        input.select();
      }
    };

    // Capitaliza únicamente la primera letra de cada palabra
    // de más de dos caracteres, respetando las demás mayúsculas.
    const capitalizeWords = (value: string) =>
      value.replace(/\p{L}+/gu, (word) => {
        if (word.length <= 2) {
          return word;
        }

        return (
          word.charAt(0).toLocaleUpperCase("es") +
          word.slice(1)
        );
      });

    const handleInput = (event: Event) => {
      const input = event.target;

      if (
        !(input instanceof HTMLInputElement) ||
        input.dataset.capitalizeWords !== "true"
      ) {
        return;
      }

      const start = input.selectionStart;
      const end = input.selectionEnd;

      const formattedValue = capitalizeWords(input.value);

      if (input.value !== formattedValue) {
        // Utiliza el setter nativo para mantener sincronizado React.
        const setter = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          "value",
        )?.set;

        setter?.call(input, formattedValue);

        if (start !== null && end !== null) {
          input.setSelectionRange(start, end);
        }
      }
    };

    document.addEventListener("focusin", handleFocus);

    // Captura el evento antes de que React procese el cambio.
    document.addEventListener("input", handleInput, true);

    return () => {
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("input", handleInput, true);
    };
  }, []);

  return null;
}