import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const HomePage: React.FC = () => {
  const data = useSelector((state: RootState) => state.switchData.data);
  const loading = useSelector((state: RootState) => state.switchData.loading);
  const error = useSelector((state: RootState) => state.switchData.error);

  const [sortField, setSortField] = useState<keyof typeof data[0] | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [prevSortField, setPrevSortField] = useState<keyof typeof data[0] | null>(null);
  const [prevSortDirection, setPrevSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const getSortIcon = (field: keyof typeof data[0]) => {
    if (field === sortField) {
      return sortDirection === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />;
    } else if (field === prevSortField) {
      return prevSortDirection === 'asc' ? "△" : "▽";
    }
    return <FontAwesomeIcon icon={faSort} />;
  };

  const sortedData = [...data].sort((a, b) => {
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
  

  const handleSort = (field: keyof typeof data[0]) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setPrevSortField(sortField);
      setPrevSortDirection(sortDirection);
  
      setSortField(field);
      setSortDirection('asc');
    }
  };
  

  // TODO: Implement the filtering logic and modal here.

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <div>
      <table style={tableStyle}>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => {
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
                  onClick={() => handleSort(key as keyof typeof data[0])}
                  style={{ ...headerStyle, ...getSortHeaderStyle(sortStatus) }}
                >
                  {key} {getSortIcon(key as keyof typeof data[0])}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx} style={cellStyle}>{String(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* TODO: Add a button to open the filter modal */}
    </div>
  );
};

const getSortHeaderStyle = (sortStatus: string): React.CSSProperties => {
  switch (sortStatus) {
    case "primary":
      return { backgroundColor: '#f0f0f0', fontWeight: 'bold' };
    case "secondary":
      return { backgroundColor: '#f5f5f5' };
    default:
      return {};
  }
}

const tableStyle: React.CSSProperties = {
  borderCollapse: 'collapse',
  width: '100%',
};

const headerStyle: React.CSSProperties = {
  cursor: 'pointer',
  padding: '10px',
  border: '1px solid #e0e0e0',
  textAlign: 'left',
};

const cellStyle: React.CSSProperties = {
  padding: '4px 10px 4px 10px',
  border: '1px solid #e0e0e0',
};

export default HomePage;