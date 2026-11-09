import { useEffect, useMemo, useState } from "react";
import {
  FaArrowLeft, FaCheckCircle, FaClock, FaLeaf, FaMinus, FaPlus,
  FaSearch, FaShoppingBag, FaTimes, FaWhatsapp, FaUtensils,
} from "react-icons/fa";
import { getStoreInfo, getStoreProducts, getUnavailableIngredients } from "./services/publicApi.ts";
import type { CartItem, CheckoutData, StoreInfo, StoreProduct } from "./types/store.ts";
import {
  AddButton, Brand, BrandMark, CartButton, CartCount, CartDrawer, CartFooter, CartImagePlaceholder,
  CartItemRow, CartItems, CatalogTop, CategoryButton, CategoryRail, ClosedScreen,
  Content, Dialog, DialogContent, DialogHeader, DialogProductImage, DiscountBadge,
  EmptyState, Eyebrow, FieldGroup, Footer, Header, HeaderActions, Hero, HeroContent,
  HeroText, HeroTitle, IconButton, Loading, Notice, OldPrice, OptionList, OptionRow,
  Overlay, Page, Price, PriceRow, PrimaryButton, ProductBody, ProductCard,
  ProductCategory, ProductDescription, ProductGrid, ProductImageWrap, ProductName, ProductImagePlaceholder,
  QuantityControl, SearchBox, SectionSubtitle, SectionTitle, SecondaryButton, TotalRow, FullWidthSecondaryButton, InlineNotice, NoticeIcon, ForwardArrowIcon,
} from "./styles/AppStyles.ts";

const CART_STORAGE_KEY = "boutique-sabores-public-cart-v1";
const paymentMethods = [
  { value: "cash", label: "Efectivo" },
  { value: "transfer", label: "Transferencia" },
  { value: "qr", label: "QR" },
  { value: "debit_card", label: "Tarjeta de débito" },
  { value: "mercado_pago", label: "Mercado Pago" },
];

const money = (value: number) => new Intl.NumberFormat("es-AR", {
  style: "currency", currency: "ARS", maximumFractionDigits: 2,
}).format(Number(value) || 0);

const imageSource = (image?: string | null) => {
  if (!image) return "";
  if (/^(https?:|data:image\/)/i.test(image)) return image;
  return `data:image/jpeg;base64,${image}`;
};

const readCart = (): CartItem[] => {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
};

const createItemKey = (product: StoreProduct, garnish: string, removed: string[], note: string) =>
  `${product.id}:${garnish}:${[...removed].sort().join(",")}:${note.trim()}`;

const App = () => {
  const [store, setStore] = useState<StoreInfo | null>(null);
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [unavailableIngredients, setUnavailableIngredients] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>(readCart);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);
  const [selectedGarnish, setSelectedGarnish] = useState("");
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [itemNote, setItemNote] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkout, setCheckout] = useState<CheckoutData>({ customerName: "", paymentMethod: "cash", pickupTime: "", note: "" });
  const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setLoadError("");
      try {
        const storeData = await getStoreInfo();
        if (!active) return;
        setStore(storeData);
        if (storeData.public_sales_enabled) {
          const [productData, unavailable] = await Promise.all([
            getStoreProducts(), getUnavailableIngredients().catch(() => [] as string[]),
          ]);
          if (!active) return;
          setProducts(productData);
          setUnavailableIngredients(unavailable.map((value) => value.toLocaleLowerCase("es")));
        }
      } catch {
        if (active) setLoadError("No pudimos conectar con la tienda. Revisá tu conexión e intentá nuevamente.");
      } finally { if (active) setLoading(false); }
    };
    void load();
    return () => { active = false; };
  }, []);

  const categories = useMemo(() => [
    "Todos", ...Array.from(new Set(products.map((product) => product.category || "Otros")))
      .sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" })),
  ], [products]);

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === "Todos" || product.category === category;
    const query = search.trim().toLocaleLowerCase("es");
    const matchesSearch = !query || `${product.name} ${product.description || ""} ${product.category}`.toLocaleLowerCase("es").includes(query);
    return matchesCategory && matchesSearch;
  }), [products, category, search]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.quantity * item.product.final_price, 0);

  const openProduct = (product: StoreProduct) => {
    setSelectedProduct(product);
    setSelectedGarnish("");
    setRemovedIngredients([]);
    setItemNote("");
  };

  const addSelectedProduct = () => {
    if (!selectedProduct) return;
    const key = createItemKey(selectedProduct, selectedGarnish, removedIngredients, itemNote);
    setCart((previous) => {
      const existing = previous.find((item) => item.key === key);
      if (existing) return previous.map((item) => item.key === key ? { ...item, quantity: item.quantity + 1 } : item);
      return [...previous, {
        key, product: selectedProduct, quantity: 1, garnish: selectedGarnish,
        removedIngredients: [...removedIngredients], note: itemNote.trim(),
      }];
    });
    setSelectedProduct(null);
    setCartOpen(true);
  };

  const changeQuantity = (key: string, delta: number) => {
    setCart((previous) => previous
      .map((item) => item.key === key ? { ...item, quantity: item.quantity + delta } : item)
      .filter((item) => item.quantity > 0));
  };

  const toggleRemovedIngredient = (ingredient: string) => {
    const normalized = ingredient.toLocaleLowerCase("es");
    setRemovedIngredients((previous) => previous.includes(normalized)
      ? previous.filter((item) => item !== normalized)
      : [...previous, normalized]);
  };

  const startCheckout = () => {
    if (!cart.length) return;
    setCheckoutError("");
    setCheckoutOpen(true);
    setCartOpen(false);
  };

  const confirmWhatsApp = () => {
    const phone = (store?.phone_number || "").replace(/\D/g, "");
    if (phone.length < 8 || phone.length > 15) {
      setCheckoutError("La empresa todavía no configuró un número de WhatsApp válido. Contactá al establecimiento.");
      return;
    }
    if (!checkout.customerName.trim() || !checkout.pickupTime || !checkout.paymentMethod) {
      setCheckoutError("Completá tu nombre, método de pago y horario de retiro.");
      return;
    }
    const [hours, minutes] = checkout.pickupTime.split(":").map(Number);
    const pickup = new Date();
    pickup.setHours(hours, minutes, 0, 0);
    if (pickup.getTime() < Date.now()) {
      setCheckoutError("Elegí un horario de retiro posterior a la hora actual.");
      return;
    }
    const paymentLabel = paymentMethods.find((method) => method.value === checkout.paymentMethod)?.label || checkout.paymentMethod;
    const lines = cart.map((item) => {
      const details = [
        item.garnish ? `Guarnición: ${item.garnish}` : "",
        item.removedIngredients.length ? `Sin: ${item.removedIngredients.join(", ")}` : "",
        item.note ? `Nota: ${item.note}` : "",
      ].filter(Boolean);
      return `• ${item.quantity} x ${item.product.name} — ${money(item.product.final_price * item.quantity)}${details.length ? `\n  ${details.join(" | ")}` : ""}`;
    });
    const message = [
      `🍽️ *PEDIDO PARA ${store?.name?.toLocaleUpperCase("es") || "BOUTIQUE DE SABORES"}*`,
      "", `👤 *Cliente:* ${checkout.customerName.trim()}`, "", "🛒 *Detalle del pedido:*", ...lines,
      "", `💰 *TOTAL: ${money(cartTotal)}*`, `💳 *Método de pago:* ${paymentLabel}`,
      `🕒 *Horario de retiro:* ${checkout.pickupTime}`,
      checkout.note.trim() ? `📝 *Observaciones:* ${checkout.note.trim()}` : "",
      "", "Pedido enviado desde la tienda online. Pendiente de confirmación por el establecimiento.",
    ].filter(Boolean).join("\n");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.location.assign(url);
  };

  if (loading) return <Page><Loading>Preparando la tienda...</Loading></Page>;
  if (loadError) return <Page><ClosedScreen><strong>No pudimos cargar la tienda</strong><p>{loadError}</p><SecondaryButton onClick={() => window.location.reload()}>Reintentar</SecondaryButton></ClosedScreen></Page>;
  if (store && !store.public_sales_enabled) return <Page><ClosedScreen><BrandMark><FaUtensils /></BrandMark><strong>{store.name}</strong><p>En este momento no estamos recibiendo pedidos online. Volvé a visitarnos más tarde.</p></ClosedScreen></Page>;

  return (
    <Page>
      <Header>
        <Brand href="#inicio"><BrandMark><FaUtensils /></BrandMark><span>{store?.name || "Boutique de Sabores"}</span></Brand>
        <HeaderActions>
          <CartButton type="button" onClick={() => setCartOpen(true)}><FaShoppingBag /> <span>Mi pedido</span><CartCount>{cartCount}</CartCount></CartButton>
        </HeaderActions>
      </Header>

      <Hero id="inicio">
        <HeroContent>
          <Eyebrow><FaLeaf /> Hecho para disfrutar</Eyebrow>
          <HeroTitle>Tu próximo favorito<br />está acá.</HeroTitle>
          <HeroText>Elegí lo que más te gusta, armá tu pedido y coordiná el retiro directamente con nuestro equipo por WhatsApp.</HeroText>
        </HeroContent>
      </Hero>

      <Content>
        <CatalogTop>
          <div><SectionTitle>Nuestro menú</SectionTitle><SectionSubtitle>Productos frescos para disfrutar cuando quieras.</SectionSubtitle></div>
          <SearchBox><FaSearch /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar productos..." aria-label="Buscar productos" /></SearchBox>
        </CatalogTop>
        <CategoryRail aria-label="Categorías">
          {categories.map((item) => <CategoryButton key={item} type="button" $active={category === item} onClick={() => setCategory(item)}>{item}</CategoryButton>)}
        </CategoryRail>
        <ProductGrid>
          {filteredProducts.length ? filteredProducts.map((product) => (
            <ProductCard key={product.id}>
              <ProductImageWrap>
                {imageSource(product.image) ? <img src={imageSource(product.image)} alt={product.name} loading="lazy" /> : <ProductImagePlaceholder aria-label="Imagen no disponible"><FaUtensils size={34} /></ProductImagePlaceholder>}
                {product.effective_discount_percentage > 0 && <DiscountBadge>{product.effective_discount_percentage}% OFF</DiscountBadge>}
              </ProductImageWrap>
              <ProductBody>
                <ProductCategory>{product.category}</ProductCategory>
                <ProductName>{product.name}</ProductName>
                <ProductDescription>{product.description || (product.has_garnish ? "Personalizá tu pedido con las opciones disponibles." : "Preparado para disfrutar.")}</ProductDescription>
                <PriceRow><Price>{money(product.final_price)}</Price>{product.effective_discount_percentage > 0 && <OldPrice>{money(product.price)}</OldPrice>}</PriceRow>
                <AddButton type="button" onClick={() => openProduct(product)}><FaPlus /> Elegir producto</AddButton>
              </ProductBody>
            </ProductCard>
          )) : <EmptyState><FaSearch size={25} /><strong>No encontramos productos</strong><span>Probá con otra búsqueda o categoría.</span></EmptyState>}
        </ProductGrid>
      </Content>

      <Footer>{store?.name || "Boutique de Sabores"} · Pedidos online · Confirmación directa por WhatsApp</Footer>

      {selectedProduct && (
        <Overlay onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProduct(null); }}>
          <Dialog role="dialog" aria-modal="true" aria-label={`Personalizar ${selectedProduct.name}`}>
            <DialogHeader><h3>Personalizá tu producto</h3><IconButton type="button" onClick={() => setSelectedProduct(null)} aria-label="Cerrar"><FaTimes /></IconButton></DialogHeader>
            <DialogContent>
              {imageSource(selectedProduct.image) && <DialogProductImage src={imageSource(selectedProduct.image)} alt={selectedProduct.name} />}
              <ProductCategory>{selectedProduct.category}</ProductCategory>
              <ProductName>{selectedProduct.name}</ProductName>
              <ProductDescription>{selectedProduct.description || "Elegí las opciones para tu pedido."}</ProductDescription>
              <PriceRow><Price>{money(selectedProduct.final_price)}</Price>{selectedProduct.effective_discount_percentage > 0 && <OldPrice>{money(selectedProduct.price)}</OldPrice>}</PriceRow>
              {selectedProduct.has_garnish && selectedProduct.garnish_options.length > 0 && <FieldGroup><label>Elegí una guarnición</label><OptionList>{selectedProduct.garnish_options.map((option) => <OptionRow key={option}><input type="radio" name="garnish" checked={selectedGarnish === option} onChange={() => setSelectedGarnish(option)} />{option}</OptionRow>)}</OptionList></FieldGroup>}
              {selectedProduct.ingredients.length > 0 && <FieldGroup><label>¿Querés quitar algún ingrediente?</label><OptionList>{selectedProduct.ingredients.map((ingredient) => {
                const unavailable = unavailableIngredients.includes(ingredient.toLocaleLowerCase("es"));
                return <OptionRow key={ingredient}><input type="checkbox" disabled={unavailable} checked={unavailable || removedIngredients.includes(ingredient.toLocaleLowerCase("es"))} onChange={() => toggleRemovedIngredient(ingredient)} />{ingredient}{unavailable ? " · No disponible" : ""}</OptionRow>;
              })}</OptionList></FieldGroup>}
              <FieldGroup><label htmlFor="product-note">Indicaciones para este producto (opcional)</label><input id="product-note" value={itemNote} onChange={(event) => setItemNote(event.target.value)} maxLength={180} placeholder="Ej. bien cocido, poca salsa..." /></FieldGroup>
              <PrimaryButton type="button" onClick={addSelectedProduct}><FaPlus /> Agregar al pedido · {money(selectedProduct.final_price)}</PrimaryButton>
            </DialogContent>
          </Dialog>
        </Overlay>
      )}

      {cartOpen && <Overlay onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}><CartDrawer role="dialog" aria-modal="true" aria-label="Mi pedido">
        <DialogHeader><h3>Mi pedido ({cartCount})</h3><IconButton type="button" onClick={() => setCartOpen(false)} aria-label="Cerrar"><FaTimes /></IconButton></DialogHeader>
        <CartItems>
          {cart.length ? cart.map((item) => <CartItemRow key={item.key}>
            {imageSource(item.product.image) ? <img src={imageSource(item.product.image)} alt="" /> : <CartImagePlaceholder><FaUtensils /></CartImagePlaceholder>}
            <div><strong>{item.product.name}</strong><small>{item.garnish ? `Guarnición: ${item.garnish} · ` : ""}{item.removedIngredients.length ? `Sin ${item.removedIngredients.join(", ")} · ` : ""}{item.note}</small><small>{money(item.product.final_price)} c/u</small><QuantityControl><button type="button" onClick={() => changeQuantity(item.key,-1)} aria-label="Quitar uno"><FaMinus /></button><span>{item.quantity}</span><button type="button" onClick={() => changeQuantity(item.key,1)} aria-label="Agregar uno"><FaPlus /></button></QuantityControl></div>
            <strong>{money(item.product.final_price * item.quantity)}</strong>
          </CartItemRow>) : <EmptyState><FaShoppingBag /><strong>Tu pedido está vacío</strong><span>Elegí algo rico del menú para comenzar.</span><SecondaryButton type="button" onClick={() => setCartOpen(false)}>Volver al menú</SecondaryButton></EmptyState>}
        </CartItems>
        {cart.length > 0 && <CartFooter><TotalRow><span>Total del pedido</span><strong>{money(cartTotal)}</strong></TotalRow><PrimaryButton type="button" onClick={startCheckout}>Continuar con el pedido <ForwardArrowIcon /></PrimaryButton><InlineNotice>El pedido se enviará a la empresa para su confirmación.</InlineNotice></CartFooter>}
      </CartDrawer></Overlay>}

      {checkoutOpen && <Overlay onMouseDown={(event) => { if (event.target === event.currentTarget) setCheckoutOpen(false); }}><Dialog role="dialog" aria-modal="true" aria-label="Confirmar pedido">
        <DialogHeader><h3>Confirmá tu pedido</h3><IconButton type="button" onClick={() => setCheckoutOpen(false)} aria-label="Cerrar"><FaTimes /></IconButton></DialogHeader>
        <DialogContent>
          <Notice><NoticeIcon><FaCheckCircle /> Tu pedido se enviará por WhatsApp.</NoticeIcon> La empresa deberá confirmarlo; todavía no queda registrado como una comanda del sistema.</Notice>
          <FieldGroup><label htmlFor="customer-name">Tu nombre</label><input id="customer-name" autoComplete="name" value={checkout.customerName} onChange={(event) => setCheckout((old) => ({...old,customerName:event.target.value}))} maxLength={100} placeholder="¿Cómo te llamás?" /></FieldGroup>
          <FieldGroup><label htmlFor="payment-method">Método de pago</label><select id="payment-method" value={checkout.paymentMethod} onChange={(event) => setCheckout((old) => ({...old,paymentMethod:event.target.value}))}>{paymentMethods.map((method) => <option key={method.value} value={method.value}>{method.label}</option>)}</select></FieldGroup>
          <FieldGroup><label htmlFor="pickup-time"><FaClock /> Horario de retiro</label><input id="pickup-time" type="time" value={checkout.pickupTime} onChange={(event) => setCheckout((old) => ({...old,pickupTime:event.target.value}))} /></FieldGroup>
          <FieldGroup><label htmlFor="checkout-note">Observaciones (opcional)</label><textarea id="checkout-note" value={checkout.note} onChange={(event) => setCheckout((old) => ({...old,note:event.target.value}))} maxLength={500} placeholder="Aclaraciones para el establecimiento..." /></FieldGroup>
          <TotalRow><span>Total a confirmar</span><strong>{money(cartTotal)}</strong></TotalRow>
          {checkoutError && <Notice>{checkoutError}</Notice>}
          <PrimaryButton type="button" onClick={confirmWhatsApp}><FaWhatsapp /> Enviar pedido por WhatsApp</PrimaryButton>
          <FullWidthSecondaryButton type="button" onClick={() => {setCheckoutOpen(false);setCartOpen(true);}}><FaArrowLeft /> Volver al carrito</FullWidthSecondaryButton>
        </DialogContent>
      </Dialog></Overlay>}
    </Page>
  );
};

export default App;
