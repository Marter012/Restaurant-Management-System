import { FaSearch, FaUtensils } from "react-icons/fa";
import { CatalogTop, SectionTitle, SectionSubtitle, SearchBox, TitleEyebrow } from "./CatalogStyles.ts";
interface Props { search: string; onSearchChange: (value: string) => void; }
export const CatalogHeader = ({ search, onSearchChange }: Props) => (
  <CatalogTop>
    <div className="catalog-heading">
      <TitleEyebrow><FaUtensils /> PARA DISFRUTAR</TitleEyebrow>
      <SectionTitle>Explorá nuestro menú</SectionTitle>
      <SectionSubtitle>Encontrá eso que tenés ganas de comer hoy.</SectionSubtitle>
    </div>
    <SearchBox>
      <FaSearch aria-hidden="true" />
      <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="¿Qué se te antoja?" aria-label="Buscar productos" />
      {search && <button type="button" onClick={() => onSearchChange("")} aria-label="Limpiar búsqueda">×</button>}
    </SearchBox>
  </CatalogTop>
);
