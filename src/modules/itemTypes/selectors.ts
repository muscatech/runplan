import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export const allItemTypes = () => useSelector(
  (state: RootState) => state.itemTypes
);
