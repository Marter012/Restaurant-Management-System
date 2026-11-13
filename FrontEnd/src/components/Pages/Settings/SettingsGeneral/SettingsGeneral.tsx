import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store/store.ts";
import { setEstablishmentName } from "../../../../store/slices/establishmentSlice.ts";
import { FaCheck, FaExclamationTriangle, FaStore, FaTag, FaHistory, FaBoxOpen } from "react-icons/fa";

import {
  getSettingsAPI,
  updateSettingsAPI,
  getEstablishmentAPI,
  updateEstablishmentAPI,
  getCommercialSettingsAPI,
  updateCommercialSettingsAPI,
  getAuditRetentionAPI,
  previewAuditRetentionAPI,
  updateAuditRetentionAPI,
} from "../../../../services/settingsService.ts";

import type {
  GeneralSettings,
  AuditRetentionPreview,
  CommercialSettings,
} from "../../../../services/settingsService.ts";

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
} from "./SettingsGeneralStyles.ts";

const DEFAULT_OPERATIONAL: GeneralSettings = { allow_out_of_stock: false };
const DEFAULT_COMMERCIAL: CommercialSettings = {
  public_sales_enabled: false,
  general_discount_enabled: false,
  general_discount_percentage: 0,
};

const SettingsGeneral = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("");
  const [operational, setOperational] = useState<GeneralSettings>(DEFAULT_OPERATIONAL);
  const [savedOperational, setSavedOperational] = useState<GeneralSettings>(DEFAULT_OPERATIONAL);
  const [commercial, setCommercial] = useState<CommercialSettings>(DEFAULT_COMMERCIAL);
  const [savedCommercial, setSavedCommercial] = useState<CommercialSettings>(DEFAULT_COMMERCIAL);
  const [retentionDays, setRetentionDays] = useState(30);
  const [savedRetentionDays, setSavedRetentionDays] = useState(30);

  const [preview, setPreview] = useState<AuditRetentionPreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingName, setSavingName] = useState(false);
  const [savingOperational, setSavingOperational] = useState(false);
  const [savingCommercial, setSavingCommercial] = useState(false);
  const [savingRetention, setSavingRetention] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const nameChanged = useMemo(
    () => name.trim() !== savedName,
    [name, savedName],
  );
  const operationalChanged =
    operational.allow_out_of_stock !== savedOperational.allow_out_of_stock;
  const commercialChanged =
    commercial.public_sales_enabled !== savedCommercial.public_sales_enabled ||
    commercial.general_discount_enabled !== savedCommercial.general_discount_enabled ||
    Number(commercial.general_discount_percentage) !==
      Number(savedCommercial.general_discount_percentage);
  const retentionChanged = retentionDays !== savedRetentionDays;

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const [establishmentData, commercialData, retentionData, operationalData] =
          await Promise.all([
            getEstablishmentAPI(),
            getCommercialSettingsAPI(),
            getAuditRetentionAPI(),
            getSettingsAPI(),
          ]);

        if (!active) return;

        const initialName = establishmentData.name ?? "";
        const initialOperational = {
          allow_out_of_stock: Boolean(operationalData.allow_out_of_stock),
        };
        const initialCommercial = {
          public_sales_enabled: Boolean(commercialData.public_sales_enabled),
          general_discount_enabled: Boolean(commercialData.general_discount_enabled),
          general_discount_percentage: Number(
            commercialData.general_discount_percentage ?? 0,
          ),
        };
        const initialRetention = Number(retentionData.retention_days ?? 30);

        setName(initialName);
        setSavedName(initialName);
        setOperational(initialOperational);
        setSavedOperational(initialOperational);
        setCommercial(initialCommercial);
        setSavedCommercial(initialCommercial);
        setRetentionDays(initialRetention);
        setSavedRetentionDays(initialRetention);
      } catch {
        if (active) {
          setError(
            "No se pudieron cargar las configuraciones. Verificá los permisos y la conexión con el backend.",
          );
        }
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
      const persistedName = result.name;
      setName(persistedName);
      setSavedName(persistedName);
      dispatch(setEstablishmentName(persistedName));
      setMessage("Nombre del establecimiento actualizado.");
    } catch {
      setError("No se pudo actualizar el nombre del establecimiento.");
    } finally {
      setSavingName(false);
    }
  };

  const saveOperational = async () => {
    setError("");
    setMessage("");
    setSavingOperational(true);
    try {
      const result = await updateSettingsAPI(operational);
      const persisted = {
        allow_out_of_stock: Boolean(result.allow_out_of_stock),
      };
      setOperational(persisted);
      setSavedOperational(persisted);
      setMessage("Configuración operativa actualizada.");
    } catch {
      setError("No se pudo guardar la configuración operativa.");
    } finally {
      setSavingOperational(false);
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
      setError("El descuento general debe ser mayor que 0 y no superar el 100 %.");
      return;
    }

    setSavingCommercial(true);
    try {
      const result = await updateCommercialSettingsAPI(commercial);
      const persisted = {
        public_sales_enabled: Boolean(result.public_sales_enabled),
        general_discount_enabled: Boolean(result.general_discount_enabled),
        general_discount_percentage: Number(result.general_discount_percentage ?? 0),
      };
      setCommercial(persisted);
      setSavedCommercial(persisted);
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
        setSavedRetentionDays(retentionDays);
        setRetentionDays(retentionDays);
        setMessage(applied.message);
        setPreview(null);
      }
    } catch {
      setError("No se pudo calcular la cantidad de registros que se eliminarían.");
    } finally {
      setSavingRetention(false);
    }
  };

  const confirmRetention = async () => {
    if (!preview) return;

    setSavingRetention(true);
    setError("");
    setMessage("");
    try {
      const result = await updateAuditRetentionAPI(retentionDays, true);
      setSavedRetentionDays(retentionDays);
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

  if (loading) {
    return <Loading>Cargando configuración del establecimiento...</Loading>;
  }

  return (
    <CommercialContent>
      <CommercialHeader>
        <div>
          <Eyebrow>CONFIGURACIÓN DEL SISTEMA</Eyebrow>
          <Title>Establecimiento y políticas</Title>
          <Description>
            Administrá desde un único lugar los parámetros que controlan el
            FrontEnd de gestión: identidad del establecimiento, políticas
            operativas, reglas comerciales y auditoría.
          </Description>
        </div>
      </CommercialHeader>

      {error && <Message $error role="alert">{error}</Message>}
      {message && <Message role="status">{message}</Message>}

      <Section>
        <SectionHeader>
          <SectionIcon><FaStore /></SectionIcon>
          <div>
            <SectionTitle>Identidad del establecimiento</SectionTitle>
            <SectionDescription>
              Nombre que podrán consultar las aplicaciones conectadas al backend.
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
            disabled={!nameChanged || savingName}
          >
            <FaCheck /> {savingName ? "Guardando..." : "Guardar nombre"}
          </SaveButton>
        </ActionRow>
      </Section>

      <Section>
        <SectionHeader>
          <SectionIcon><FaBoxOpen /></SectionIcon>
          <div>
            <SectionTitle>Políticas operativas del sistema</SectionTitle>
            <SectionDescription>
              Definí cómo debe comportarse la gestión al registrar ventas y actualizar existencias.
            </SectionDescription>
          </div>
        </SectionHeader>
        <ToggleRow>
          <ToggleCopy>
            <strong>Permitir ventas sin stock</strong>
            <span>
              Permite confirmar ventas aunque el producto no tenga unidades disponibles.
              Cuando está desactivado, se valida y descuenta el stock normalmente.
            </span>
          </ToggleCopy>
          <Toggle
            type="button"
            $enabled={operational.allow_out_of_stock}
            aria-label="Permitir ventas sin stock"
            aria-pressed={operational.allow_out_of_stock}
            onClick={() =>
              setOperational((current) => ({
                ...current,
                allow_out_of_stock: !current.allow_out_of_stock,
              }))
            }
          >
            <i />
          </Toggle>
        </ToggleRow>
        <ActionRow>
          <SaveButton
            type="button"
            onClick={() => void saveOperational()}
            disabled={!operationalChanged || savingOperational}
          >
            <FaCheck /> {savingOperational ? "Guardando..." : "Guardar política operativa"}
          </SaveButton>
        </ActionRow>
      </Section>

      <Section>
        <SectionHeader>
          <SectionIcon><FaTag /></SectionIcon>
          <div>
            <SectionTitle>Política de descuentos generales</SectionTitle>
            <SectionDescription>
              El descuento general se aplica a los productos que no tengan un
              descuento individual configurado. Las opciones de venta online se administran en Store.
            </SectionDescription>
          </div>
        </SectionHeader>

        <ToggleRow>
          <ToggleCopy>
            <strong>Activar descuento general</strong>
            <span>
              Aplica un porcentaje a todos los productos sin descuento individual.
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
          <Label htmlFor="general-discount">Porcentaje de descuento general</Label>
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
            Los descuentos individuales se configuran desde el formulario de cada
            producto y tienen prioridad sobre este porcentaje.
          </HelpText>
        </Field>

        <ActionRow>
          <SaveButton
            type="button"
            onClick={() => void saveCommercial()}
            disabled={!commercialChanged || savingCommercial}
          >
            <FaCheck />
            {savingCommercial ? "Guardando..." : "Guardar configuración comercial"}
          </SaveButton>
        </ActionRow>
      </Section>

      <Section>
        <SectionHeader>
          <SectionIcon><FaHistory /></SectionIcon>
          <div>
            <SectionTitle>Conservación del historial de actividad</SectionTitle>
            <SectionDescription>
              Definí durante cuántos días se conservarán los registros de actividad de los usuarios.
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
            Los registros anteriores al período elegido serán eliminados de la base
            de datos. El valor inicial es de 30 días.
          </HelpText>
        </Field>

        {preview && (
          <RetentionPreview>
            <WarningBox>
              <FaExclamationTriangle />
              <div>
                <strong>Se requiere confirmación</strong>
                <span>
                  Hay {preview.records_to_delete} registros anteriores al período de
                  {` ${preview.retention_days} `}días. Si confirmás, se eliminarán permanentemente.
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
              disabled={!retentionChanged || savingRetention}
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

export default SettingsGeneral;
