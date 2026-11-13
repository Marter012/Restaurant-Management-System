import { useEffect, useState } from "react";
import axios from "axios";
import { FaTimes, FaUserCircle, FaReceipt, FaSignOutAlt } from "react-icons/fa";
import styled from "styled-components";
import { accessCustomer, getCustomerOrders } from "../../services/publicApi.ts";
import type { CustomerProfile } from "../../services/publicApi.ts";
import { money } from "../../utils/money.ts";
import { clearCustomerSession, readCustomerSession, saveCustomerSession } from "../../utils/customerSession.ts";

const Shade = styled.div`position:fixed;inset:0;z-index:130;display:grid;place-items:center;padding:16px;background:#14201988;backdrop-filter:blur(4px)`;
const Panel = styled.section`width:min(100%,480px);max-height:85dvh;overflow:auto;border-radius:22px;background:#fffefa;padding:20px;box-shadow:0 24px 70px #0003;header{display:flex;justify-content:space-between;align-items:center}h2{margin:0;color:#182b25;font-size:1.2rem}header button{border:0;background:transparent;font-size:1.1rem}p{color:#788078;font-size:.84rem;line-height:1.5}label{display:grid;gap:5px;margin:11px 0;color:#39443b;font-size:.78rem;font-weight:800}input{height:43px;border:1px solid #e5dfd3;border-radius:11px;padding:0 12px;width:100%;box-sizing:border-box}button.primary{width:100%;height:45px;border:0;border-radius:12px;background:#182b25;color:white;font-weight:850}.order{padding:13px 0;border-bottom:1px solid #e5dfd3;display:flex;gap:10px;justify-content:space-between}.order small{display:block;color:#788078;margin-top:4px}.logout{border:0;background:transparent;color:#a33;font-weight:800;margin-top:12px}`;
type Order={order_number:number;created_at:string;total:number;items:{name:string;quantity:number}[]};
type Props={onClose:()=>void;onToast:(message:string,kind:"success"|"error")=>void;onAuthenticated?:(profile:CustomerProfile)=>void};

export function CustomerAccount({onClose,onToast,onAuthenticated}:Props){
  const [session,setSession]=useState(readCustomerSession);
  const [first,setFirst]=useState("");const [last,setLast]=useState("");const [phone,setPhone]=useState("");const [location,setLocation]=useState("");
  const [orders,setOrders]=useState<Order[]>([]);const [busy,setBusy]=useState(false);
  useEffect(()=>{
    if(!session) return;
    let active = true;
    getCustomerOrders(session.token)
      .then((rows)=>{ if(active) setOrders(rows); })
      .catch((error: unknown)=>{
        if(!active) return;
        const status = axios.isAxiosError(error) ? error.response?.status : undefined;
        if(status === 401){
          clearCustomerSession();
          setSession(null);
          setOrders([]);
          onToast("Tu sesión venció. Iniciá sesión nuevamente.","error");
          return;
        }
        // Un fallo al consultar el historial no invalida una sesión autenticada.
        onToast("No pudimos cargar tu historial. Tu sesión sigue activa; intentá actualizarlo.","error");
      });
    return ()=>{ active = false; };
  },[session?.token]);
  useEffect(()=>{if(!session)return;const remaining=session.expiresAt-Date.now();const timer=window.setTimeout(()=>{clearCustomerSession();setSession(null);setOrders([]);onToast("Tu sesión se cerró después de 10 minutos.","error")},Math.max(0,remaining));return()=>window.clearTimeout(timer)},[session?.expiresAt]);
  const submit=async()=>{setBusy(true);try{const profile={first_name:first.trim(),last_name:last.trim(),phone:phone.trim(),location:location.trim()};const result=await accessCustomer(profile);const customer={first_name:result.first_name,last_name:result.last_name,phone:result.phone,location:result.location || location.trim()};const next=saveCustomerSession(result.token,customer,result.expires_in);setSession(next);onAuthenticated?.(customer);onToast("Sesión iniciada correctamente.","success")}catch(e){onToast(e instanceof Error?e.message:"No pudimos iniciar tu sesión.","error")}finally{setBusy(false)}};
  const logout=()=>{clearCustomerSession();setSession(null);setOrders([]);onToast("Cerraste sesión.","success")};
  return <Shade onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><Panel><header><h2><FaUserCircle/> Mi cuenta</h2><button onClick={onClose} aria-label="Cerrar"><FaTimes/></button></header>{!session?<><p>Ingresá tus datos para crear tu cuenta o recuperar tu sesión. Tu sesión dura 10 minutos.</p><label>Nombre<input value={first} onChange={e=>setFirst(e.target.value)} autoComplete="given-name"/></label><label>Apellido<input value={last} onChange={e=>setLast(e.target.value)} autoComplete="family-name"/></label><label>Celular<input value={phone} onChange={e=>setPhone(e.target.value)} autoComplete="tel" placeholder="Ej. 351..."/></label><label>Ubicación (localidad y barrio)<input value={location} onChange={e=>setLocation(e.target.value)} autoComplete="address-level2" maxLength={300} placeholder="Ej. Córdoba, barrio Centro"/></label><button className="primary" disabled={busy||!first.trim()||!last.trim()||phone.trim().length<6||!location.trim()} onClick={submit}>{busy?"Ingresando...":"Continuar"}</button></>:<><p>Hola, {session.customer.first_name}. Ubicación: {session.customer.location || "Sin informar"}. Estas son tus compras pagadas.</p>{orders.length?orders.map(o=><div className="order" key={o.order_number}><div><strong><FaReceipt/> Pedido #{o.order_number}</strong><small>{new Date(o.created_at).toLocaleString("es-AR")} · {o.items.map(i=>`${i.quantity} × ${i.name}`).join(", ")}</small></div><strong>{money(o.total)}</strong></div>):<p>Todavía no tenés compras pagadas registradas.</p>}<button className="logout" onClick={logout}><FaSignOutAlt/> Cerrar sesión</button></>}</Panel></Shade>
}
