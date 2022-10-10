import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { AuthToken } from "./types";

export const useCurrentStepSelector = () => useSelector((state: RootState) => state.import.currentStep);

export const useAuthTokenSelector = () : AuthToken | null => useSelector((state: RootState) => state.import.auth);
