import { Pagination, PaginationItem, Stack } from '@mui/material';
import produce from 'immer';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useGetCardsQuery, usePrefetch } from '../app/services/cards';
import useDebounce from '../hooks/useDebounce';

function Cards() {
  const [skip, setSkip] = useState(true);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [filters, setFilters] = useState({
    search: debouncedQuery,
    category: [],
    order: 'DESC',
    page: 1,
    post_type: [
      'datasheets',
      'ebooks',
      'infographics',
      'reports',
      'videos',
      'guides',
      'webinars',
      'white-papers',
    ],
    limit: 5,
    order_by: 'date',
  });
  useMemo(() => {
    if (!skip)
      setFilters(
        produce(filters, (draft) => {
          draft.search = debouncedQuery;
        })
      );
  }, [debouncedQuery]);
  const { data: cardsData } = useGetCardsQuery(filters, { skip });
  const prefetchPage = usePrefetch('getCards');

  const prefetchNext = useCallback(
    (page: number) => {
      prefetchPage(
        produce(filters, (draft) => {
          draft.page = page;
        })
      );
    },
    [prefetchPage, filters]
  );

  const handleChange = (event: ChangeEvent<unknown>, p: number) => {
    const newFilters = produce(filters, (draft) => {
      draft.page = p;
    });

    setFilters(newFilters);
  };

  return (
    <div>
      <p>
        {debouncedQuery.length > 0
          ? `Searched term: "${debouncedQuery}"`
          : 'No search term provided!'}
      </p>

      <input
        type="text"
        placeholder="Search by keyword"
        defaultValue={debouncedQuery}
        onChange={(e) => {
          setQuery(e.target.value.trim());
          setSkip(false);
        }}
      />

      {/* @ts-ignore */}
      {cardsData?.count_per?.query > 1 && (
        <Stack spacing={2}>
          <Pagination
            showFirstButton
            showLastButton
            count={cardsData?.count_per?.query}
            defaultPage={1}
            siblingCount={2}
            boundaryCount={2}
            onChange={handleChange}
            size="large"
            page={filters.page}
            variant="outlined"
            shape="rounded"
            renderItem={({ page, ...item }) => {
              return (
                <PaginationItem
                  {...{ page, ...item }}
                  onMouseEnter={() => prefetchNext(page as number)}
                />
              );
            }}
          />
        </Stack>
      )}

      {cardsData?.list?.map((post: any, idx: number) => (
        <h3 key={idx}>{post?.title}</h3>
      ))}
    </div>
  );
}

export default Cards;
