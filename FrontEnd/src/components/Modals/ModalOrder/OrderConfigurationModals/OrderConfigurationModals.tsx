import { useEffect, useState } from "react";
import ModalForm from "../../../ModalForm/ModalForm.tsx";
import {
  DiscountTypeButtons,
  DiscountTypeButton,
  ModalField,
  ModalInput,
  AcceptButton,
} from "./OrderConfigurationModalsStyles.ts";
import type { OrderFormValues } from "../../../../interfaces/Order.ts";
import {
  DataSection,
  DetailsPanel,
  FieldLabelExtraNameField,
  FieldsGrid,
  SmallTextDiscountHint,
  StyledInputDateDisplay,
} from "../../../Forms/OrderForm/OrderFormStyles.ts";
import TimePicker from "../../../TimePicker/TimePicker.tsx";

type DetailsType = "delivery" | "discount" | "extra";

interface Props {
  isOpen: boolean;
  activeDetails: DetailsType;
  values: OrderFormValues;
  selectedDay: string;
  setFieldValue: (field: string, value: unknown) => void;
  onClose: () => void;
}

export default function OrderConfigurationModals({
  isOpen,
  activeDetails,
  values,
  selectedDay,
  setFieldValue,
  onClose,
}: Props) {
  const [deliveryDraft, setDeliveryDraft] = useState("");
  const [discountDraft, setDiscountDraft] = useState({ type: "", value: 0 });
  const [extraDraft, setExtraDraft] = useState({
    name: "",
    price: 0,
    quantity: 1,
  });

  useEffect(() => {
    if (!isOpen) return;

    if (activeDetails === "delivery") {
      setDeliveryDraft(values.delivery_time || "");
    }

    if (activeDetails === "discount") {
      setDiscountDraft({
        type: values.discount_type || "",
        value: Number(values.discount_value) || 0,
      });
    }

    if (activeDetails === "extra") {
      setExtraDraft({ name: "", price: 0, quantity: 1 });
    }
  }, [
    isOpen,
    activeDetails,
    values.delivery_time,
    values.discount_type,
    values.discount_value,
  ]);

  const handleAccept = () => {
    if (activeDetails === "delivery") {
      setFieldValue("delivery_time", deliveryDraft);
    }

    if (activeDetails === "discount") {
      setFieldValue("discount_type", discountDraft.type);
      setFieldValue("discount_value", Number(discountDraft.value) || 0);
    }

    if (activeDetails === "extra") {
      const name = extraDraft.name.trim();
      const price = Number(extraDraft.price);
      const quantity = Number(extraDraft.quantity);

      if (
        !name ||
        !Number.isFinite(price) ||
        price < 0 ||
        !Number.isInteger(quantity) ||
        quantity < 1
      )
        return;

      setFieldValue("extra_items", [
        ...(values.extra_items ?? []),
        { name, price, quantity },
      ]);
    }

    onClose();
  };

  const title =
    activeDetails === "delivery"
      ? "Entrega"
      : activeDetails === "discount"
        ? "Descuento"
        : "Producto extra";

  const canAccept =
    activeDetails !== "extra" ||
    (extraDraft.name.trim().length > 0 &&
      Number.isFinite(Number(extraDraft.price)) &&
      Number(extraDraft.price) >= 0 &&
      Number.isInteger(Number(extraDraft.quantity)) &&
      Number(extraDraft.quantity) >= 1);

  return (
    <ModalForm
      isOpen={isOpen}
      title={title}
      description="Configuración de comanda"
      onClose={onClose}
      size="compact"
      scroll="active"
      footerActions={
        <AcceptButton
          type="button"
          onClick={handleAccept}
          disabled={!canAccept}
        >
          Aceptar
        </AcceptButton>
      }
    >
      <DetailsPanel>
        {activeDetails === "delivery" && (
          <DataSection>
            <FieldsGrid>
              <ModalField>
                Horario
                <TimePicker
                  value={deliveryDraft}
                  onChange={setDeliveryDraft}
                  placeholder="--:--"
                  ariaLabel="Horario de entrega"
                />
              </ModalField>

              <ModalField>
                Fecha
                <StyledInputDateDisplay value={selectedDay} readOnly />
              </ModalField>
            </FieldsGrid>
          </DataSection>
        )}

        {activeDetails === "discount" && (
          <DataSection>
            <FieldsGrid>
              <ModalField>
                Tipo de descuento
                <DiscountTypeButtons>
                  <DiscountTypeButton
                    type="button"
                    $active={discountDraft.type === "percent"}
                    onClick={() =>
                      setDiscountDraft((current) => ({
                        ...current,
                        type: "percent",
                      }))
                    }
                  >
                    Porcentaje
                  </DiscountTypeButton>

                  <DiscountTypeButton
                    type="button"
                    $active={discountDraft.type === "amount"}
                    onClick={() =>
                      setDiscountDraft((current) => ({
                        ...current,
                        type: "amount",
                      }))
                    }
                  >
                    Importe
                  </DiscountTypeButton>
                </DiscountTypeButtons>
              </ModalField>

              {discountDraft.type && (
                <ModalField>
                  {discountDraft.type === "percent"
                    ? "Porcentaje a descontar"
                    : "Importe a descontar"}

                  <ModalInput
                    type="number"
                    min="0"
                    max={discountDraft.type === "percent" ? 100 : undefined}
                    value={discountDraft.value}
                    onChange={(event) =>
                      setDiscountDraft((current) => ({
                        ...current,
                        value: Number(event.target.value),
                      }))
                    }
                    placeholder="0"
                  />
                </ModalField>
              )}
            </FieldsGrid>

            <SmallTextDiscountHint>
              Se aplica sobre el total de la comanda.
            </SmallTextDiscountHint>
          </DataSection>
        )}

        {activeDetails === "extra" && (
          <DataSection>
            <FieldsGrid>
              <FieldLabelExtraNameField>
                Producto extra
                <ModalInput
                  type="text"
                  value={extraDraft.name}
                  onChange={(event) =>
                    setExtraDraft((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Ej.: envío, producto especial"
                />
              </FieldLabelExtraNameField>

              <ModalField>
                Precio extra
                <ModalInput
                  type="number"
                  min="0"
                  value={extraDraft.price}
                  onChange={(event) =>
                    setExtraDraft((current) => ({
                      ...current,
                      price: Number(event.target.value),
                    }))
                  }
                  placeholder="$ 0"
                />
              </ModalField>

              <ModalField>
                Cantidad extra
                <ModalInput
                  type="number"
                  min="1"
                  step="1"
                  value={extraDraft.quantity}
                  onChange={(event) =>
                    setExtraDraft((current) => ({
                      ...current,
                      quantity: Number(event.target.value),
                    }))
                  }
                />
              </ModalField>
            </FieldsGrid>
          </DataSection>
        )}
      </DetailsPanel>
    </ModalForm>
  );
}
