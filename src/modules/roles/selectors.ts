import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const allRolesSelector = () => useSelector((state: RootState) => state.roles);
