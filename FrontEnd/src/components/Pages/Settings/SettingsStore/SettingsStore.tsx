import { useEffect, useMemo, useRef, useState } from "react";
import { FaCheck, FaEye, FaImage, FaPalette, FaPhoneAlt, FaStore, FaTags, FaSearch, FaFilter, FaTimes, FaCheckDouble } from "react-icons/fa";
import {
  StoreSettingsWrap,
  StoreSettingsGrid,
  StoreSettingsField,
  StoreSettingsActions,
  StoreSettingsNotice,
  StoreSettingsSection,
  StoreSettingsSectionHeader,
  StoreSettingsSectionIcon,
  StoreSettingsToggle,
  StoreSettingsOptions,
  StoreSettingsStatus,
  StoreSettingsLoading,
} from "./SettingsStoreStyles.ts";
import type { Product } from "../../../../interfaces/Product.ts";
import type { Promotion } from "../../../../interfaces/Promotion.ts";
import { getProductsAPI } from "../../../../services/productService.ts";
import { api } from "../../../../services/api.ts";
import { getPromotionsAPI } from "../../../../services/promotionService.ts";

type Theme = {
  primary: string;
  accent: string;
  canvas: string;
  surface: string;
  surface_strong: string;
  ink: string;
  muted: string;
  border: string;
};

type StoreConfig = {
  store_title: string;
  tagline: string;
  hero_title: string;
  hero_description: string;
  hero_image: string | null;
  logo_url: string | null;
  featured_product_ids: string[];
  enabled_product_ids: string[];
  catalog_restricted: boolean;
  enabled_promotion_ids: string[];
  promotion_selection_restricted: boolean;
  product_discounts: Record<string, number>;
  general_store_discount: number;
  theme: Theme;
  show_promotions: boolean;
  show_featured: boolean;
  delivery_enabled: boolean;
  pickup_enabled: boolean;
};

const defaults: StoreConfig = {
  store_title: "",
  tagline: "Hecho para disfrutar",
  hero_title: "Tu próximo favorito está acá.",
  hero_description: "Elegí lo que más te gusta y armá tu pedido.",
  hero_image: null,
  logo_url: null,
  featured_product_ids: [],
  enabled_product_ids: [],
  catalog_restricted: false,
  enabled_promotion_ids: [],
  promotion_selection_restricted: false,
  product_discounts: {},
  general_store_discount: 0,
  theme: {
    primary: "#4A2818",
    accent: "#B7834E",
    canvas: "#F5E8D1",
    surface: "#FFF9F0",
    surface_strong: "#FFFFFF",
    ink: "#332116",
    muted: "#806B5A",
    border: "#E7D6C1",
  },
  show_promotions: true,
  show_featured: true,
  delivery_enabled: false,
  pickup_enabled: true,
};

const colorLabels: Record<keyof Theme, string> = {
  primary: "Color principal",
  accent: "Color de acento",
  canvas: "Fondo general",
  surface: "Superficies",
  surface_strong: "Superficie destacada",
  ink: "Texto principal",
  muted: "Texto secundario",
  border: "Bordes",
};

const normalizeConfig = (value: Partial<StoreConfig>): StoreConfig => ({
  ...defaults,
  ...value,
  theme: { ...defaults.theme, ...(value.theme ?? {}) },
  featured_product_ids: value.featured_product_ids ?? [],
  enabled_product_ids: value.enabled_product_ids ?? [],
  enabled_promotion_ids: value.enabled_promotion_ids ?? [],
  product_discounts: value.product_discounts ?? {},
});

export default function SettingsStore() {
  const previewFrame = useRef<HTMLIFrameElement>(null);
  const env = (import.meta as ImportMeta & { env: Record<string, string> }).env;
  const previewUrl = env.VITE_STORE_PREVIEW_URL || "about:blank";

  const [config, setConfig] = useState<StoreConfig>(defaults);
  const [savedConfig, setSavedConfig] = useState<StoreConfig>(defaults);
  const [savedPhone, setSavedPhone] = useState("");
  const [savedPublicSalesEnabled, setSavedPublicSalesEnabled] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [phone, setPhone] = useState("");
  const [publicSalesEnabled, setPublicSalesEnabled] = useState(false);
  const [busy, setBusy] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [productCategory, setProductCategory] = useState("all");
  const [productStock, setProductStock] = useState("all");
  const [featuredSearch, setFeaturedSearch] = useState("");
  const [promotionSearch, setPromotionSearch] = useState("");
  const [discountSearch, setDiscountSearch] = useState("");
  const [discountFilter, setDiscountFilter] = useState("all");

  useEffect(() => {
    let active = true;
    Promise.all([
      api.get("/settings/store"),
      getProductsAPI(),
      getPromotionsAPI(),
    ])
      .then(([storeResponse, productData, promotionData]) => {
        if (!active) return;
        const initialConfig = normalizeConfig(storeResponse.data);
        const initialPhone = String(storeResponse.data.phone_number ?? "");
        const initialPublicSales = Boolean(storeResponse.data.public_sales_enabled);
        setConfig(initialConfig);
        setSavedConfig(initialConfig);
        setPhone(initialPhone);
        setSavedPhone(initialPhone);
        setPublicSalesEnabled(initialPublicSales);
        setSavedPublicSalesEnabled(initialPublicSales);
        setProducts(productData.filter((product) => product.status));
        setPromotions(promotionData.filter((promotion) => promotion.status));
      })
      .catch(() => {
        if (active) setError("No se pudo cargar toda la configuración del Store. Verificá la conexión y los permisos.");
      })
      .finally(() => {
        if (active) setBusy(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const update = <K extends keyof StoreConfig>(key: K, value: StoreConfig[K]) => {
    setConfig((current) => ({ ...current, [key]: value }));
  };

  useEffect(() => {
    previewFrame.current?.contentWindow?.postMessage(
      { type: "STORE_PREVIEW_CONFIG", configuration: config },
      "*",
    );
  }, [config]);

  const toggleId = (ids: string[], id: string, checked: boolean) =>
    checked ? [...ids, id] : ids.filter((item) => item !== id);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category).filter(Boolean))].sort((a, b) => a.localeCompare(b, "es")),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const term = productSearch.trim().toLocaleLowerCase("es");
    return products.filter((product) =>
      (!term || product.name.toLocaleLowerCase("es").includes(term)) &&
      (productCategory === "all" || product.category === productCategory) &&
      (productStock === "all" || (productStock === "available" ? product.quantity > 0 : product.quantity <= 0)),
    );
  }, [products, productSearch, productCategory, productStock]);

  const filteredFeaturedProducts = useMemo(() => {
    const term = featuredSearch.trim().toLocaleLowerCase("es");
    return products.filter((product) => !term || product.name.toLocaleLowerCase("es").includes(term));
  }, [products, featuredSearch]);

  const filteredPromotions = useMemo(() => {
    const term = promotionSearch.trim().toLocaleLowerCase("es");
    return promotions.filter((promotion) => !term || promotion.name.toLocaleLowerCase("es").includes(term));
  }, [promotions, promotionSearch]);

  const filteredDiscountProducts = useMemo(() => {
    const term = discountSearch.trim().toLocaleLowerCase("es");
    return products.filter((product) => {
      const hasCustomDiscount = config.product_discounts[product.id] !== undefined;
      return (!term || product.name.toLocaleLowerCase("es").includes(term)) &&
        (discountFilter === "all" || (discountFilter === "custom" ? hasCustomDiscount : !hasCustomDiscount));
    });
  }, [products, discountSearch, discountFilter, config.product_discounts]);

  const updateVisibleProductSelection = (key: "enabled_product_ids" | "featured_product_ids", visible: Product[], selected: boolean) => {
    const visibleIds = new Set(visible.map((product) => product.id));
    update(key, selected
      ? [...new Set([...config[key], ...visible.map((product) => product.id)])]
      : config[key].filter((id) => !visibleIds.has(id)));
  };

  const hasConfigChanges = (keys: (keyof StoreConfig)[]) =>
    keys.some((key) => JSON.stringify(config[key]) !== JSON.stringify(savedConfig[key]));

  const saveSection = async (
    sectionName: string,
    keys: (keyof StoreConfig)[],
    options?: { phone?: boolean; publicSales?: boolean },
  ) => {
    setError("");
    setMessage("");

    if (options?.phone) {
      const digits = phone.trim().replace(/\D/g, "");
      if (phone.trim() && (digits.length < 8 || digits.length > 15)) {
        setError("Ingresá un teléfono válido con código de país y área (entre 8 y 15 dígitos).");
        return;
      }
    }

    if (
      keys.includes("general_store_discount") &&
      (config.general_store_discount < 0 || config.general_store_discount > 100)
    ) {
      setError("El descuento general del Store debe estar entre 0 y 100 %.");
      return;
    }

    setSaving(true);
    try {
      // El endpoint recibe la configuración completa: se conserva el último
      // estado guardado y solo se incorporan los campos de esta sección.
      const sectionValues = Object.fromEntries(
        keys.map((key) => [key, config[key]]),
      ) as Partial<StoreConfig>;
      const payloadConfig = { ...savedConfig, ...sectionValues };

      const { data } = await api.put("/settings/store", {
        ...payloadConfig,
        phone_number: options?.phone ? phone.trim() : savedPhone,
        public_sales_enabled: options?.publicSales
          ? publicSalesEnabled
          : savedPublicSalesEnabled,
      });

      const persistedConfig = normalizeConfig(data);
      const persistedSection = Object.fromEntries(
        keys.map((key) => [key, persistedConfig[key]]),
      ) as Partial<StoreConfig>;

      setSavedConfig((current) => ({ ...current, ...persistedSection }));
      setConfig((current) => ({ ...current, ...persistedSection }));

      if (options?.phone) {
        const persistedPhone = String(data.phone_number ?? "");
        setPhone(persistedPhone);
        setSavedPhone(persistedPhone);
      }
      if (options?.publicSales) {
        const persistedSales = Boolean(data.public_sales_enabled);
        setPublicSalesEnabled(persistedSales);
        setSavedPublicSalesEnabled(persistedSales);
      }

      setMessage(`${sectionName}: cambios guardados correctamente.`);
    } catch {
      setError(`No se pudieron guardar los cambios de ${sectionName.toLowerCase()}. Verificá los permisos y volvé a intentarlo.`);
    } finally {
      setSaving(false);
    }
  };

  if (busy) return (
    <StoreSettingsWrap>
      <StoreSettingsLoading role="status" aria-live="polite">
        <div className="loading-card">
          <div className="loading-icon"><FaStore /></div>
          <div className="loading-spinner" aria-hidden="true" />
          <span className="loading-eyebrow">BOUTIQUE DE SABORES</span>
          <h2>Preparando tu Store</h2>
          <p>Estamos reuniendo la información de tu tienda para que puedas administrar su contenido, apariencia y ventas.</p>
          <div className="loading-progress" aria-hidden="true"><span /></div>
          <small>Esto puede tardar unos segundos...</small>
        </div>
      </StoreSettingsLoading>
    </StoreSettingsWrap>
  );

  return (
    <StoreSettingsWrap>
      <header className="store-page-header">
        <span>CANAL DE VENTAS DIGITAL</span>
        <h2>Configuración del Store</h2>
        <p>Todo lo que modifica el contenido, la presentación y el comportamiento de la tienda pública se administra desde esta sección.</p>
      </header>

      <StoreSettingsNotice>
        Los cambios de esta pantalla afectan exclusivamente al FrontEnd-Store. La configuración operativa del sistema de gestión se administra en Configuración → General.
      </StoreSettingsNotice>

      <StoreSettingsSection>
        <StoreSettingsSectionHeader>
          <StoreSettingsSectionIcon><FaStore /></StoreSettingsSectionIcon>
          <div><h3>Identidad y contenido principal</h3><p>Nombre público, mensajes y contenido de portada que verá el cliente.</p></div>
        </StoreSettingsSectionHeader>
        <StoreSettingsGrid>
          <StoreSettingsField><span>Nombre / título de la tienda</span><input value={config.store_title} maxLength={120} onChange={(event) => update("store_title", event.target.value)} placeholder="Ej.: Boutique de Sabores" /></StoreSettingsField>
          <StoreSettingsField><span>Frase superior</span><input value={config.tagline} maxLength={180} onChange={(event) => update("tagline", event.target.value)} /></StoreSettingsField>
          <StoreSettingsField $wide><span>Título principal de portada</span><input value={config.hero_title} maxLength={180} onChange={(event) => update("hero_title", event.target.value)} /></StoreSettingsField>
          <StoreSettingsField $wide><span>Descripción de portada</span><textarea value={config.hero_description} maxLength={500} onChange={(event) => update("hero_description", event.target.value)} /></StoreSettingsField>
          <StoreSettingsField><span>URL de imagen de portada</span><input type="url" value={config.hero_image ?? ""} onChange={(event) => update("hero_image", event.target.value || null)} placeholder="https://..." /></StoreSettingsField>
          <StoreSettingsField><span>URL del logo</span><input type="url" value={config.logo_url ?? ""} onChange={(event) => update("logo_url", event.target.value || null)} placeholder="https://..." /></StoreSettingsField>
        </StoreSettingsGrid>
        <StoreSettingsActions>
          <button type="button" onClick={() => void saveSection("Identidad y contenido", ["store_title", "tagline", "hero_title", "hero_description", "hero_image", "logo_url"])} disabled={saving || !hasConfigChanges(["store_title", "tagline", "hero_title", "hero_description", "hero_image", "logo_url"])}><FaCheck /> {saving ? "Guardando..." : "Guardar identidad y contenido"}</button>
        </StoreSettingsActions>
      </StoreSettingsSection>

      <StoreSettingsSection>
        <StoreSettingsSectionHeader>
          <StoreSettingsSectionIcon><FaStore /></StoreSettingsSectionIcon>
          <div><h3>Disponibilidad de ventas online</h3><p>Controlá si los clientes pueden iniciar y completar pedidos desde la tienda pública.</p></div>
        </StoreSettingsSectionHeader>
        <StoreSettingsToggle><input type="checkbox" checked={publicSalesEnabled} onChange={(event) => setPublicSalesEnabled(event.target.checked)} /><span>Habilitar ventas y checkout del FrontEnd-Store</span></StoreSettingsToggle>
        <StoreSettingsActions>
          <button type="button" onClick={() => void saveSection("Disponibilidad de ventas", [], { publicSales: true })} disabled={saving || publicSalesEnabled === savedPublicSalesEnabled}><FaCheck /> {saving ? "Guardando..." : "Guardar disponibilidad"}</button>
        </StoreSettingsActions>
      </StoreSettingsSection>

      <StoreSettingsSection>
        <StoreSettingsSectionHeader>
          <StoreSettingsSectionIcon><FaPhoneAlt /></StoreSettingsSectionIcon>
          <div><h3>Contacto y WhatsApp</h3><p>Datos públicos utilizados para la comunicación y confirmación de pedidos.</p></div>
        </StoreSettingsSectionHeader>
        <StoreSettingsGrid>
          <StoreSettingsField><span>Nombre comercial de referencia</span><input value={config.store_title || "Nombre del establecimiento"} readOnly /></StoreSettingsField>
          <StoreSettingsField><span>WhatsApp de pedidos</span><input type="tel" inputMode="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="5493511234567" /><small>Ingresalo con código de país y área.</small></StoreSettingsField>
        </StoreSettingsGrid>
        <StoreSettingsActions>
          <button type="button" onClick={() => void saveSection("Contacto y WhatsApp", [], { phone: true })} disabled={saving || phone.trim() === savedPhone}><FaCheck /> {saving ? "Guardando..." : "Guardar contacto"}</button>
        </StoreSettingsActions>
      </StoreSettingsSection>

      <StoreSettingsSection>
        <StoreSettingsSectionHeader>
          <StoreSettingsSectionIcon><FaPalette /></StoreSettingsSectionIcon>
          <div><h3>Identidad visual</h3><p>Personalizá la paleta cromática de la tienda. Los cambios se reflejan en los componentes que consumen el tema del Store.</p></div>
        </StoreSettingsSectionHeader>
        <StoreSettingsGrid>
          {(Object.keys(colorLabels) as (keyof Theme)[]).map((key) => (
            <StoreSettingsField key={key}>
              <span>{colorLabels[key]}</span>
              <div className="store-color-control"><input type="color" value={config.theme[key]} onChange={(event) => update("theme", { ...config.theme, [key]: event.target.value })} /><code>{config.theme[key]}</code></div>
            </StoreSettingsField>
          ))}
        </StoreSettingsGrid>
        <StoreSettingsActions>
          <button type="button" onClick={() => void saveSection("Identidad visual", ["theme"])} disabled={saving || !hasConfigChanges(["theme"])}><FaCheck /> {saving ? "Guardando..." : "Guardar identidad visual"}</button>
        </StoreSettingsActions>
      </StoreSettingsSection>

      <StoreSettingsSection>
        <StoreSettingsSectionHeader>
          <StoreSettingsSectionIcon><FaImage /></StoreSettingsSectionIcon>
          <div><h3>Productos publicados y destacados</h3><p>Elegí qué productos aparecen en el catálogo y cuáles se muestran como destacados.</p></div>
        </StoreSettingsSectionHeader>
        <StoreSettingsToggle><input type="checkbox" checked={config.catalog_restricted} onChange={(event) => update("catalog_restricted", event.target.checked)} /><span>Restringir el catálogo a los productos seleccionados</span></StoreSettingsToggle>
        <div className="store-selection-summary"><strong>{config.enabled_product_ids.length}</strong> productos seleccionados <span>·</span> {filteredProducts.length} resultados visibles de {products.length}</div>
        <div className="store-filter-toolbar">
          <label className="store-search"><FaSearch /><input type="search" value={productSearch} onChange={(event) => setProductSearch(event.target.value)} placeholder="Buscar producto por nombre..." aria-label="Buscar productos para publicar" />{productSearch && <button type="button" onClick={() => setProductSearch("")} aria-label="Limpiar búsqueda"><FaTimes /></button>}</label>
          <label className="store-filter-select"><FaFilter /><select value={productCategory} onChange={(event) => setProductCategory(event.target.value)}><option value="all">Todas las categorías</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
          <label className="store-filter-select"><select value={productStock} onChange={(event) => setProductStock(event.target.value)}><option value="all">Todo el stock</option><option value="available">Con stock</option><option value="empty">Sin stock</option></select></label>
        </div>
        <div className="store-bulk-actions"><button type="button" onClick={() => updateVisibleProductSelection("enabled_product_ids", filteredProducts, true)}><FaCheckDouble /> Seleccionar resultados</button><button type="button" onClick={() => updateVisibleProductSelection("enabled_product_ids", filteredProducts, false)}>Quitar selección visible</button></div>
        <StoreSettingsOptions>
          {filteredProducts.map((product) => (
            <label key={product.id}>
              <input type="checkbox" checked={config.enabled_product_ids.includes(product.id)} onChange={(event) => update("enabled_product_ids", toggleId(config.enabled_product_ids, product.id, event.target.checked))} />
              <span>{product.name}</span><small className={product.quantity > 0 ? "has-stock" : "no-stock"}>Stock: {product.quantity}</small>
            </label>
          ))}
          {!filteredProducts.length && <p>No hay productos que coincidan con los filtros.</p>}
        </StoreSettingsOptions>
        <StoreSettingsToggle><input type="checkbox" checked={config.show_featured} onChange={(event) => update("show_featured", event.target.checked)} /><span>Mostrar sección de productos destacados</span></StoreSettingsToggle>
        {config.show_featured && <>
          <div className="store-selection-summary"><strong>{config.featured_product_ids.length}</strong> productos destacados</div>
          <label className="store-search"><FaSearch /><input type="search" value={featuredSearch} onChange={(event) => setFeaturedSearch(event.target.value)} placeholder="Buscar producto para destacar..." aria-label="Buscar productos destacados" />{featuredSearch && <button type="button" onClick={() => setFeaturedSearch("")} aria-label="Limpiar búsqueda"><FaTimes /></button>}</label>
          <div className="store-bulk-actions"><button type="button" onClick={() => updateVisibleProductSelection("featured_product_ids", filteredFeaturedProducts, true)}><FaCheckDouble /> Destacar resultados</button><button type="button" onClick={() => updateVisibleProductSelection("featured_product_ids", filteredFeaturedProducts, false)}>Quitar destacados visibles</button></div>
          <StoreSettingsOptions>{filteredFeaturedProducts.map((product) => (
            <label key={`featured-${product.id}`}>
              <input type="checkbox" checked={config.featured_product_ids.includes(product.id)} onChange={(event) => update("featured_product_ids", toggleId(config.featured_product_ids, product.id, event.target.checked))} />
              <span>{product.name}</span><small>Destacado</small>
            </label>
          ))}{!filteredFeaturedProducts.length && <p>No hay productos que coincidan con la búsqueda.</p>}</StoreSettingsOptions>
        </>}
        <StoreSettingsActions>
          <button type="button" onClick={() => void saveSection("Productos publicados y destacados", ["enabled_product_ids", "catalog_restricted", "featured_product_ids", "show_featured"])} disabled={saving || !hasConfigChanges(["enabled_product_ids", "catalog_restricted", "featured_product_ids", "show_featured"])}><FaCheck /> {saving ? "Guardando..." : "Guardar productos"}</button>
        </StoreSettingsActions>
      </StoreSettingsSection>

      <StoreSettingsSection>
        <StoreSettingsSectionHeader>
          <StoreSettingsSectionIcon><FaTags /></StoreSettingsSectionIcon>
          <div><h3>Promociones y descuentos del Store</h3><p>Controlá qué promociones se publican y los descuentos exclusivos del canal online.</p></div>
        </StoreSettingsSectionHeader>
        <StoreSettingsToggle><input type="checkbox" checked={config.show_promotions} onChange={(event) => update("show_promotions", event.target.checked)} /><span>Mostrar sección de promociones</span></StoreSettingsToggle>
        <StoreSettingsToggle><input type="checkbox" checked={config.promotion_selection_restricted} onChange={(event) => update("promotion_selection_restricted", event.target.checked)} /><span>Restringir a promociones seleccionadas</span></StoreSettingsToggle>
        <div className="store-selection-summary"><strong>{config.enabled_promotion_ids.length}</strong> promociones seleccionadas · {filteredPromotions.length} resultados visibles</div>
        <label className="store-search"><FaSearch /><input type="search" value={promotionSearch} onChange={(event) => setPromotionSearch(event.target.value)} placeholder="Buscar promoción por nombre..." aria-label="Buscar promociones" />{promotionSearch && <button type="button" onClick={() => setPromotionSearch("")} aria-label="Limpiar búsqueda"><FaTimes /></button>}</label>
        <StoreSettingsOptions>
          {filteredPromotions.map((promotion) => (
            <label key={promotion.id}>
              <input type="checkbox" checked={config.enabled_promotion_ids.includes(promotion.id)} onChange={(event) => update("enabled_promotion_ids", toggleId(config.enabled_promotion_ids, promotion.id, event.target.checked))} />
              <span>{promotion.name}</span>
            </label>
          ))}
          {!filteredPromotions.length && <p>No hay promociones que coincidan con la búsqueda.</p>}
        </StoreSettingsOptions>
        <div className="store-discount-panel">
          <div className="store-discount-heading"><div><strong>Descuento general del Store</strong><p>Se aplica a los productos que no tengan un descuento individual.</p></div><span className="discount-badge">{config.general_store_discount}%</span></div>
          <StoreSettingsField className="store-discount-field"><span>Porcentaje general</span><div className="store-discount-input"><input type="number" min="0" max="100" step="0.5" value={config.general_store_discount} onChange={(event) => update("general_store_discount", Math.min(100, Math.max(0, Number(event.target.value) || 0)))} /><span>%</span></div></StoreSettingsField>
          <div className="store-discount-heading individual"><div><strong>Descuentos individuales por producto</strong><p>Un descuento individual reemplaza al porcentaje general para ese producto.</p></div><span className="discount-count">{Object.keys(config.product_discounts).length} personalizados</span></div>
          <div className="store-discount-tools"><label className="store-search"><FaSearch /><input type="search" value={discountSearch} onChange={(event) => setDiscountSearch(event.target.value)} placeholder="Buscar producto..." aria-label="Buscar producto para configurar descuento" />{discountSearch && <button type="button" onClick={() => setDiscountSearch("")} aria-label="Limpiar búsqueda"><FaTimes /></button>}</label><label className="store-filter-select"><FaFilter /><select value={discountFilter} onChange={(event) => setDiscountFilter(event.target.value)}><option value="all">Todos los productos</option><option value="custom">Con descuento propio</option><option value="general">Usan descuento general</option></select></label></div>
          <div className="store-product-discounts">
            {filteredDiscountProducts.map((product) => {
              const customDiscount = config.product_discounts[product.id];
              return <label key={`discount-${product.id}`}><span className="discount-product-name">{product.name}<small>{customDiscount === undefined ? `Usa el general (${config.general_store_discount}%)` : "Descuento personalizado"}</small></span><div className="discount-product-control"><input aria-label={`Descuento Store para ${product.name}`} type="number" min="0" max="100" step="0.5" placeholder={`General: ${config.general_store_discount}%`} value={customDiscount ?? ""} onChange={(event) => { const next = { ...config.product_discounts }; if (event.target.value === "") delete next[product.id]; else next[product.id] = Math.min(100, Math.max(0, Number(event.target.value) || 0)); update("product_discounts", next); }} /><span>%</span>{customDiscount !== undefined && <button type="button" title="Restablecer descuento general" onClick={() => { const next = { ...config.product_discounts }; delete next[product.id]; update("product_discounts", next); }}>Usar general</button>}</div></label>;
            })}
            {!filteredDiscountProducts.length && <p className="discount-empty">No hay productos que coincidan con el filtro.</p>}
          </div>
        </div>
        <StoreSettingsActions>
          <button type="button" onClick={() => void saveSection("Promociones y descuentos", ["show_promotions", "promotion_selection_restricted", "enabled_promotion_ids", "general_store_discount", "product_discounts"])} disabled={saving || !hasConfigChanges(["show_promotions", "promotion_selection_restricted", "enabled_promotion_ids", "general_store_discount", "product_discounts"])}><FaCheck /> {saving ? "Guardando..." : "Guardar promociones y descuentos"}</button>
        </StoreSettingsActions>
      </StoreSettingsSection>

      <StoreSettingsSection>
        <StoreSettingsSectionHeader>
          <StoreSettingsSectionIcon><FaEye /></StoreSettingsSectionIcon>
          <div><h3>Secciones y modalidades de compra</h3><p>Definí qué alternativas estarán disponibles para los clientes.</p></div>
        </StoreSettingsSectionHeader>
        <StoreSettingsToggle><input type="checkbox" checked={config.delivery_enabled} onChange={(event) => update("delivery_enabled", event.target.checked)} /><span>Habilitar entrega a domicilio</span></StoreSettingsToggle>
        <StoreSettingsToggle><input type="checkbox" checked={config.pickup_enabled} onChange={(event) => update("pickup_enabled", event.target.checked)} /><span>Habilitar retiro en el local</span></StoreSettingsToggle>
        <StoreSettingsActions>
          <button type="button" onClick={() => void saveSection("Modalidades de compra", ["delivery_enabled", "pickup_enabled"])} disabled={saving || !hasConfigChanges(["delivery_enabled", "pickup_enabled"])}><FaCheck /> {saving ? "Guardando..." : "Guardar modalidades"}</button>
        </StoreSettingsActions>
      </StoreSettingsSection>

      <StoreSettingsSection>
        <StoreSettingsSectionHeader>
          <StoreSettingsSectionIcon><FaEye /></StoreSettingsSectionIcon>
          <div><h3>Previsualización de la tienda</h3><p>Vista del sitio público. Configurá VITE_STORE_PREVIEW_URL en el FrontEnd de gestión para habilitarla.</p></div>
        </StoreSettingsSectionHeader>
        {previewUrl !== "about:blank" ? <iframe ref={previewFrame} title="Previsualización del FrontEnd-Store" src={previewUrl} loading="lazy" onLoad={() => previewFrame.current?.contentWindow?.postMessage({ type: "STORE_PREVIEW_CONFIG", configuration: config }, "*")} /> : <p className="store-preview-empty">La previsualización no está configurada. Las opciones se pueden guardar igualmente.</p>}
      </StoreSettingsSection>

      {error && <StoreSettingsStatus $error role="alert">{error}</StoreSettingsStatus>}
      {message && <StoreSettingsStatus role="status">{message}</StoreSettingsStatus>}
    </StoreSettingsWrap>
  );
}
