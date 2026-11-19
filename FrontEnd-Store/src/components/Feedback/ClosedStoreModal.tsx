import { Clock, Storefront, Check, CheckCircle } from "../../utils/icons.ts";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed; inset: 0; z-index: 220; display: grid; place-items: center;
  padding: 16px; background: rgba(18, 28, 22, .48); backdrop-filter: blur(4px);
`;
const Box = styled.div`
  width: min(100%, 330px); padding: 22px 21px 19px; border: 1px solid #ffffffb8;
  border-radius: 20px; background: #fffefa; text-align: center;
  box-shadow: 0 22px 70px #0003; animation: status-in .22s ease-out;
  @keyframes status-in { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
  .icon { width: 49px; height: 49px; margin: 0 auto 12px; display: grid; place-items: center; border-radius: 16px; background: #fff0dc; color: #a96b16; }
  h2 { margin: 0 0 7px; color: #202923; font-size: 1.12rem; }
  p { margin: 0; color: #747c73; font-size: .82rem; line-height: 1.5; }
  .tag { display: inline-flex; gap: 7px; align-items: center; margin: 13px 0 15px; padding: 7px 10px; border-radius: 30px; background: #f3f0e8; color: #626b60; font-size: .7rem; font-weight: 800; }
  button { display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:43px;border:0;border-radius:12px;background:#182b25;color:#fff;font-size:.82rem;font-weight:850;cursor:pointer; }
`;

export function ClosedStoreModal({ isOpen, canOrder, storeName, onClose }: { isOpen: boolean; canOrder: boolean; storeName: string; onClose: () => void }) {
  return <Backdrop>
    <Box role="dialog" aria-modal="true" aria-labelledby="store-status-title">
      <div className="icon" style={{ background: isOpen ? "#e8f5eb" : "#fff0dc", color: isOpen ? "#237443" : "#a96b16" }}>
        {isOpen ? <CheckCircle size={25}/> : <Clock size={25}/>}
      </div>
      <h2 id="store-status-title">{isOpen ? "Negocio abierto" : "Negocio cerrado"}</h2>
      <p>{isOpen ? (canOrder ? `${storeName} está atendiendo. Podés explorar el menú y realizar tu pedido.` : `${storeName} está abierto, pero los pedidos online no están habilitados en este momento.`) : `${storeName} está cerrado por el momento. Podés explorar el menú, pero las compras estarán pausadas hasta que vuelva a abrir.`}</p>
      <div className="tag"><Storefront />{isOpen ? (canOrder ? "Estamos atendiendo" : "Pedidos online no disponibles") : "Catálogo disponible · Compras pausadas"}</div>
      <button type="button" onClick={onClose}><Check />{isOpen ? "Explorar el menú" : "Entendido, quiero mirar"}</button>
    </Box>
  </Backdrop>;
}
