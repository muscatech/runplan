import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../store';
import type { Plan, ServiceType } from './types';

interface RestResponseData<T> {
  type: string,
  id: number,
  attributes: T
}

const transformRestResponse = <T>(response: { data: RestResponseData<T>[] }) => response.data.map( st => ({ ...st.attributes, id: st.id }));

export const PlanningCenterAPI = createApi({
  reducerPath: 'planningCenter',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.planningcenteronline.com/services/v2/',
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).import.auth.access_token;
      headers.set('authorization', `Bearer ${accessToken}`);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getServiceTypes: builder.query<ServiceType[], void>({
      query: () => ({ url: 'service_types/' }),
      transformResponse: transformRestResponse<ServiceType>
    }),
    getPlansOfType: builder.query<Plan[], string>({
      query: (serviceTypeID) => ({ url: `service_types/${serviceTypeID}/plans?filter=future` }),
      transformResponse: transformRestResponse<Plan>
    })
  })
});

export const {
  useGetServiceTypesQuery,
  useGetPlansOfTypeQuery
} = PlanningCenterAPI;
