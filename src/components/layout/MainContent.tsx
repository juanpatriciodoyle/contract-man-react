import React, {useMemo} from 'react';
import styled from 'styled-components';
import {ApiResponse} from '../../hooks/useGetContracts';
import AdminDashboard from '../admin/dashboard/AdminDashboard';
import ContractStatusOverview from '../admin/dashboard/ContractStatusOverview';
import ContractsByIndustry from '../admin/dashboard/ContractsByIndustry';
import {formatValue, parseValue} from '../utils';
import {Subtitle, Title} from "../ui/text";
import { PageContainer } from './PageContainer';

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
    const KPI_METRICS = useMemo(() => {
        if (!contracts || contracts.responseList.length === 0) {
            return {
                totalValue: '$0M',
                approvalRate: '0.0%',
                expiringCount: 0,
                activeContracts: 0,
            };
        }

        const TOTAL_CONTRACT_VALUE = contracts.responseList.reduce((sum, contract) => {
            const value = parseValue(contract['$6']);
            return sum + value;
        }, 0);

        const APPROVED_COUNT = contracts.responseList.filter(c => c['$3'] === 'Approved' || c['$3'] === 'Accepted').length;
        const APPROVAL_RATE = (APPROVED_COUNT / contracts.responseList.length) * 100;

        const NOW = new Date();
        const THIRTY_DAYS_FROM_NOW = new Date();
        THIRTY_DAYS_FROM_NOW.setDate(NOW.getDate() + 30);
        const EXPIRING_COUNT = contracts.responseList.filter(c => {
            if (!c.CDRL_DUE_DATE) return false;
            try {
                const DUE_DATE = new Date(c.CDRL_DUE_DATE);
                return DUE_DATE > NOW && DUE_DATE <= THIRTY_DAYS_FROM_NOW;
            } catch (e) {
                return false;
            }
        }).length;

        return {
            totalValue: formatValue(TOTAL_CONTRACT_VALUE),
            activeContracts: contracts.responseList.length,
            expiringCount: EXPIRING_COUNT,
            approvalRate: `${APPROVAL_RATE.toFixed(1)}%`,
        };
    }, [contracts]);

    return (
        <PageContainer>
            <Title>Overview</Title>
            <Subtitle>Comprehensive contract management and AI insights</Subtitle>

            <AdminDashboard metrics={KPI_METRICS}/>

            <ChartGrid>
                <ContractStatusOverview items={contracts?.responseList || []}/>
                <ContractsByIndustry/>
            </ChartGrid>
        </PageContainer>
    );
};

export default MainContent;