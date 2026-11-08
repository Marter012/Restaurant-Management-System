import { useEffect } from "react";
import {
  setProductError,
  setProductLoading,
  setProducts,
} from "../../store/slices/productSlice.ts";
import Brand from "../Brand/Brand.tsx";
import CashStatus from "../CashStatus/CashStatus.tsx";
import Navigation from "../Navigation/Nativation.tsx";
import { NavBarContainer } from "./NavBarStyles";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store.ts";
import { getProductsAPI } from "../../services/productService.ts";
import {
  setOrderError,
  setOrderLoading,
  setOrders,
} from "../../store/slices/orderSlice.ts";
import { getOrdersAPI } from "../../services/orderService.ts";
import {
  setCashRegisterError,
  setCashRegisterLoading,
  setCashRegisters,
} from "../../store/slices/cashRegisterSlice.ts";
import { getCashRegistersAPI } from "../../services/cashRegisterService.ts";
import {
  setCashMovements,
  setCashMovemenvtError,
  setCashMovemenvtLoading,
} from "../../store/slices/cashMovementSlice.ts";
import { getCashMovementsAPI } from "../../services/cashMovementService.ts";
import {
  setPromotionError,
  setPromotionLoading,
  setPromotions,
} from "../../store/slices/promotionSlice.ts";
import { getPromotionsAPI } from "../../services/promotionService.ts";

const NavBar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { products } = useSelector((state: RootState) => state.products);
  const { orders } = useSelector((state: RootState) => state.orders);
  const { cashRegister } = useSelector(
    (state: RootState) => state.cashRegister,
  );
  const { cashMovements } = useSelector(
    (state: RootState) => state.cashMovement,
  );
  const { promotions } = useSelector((state: RootState) => state.promotion);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        dispatch(setProductLoading(true));
        dispatch(setProductError(null));

        const data = await getProductsAPI();

        dispatch(setProducts(data));
      } catch (error) {
        console.error("Error cargando productos:", error);

        dispatch(setProductError("No se pudieron cargar los productos"));
      } finally {
        dispatch(setProductLoading(false));
      }
    };

    if (products.length === 0) {
      loadProducts();
    }

    const LoadOrders = async () => {
      try {
        dispatch(setOrderLoading(true));
        dispatch(setOrderError(null));
        const data = await getOrdersAPI();
        dispatch(setOrders(data));
      } catch (error) {
        console.error("Error cargando ordenes:", error);
        dispatch(setOrderError("No se pudieron cargar las ordenes"));
      } finally {
        dispatch(setOrderLoading(false));
      }
    };

    if (orders.length === 0) {
      LoadOrders();
    }

    const loadCashRegister = async () => {
      try {
        dispatch(setCashRegisterLoading(true));
        dispatch(setCashRegisterError(null));
        const data = await getCashRegistersAPI();
        dispatch(setCashRegisters(data));
      } catch (error) {
        console.error("Error cargando caja registradora:", error);
        dispatch(
          setCashRegisterError("No se pudo cargar la caja registradora"),
        );
      } finally {
        dispatch(setCashRegisterLoading(false));
      }
    };

    if (cashRegister.length === 0) {
      loadCashRegister();
    }
    const loadCashMoviment = async () => {
      try {
        dispatch(setCashMovemenvtLoading(true));
        dispatch(setCashMovemenvtError(null));
        const data = await getCashMovementsAPI();
        dispatch(setCashMovements(data));
      } catch (error) {
        console.error(
          "Error cargando movimientos de la caja registradora:",
          error,
        );
        dispatch(
          setCashMovemenvtError(
            "No se pudo cargar los movimientos de la caja registradora",
          ),
        );
      } finally {
        dispatch(setCashMovemenvtLoading(false));
      }
    };

    if (cashMovements.length === 0) {
      loadCashMoviment();
    }
    const loadPromotions = async () => {
      try {
        dispatch(setPromotionLoading(true));
        dispatch(setPromotionError(null));
        const data = await getPromotionsAPI();
        dispatch(setPromotions(data));
      } catch (error) {
        console.error("Error cargando las promociones:", error);
        dispatch(setPromotionError("No se pudo cargar las promociones"));
      } finally {
        dispatch(setPromotionLoading(false));
      }
    };

    if (promotions.length === 0) {
      loadPromotions();
    }
  }, [dispatch, products.length, orders.length, cashRegister.length]);
  return (
    <NavBarContainer>
      <Brand />

      <CashStatus />

      <Navigation />
    </NavBarContainer>
  );
};

export default NavBar;
