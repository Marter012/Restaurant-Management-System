import { useEffect, useState, type FormEvent } from "react";
import { WhatsappLogo, Storefront } from "@phosphor-icons/react";
import CardLoading from "../../../CardLoading/CardLoading.tsx";
import {
  getEstablishmentSettingsAPI,
  updateEstablishmentSettingsAPI,
} from "../../../../services/settingsService.ts";
import { getAxiosErrorMessage } from "../../../Utils/ErrorAxios.tsx";
import {
  StoreContactPanel,
  StoreContactCopy,
  StoreContactForm,
  StoreContactActions,
  StoreContactMessage,
} from "./SettingsStoreContactStyles.ts";

const SettingsStoreContact = () => {
  const [name, setName] = useState("Boutique de Sabores");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    getEstablishmentSettingsAPI()
      .then((data) => {
        if (!active) return;
        setName(data.name);
        setPhone(data.phone_number ?? "");
      })
      .catch((requestError) => {
        if (active) {
          setError(true);
          setMessage(
            getAxiosErrorMessage(
              requestError,
              "No se pudo cargar el teléfono comercial.",
            ),
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving) return;
    const normalized = phone.trim();
    const digits = normalized.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) {
      setError(true);
      setMessage(
        "Ingresá un número válido con código de país y área. Ejemplo: 5493511234567.",
      );
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      const updated = await updateEstablishmentSettingsAPI({
        name,
        phone_number: normalized,
      });
      setPhone(updated.phone_number ?? "");
      setError(false);
      setMessage("Teléfono de WhatsApp guardado correctamente.");
    } catch (requestError) {
      setError(true);
      setMessage(
        getAxiosErrorMessage(requestError, "No se pudo guardar el teléfono."),
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <CardLoading icon={<Storefront />} text="Cargando teléfono comercial..." />;
  }

  return (
    <StoreContactPanel>
      <StoreContactCopy>
        <strong>
          <WhatsappLogo /> WhatsApp de pedidos
        </strong>
        <p>
          Este número se utilizará en el botón de confirmación de la tienda para
          clientes. Ingresalo con código de país y área, sin necesidad de
          escribir espacios.
        </p>
      </StoreContactCopy>
      <StoreContactForm onSubmit={(event) => void save(event)}>
        <label htmlFor="store-whatsapp">Número comercial</label>
        <input
          id="store-whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="5493511234567"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          disabled={saving}
        />
        <StoreContactActions>
          <button type="submit" disabled={saving}>
            {saving ? "Guardando..." : "Guardar teléfono"}
          </button>
        </StoreContactActions>
        {message && (
          <StoreContactMessage $error={error}>{message}</StoreContactMessage>
        )}
      </StoreContactForm>
    </StoreContactPanel>
  );
};

export default SettingsStoreContact;
