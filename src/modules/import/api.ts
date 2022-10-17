import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import type { RootState } from '../../store';
import type { Item, Plan, PlanPerson, PlanQueryParams, ServiceType, Team } from './types';
import { refreshTokenSelector } from './selectors';
import { refreshPCOToken } from './auth';
import { reset, setToken } from './slice';

interface OneToOneRelationship {
  data: {
    id: number
  }
}

interface RestResponseData<T> {
  type: string,
  id: number,
  attributes: T,
  relationships?: Record<string, OneToOneRelationship>
}

const transformRestResponse = <T>(response: { data: RestResponseData<T>[] }) => response.data.map( st => ({ ...st.attributes, id: st.id }));
const transformSingleRestResponse = <T>(response: { data: RestResponseData<T> }) => ({ ...response.data.attributes, id: response.data.id });


const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.planningcenteronline.com/services/v2/',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).import.auth.access_token;
    headers.set('authorization', `Bearer ${accessToken}`);
    return headers;
  }
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && (result.error.status === 401 || result.error.status === 'FETCH_ERROR')) {
    const refreshToken = refreshTokenSelector(api.getState() as RootState);
    // try to get a new token
    const refreshResult = await refreshPCOToken(refreshToken);
    if (refreshResult.ok) {
      // store the new token
      const json = await refreshResult.json();
      api.dispatch(setToken(json));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(reset());
    }
  }
  return result;
};


export const PlanningCenterAPI = createApi({
  reducerPath: 'planningCenter',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getServiceTypes: builder.query<ServiceType[], void>({
      query: () => ({ url: 'service_types/' }),
      transformResponse: transformRestResponse<ServiceType>
    }),
    getServiceTypeTeams: builder.query<Team[], string>({
      query: (serviceTypeID) => ({ url: `service_types/${serviceTypeID}/teams` }),
      transformResponse: transformRestResponse<Team>
    }),
    getPlansOfType: builder.query<Plan[], string>({
      query: (serviceTypeID) => ({ url: `service_types/${serviceTypeID}/plans?filter=future` }),
      transformResponse: transformRestResponse<Plan>
    }),
    getPlan: builder.query<Plan, PlanQueryParams>({
      query: ({ serviceTypeID, planID }) => ({ url: `service_types/${serviceTypeID}/plans/${planID}` }),
      transformResponse: transformSingleRestResponse<Plan>
    }),
    getPlanItems: builder.query<Item[], PlanQueryParams>({
      query: ({ serviceTypeID, planID }) => ({ url: `service_types/${serviceTypeID}/plans/${planID}/items` }),
      transformResponse: transformRestResponse<Item>
    }),
    getPlanPeople: builder.query<PlanPerson[], PlanQueryParams>({
      query: ({ serviceTypeID, planID }) => ({ url: `service_types/${serviceTypeID}/plans/${planID}/team_members`, params: { include: 'team' } }),
      transformResponse: (response: { data: RestResponseData<PlanPerson>[], included: RestResponseData<Team>[] }) => {
        const teamMap: Record<number, Team> = Object.fromEntries(
          response.included.map(t => ([t.id, { ...t.attributes, id: t.id }]))
        );
        return response.data.map(
          pp => ({
            ...pp.attributes,
            id: pp.id,
            team: pp.relationships?.team ? teamMap[pp.relationships.team.data.id] : undefined
          })
        );
      }
    })
  })
});

export const {
  useGetServiceTypesQuery,
  useGetServiceTypeTeamsQuery,
  useGetPlansOfTypeQuery,
  useGetPlanQuery,
  useGetPlanItemsQuery,
  useGetPlanPeopleQuery
} = PlanningCenterAPI;
