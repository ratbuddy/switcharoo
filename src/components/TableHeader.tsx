import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

type TableHeaderProps = {
  dataKeys: string[];
  sortConfig: { field: any; direction: string; prevField: any; prevDirection: string };
  handleSort: (field: string) => void;
};

const TableHeader: React.FC<TableHeaderProps> = ({ dataKeys, sortConfig, handleSort }) => {
  const getSortIcon = (field: string) => {
    if (field === sortConfig.field) {
      return sortConfig.direction === 'asc'
        ? <FontAwesomeIcon icon={faSortUp} />
        : <FontAwesomeIcon icon={faSortDown} />;
    } else if (field === sortConfig.prevField) {
      return sortConfig.prevDirection === 'asc' ? "△" : "▽";
    }
    return <FontAwesomeIcon icon={faSort} />;
  };

  const getSortHeaderStyle = (field: string): React.CSSProperties => {
    if (field === sortConfig.field) {
      return { fontWeight: 'bold' };
    } else if (field === sortConfig.prevField) {
      return {};
    }
    return {};
  };

  return (
    <thead>
      <tr>
        <th>Compare</th>  {/* Compare checkbox header */}
        {dataKeys.map((key) => (
          <th
            key={key}
            onClick={() => handleSort(key)}
            style={getSortHeaderStyle(key)}
          >
            {key} {getSortIcon(key)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
