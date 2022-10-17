import { RoleCategory } from "../roles";

export enum ImportStep {
  NOT_STARTED = 0,
  BEGIN = 1,
  AUTH_TOKEN_OBTAINED = 2,
  SERVICE_TYPE_SELECTED = 3,
  PLAN_SELECTED = 4,
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
  dates: string,
  sort_date: string,
  title: string
}

export interface PlanQueryParams {
  serviceTypeID: number,
  planID: number
}

export enum ItemType {
  Item = 'item',
  Song = 'song',
  Header = 'header',
  Media = 'media'
}

export interface Item {
  id: number,
  title: string,
  description: string | null,
  key_name: string | null,
  item_type: ItemType
}

export interface Team {
  id: number,
  name: string
}

type PlanPersonStatus = 'C' | 'U' | 'D';

export interface PlanPerson {
  id: number,
  name: string,
  status: PlanPersonStatus,
  team_position_name: string,
  team?: {
    id: number,
    name: string
  }
}

export type ItemTypeMapping = Record<ItemType, string>;

export type TeamCategoryMapping = Record<string, RoleCategory>;
