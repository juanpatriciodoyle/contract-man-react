import React, { useMemo } from 'react';
import { ResponseItem } from '../../hooks/useGetContracts';
import StatusProgressBarChart from '../ui/statusProgressBarChart';

interface OverviewProps {
    items: ResponseItem[];
}

const STATUS_COLORS_DATA = [
    { name: 'Approved', color: '#10B981' },
    { name: 'Pending Review', color: '#FBBF24' },
    { name: 'Need More Information', color: '#F97316' },
    { name: 'Rejected', color: '#EF4444' },
];

const ContractStatusOverview: React.FC<OverviewProps> = ({ items }) => {
    const statusCounts = useMemo(() => {
        const counts = {
            'Approved': 0,
            'Pending Review': 0,
            'Need More Information': 0,
            'Rejected': 0,
        };
        items.forEach(item => {
            const status = item['$3'];
            if (status === 'Approved' || status === 'Accepted') counts['Approved']++;
            else if (status === 'Pending') counts['Pending Review']++;
            else if (status === 'Rejected') counts['Rejected']++;
            else if (status === 'Needs Review') counts['Need More Information']++;
        });
        return counts;
    }, [items]);

    const CHART_DATA = STATUS_COLORS_DATA.map(statusInfo => ({
        label: statusInfo.name,
        count: statusCounts[statusInfo.name as keyof typeof statusCounts] || 0,
        percentage: items.length > 0 ? Math.round(((statusCounts[statusInfo.name as keyof typeof statusCounts] || 0) / items.length) * 100) : 0,
        color: statusInfo.color,
    }));

    return (
        <StatusProgressBarChart
            title="Contract Status Overview"
            data={CHART_DATA}
            showItemCountAndPercentage={true}
            showItemValue={false}
            showLeftIcon={false}
            fontScale={1}
        />
    );
};

export default ContractStatusOverview;