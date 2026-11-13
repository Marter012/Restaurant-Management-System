import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrandContainer } from "./BrandStyles.ts";
import { getEstablishmentAPI } from "../../services/settingsService.ts";
import { setEstablishmentName } from "../../store/slices/establishmentSlice.ts";
import type { AppDispatch, RootState } from "../../store/store.ts";

const Brand = () => {
  const dispatch = useDispatch<AppDispatch>();
  const establishmentName = useSelector(
    (state: RootState) => state.establishment.name,
  );

  useEffect(() => {
    let active = true;

    const loadEstablishmentName = async () => {
      try {
        const establishment = await getEstablishmentAPI();
        if (active && establishment.name?.trim()) {
          dispatch(setEstablishmentName(establishment.name));
        }
      } catch (error) {
        // Se conserva el nombre predeterminado si el backend no está disponible.
        console.error("No se pudo cargar el nombre del establecimiento:", error);
      }
    };

    void loadEstablishmentName();
    return () => {
      active = false;
    };
  }, [dispatch]);

  return (
    <BrandContainer>
      <div className="brand-logo">BS</div>

      <div className="brand-info">
        <h2 title={establishmentName}>{establishmentName}</h2>
        <span>Panel de administración</span>
      </div>
    </BrandContainer>
  );
};

export default Brand;
