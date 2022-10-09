import { api } from '.';
import { sanitize } from '../hooks';

interface QueryArguments {
  filtersKey?: string[];
  ENDPOINT?: string | null;
  queryParameters?: Record<string, unknown>;
}

interface ReturnType {
  list?: string[];
  empty: boolean;
  count_per?: { query?: number };
}

export const cardsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCards: builder.query<ReturnType, Record<string, unknown>>({
      query: ({ filtersKey = [], ...queryParameters }: QueryArguments) => {
        const payload =
          queryParameters ||
          sanitize(queryParameters, filtersKey, ['page', 'limit']);

        return {
          url: import.meta.env.VITE_API_CARDS,
          method: 'POST',
          body: payload,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        };
      },
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const { useGetCardsQuery, usePrefetch } = cardsApi;
