import React, {useMemo} from 'react';
import {ResponseItem} from '../../../hooks/useGetContracts';
import StatusProgressBarChart from '../../ui/statusProgressBarChart';
import styled from "styled-components";

interface OverviewProps {
    items: ResponseItem[];
}

const STATUS_COLORS_DATA = [
    {name: 'Approved', color: '#10B981'},
    {name: 'Pending Review', color: '#FBBF24'},
    {name: 'Need More Information', color: '#F97316'},
    {name: 'Rejected', color: '#EF4444'},
];

const ChartWrapper = styled.div`
    font-size: 17px;
    background-color: #ffffff;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07);
    align-items: center;
`;

const ContractStatusOverview: React.FC<OverviewProps> = ({items}) => {
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
        <ChartWrapper>
            <StatusProgressBarChart
                title="Contract Status Overview"
                data={CHART_DATA}
                showItemCountAndPercentage={true}
                showItemValue={false}
                showLeftIcon={false}
                fontScale={1}
            />
        </ChartWrapper>
    );
};

export default ContractStatusOverview;