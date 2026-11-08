import { useState } from "react";

import ManageProducts from "../../ManageProducts/ManageProducts.tsx";
import PageHeader from "../../PageHeaders/PageHeaders.tsx";
import { ContainerPage } from "../PageStyles.ts";

const Products = () => {
  const [showActive, setShowActive] = useState(true);

  return (
    <ContainerPage className="products-page">
      <PageHeader
        title="Productos"
        description="Gestioná el catálogo de productos, su precio, stock e ingredientes."
      />
      <ManageProducts showActive={showActive} setShowActive={setShowActive} />
    </ContainerPage>
  );
};

export default Products;
