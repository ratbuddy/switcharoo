import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import FilterComponent from './FilterComponent';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { SortConfigType } from '../types/sortTypes';
import { filterData, sortData } from '../utils/dataUtils';
import { FilterValues } from '../types/filterTypes';

const HomePage: React.FC = () => {
  const allData = useSelector((state: RootState) => state.switchData.data);
  const loading = useSelector((state: RootState) => state.switchData.loading);
  const error = useSelector((state: RootState) => state.switchData.error);

  const [filters, setFilters] = useState<FilterValues>({
    nameSearch: '',
    manufacturer: null,
    type: null,
    pushFeel: [1, 35],
    wobble: [1, 25],
    sound: [1, 10],
    context: [1, 20],
    other: [1, 10],
    total: [1, 100]
  });

  const handleFiltersApply = (appliedFilters: FilterValues) => {
    setFilters(appliedFilters);
  };

  const filteredData = useMemo(() => filterData(allData, filters), [allData, filters]);

  const [sortConfig, setSortConfig] = useState<SortConfigType<typeof allData[0]>>({
    field: null,
    direction: 'asc',
    prevField: null,
    prevDirection: 'asc'
  });

  const sortedData = useMemo(() => sortData(filteredData, sortConfig), [filteredData, sortConfig]);

  const handleSort = (field: keyof typeof allData[0]) => {
    if (sortConfig.field === field) {
      setSortConfig({
        ...sortConfig,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
      });
    } else {
      setSortConfig({
        field: field,
        direction: 'asc',
        prevField: sortConfig.field,
        prevDirection: sortConfig.direction
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <div className="mt-5">
      <FilterComponent data={allData} onApply={handleFiltersApply} />
      <table className="table table-hover mt-4">
        <TableHeader 
          dataKeys={Object.keys(allData[0])} 
          sortConfig={sortConfig} 
          handleSort={handleSort}
        />
        <TableRow data={sortedData} />
      </table>
    </div>
  );
};

export default HomePage;