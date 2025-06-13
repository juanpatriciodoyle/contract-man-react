export const parseValue = (valueStr: string): number => {
    const cleanedValue = valueStr.replace(/[^0-9.MK]/gi, '');
    const number = parseFloat(cleanedValue);
    if (isNaN(number)) return 0;

    if (cleanedValue.toUpperCase().includes('M')) {
        return number * 1000000;
    }
    if (cleanedValue.toUpperCase().includes('K')) {
        return number * 1000;
    }
    return number;
};

export const formatValue = (num: number | null): string => {
    if (num === 0) return '$0';
    if (!num) return 'Unknown';

    if (num >= 1000000) {
        return `$${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
        return `$${(num / 1000).toFixed(0)}K`;
    }
    return `$${num}`;
};

export const getStatusChipType = (status: string) => {
    switch (status) {
        case 'Approved':
            return 'approved';
        case 'Pending':
            return 'pending-review';
        case 'Needs Review':
            return 'need-more-info';
        case 'Rejected':
            return 'rejected';
        case 'Verified':
            return 'approved';
        default:
            return 'unknown';
    }
};