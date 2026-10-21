import { useRef, useState } from "react";
import ManagePromotions, {
  AddPromotion,
  type ManagePromotionRef,
} from "../../ManagePromotions/ManagePromotions.tsx";
import PageHeader from "../../PageHeaders/PageHeaders.tsx";
import { ContainerPage } from "../PageStyles.ts";

const Promotions = () => {
  const [showActive, setShowActive] = useState(true);

  const managePromotionsRef = useRef<ManagePromotionRef>(null);
  return (
      <ContainerPage className="products-page">
      <PageHeader
        title="Promociones"
        description="Administrá las promociones disponibles"
      >
        <AddPromotion
          onClick={() => managePromotionsRef.current?.openModal()}
        />
      </PageHeader>
      <ManagePromotions
        ref={managePromotionsRef}
        showActive={showActive}
        setShowActive={setShowActive}
      />
    </ContainerPage>
  );
};

export default Promotions;
