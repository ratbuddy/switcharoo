import React from 'react';

type TableRowProps = {
  data: any[];
};

const TableRow: React.FC<TableRowProps> = ({ data }) => {
  return (
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          {Object.values(row).map((value, idx) => (
            <td key={idx}>{String(value)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableRow;
