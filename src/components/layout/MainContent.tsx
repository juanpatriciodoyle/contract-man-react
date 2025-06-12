import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useGetTokens } from '../../hooks/useGetTokens';
import { useGetContracts } from '../../hooks/useGetContracts';
import Dashboard from '../dashboard/Dashboard';
import ContractManager from '../contracts/ContractManager';
import { formatValue } from '../utils';

// --- The Single Source of Truth for Mock Data ---
const CONTRACT_MOCK_DATA = [
    { value: 2400000, aiScore: 78.31 },
    { value: 3200000, aiScore: 68.32 },
    { value: 750000, aiScore: 74.54 },
    { value: 950000, aiScore: 67.84 },
    { value: 1800000, aiScore: 96.06 },
    { value: null, aiScore: 55.00 },
    { value: null, aiScore: 65.00 },
    { value: null, aiScore: 75.00 },
    { value: null, aiScore: 85.00 },
];

const ContentWrapper = styled.main`
    flex-grow: 1;
    padding: 2rem 3rem;
    height: 100vh;
    overflow-y: auto;
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

const MainContent = () => {
    const tokenResult = useGetTokens();
    const claimsToken = tokenResult?.claims_token || '';
    const { contracts, isLoading, error } = useGetContracts(claimsToken);

    const kpiMetrics = useMemo(() => {
        if (!contracts || contracts.responseList.length === 0) {
            return {
                totalValue: '$0M',
                approvalRate: '0.0%',
                expiringCount: 0,
                activeContracts: 0,
            };
        }

        const totalValue = CONTRACT_MOCK_DATA
            .reduce((sum, item) => sum + (item.value || 0), 0);

        const approvedCount = contracts.responseList.filter(c => c['$3'] === 'Approved' || c['$3'] === 'Accepted').length;
        const approvalRate = (approvedCount / contracts.responseList.length) * 100;

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

        return {
            totalValue: formatValue(totalValue),
            activeContracts: contracts.responseList.length,
            expiringCount: dueSoonCount,
            approvalRate: `${approvalRate.toFixed(1)}%`,
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
                <ContractManager
                    items={contracts.responseList}
                    mockData={CONTRACT_MOCK_DATA}
                />
            )}
        </ContentWrapper>
    );
};

export default MainContent;