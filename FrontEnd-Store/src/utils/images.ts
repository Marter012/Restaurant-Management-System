import type { StoreProduct } from "../types/store.ts";
export const CATEGORY_IMAGES: Record<string,string> = {
 hamburguesa:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=85",
 carne:"https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=900&q=85",
 carnes:"https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=900&q=85",
 sanguche:"https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=900&q=85",
 sandwich:"https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=900&q=85",
 sanguches:"https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=900&q=85",
 pizza:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&q=85",
 lomito:"https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=900&q=85",
 empanada:"https://images.pexels.com/photos/22764499/pexels-photo-22764499.jpeg?auto=compress&cs=tinysrgb&w=900",
 casera:"https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=85",
 adicional:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=900&q=85",
 papa:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=900&q=85",
 ensalada:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=85",
};
export const imageSource=(value?:string|null)=>value?.trim()||null;
export const categoryImage=(category?:string)=>{const key=(category||"").toLocaleLowerCase("es");const match=Object.entries(CATEGORY_IMAGES).find(([term])=>key.includes(term));return match?.[1]||"https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=85";};
export const productImage=(product:Pick<StoreProduct,"image"|"category">)=>imageSource(product.image)||categoryImage(product.category);
