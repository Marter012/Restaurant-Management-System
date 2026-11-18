import { UserCheck, X } from "../../utils/icons.ts";
import { Shade, Card } from "./SaveCustomerPromptStyles.ts";

type Props = {
  onSave: () => void;
  onSkip: () => void;
  onClose: () => void;
  busy?: boolean;
  title?: string;
  description?: string;
  saveLabel?: string;
  skipLabel?: string;
};

export function SaveCustomerPrompt({
  onSave,
  onSkip,
  onClose,
  busy = false,
  title = "¿Querés registrarte?",
  description = "Podemos crear tu cuenta con tu celular. También podés continuar como invitado y, si más adelante te registrás con el mismo número, vincularemos tus compras anteriores.",
  saveLabel = "Sí, registrarme",
  skipLabel = "Continuar como invitado",
}: Props) {
  return (
    <Shade onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <Card role="dialog" aria-modal="true" aria-labelledby="save-customer-title">
        <button className="close" type="button" onClick={onClose} aria-label="Cerrar"><X /></button>
        <UserCheck size={30} weight="duotone" />
        <h3 id="save-customer-title">{title}</h3>
        <p>{description}</p>
        <div className="actions">
          <button type="button" onClick={onSkip}>{skipLabel}</button>
          <button className="yes" type="button" disabled={busy} onClick={onSave}>{busy ? "Procesando…" : saveLabel}</button>
        </div>
      </Card>
    </Shade>
  );
}
