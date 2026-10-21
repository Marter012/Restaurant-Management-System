import { useRef, useState } from "react";

import ManageProducts, {
  AddProduct,
  PrintProducts,
  type ManageProductsRef,
} from "../../ManageProducts/ManageProducts.tsx";

import PageHeader from "../../PageHeaders/PageHeaders.tsx";
import { ContainerPage } from "../PageStyles.ts";

const Products = () => {
  const [showActive, setShowActive] = useState(true);

  const manageProductsRef = useRef<ManageProductsRef>(null);

  return (
      <ContainerPage className="products-page">
      <PageHeader
        title="Productos"
        description="Administrá los productos disponibles"
      >
        <AddProduct
          onClick={() => manageProductsRef.current?.openCreate()}
        />

        <PrintProducts
          onClick={() => manageProductsRef.current?.printProducts()}
        />
      </PageHeader>

      <ManageProducts
        ref={manageProductsRef}
        showActive={showActive}
        setShowActive={setShowActive}
      />
    </ContainerPage>
  );
};

export default Products;
