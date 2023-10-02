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
            const actualDataRows = results.data.slice(5);

            const totalColumnIndex = headers.indexOf('Total'); // Find the index of "Total" header
            if (totalColumnIndex === -1) {
              reject(new Error('Expected "Total" header not found.'));
              return;
            }

            // Now, we transform the actual data rows into objects using our headers up to "Total"
            const parsedData: ParsedData = (actualDataRows as any[][])
            .map((row) => {
              return headers.slice(0, totalColumnIndex + 1).reduce((acc, key, index) => {
                acc[key] = row[index];
                return acc;
              }, {} as Record<string, string | number>);
            })
            .filter(row => row['Switch Name']);

            resolve(parsedData.filter(row => row['Switch Name'] && row['Switch Name'] !== ''));
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
  
