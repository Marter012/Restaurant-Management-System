import { FaArrowsRotate, FaCircleInfo } from "react-icons/fa6";
import styled from "styled-components";

const Backdrop = styled.div`
  position:fixed;inset:0;z-index:140;display:grid;place-items:center;padding:18px;
  background:rgba(24,31,26,.58);backdrop-filter:blur(5px);
`;
const Dialog = styled.div`
  width:min(100%,390px);padding:25px 23px 22px;border:1px solid var(--app-border);
  border-radius:23px;background:var(--app-surface);text-align:center;
  box-shadow:0 24px 80px rgba(0,0,0,.25);
  .icon{width:58px;height:58px;margin:0 auto 14px;display:grid;place-items:center;border-radius:19px;background:color-mix(in srgb,var(--app-accent) 16%,white);color:var(--app-primary);font-size:1.35rem}
  h2{margin:0 0 8px;color:var(--app-ink);font-size:1.2rem}
  p{margin:0;color:var(--app-muted);font-size:.9rem;line-height:1.55}
  .hint{display:flex;align-items:flex-start;gap:8px;margin:15px 0 18px;padding:11px;border-radius:12px;background:var(--app-canvas);color:var(--app-muted);font-size:.76rem;text-align:left}
  button{width:100%;min-height:46px;border:0;border-radius:13px;background:var(--app-primary);color:white;font-weight:850;cursor:pointer}
`;
export function RefreshStoreModal({onRefresh}:{onRefresh:()=>void}){
  return <Backdrop><Dialog role="dialog" aria-modal="true" aria-labelledby="refresh-store-title">
    <div className="icon"><FaArrowsRotate/></div>
    <h2 id="refresh-store-title">Actualizá la tienda</h2>
    <p>El comercio modificó la configuración de disponibilidad de stock.</p>
    <div className="hint"><FaCircleInfo/> Para mostrar correctamente los productos y sus condiciones de compra, necesitás actualizar esta página.</div>
    <button type="button" onClick={onRefresh}>Actualizar página</button>
  </Dialog></Backdrop>;
}
