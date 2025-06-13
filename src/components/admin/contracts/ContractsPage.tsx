import React from 'react';
import styled from 'styled-components';
import ContractManager from './ContractManager';
import {ApiResponse} from '../../../hooks/useGetContracts';
import { PageContainer } from '../../layout/PageContainer';

const PageTitle = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    color: #111827;
    margin-top: 0;
    margin-bottom: 2.5rem;
    text-align: left;
`;

interface ContractsPageProps {
    contracts: ApiResponse | null;
    isLoading: boolean;
    error: string | null;
}

const ContractsPage: React.FC<ContractsPageProps> = ({ contracts, isLoading, error }) => {
    return (
        <PageContainer>
            <PageTitle>All Contracts</PageTitle>

            {isLoading && <p>Loading contracts...</p>}
            {error && <p style={{ color: 'red' }}>Error fetching contracts: {error}</p>}

            {contracts && contracts.responseList.length > 0 && (
                <ContractManager
                    items={contracts.responseList}
                />
            )}
        </PageContainer>
    );
};

export default ContractsPage;