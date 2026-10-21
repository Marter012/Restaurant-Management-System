import type { ICashMovement } from "../../interfaces/CashMovements.ts";

import {
  SummaryContainer,
  SummaryHeader,
  MovementList,
  MovementRow,
  MovementType,
} from "./CashMovementSummaryStyles.ts";

interface CashMovementSummaryProps {
  movements: ICashMovement[];

  canModifyCash: boolean;

  onIncome: () => void;

  onExpense: () => void;
  onEdit?: (movement: ICashMovement) => void;
}

const CashMovementSummary = ({
  movements,
  canModifyCash,
  onIncome,
  onExpense,
  onEdit,
}: CashMovementSummaryProps) => {
  const recentMovements = [...movements]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <SummaryContainer>
      <SummaryHeader>
        <h3>Movimientos</h3>
      </SummaryHeader>

      <MovementList>
        {recentMovements.length === 0 ? (
          <p>No hay movimientos manuales.</p>
        ) : (
          recentMovements.map((movement) => (
            <MovementRow key={movement.id} onClick={() => onEdit?.(movement)} title={onEdit ? "Doble clic para modificar" : undefined}>
              <div>
                <strong>{movement.description || "Sin descripción"}</strong>

                <small>
                  {movement.method_payment === "cash"
                    ? "Efectivo"
                    : movement.method_payment === "debit"
                      ? "Debito"
                      : movement.method_payment === "qr"
                        ? "QR"
                        : "Transferencia"}
                </small>
              </div>

              <MovementType
                $type={movement.type === "inflow" ? "income" : "expense"}
              >
                {movement.type === "inflow" ? "+" : "-"} $
                {movement.amount.toLocaleString("es-AR")}
              </MovementType>
            </MovementRow>
          ))
        )}
      </MovementList>

      {/* =====================================================
          ACCIONES
      ===================================================== */}

      {canModifyCash && (
        <div className="actions">
          <button type="button" onClick={onIncome}>
            + Ingreso
          </button>

          <button type="button" onClick={onExpense}>
            - Egreso
          </button>
        </div>
      )}
    </SummaryContainer>
  );
};

export default CashMovementSummary;
