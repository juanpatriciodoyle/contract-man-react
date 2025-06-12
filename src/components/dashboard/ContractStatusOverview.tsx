// src/components/dashboard/ContractStatusOverview.tsx (Updated)

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { ResponseItem } from '../../hooks/useGetContracts';

interface OverviewProps {
    items: ResponseItem[];
}

const CardWrapper = styled.div`
    background-color: #ffffff;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07);
`;

const CardTitle = styled.h3`
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 1.5rem 0;
`;

const ContentWrapper = styled.div`
    display: flex;
    gap: 2rem;
`;

const Legend = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const LegendItem = styled.div<{ color: string }>`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: #374151;

    &::before {
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: ${(props) => props.color};
    }
`;

const Chart = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 1.1rem; /* Aligns with legend */
`;

const BarWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

const Bar = styled.div`
    flex-grow: 1;
    height: 10px;
    background-color: #e0e7ff;
    border-radius: 5px;
    overflow: hidden;
`;

// Update BarFill to accept '$percentage' and '$customColor'
const BarFill = styled.div<{ $percentage: number; $customColor: string }>`
    width: ${({ $percentage }) => $percentage}%; // Use $percentage
    height: 100%;
    background-color: ${({ $customColor }) => $customColor}; // Use $customColor
    border-radius: 5px;
`;

const CountLabel = styled.span`
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
    min-width: 20px;
    text-align: right;
`;

const STATUS_CONFIG = [
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

    const maxCount = Math.max(...Object.values(statusCounts), 1);

    return (
        <CardWrapper>
            <CardTitle>Contract Status Overview</CardTitle>
            <ContentWrapper>
                <Legend>
                    {STATUS_CONFIG.map(status => (
                        <LegendItem key={status.name} color={status.color}>{status.name}</LegendItem>
                    ))}
                </Legend>
                <Chart>
                    {STATUS_CONFIG.map(statusInfo => {
                        const count = statusCounts[statusInfo.name as keyof typeof statusCounts] || 0;
                        return (
                            <BarWrapper key={statusInfo.name}>
                                <Bar>
                                    <BarFill
                                        $percentage={(count / maxCount) * 100} // Pass $percentage
                                        $customColor={statusInfo.color} // Pass $customColor
                                    />
                                </Bar>
                                <CountLabel>{count}</CountLabel>
                            </BarWrapper>
                        )
                    })}
                </Chart>
            </ContentWrapper>
        </CardWrapper>
    );
};

export default ContractStatusOverview;