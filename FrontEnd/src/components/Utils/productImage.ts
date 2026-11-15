/* Imágenes locales de respaldo por categoría.
 * La fotografía propia del producto siempre tiene prioridad.
 */
import polloImage from "../../assets/images/categories/cat-pollo.jpg";
import carneImage from "../../assets/images/categories/cat-carne.jpg";
import milanesaImage from "../../assets/images/categories/cat-milanesa.jpg";
import pastasImage from "../../assets/images/categories/cat-pastas.jpg";
import tartasImage from "../../assets/images/categories/cat-tartas.jpg";
import empanadasImage from "../../assets/images/categories/cat-empanadas.jpg";
import pizzaImage from "../../assets/images/categories/cat-pizza.jpg";
import guarnicionesImage from "../../assets/images/categories/cat-guarniciones.jpg";
import sandwichesImage from "../../assets/images/categories/cat-sandwiches.jpg";
import minutasImage from "../../assets/images/categories/cat-minutas.jpg";
import ensaladasImage from "../../assets/images/categories/cat-ensaladas.jpg";
import postresImage from "../../assets/images/categories/cat-postres.jpg";
import bebidasImage from "../../assets/images/categories/cat-bebidas.jpg";
import congeladosImage from "../../assets/images/categories/cat-congelados.jpg";
import panificadosImage from "../../assets/images/categories/cat-panificados.jpg";

const CATEGORY_IMAGES: Record<string, string> = {
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

export const getProductFallbackImage = (category?: string) => {
  const normalized = normalizeCategory(category);
  const match = Object.entries(CATEGORY_IMAGES).find(([key]) =>
    normalized.includes(key),
  );

  return match?.[1] || "/images/Products.png";
};

export const getProductImage = (image?: string | null, category?: string) =>
  image?.trim() || getProductFallbackImage(category);
