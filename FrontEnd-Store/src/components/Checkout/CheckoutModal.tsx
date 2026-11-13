import { FaArrowLeft, FaCheckCircle, FaClock, FaTimes, FaWhatsapp, FaCreditCard } from "react-icons/fa";
import type { CheckoutData } from "../../types/store.ts";
import { PAYMENT_METHODS } from "../../constants/store.ts";
import { Dialog, DialogContent, DialogHeader, FieldGroup, FullWidthSecondaryButton, IconButton, Notice, NoticeIcon, Overlay, PrimaryButton, TotalRow } from "../../styles/AppStyles.ts";
interface Props { open:boolean; checkout:CheckoutData; total:number; error:string; paying:boolean; salesEnabled:boolean; deliveryEnabled:boolean; pickupEnabled:boolean; onUpdate:<K extends keyof CheckoutData>(key:K,value:CheckoutData[K])=>void; onClose:()=>void; onConfirm:()=>void; onPay:()=>void; onBackToCart:()=>void; formatMoney:(value:number)=>string; }
export const CheckoutModal = ({open,checkout,total,error,paying,salesEnabled,deliveryEnabled,pickupEnabled,onUpdate,onClose,onConfirm,onPay,onBackToCart,formatMoney}:Props) => !open ? null : <Overlay onMouseDown={(event)=>{if(event.target===event.currentTarget)onClose();}}>
  <Dialog role="dialog" aria-modal="true" aria-label="Confirmar pedido">
    <DialogHeader><h3>Finalizá tu compra</h3><IconButton type="button" onClick={onClose} aria-label="Cerrar"><FaTimes /></IconButton></DialogHeader>
    <DialogContent>
      <Notice><NoticeIcon><FaCheckCircle /> Elegí cómo querés recibir tu pedido y el medio de compra.</NoticeIcon></Notice>
      {!salesEnabled && <Notice role="status">La tienda está en modo de vista previa. Podés consultar el catálogo, pero no se aceptan pedidos hasta que haya una caja abierta y las ventas online estén habilitadas.</Notice>}
      <FieldGroup><label htmlFor="customer-first-name">Nombre</label><input id="customer-first-name" autoComplete="given-name" value={checkout.firstName} onChange={(event)=>{onUpdate("firstName",event.target.value);onUpdate("customerName",`${event.target.value} ${checkout.lastName}`.trim())}} maxLength={80} placeholder="Tu nombre" /></FieldGroup>
      <FieldGroup><label htmlFor="customer-last-name">Apellido</label><input id="customer-last-name" autoComplete="family-name" value={checkout.lastName} onChange={(event)=>{onUpdate("lastName",event.target.value);onUpdate("customerName",`${checkout.firstName} ${event.target.value}`.trim())}} maxLength={80} placeholder="Tu apellido" /></FieldGroup>
      <FieldGroup><label htmlFor="customer-phone">Teléfono</label><input id="customer-phone" type="tel" autoComplete="tel" value={checkout.phone} onChange={(event)=>onUpdate("phone",event.target.value)} placeholder="351..." /></FieldGroup>
      <FieldGroup><label htmlFor="customer-email">Email (opcional)</label><input id="customer-email" type="email" autoComplete="email" value={checkout.email} onChange={(event)=>onUpdate("email",event.target.value)} /></FieldGroup>
      <FieldGroup><label htmlFor="customer-location">Ubicación (localidad y barrio)</label><input id="customer-location" value={checkout.location} onChange={(event)=>onUpdate("location",event.target.value)} maxLength={300} placeholder="Ej. Córdoba, barrio Centro" /></FieldGroup>
      {(deliveryEnabled || pickupEnabled) && <FieldGroup><label htmlFor="fulfillment">¿Cómo recibís tu pedido?</label><select id="fulfillment" value={checkout.fulfillment} onChange={(event)=>onUpdate("fulfillment",event.target.value as CheckoutData["fulfillment"])}>{pickupEnabled&&<option value="pickup">Retiro en el local</option>}{deliveryEnabled&&<option value="delivery">Envío a domicilio</option>}</select></FieldGroup>}
      {checkout.fulfillment === "delivery" ? <FieldGroup><label htmlFor="delivery-address">Dirección de entrega</label><input id="delivery-address" autoComplete="street-address" value={checkout.address} onChange={(event)=>onUpdate("address",event.target.value)} placeholder="Calle, número, localidad" /></FieldGroup> : <FieldGroup><label htmlFor="pickup-time"><FaClock /> Horario de retiro</label><input id="pickup-time" type="time" value={checkout.pickupTime} onChange={(event)=>onUpdate("pickupTime",event.target.value)} /></FieldGroup>}
      <FieldGroup><label htmlFor="payment-method">Medio de pago al coordinar por WhatsApp</label><select id="payment-method" value={checkout.paymentMethod} onChange={(event)=>onUpdate("paymentMethod",event.target.value)}>{PAYMENT_METHODS.map(method=><option key={method.value} value={method.value}>{method.label}</option>)}</select></FieldGroup>
      <FieldGroup><label htmlFor="checkout-note">Observaciones (opcional)</label><textarea id="checkout-note" value={checkout.note} onChange={(event)=>onUpdate("note",event.target.value)} maxLength={500} placeholder="Aclaraciones para el establecimiento..." /></FieldGroup>
      <TotalRow><span>Total</span><strong>{formatMoney(total)}</strong></TotalRow>
      {error && <Notice role="alert">{error}</Notice>}
      <PrimaryButton type="button" onClick={onPay} disabled={paying || !salesEnabled}><FaCreditCard /> {paying ? "Conectando con Mercado Pago..." : "Pagar con Mercado Pago"}</PrimaryButton>
      <FullWidthSecondaryButton type="button" onClick={onConfirm} disabled={!salesEnabled}><FaWhatsapp /> Enviar pedido por WhatsApp</FullWidthSecondaryButton>
      <FullWidthSecondaryButton type="button" onClick={onBackToCart}><FaArrowLeft /> Volver al carrito</FullWidthSecondaryButton>
    </DialogContent>
  </Dialog>
</Overlay>;
