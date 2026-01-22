"use client";

import { useEffect, useRef } from 'react';
import { fetchHeroData } from '../store/heroSlice';
import { useAppDispatch, useAppSelector } from '../redux/reduxStore';

export const useGetHeroInfo = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.hero);
  
  const hasCalled = useRef(false);

  useEffect(() => {
    if (hasCalled.current) return;

    if (!data && !loading) {
      hasCalled.current = true; 
      dispatch(fetchHeroData());
    }
  }, [dispatch, data, loading]);

  return {
    hero: data,
    loading,
    error,
    isLoaded: !!data,
    nickname: data?.nickname || "Nieznany",
  };
};