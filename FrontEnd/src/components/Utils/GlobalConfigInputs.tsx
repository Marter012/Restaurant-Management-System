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

    document.addEventListener("focusin", handleFocus);

    return () => {
      document.removeEventListener("focusin", handleFocus);
    };
  }, []);

  return null;
}