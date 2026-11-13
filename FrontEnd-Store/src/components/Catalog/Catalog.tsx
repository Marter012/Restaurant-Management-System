import { useMemo, useState } from "react";
import type { StoreProduct } from "../../types/store.ts";
import { CatalogHeader } from "./CatalogHeader.tsx";
import { CategoryFilter } from "./CategoryFilter.tsx";
import { ProductGrid } from "./ProductGrid.tsx";
import { Content, CatalogToolbar, ResultCount, SortSelect, AvailabilityToggle, ClearFilters } from "./CatalogStyles.ts";

interface Props {
  products: StoreProduct[];
  getProductQuantity: (productId: string) => number;
  onSelectProduct: (product: StoreProduct) => void;
  onIncrementProduct: (productId: string) => void;
  onDecrementProduct: (productId: string) => void;
}

type SortMode = "featured" | "price-asc" | "price-desc" | "name";

export const Catalog = ({ products, getProductQuantity, onSelectProduct, onIncrementProduct, onDecrementProduct }: Props) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [sort, setSort] = useState<SortMode>("featured");
  const [availableOnly, setAvailableOnly] = useState(false);

  const categories = useMemo(() => ["Todos", ...Array.from(new Set(products.map((product) => product.category || "Otros"))).sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }))], [products]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("es");
    const result = products.filter((product) => {
      const matchesCategory = category === "Todos" || product.category === category;
      const matchesSearch = !query || `${product.name} ${product.description || ""} ${product.category}`.toLocaleLowerCase("es").includes(query);
      return matchesCategory && matchesSearch && (!availableOnly || product.available);
    });
    return result.sort((a, b) => {
      if (sort === "price-asc") return a.final_price - b.final_price;
      if (sort === "price-desc") return b.final_price - a.final_price;
      if (sort === "name") return a.name.localeCompare(b.name, "es", { sensitivity: "base" });
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [products, category, search, sort, availableOnly]);

  const clearFilters = () => { setSearch(""); setCategory("Todos"); setSort("featured"); setAvailableOnly(false); };
  const hasFilters = Boolean(search.trim()) || category !== "Todos" || availableOnly || sort !== "featured";

  return (
    <Content id="catalogo">
      <CatalogHeader search={search} onSearchChange={setSearch} />
      <CategoryFilter categories={categories} selected={category} onSelect={setCategory} />
      <CatalogToolbar>
        <ResultCount><strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? "producto" : "productos"} disponibles para explorar</ResultCount>
        <div className="catalog-actions">
          <AvailabilityToggle $active={availableOnly}>
            <input type="checkbox" checked={availableOnly} onChange={(event) => setAvailableOnly(event.target.checked)} />
            Solo disponibles
          </AvailabilityToggle>
          <SortSelect aria-label="Ordenar productos" value={sort} onChange={(event) => setSort(event.target.value as SortMode)}>
            <option value="featured">Recomendados</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="name">Nombre A-Z</option>
          </SortSelect>
          {hasFilters && <ClearFilters type="button" onClick={clearFilters}>Limpiar</ClearFilters>}
        </div>
      </CatalogToolbar>
      <ProductGrid products={filteredProducts} getProductQuantity={getProductQuantity} onSelectProduct={onSelectProduct} onIncrementProduct={onIncrementProduct} onDecrementProduct={onDecrementProduct} />
    </Content>
  );
};
