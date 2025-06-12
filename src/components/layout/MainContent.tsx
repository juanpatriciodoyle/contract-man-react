import React from 'react';
import styled from 'styled-components';
import { useGetTokens } from '../../hooks/useGetTokens';
import { useGetContracts } from '../../hooks/useGetContracts';
import Dashboard from '../dashboard/Dashbord';
import ContractList from '../contracts/ContractList';

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
`;

const PageSubtitle = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin-top: -0.5rem;
  margin-bottom: 2.5rem;
`;

const SectionHeader = styled.h2`
  font-size: 1.5rem;
  color: #111827;
  margin-top: 0;
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

    return (
        <ContentWrapper>
            <PageTitle>Dashboard Overview</PageTitle>
            <PageSubtitle>Comprehensive contract management and AI insights</PageSubtitle>

            <Dashboard />

            <Hr />

            <SectionHeader>Contracts Data</SectionHeader>
            {isLoading && <p>Loading contracts...</p>}
            {error && <p style={{ color: 'red' }}>Error fetching contracts: {error}</p>}
            {contracts && contracts.responseList.length > 0 && (
                <ContractList items={contracts.responseList} />
            )}
        </ContentWrapper>
    );
};

export default MainContent;