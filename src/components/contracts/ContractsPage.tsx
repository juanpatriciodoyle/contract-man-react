import React from 'react';
import styled from 'styled-components';
import ContractManager from './ContractManager';
import {ApiResponse} from '../../hooks/useGetContracts';

const PageWrapper = styled.div`
  padding: 2rem 2rem;
  height: 100%;
`;

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
    const MOCK_CONTRACT_DATA = [
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

    return (
        <PageWrapper>
            <PageTitle>All Contracts</PageTitle>

            {isLoading && <p>Loading contracts...</p>}
            {error && <p style={{ color: 'red' }}>Error fetching contracts: {error}</p>}

            {contracts && contracts.responseList.length > 0 && (
                <ContractManager
                    items={contracts.responseList}
                    mockData={MOCK_CONTRACT_DATA}
                />
            )}
        </PageWrapper>
    );
};

export default ContractsPage;