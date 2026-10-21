import { BrandContainer } from "./BrandStyles.ts";

const Brand = () => {
  return (
    <BrandContainer>
      <div className="brand-logo">BS</div>

      <div className="brand-info">
        <h2>Boutique de Sabores</h2>
        <span>Panel de administración</span>
      </div>
    </BrandContainer>
  );
};

export default Brand;