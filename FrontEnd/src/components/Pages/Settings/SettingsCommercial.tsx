import { useEffect, useState } from "react";
import {
  FaCheck,
  FaExclamationTriangle,
  FaStore,
  FaTag,
  FaHistory,
} from "react-icons/fa";

import {
  getEstablishmentAPI,
  updateEstablishmentAPI,
  getCommercialSettingsAPI,
  updateCommercialSettingsAPI,
  getAuditRetentionAPI,
  previewAuditRetentionAPI,
  updateAuditRetentionAPI,
} from "../../../services/settingsService.ts";

import type {
  AuditRetentionPreview,
  CommercialSettings,
} from "../../../services/settingsService.ts";

import {
  CommercialContent,
  CommercialHeader,
  Eyebrow,
  Title,
  Description,
  Section,
  SectionHeader,
  SectionIcon,
  SectionTitle,
  SectionDescription,
  Field,
  Label,
  Input,
  HelpText,
  ToggleRow,
  ToggleCopy,
  Toggle,
  SaveButton,
  SecondaryButton,
  Message,
  RetentionPreview,
  WarningBox,
  ActionRow,
  Loading,
} from "./SettingsCommercialStyles.ts";

const SettingsCommercial = () => {
  const [name, setName] = useState("");
  const [commercial, setCommercial] = useState<CommercialSettings>({
    public_sales_enabled: false,
    general_discount_enabled: false,
    general_discount_percentage: 0,
  });
  const [retentionDays, setRetentionDays] = useState(30);
  const [preview, setPreview] = useState<AuditRetentionPreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingName, setSavingName] = useState(false);
  const [savingCommercial, setSavingCommercial] = useState(false);
  const [savingRetention, setSavingRetention] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const [establishmentData, commercialData, retentionData] =
          await Promise.all([
            getEstablishmentAPI(),
            getCommercialSettingsAPI(),
            getAuditRetentionAPI(),
          ]);

        if (!active) return;
        setName(establishmentData.name ?? "");
        setCommercial({
          public_sales_enabled: Boolean(commercialData.public_sales_enabled),
          general_discount_enabled: Boolean(
            commercialData.general_discount_enabled,
          ),
          general_discount_percentage: Number(
            commercialData.general_discount_percentage ?? 0,
          ),
        });
        setRetentionDays(Number(retentionData.retention_days ?? 30));
      } catch {
        if (active)
          setError(
            "No se pudieron cargar las configuraciones. Verificá los permisos y la conexión con el backend.",
          );
      } finally {
        if (active) setLoading(false);
      }
    };

    void load();
    return () => {
      active = false;
    };
  }, []);

  const saveName = async () => {
    setError("");
    setMessage("");
    if (!name.trim()) {
      setError("El nombre del establecimiento es obligatorio.");
      return;
    }

    setSavingName(true);
    try {
      const result = await updateEstablishmentAPI({ name: name.trim() });
      setName(result.name);
      setMessage("Nombre del establecimiento actualizado.");
    } catch {
      setError("No se pudo actualizar el nombre del establecimiento.");
    } finally {
      setSavingName(false);
    }
  };

  const saveCommercial = async () => {
    setError("");
    setMessage("");

    if (
      commercial.general_discount_enabled &&
      (commercial.general_discount_percentage <= 0 ||
        commercial.general_discount_percentage > 100)
    ) {
      setError(
        "El descuento general debe ser mayor que 0 y no superar el 100 %.",
      );
      return;
    }

    setSavingCommercial(true);
    try {
      const result = await updateCommercialSettingsAPI(commercial);
      setCommercial(result);
      setMessage("Configuración comercial actualizada.");
    } catch {
      setError("No se pudo guardar la configuración comercial.");
    } finally {
      setSavingCommercial(false);
    }
  };

  const requestRetentionPreview = async () => {
    setError("");
    setMessage("");
    setPreview(null);

    if (
      !Number.isInteger(retentionDays) ||
      retentionDays < 1 ||
      retentionDays > 3650
    ) {
      setError("El período debe ser un número entero entre 1 y 3650 días.");
      return;
    }

    setSavingRetention(true);
    try {
      const result = await previewAuditRetentionAPI(retentionDays);
      setPreview(result);
      if (result.records_to_delete === 0) {
        const applied = await updateAuditRetentionAPI(retentionDays, false);
        setMessage(applied.message);
        setPreview(null);
      }
    } catch {
      setError(
        "No se pudo calcular la cantidad de registros que se eliminarían.",
      );
    } finally {
      setSavingRetention(false);
    }
  };

  const confirmRetention = async () => {
    if (!preview) return;

    setSavingRetention(true);
    setError("");
    try {
      const result = await updateAuditRetentionAPI(retentionDays, true);
      setMessage(
        `${result.message} Registros eliminados: ${result.deleted_records ?? 0}.`,
      );
      setPreview(null);
    } catch {
      setError(
        "No se pudo actualizar el período ni eliminar los registros vencidos.",
      );
    } finally {
      setSavingRetention(false);
    }
  };

  if (loading)
    return <Loading>Cargando configuración del establecimiento...</Loading>;

  return (
    <CommercialContent>
      <CommercialHeader>
        <div>
          <Eyebrow>CONFIGURACIÓN DEL SISTEMA</Eyebrow>
          <Title>Establecimiento y políticas</Title>
          <Description>
            Administrá la identidad comercial, los descuentos, la habilitación
            de ventas y la conservación de auditoría.
          </Description>
        </div>
      </CommercialHeader>

      {error && (
        <Message $error role="alert">
          {error}
        </Message>
      )}
      {message && <Message role="status">{message}</Message>}

      <Section>
        <SectionHeader>
          <SectionIcon>
            <FaStore />
          </SectionIcon>
          <div>
            <SectionTitle>Identidad del establecimiento</SectionTitle>
            <SectionDescription>
              Nombre que podrán consultar las aplicaciones conectadas al
              backend.
            </SectionDescription>
          </div>
        </SectionHeader>
        <Field>
          <Label htmlFor="establishment-name">Nombre del establecimiento</Label>
          <Input
            id="establishment-name"
            value={name}
            maxLength={120}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ej.: Boutique de Sabores"
          />
        </Field>
        <ActionRow>
          <SaveButton
            type="button"
            onClick={() => void saveName()}
            disabled={savingName}
          >
            <FaCheck /> {savingName ? "Guardando..." : "Guardar nombre"}
          </SaveButton>
        </ActionRow>
      </Section>

      <Section>
        <SectionHeader>
          <SectionIcon>
            <FaTag />
          </SectionIcon>
          <div>
            <SectionTitle>Política de descuentos y venta pública</SectionTitle>
            <SectionDescription>
              El descuento general se aplica a los productos que no tengan un
              descuento individual configurado.
            </SectionDescription>
          </div>
        </SectionHeader>

        <ToggleRow>
          <ToggleCopy>
            <strong>Permitir venta al público</strong>
            <span>
              Habilita o bloquea la posibilidad de iniciar ventas desde el
              FrontEnd público.
            </span>
          </ToggleCopy>
          <Toggle
            type="button"
            $enabled={commercial.public_sales_enabled}
            aria-pressed={commercial.public_sales_enabled}
            onClick={() =>
              setCommercial((current) => ({
                ...current,
                public_sales_enabled: !current.public_sales_enabled,
              }))
            }
          >
            <i />
          </Toggle>
        </ToggleRow>

        <ToggleRow>
          <ToggleCopy>
            <strong>Activar descuento general</strong>
            <span>
              Aplica un porcentaje a todos los productos sin descuento
              individual.
            </span>
          </ToggleCopy>
          <Toggle
            type="button"
            $enabled={commercial.general_discount_enabled}
            aria-pressed={commercial.general_discount_enabled}
            onClick={() =>
              setCommercial((current) => ({
                ...current,
                general_discount_enabled: !current.general_discount_enabled,
              }))
            }
          >
            <i />
          </Toggle>
        </ToggleRow>

        <Field>
          <Label htmlFor="general-discount">
            Porcentaje de descuento general
          </Label>
          <Input
            id="general-discount"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={commercial.general_discount_percentage}
            disabled={!commercial.general_discount_enabled}
            onChange={(event) =>
              setCommercial((current) => ({
                ...current,
                general_discount_percentage: Number(event.target.value),
              }))
            }
          />
          <HelpText>
            Los descuentos individuales se configuran desde el formulario de
            cada producto y tienen prioridad sobre este porcentaje.
          </HelpText>
        </Field>

        <ActionRow>
          <SaveButton
            type="button"
            onClick={() => void saveCommercial()}
            disabled={savingCommercial}
          >
            <FaCheck />{" "}
            {savingCommercial
              ? "Guardando..."
              : "Guardar configuración comercial"}
          </SaveButton>
        </ActionRow>
      </Section>

      <Section>
        <SectionHeader>
          <SectionIcon>
            <FaHistory />
          </SectionIcon>
          <div>
            <SectionTitle>Conservación del historial de actividad</SectionTitle>
            <SectionDescription>
              Definí durante cuántos días se conservarán los registros de
              actividad de los usuarios.
            </SectionDescription>
          </div>
        </SectionHeader>

        <Field>
          <Label htmlFor="retention-days">Días de conservación</Label>
          <Input
            id="retention-days"
            type="number"
            min="1"
            max="3650"
            step="1"
            value={retentionDays}
            onChange={(event) => {
              setRetentionDays(Number(event.target.value));
              setPreview(null);
            }}
          />
          <HelpText>
            Los registros anteriores al período elegido serán eliminados de la
            base de datos. El valor inicial es de 30 días.
          </HelpText>
        </Field>

        {preview && (
          <RetentionPreview>
            <WarningBox>
              <FaExclamationTriangle />
              <div>
                <strong>Se requiere confirmación</strong>
                <span>
                  Hay {preview.records_to_delete} registros anteriores al
                  período de {preview.retention_days} días. Si confirmás, se
                  eliminarán permanentemente.
                </span>
              </div>
            </WarningBox>
            <ActionRow>
              <SaveButton
                type="button"
                onClick={() => void confirmRetention()}
                disabled={savingRetention}
              >
                {savingRetention
                  ? "Eliminando..."
                  : "Confirmar y eliminar registros"}
              </SaveButton>
              <SecondaryButton
                type="button"
                onClick={() => setPreview(null)}
                disabled={savingRetention}
              >
                Cancelar
              </SecondaryButton>
            </ActionRow>
          </RetentionPreview>
        )}

        {!preview && (
          <ActionRow>
            <SaveButton
              type="button"
              onClick={() => void requestRetentionPreview()}
              disabled={savingRetention}
            >
              {savingRetention
                ? "Calculando..."
                : "Previsualizar y guardar período"}
            </SaveButton>
          </ActionRow>
        )}
      </Section>
    </CommercialContent>
  );
};

export default SettingsCommercial;
