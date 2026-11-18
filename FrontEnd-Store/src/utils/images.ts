import type { StoreProduct } from "../types/store.ts";
import placeholderImage from "../assets/product-placeholder.svg";

import polloImage from "../assets/categories/cat-pollo.jpg";
import carneImage from "../assets/categories/cat-carne.jpg";
import milanesaImage from "../assets/categories/cat-milanesa.jpg";
import pastasImage from "../assets/categories/cat-pastas.jpg";
import tartasImage from "../assets/categories/cat-tartas.jpg";
import empanadasImage from "../assets/categories/cat-empanadas.jpg";
import pizzaImage from "../assets/categories/cat-pizza.jpg";
import guarnicionesImage from "../assets/categories/cat-guarniciones.jpg";
import sandwichesImage from "../assets/categories/cat-sandwiches.jpg";
import minutasImage from "../assets/categories/cat-minutas.jpg";
import ensaladasImage from "../assets/categories/cat-ensaladas.jpg";
import postresImage from "../assets/categories/cat-postres.jpg";
import bebidasImage from "../assets/categories/cat-bebidas.jpg";
import congeladosImage from "../assets/categories/cat-congelados.jpg";
import panificadosImage from "../assets/categories/cat-panificados.jpg";

export const CATEGORY_IMAGES: Record<string, string> = {
  pollo: polloImage,
  carne: carneImage,
  carnes: carneImage,
  milanesa: milanesaImage,
  milanesas: milanesaImage,
  pastas: pastasImage,
  pasta: pastasImage,
  tartas: tartasImage,
  tarta: tartasImage,
  empanadas: empanadasImage,
  empanada: empanadasImage,
  pizza: pizzaImage,
  pizzas: pizzaImage,
  guarnicion: guarnicionesImage,
  guarniciones: guarnicionesImage,
  sandwich: sandwichesImage,
  sandwiches: sandwichesImage,
  sanguche: sandwichesImage,
  sanguches: sandwichesImage,
  minuta: minutasImage,
  minutas: minutasImage,
  ensalada: ensaladasImage,
  ensaladas: ensaladasImage,
  postre: postresImage,
  postres: postresImage,
  bebida: bebidasImage,
  bebidas: bebidasImage,
  congelado: congeladosImage,
  congelados: congeladosImage,
  panificado: panificadosImage,
  panificados: panificadosImage,
};

const normalizeCategory = (category?: string) =>
  (category || "")
    .trim()
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const imageSource = (value?: string | null) => value?.trim() || null;

export const categoryImage = (category?: string) => {
  const normalized = normalizeCategory(category);
  const match = Object.entries(CATEGORY_IMAGES).find(([term]) =>
    normalized.includes(term),
  );

  return match?.[1] || placeholderImage;
};

export const productImage = (
  product: Pick<StoreProduct, "image" | "category">,
) => imageSource(product.image) || categoryImage(product.category);
