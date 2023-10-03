import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import FilterComponent from './FilterComponent';
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

  const filteredData = allData.filter(d => {
    if (filters.nameSearch && !d['Switch Name'].toLowerCase().includes(filters.nameSearch.toLowerCase())) return false;
    if (filters.manufacturer && d.Manufacturer !== filters.manufacturer) return false;
    if (filters.type && d.Type !== filters.type) return false;
    if (!(d['Push Feel'] >= filters.pushFeel[0] && d['Push Feel'] <= filters.pushFeel[1])) return false;
    if (!(d['Wobble'] >= filters.wobble[0] && d['Wobble'] <= filters.wobble[1])) return false;
    if (!(d['Sound'] >= filters.sound[0] && d['Sound'] <= filters.sound[1])) return false;
    if (!(d['Context'] >= filters.context[0] && d['Context'] <= filters.context[1])) return false;
    if (!(d['Other'] >= filters.other[0] && d['Other'] <= filters.other[1])) return false;
    if (!(d['Total'] >= filters.total[0] && d['Total'] <= filters.total[1])) return false;

    return true;  // If all conditions are satisfied
  });

  const [sortField, setSortField] = useState<keyof typeof allData[0] | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [prevSortField, setPrevSortField] = useState<keyof typeof allData[0] | null>(null);
  const [prevSortDirection, setPrevSortDirection] = useState<'asc' | 'desc'>('asc');

  const getSortIcon = (field: keyof typeof allData[0]) => {
    if (field === sortField) {
      return sortDirection === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />;
    } else if (field === prevSortField) {
      return prevSortDirection === 'asc' ? "△" : "▽";
    }
    return <FontAwesomeIcon icon={faSort} />;
  };

  const sortedData = [...filteredData].sort((a, b) => {
    let primaryComparison = 0;
    let secondaryComparison = 0;
  
    if (sortField) {
      primaryComparison = sortDirection === 'asc'
        ? String(a[sortField]).localeCompare(String(b[sortField]), undefined, { numeric: true })
        : String(b[sortField]).localeCompare(String(a[sortField]), undefined, { numeric: true });
    }
  
    if (prevSortField && primaryComparison === 0) {
      secondaryComparison = prevSortDirection === 'asc'
        ? String(a[prevSortField]).localeCompare(String(b[prevSortField]), undefined, { numeric: true })
        : String(b[prevSortField]).localeCompare(String(a[prevSortField]), undefined, { numeric: true });
    }
  
    return primaryComparison || secondaryComparison;
  });
  

  const handleSort = (field: keyof typeof allData[0]) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setPrevSortField(sortField);
      setPrevSortDirection(sortDirection);
  
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <div className="mt-5">
      <FilterComponent data={allData} onApply={handleFiltersApply} />
      <table className="table table-hover mt-4">
        <thead>
          <tr>
            {Object.keys(allData[0]).map((key) => {
              let sortStatus = "";
              if (key === sortField) {
                sortStatus = "primary";
              } else if (key === prevSortField) {
                sortStatus = "secondary";
              }

              return (
                <th
                  key={key}
                  data-sort={sortStatus}
                  onClick={() => handleSort(key as keyof typeof allData[0])}
                  style={getSortHeaderStyle(sortStatus)}
                >
                  {key} {getSortIcon(key as keyof typeof allData[0])}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{String(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getSortHeaderStyle = (sortStatus: string): React.CSSProperties => {
  switch (sortStatus) {
    case "primary":
      return { fontWeight: 'bold' };
    case "secondary":
      return { };
    default:
      return {};
  }
}

export default HomePage;