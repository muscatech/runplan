import { createContext, useContext } from "react";
import type { Plan } from "./interfaces";

const planContext = createContext<Plan | undefined>(undefined);

export const PlanContextProvider = planContext.Provider;

export const usePlan = (): Plan | undefined => useContext(planContext);
