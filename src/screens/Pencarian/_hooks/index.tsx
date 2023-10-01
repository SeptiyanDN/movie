import { useState, useCallback } from 'react';
import { useRequest } from '../../../utils/services/';
import { debounce } from 'lodash';

import 'moment/locale/id';

export const usePencarianScreen = () => {
  const request = useRequest();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [listMovie, setListMovie] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchMovie, setSearchMovie] = useState('');
  const sizeListMovie = 10;

  const handleStatusRenderGuest = useCallback((): string => {
    if (isLoading && listMovie.length === 0) {
      return 'loading';
    } else if (isError) {
      return 'error';
    } else if (listMovie.length === 0) {
      return 'empty';
    } else if (listMovie.length >= 0) {
      return 'show';
    } else {
      return 'show';
    }
  }, [isError, isLoading, listMovie.length]);
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    console.log('disini bukan ? 1');
    const body = {
      search: '',
      limit: sizeListMovie,
      page: page,
      order_column: 'updated_at',
      order_direction: 'desc',
    };

    try {
      const res = await request({
        method: 'post',
        endpoint: '/movies/list/',
        body: body,
      });
      if (res.meta.code === 200) {
        setIsError(false);
        if (res.data.length !== 0) {
          setListMovie(prevListMovie => [...prevListMovie, ...res.data]);
          setPage(page + 1);
        }
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [page, request]);
  const statusRenderGuest = handleStatusRenderGuest();
  const handleLoadMore = debounce(() => {
    if (!isLoading) {
      if (searchMovie.length === 0) {
        if (page !== 1 && listMovie.length >= sizeListMovie) {
          fetchData();
        }
      }
    }
  }, 300);

  const handleTryAgain = useCallback(async () => {
    setIsLoading(true);
    console.log('disini bukan ? 2');

    try {
      const res = await request({
        method: 'post',
        endpoint: '/guest/find/',
        body: {
          search: '',
          limit: sizeListMovie,
          page: 1,
          order_column: 'updated_at',
          order_direction: 'desc',
        },
      });

      if (res.meta.code === 200) {
        setIsError(false);
        if (res.data.length !== 0) {
          setListMovie(res.data);
          setPage(2);
        } else {
          setListMovie([]);
        }
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [request]);

  const handleSearch = useCallback(async () => {

    setIsLoading(true);
    const body = {
      search: searchMovie,
      limit: sizeListMovie,
      offset: page,
      order_column: 'updated_at',
      order_direction: 'desc',
    };
    console.log(body);

    try {
      const response = await request({
        method: 'post',
        endpoint: '/movies/list/',
        body: body,
      });

      if (response.meta.code === 200) {
        setIsError(false);
        if (response.data.length !== 0) {
          setListMovie(response.data);
          setPage(1);
        } else {
          setListMovie([]);
        }
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [page, request, searchMovie]);
  return {
    handleSearch,
    setSearchMovie,
    searchMovie,
    handleStatusRenderGuest,
    statusRenderGuest,
    listMovie,
    handleLoadMore,
    isLoading,
    handleTryAgain,
  };
};
