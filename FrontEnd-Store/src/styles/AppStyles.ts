import { FaArrowLeft } from "react-icons/fa";
import styled, { keyframes } from "styled-components";

const rise = keyframes`from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); }`;

export const Page = styled.div`min-height:100vh; color:var(--app-ink);`;
export const Header = styled.header`
  position:sticky; top:0; z-index:20; display:flex; align-items:center; justify-content:space-between; gap:18px;
  padding:14px max(22px, calc((100vw - 1180px)/2)); background:rgba(255,249,240,.94); backdrop-filter:blur(14px);
  border-bottom:1px solid var(--app-border);
`;
export const Brand = styled.a`display:flex; align-items:center; gap:11px; min-width:0; font-weight:900; color:var(--app-primary); font-size:1.08rem; letter-spacing:-.03em;`;
export const BrandMark = styled.span`display:grid; place-items:center; width:42px; height:42px; flex:0 0 auto; border-radius:14px; background:var(--app-primary); color:#fff; font-size:1.2rem;`;
export const HeaderActions = styled.div`display:flex; align-items:center; gap:10px;`;
export const CartButton = styled.button`
  display:flex; align-items:center; gap:9px; min-height:44px; padding:0 15px; border:0; border-radius:999px;
  background:var(--app-primary); color:#fff; font-weight:800; box-shadow:0 7px 18px rgba(74,40,24,.16);
  &:hover:not(:disabled){background:var(--app-primary-hover); transform:translateY(-1px);}
`;
export const CartCount = styled.span`display:grid; place-items:center; width:23px; height:23px; border-radius:50%; background:var(--app-accent); color:#fff; font-size:.75rem;`;
export const Hero = styled.section`
  position:relative; overflow:hidden; max-width:1180px; margin:28px auto 22px; padding:clamp(28px,6vw,62px);
  border-radius:30px; background:linear-gradient(115deg,rgba(55,28,16,.94),rgba(92,53,30,.82)), radial-gradient(circle at 85% 20%,#B7834E,transparent 35%);
  color:#fff; box-shadow:var(--app-shadow);
  &::after{content:""; position:absolute; width:310px; height:310px; border:1px solid rgba(255,255,255,.14); border-radius:50%; right:-90px; top:-115px; box-shadow:0 0 0 35px rgba(255,255,255,.035),0 0 0 75px rgba(255,255,255,.025);}
  @media(max-width:1220px){margin:20px 18px;}
`;
export const HeroContent = styled.div`position:relative; z-index:1; max-width:650px;`;
export const Eyebrow = styled.span`display:inline-flex; padding:7px 11px; border:1px solid rgba(255,255,255,.25); border-radius:99px; color:#F3D9B8; font-size:.72rem; font-weight:800; letter-spacing:.12em; text-transform:uppercase;`;
export const HeroTitle = styled.h1`margin:17px 0 10px; color:#fff; font-size:clamp(2rem,5vw,3.7rem); line-height:1.03; letter-spacing:-.06em;`;
export const HeroText = styled.p`max-width:530px; margin:0; color:rgba(255,255,255,.82); font-size:clamp(.95rem,1.8vw,1.1rem); line-height:1.65;`;
export const Content = styled.main`max-width:1180px; margin:0 auto; padding:8px 18px 90px;`;
export const CatalogTop = styled.div`display:flex; align-items:end; justify-content:space-between; gap:18px; margin:30px 0 17px; @media(max-width:650px){align-items:stretch; flex-direction:column;}`;
export const SectionTitle = styled.h2`margin:0; color:var(--app-primary); font-size:clamp(1.45rem,3vw,2rem); letter-spacing:-.045em;`;
export const SectionSubtitle = styled.p`margin:5px 0 0; color:var(--app-muted); font-size:.9rem;`;
export const SearchBox = styled.label`display:flex; align-items:center; gap:9px; width:min(100%,330px); min-height:45px; padding:0 14px; border:1px solid var(--app-border); border-radius:13px; background:var(--app-surface-strong); color:var(--app-muted); input{width:100%; min-width:0; border:0; outline:0; background:transparent; color:var(--app-ink);}`;
export const CategoryRail = styled.nav`display:flex; gap:9px; overflow-x:auto; padding:2px 0 13px; scrollbar-width:thin;`;
export const CategoryButton = styled.button<{ $active:boolean }>`flex:0 0 auto; min-height:38px; padding:0 15px; border:1px solid ${({$active})=>$active?"var(--app-primary)":"var(--app-border)"}; border-radius:999px; background:${({$active})=>$active?"var(--app-primary)":"var(--app-surface)"}; color:${({$active})=> $active?"#fff":"var(--app-muted)"}; font-size:.83rem; font-weight:750;`;
export const ProductGrid = styled.section`display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:17px; @media(max-width:980px){grid-template-columns:repeat(3,minmax(0,1fr));} @media(max-width:700px){grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px;} @media(max-width:390px){grid-template-columns:1fr;}`;
export const ProductCard = styled.article`overflow:hidden; display:flex; flex-direction:column; min-width:0; border:1px solid var(--app-border); border-radius:19px; background:var(--app-surface); box-shadow:0 5px 18px rgba(74,40,24,.045); animation:${rise} .35s ease both; transition:transform .2s,box-shadow .2s; &:hover{transform:translateY(-3px);box-shadow:var(--app-shadow);}`;
export const ProductImageWrap = styled.div`position:relative; aspect-ratio:1.28/1; overflow:hidden; background:#EBDCC8; img{width:100%;height:100%;object-fit:cover;} `;
export const DiscountBadge = styled.span`position:absolute; top:11px; left:11px; padding:6px 9px; border-radius:99px; background:var(--app-danger); color:#fff; font-size:.7rem; font-weight:900;`;
export const ProductBody = styled.div`display:flex; flex:1; flex-direction:column; gap:8px; padding:14px; @media(max-width:520px){padding:11px;}`;
export const ProductCategory = styled.span`color:var(--app-accent); font-size:.69rem; font-weight:900; letter-spacing:.09em; text-transform:uppercase;`;
export const ProductName = styled.h3`margin:0; color:var(--app-primary); font-size:1.02rem; line-height:1.25; letter-spacing:-.025em;`;
export const ProductDescription = styled.p`display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; min-height:2.7em; margin:0; color:var(--app-muted); font-size:.8rem; line-height:1.4;`;
export const PriceRow = styled.div`display:flex; align-items:baseline; gap:8px; flex-wrap:wrap; margin-top:auto;`;
export const Price = styled.strong`color:var(--app-primary); font-size:1.12rem; font-weight:900;`;
export const OldPrice = styled.span`color:#9B8A7A; font-size:.78rem; text-decoration:line-through;`;
export const AddButton = styled.button`display:flex; align-items:center; justify-content:center; gap:8px; width:100%; min-height:42px; margin-top:4px; border:0; border-radius:12px; background:var(--app-primary); color:#fff; font-size:.82rem; font-weight:850; &:hover:not(:disabled){background:var(--app-primary-hover);}`;
export const EmptyState = styled.div`grid-column:1/-1; display:grid; place-items:center; gap:8px; min-height:220px; padding:30px; border:1px dashed var(--app-border); border-radius:20px; color:var(--app-muted); text-align:center; strong{color:var(--app-primary);}`;
export const Footer = styled.footer`padding:24px 18px; border-top:1px solid var(--app-border); background:var(--app-surface); color:var(--app-muted); text-align:center; font-size:.8rem;`;
export const Overlay = styled.div`position:fixed; inset:0; z-index:50; display:flex; align-items:center; justify-content:center; padding:18px; background:rgba(30,18,11,.58); backdrop-filter:blur(4px);`;
export const Dialog = styled.div`width:min(100%,560px); max-height:min(90dvh,820px); overflow:auto; border-radius:23px; background:var(--app-surface); box-shadow:0 25px 80px rgba(0,0,0,.25);`;
export const DialogHeader = styled.div`position:sticky; top:0; z-index:1; display:flex; align-items:center; justify-content:space-between; gap:15px; padding:17px 20px; border-bottom:1px solid var(--app-border); background:var(--app-surface); h3{margin:0;color:var(--app-primary);font-size:1.15rem;}`;
export const IconButton = styled.button`display:grid; place-items:center; width:38px;height:38px;border:1px solid var(--app-border);border-radius:50%;background:var(--app-surface-strong);color:var(--app-primary);font-size:1.05rem;`;
export const DialogContent = styled.div`padding:20px;`;
export const DialogProductImage = styled.img`width:100%;max-height:230px;object-fit:cover;border-radius:15px;background:#EBDCC8;`;
export const FieldGroup = styled.div`display:flex;flex-direction:column;gap:7px;margin:15px 0; label{color:var(--app-primary);font-size:.83rem;font-weight:850;} input,select,textarea{width:100%;min-height:44px;padding:10px 12px;border:1px solid var(--app-border);border-radius:11px;background:#fff;color:var(--app-ink);} textarea{min-height:85px;resize:vertical;}`;
export const OptionList = styled.div`display:grid;gap:9px;`;
export const OptionRow = styled.label`display:flex;align-items:center;gap:10px;padding:11px 12px;border:1px solid var(--app-border);border-radius:11px;background:#fff;color:var(--app-ink);font-size:.86rem;input{accent-color:var(--app-primary);}`;
export const PrimaryButton = styled.button`display:flex;align-items:center;justify-content:center;gap:9px;width:100%;min-height:48px;padding:10px 16px;border:0;border-radius:13px;background:var(--app-primary);color:#fff;font-weight:900;&:hover:not(:disabled){background:var(--app-primary-hover);}`;
export const SecondaryButton = styled.button`display:flex;align-items:center;justify-content:center;gap:8px;min-height:40px;padding:8px 13px;border:1px solid var(--app-border);border-radius:11px;background:#fff;color:var(--app-primary);font-weight:800;`;
export const CartDrawer = styled.aside`position:fixed;z-index:60;top:0;right:0;display:flex;flex-direction:column;width:min(100%,440px);height:100dvh;background:var(--app-surface);box-shadow:-18px 0 60px rgba(0,0,0,.2);`;
export const CartItems = styled.div`flex:1;overflow:auto;padding:14px 18px;`;
export const CartItemRow = styled.div`display:grid;grid-template-columns:65px minmax(0,1fr) auto;gap:11px;padding:13px 0;border-bottom:1px solid var(--app-border);img{width:65px;height:65px;object-fit:cover;border-radius:12px;background:#EBDCC8;} strong{display:block;color:var(--app-primary);font-size:.86rem;} small{display:block;margin-top:4px;color:var(--app-muted);font-size:.72rem;line-height:1.4;}`;
export const QuantityControl = styled.div`display:flex;align-items:center;gap:8px;margin-top:8px;button{display:grid;place-items:center;width:27px;height:27px;border:1px solid var(--app-border);border-radius:8px;background:#fff;color:var(--app-primary);} span{min-width:15px;text-align:center;font-size:.8rem;font-weight:850;}`;
export const CartFooter = styled.div`padding:17px 18px calc(17px + env(safe-area-inset-bottom));border-top:1px solid var(--app-border);background:var(--app-surface);`;
export const TotalRow = styled.div`display:flex;justify-content:space-between;gap:10px;margin-bottom:14px;color:var(--app-muted);font-size:.9rem;strong{color:var(--app-primary);font-size:1.25rem;}`;
export const Notice = styled.div`padding:13px 14px;border:1px solid var(--app-border);border-radius:12px;background:#fff5e7;color:var(--app-warning);font-size:.82rem;line-height:1.5;`;
export const Loading = styled.div`display:grid;place-items:center;min-height:55vh;padding:30px;color:var(--app-muted);text-align:center;`;
export const ClosedScreen = styled(Loading)`strong{display:block;color:var(--app-primary);font-size:1.4rem;}p{max-width:450px;line-height:1.6;}`;

export const ProductImagePlaceholder = styled.div`
  display:grid; place-items:center; height:100%; color:var(--app-muted);
`;
export const CartImagePlaceholder = styled.div`
  display:grid; place-items:center; width:65px; height:65px; border-radius:12px;
  background:#EBDCC8; color:var(--app-muted);
`;
export const FullWidthSecondaryButton = styled(SecondaryButton)`width:100%; margin-top:9px;`;
export const InlineNotice = styled.div`margin-top:10px; text-align:center; font-size:.72rem; color:var(--app-muted);`;
export const NoticeIcon = styled.span`display:inline-flex; align-items:center; gap:7px;`;
export const ForwardArrowIcon = styled(FaArrowLeft)`transform:rotate(180deg);`;
