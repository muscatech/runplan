import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { AuthToken } from "./types";

export const useCurrentStepSelector = () => useSelector((state: RootState) => state.import.currentStep);

export const useAuthTokenSelector = () : AuthToken | null => useSelector((state: RootState) => state.import.auth);

export const refreshTokenSelector = (state: RootState) => state.import.auth.refresh_token;

export const useSelectedServiceTypeSelector = () => useSelector((state: RootState) => state.import.selectedServiceType);

export const useSelectedPlanIDSelector = () => useSelector((state: RootState) => state.import.selectedPlanID);
