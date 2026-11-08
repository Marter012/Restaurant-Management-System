import { useRef, useState } from "react";

import ManagePromotions, {
  type ManagePromotionRef,
} from "../../ManagePromotions/ManagePromotions.tsx";

import PageHeader from "../../PageHeaders/PageHeaders.tsx";
import { ContainerPage } from "../PageStyles.ts";

const Promotions = () => {
  const [showActive, setShowActive] = useState(true);

  const managePromotionsRef = useRef<ManagePromotionRef>(null);

  return (
    <ContainerPage>
      <PageHeader
        title="Promociones"
        description="Administrá las promociones disponibles"
      />

      <ManagePromotions
        ref={managePromotionsRef}
        showActive={showActive}
        setShowActive={setShowActive}
      />
    </ContainerPage>
  );
};

export default Promotions;