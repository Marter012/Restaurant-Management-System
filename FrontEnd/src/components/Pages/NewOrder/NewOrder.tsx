import { useLocation } from "react-router-dom";
import type { IOrder } from "../../../interfaces/Order.ts";
import { ContainerPage } from "../PageStyles.ts";
import PageHeader from "../../../components/PageHeaders/PageHeaders.tsx";
import ModalOrderCreate from "../../Modals/ModalOrder/ModalOrderCreate.tsx";
import { NewOrderPageContent } from "./NewOrderPageStyles.ts";

interface NewOrderPageProps {
  parentOrder?: IOrder | null;
}

const NewOrderPage = ({ parentOrder = null }: NewOrderPageProps) => {
  const location = useLocation();
  const routeParentOrder = (location.state as { parentOrder?: IOrder } | null)
    ?.parentOrder;
  const effectiveParentOrder = parentOrder ?? routeParentOrder ?? null;

  return (
    <ContainerPage>
      <PageHeader
        title={
          effectiveParentOrder
            ? `Adicional de comanda #${effectiveParentOrder.order_number}`
            : "Nueva comanda"
        }
        description="Seleccioná productos y completá los datos de la comanda."
      />
      <NewOrderPageContent>
        <ModalOrderCreate parentOrder={effectiveParentOrder} />
      </NewOrderPageContent>
    </ContainerPage>
  );
};

export default NewOrderPage;
