import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const HomePage: React.FC = () => {
  const data = useSelector((state: RootState) => state.switchData.data);
  const loading = useSelector((state: RootState) => state.switchData.loading);
  const error = useSelector((state: RootState) => state.switchData.error);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <div>
      {/* Render your data here */}
      {data.map((row, index) => (
  <div key={index}>
    {Object.entries(row).map(([key, value], fieldIndex) => (
      <span key={fieldIndex}>
        {key}: {String(value)},{' '}
      </span>
    ))}
  </div>
))}


    </div>
  );
};

export default HomePage;
