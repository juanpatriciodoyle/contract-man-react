import React, {useMemo} from 'react';
import styled from 'styled-components';
import {ApiResponse} from '../../hooks/useGetContracts';
import Dashboard from '../dashboard/Dashboard';
import ContractStatusOverview from '../dashboard/ContractStatusOverview';
import ContractsByIndustry from '../dashboard/ContractsByIndustry';
import {formatValue} from '../utils';
import {Subtitle, Title} from "../ui/text";

const ContentWrapper = styled.main`
    flex-grow: 1;
    padding: 2rem 2rem;
    height: 100vh;
    overflow-y: auto;
`;

const ChartGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 1.5rem;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

interface MainContentProps {
    contracts: ApiResponse | null;
}

const MainContent: React.FC<MainContentProps> = ({contracts}) => {
    const kpiMetrics = useMemo(() => {
        if (!contracts || contracts.responseList.length === 0) {
            return {
                totalValue: '$0M',
                approvalRate: '0.0%',
                expiringCount: 0,
                activeContracts: 0,
            };
        }

        const MOCK_VALUES = [2400000, 3200000, 750000, 950000, 1800000, 500000, 600000, 700000, 800000];
        const totalValue = MOCK_VALUES.reduce((sum, value) => sum + (value || 0), 0);

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
            <Title>Overview</Title>
            <Subtitle>Comprehensive contract management and AI insights</Subtitle>

            <Dashboard metrics={kpiMetrics}/>

            <ChartGrid>
                <ContractStatusOverview items={contracts?.responseList || []}/>
                <ContractsByIndustry/>
            </ChartGrid>
        </ContentWrapper>
    );
};

export default MainContent;