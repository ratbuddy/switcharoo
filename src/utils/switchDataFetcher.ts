import Papa from 'papaparse';
import { fetchDataStart, fetchDataSuccess, fetchDataError } from '../redux/switchDataSlice';


const CSV_URL = 'https://raw.githubusercontent.com/ThereminGoat/switch-scores/master/1-Composite%20Overall%20Total%20Score%20Sheet%20.csv';

type ParsedData = Array<Record<string, string | number>>;

const fetchAndParseCSV = async (url: string): Promise<ParsedData> => {
    const response = await fetch(url);
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          if (results.errors.length) {
            reject(new Error(results.errors[0].message));
          } else {
            const headers: string[] = results.data[4] as string[];
            const actualDataRows: any[][] = results.data.slice(5) as any[][];  // Explicitly type as array of arrays

            const totalColumnIndex = headers.indexOf('Total');
            if (totalColumnIndex === -1) {
              reject(new Error('Expected "Total" header not found.'));
              return;
            }

            // Find the row where the first value is "AVG" or " - LINEAR RANKINGS -"
            const endIndex = actualDataRows.findIndex(row => row[0] === "AVG" || row[0] === " - LINEAR RANKINGS -");

            // Slice only the rows up to that point (or all if none found)
            const filteredDataRows = endIndex === -1 ? actualDataRows : actualDataRows.slice(0, endIndex);

            const parsedData: ParsedData = filteredDataRows.map((row: any[]) => {
              return headers.slice(0, totalColumnIndex + 1).reduce((acc, key, index) => {
                acc[key] = row[index];
                return acc;
              }, {} as Record<string, string | number>);
            }).filter(row => row['Switch Name'] && row['Switch Name'] !== 'Switch Name');

            resolve(parsedData);
          }
        }
      });
    });
};

  export const fetchAndStoreCSV = (dispatch: any) => {
    dispatch(fetchDataStart());
    fetchAndParseCSV(CSV_URL)
    .then(parsedData => {
      dispatch(fetchDataSuccess(parsedData));
    })
    .catch(err => {
      dispatch(fetchDataError(err.message));
    });
  };
  
