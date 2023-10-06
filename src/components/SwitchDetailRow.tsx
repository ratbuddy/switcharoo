import React from 'react';
import { generateSwitchReviewUrl, generateSwitchPdfUrl } from '../utils/dataUtils';
import { SwitchData } from '../types/switchDataType';
import '../styles/SwitchDetailRow.css'

type SwitchDetailRowProps = {
    data: SwitchData;
  };
  
  const SwitchDetailRow: React.FC<SwitchDetailRowProps> = ({ data }) => {
    return (
      <tr className="details-row">
        <td colSpan={Object.keys(data).length + 2}>
          <div className="details-container">
            <div className="details-section">
              <strong>Review:</strong>
              <a href={generateSwitchReviewUrl(data['Switch Name'])} target="_blank" rel="noopener noreferrer">
                Link to Review
              </a>
            </div>
            <div className="details-section">
              <strong>PDF Score Sheet:</strong>
              <a href={generateSwitchPdfUrl(data['Switch Name'])} target="_blank" rel="noopener noreferrer">
                Open PDF
              </a>
            </div>
            {/* You can add more details sections as needed here */}
          </div>
        </td>
      </tr>
    );
  };
  
  export default SwitchDetailRow;