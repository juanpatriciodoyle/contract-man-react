import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useGetTokens } from '../../hooks/useGetTokens';
import { useGetContracts } from '../../hooks/useGetContracts';
import Dashboard from '../dashboard/Dashboard';
import ContractManager from '../contracts/ContractManager';

const ContentWrapper = styled.main`
    flex-grow: 1; /* Allows this component to take up the remaining space */
    padding: 2rem 3rem;
    height: 100vh;
    overflow-y: auto; /* Make content scrollable if it overflows */
`;

const PageTitle = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    color: #111827;
    margin-top: 0;
    text-align: left;
`;

const PageSubtitle = styled.p`
    font-size: 1rem;
    color: #6b7280;
    margin-top: -0.5rem;
    margin-bottom: 2.5rem;
    text-align: left;
`;

const SectionHeader = styled.h2`
    font-size: 1.5rem;
    color: #111827;
    margin-top: 0;
    text-align: left;
`;

const Hr = styled.hr`
    width: 100%;
    margin: 2.5rem 0;
    border: 0;
    border-top: 1px solid #e5e7eb;
`;

const formatValue = (num: number): string => {
    if (num >= 1000000) {
        return `$${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
        return `$${(num / 1000).toFixed(0)}K`;
    }
    return `$${num}`;
};


const MainContent = () => {
    const tokenResult = useGetTokens();
    const claimsToken = tokenResult?.claims_token || '';
    const { contracts, isLoading, error } = useGetContracts(claimsToken);

    const kpiMetrics = useMemo(() => {
        if (!contracts || contracts.responseList.length === 0) {
            return {
                totalValue: '$0M',
                activeContracts: 0,
                expiringCount: 0,
                approvalRate: '0.0%', // Default value
            };
        }

        const MOCK_VALUES = [2400000, 3200000, 750000, 950000, 1800000, 500000, 600000, 700000, 800000];
        const totalValue = MOCK_VALUES.reduce((sum, value) => sum + value, 0);

        const now = new Date();
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(now.getDate() + 30);

        const dueSoonCount = contracts.responseList.filter(c => {
            if (!c.CDRL_DUE_DATE) return false;
            try {
                const dueDate = new Date(c.CDRL_DUE_DATE);
                return dueDate > now && dueDate <= thirtyDaysFromNow;
            } catch (e) {
                return false;
            }
        }).length;

        // --- NEW: Calculate Approval Rate from real data ---
        const approvedCount = contracts.responseList.filter(c => c['$3'] === 'Approved' || c['$3'] === 'Accepted').length;
        const approvalRate = (approvedCount / contracts.responseList.length) * 100;

        return {
            totalValue: formatValue(totalValue),
            activeContracts: contracts.responseList.length,
            expiringCount: dueSoonCount,
            approvalRate: `${approvalRate.toFixed(1)}%`, // Pass the calculated rate
        };

    }, [contracts]);

    return (
        <ContentWrapper>
            <PageTitle>Dashboard Overview</PageTitle>
            <PageSubtitle>Comprehensive contract management and AI insights</PageSubtitle>

            <Dashboard metrics={kpiMetrics} />

            <Hr />

            <SectionHeader>Contracts Data</SectionHeader>
            {isLoading && <p>Loading contracts...</p>}
            {error && <p style={{ color: 'red' }}>Error fetching contracts: {error}</p>}
            {contracts && contracts.responseList.length > 0 && (
                <ContractManager items={contracts.responseList} />
            )}
        </ContentWrapper>
    );
};

export default MainContent;