import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAndStoreCSV } from '../utils/switchDataFetcher';
import HomePage from './HomePage';

const RootComponent: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAndStoreCSV(dispatch);
  }, [dispatch]);

  return <HomePage />;
};

export default RootComponent;
