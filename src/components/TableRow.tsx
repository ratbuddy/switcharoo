import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { SwitchData } from '../types/switchDataType';
import SwitchDetailRow from './SwitchDetailRow';

type TableRowProps = {
    data: SwitchData[];
};

const TableRow: React.FC<TableRowProps> = ({ data }) => {
    const [expandedRows, setExpandedRows] = React.useState<number[]>([]);

    const toggleRow = (index: number) => {
        setExpandedRows(prevState =>
            prevState.includes(index)
                ? prevState.filter(i => i !== index)
                : [...prevState, index]
        );
    };

    return (
        <tbody>
          {data.map((row, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                {Object.entries(row).map(([key, value], idx) => (
                  <td key={idx}>{String(value)}</td>
                ))}
                <td>
                  <FontAwesomeIcon 
                    icon={expandedRows.includes(index) ? faChevronDown : faChevronRight}
                    onClick={() => toggleRow(index)}
                  />
                </td>
              </tr>
              {expandedRows.includes(index) && <SwitchDetailRow data={row} />}
            </React.Fragment>
          ))}
        </tbody>
      );
    };

export default TableRow;
