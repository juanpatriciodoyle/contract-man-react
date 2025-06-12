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

    // useMemo will re-calculate these values only when `contracts` data changes
    const kpiMetrics = useMemo(() => {
        if (!contracts || contracts.responseList.length === 0) {
            return {
                totalValue: '$0M',
                approvalRate: '0.0%',
                expiringCount: 0,
                activeContracts: 0,
            };
        }

        // Since the real data for value is missing, we use a mock array for the calculation.
        const MOCK_VALUES = [2400000, 3200000, 750000, 950000, 1800000, 500000, 600000, 700000, 800000];
        const totalValue = MOCK_VALUES.reduce((sum, value) => sum + value, 0);

        // Calculate the approval rate from real data
        const approvedCount = contracts.responseList.filter(c => c['$3'] === 'Approved' || c['$3'] === 'Accepted').length;
        const approvalRate = (approvedCount / contracts.responseList.length) * 100;

        // Logic for expiring contracts would go here. For now, it's static.
        const expiringCount = 0;

        return {
            totalValue: formatValue(totalValue),
            approvalRate: `${approvalRate.toFixed(1)}%`,
            expiringCount: expiringCount,
            activeContracts: contracts.responseList.length,
        };

    }, [contracts]);

    return (
        <ContentWrapper>
            <PageTitle>Dashboard Overview</PageTitle>
            <PageSubtitle>Comprehensive contract management and AI insights</PageSubtitle>

            <Dashboard metrics={kpiMetrics} />

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