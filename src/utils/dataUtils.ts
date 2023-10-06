import { FilterValues } from '../types/filterTypes';

export function filterData(data: any[], filters: FilterValues) {
    return data.filter(d => {
        if (filters.nameSearch && !d['Switch Name'].toLowerCase().includes(filters.nameSearch.toLowerCase())) return false;
        if (filters.manufacturer && d.Manufacturer !== filters.manufacturer) return false;
        if (filters.type && d.Type !== filters.type) return false;
        if (!(d['Push Feel'] >= filters.pushFeel[0] && d['Push Feel'] <= filters.pushFeel[1])) return false;
        if (!(d['Wobble'] >= filters.wobble[0] && d['Wobble'] <= filters.wobble[1])) return false;
        if (!(d['Sound'] >= filters.sound[0] && d['Sound'] <= filters.sound[1])) return false;
        if (!(d['Context'] >= filters.context[0] && d['Context'] <= filters.context[1])) return false;
        if (!(d['Other'] >= filters.other[0] && d['Other'] <= filters.other[1])) return false;
        if (!(d['Total'] >= filters.total[0] && d['Total'] <= filters.total[1])) return false;

        return true;
    });
}

export function sortData(data: any[], sortConfig: { field: any, direction: 'asc' | 'desc', prevField: any, prevDirection: 'asc' | 'desc' }) {
    return [...data].sort((a, b) => {
        let primaryComparison = 0;
        let secondaryComparison = 0;

        if (sortConfig.field) {
            primaryComparison = sortConfig.direction === 'asc'
                ? String(a[sortConfig.field]).localeCompare(String(b[sortConfig.field]), undefined, { numeric: true })
                : String(b[sortConfig.field]).localeCompare(String(a[sortConfig.field]), undefined, { numeric: true });
        }

        if (sortConfig.prevField && primaryComparison === 0) {
            secondaryComparison = sortConfig.prevDirection === 'asc'
                ? String(a[sortConfig.prevField]).localeCompare(String(b[sortConfig.prevField]), undefined, { numeric: true })
                : String(b[sortConfig.prevField]).localeCompare(String(a[sortConfig.prevField]), undefined, { numeric: true });
        }

        return primaryComparison || secondaryComparison;
    });
}

export function generateSwitchReviewUrl(switchName: string): string {
    const baseUrl = 'https://www.theremingoat.com/blog/';
    const urlFriendlyName = switchName.toLowerCase().split(' ').join('-');
    return `${baseUrl}${urlFriendlyName}-switch-review`;
}

export function generateSwitchPdfUrl(switchName: string): string {
    const baseUrl = 'https://github.com/ThereminGoat/switch-scores/blob/master/';
    const urlFriendlyName = switchName.split(' ').join('%20');
    return `${baseUrl}${urlFriendlyName}.pdf`;
}
