import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAndStoreCSV } from '../utils/switchDataFetcher';
import HomePage from './HomePage';
import { RootState } from '../redux/store'; // assuming you have this export

const RootComponent: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.switchData.data);
  const loading = useSelector((state: RootState) => state.switchData.loading);
  const error = useSelector((state: RootState) => state.switchData.error);

  useEffect(() => {
    fetchAndStoreCSV(dispatch);
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error}</div>;
  if (data && data.length > 0) return <HomePage />;
  return <div>Waiting for data...</div>;
};

export default RootComponent;
