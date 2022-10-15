export enum ImportStep {
  NOT_STARTED = 0,
  BEGIN = 1,
  AUTH_TOKEN_OBTAINED = 2,
  SERVICE_TYPE_SELECTED = 3
}

export interface AuthToken {
  access_token: string,
  token_type: string,
  expires_in: number,
  refresh_token: string,
  scope: string,
  created_at: number
}

export interface ImportState {
  auth: AuthToken | null,
  currentStep: ImportStep,
  selectedServiceType: number | null,
  selectedPlanID: number | null,
}

export interface ServiceType {
  id: number,
  name: string
}

export interface Plan {
  id: number,
  items_count: number,
  dates: string
}
