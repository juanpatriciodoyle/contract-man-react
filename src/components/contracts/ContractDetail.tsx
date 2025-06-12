import React from 'react';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';
import { ResponseItem } from '../../hooks/useGetContracts';
import { ArrowLeft } from 'lucide-react';

const DetailWrapper = styled.div`
  padding: 2rem 3rem;
  height: 100vh;
  overflow-y: auto;
  color: #111827;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2rem;
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #111827;
  }
`;

const DetailHeader = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  margin-top: 0;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
`;

const DetailItem = styled.div`
  label {
    display: block;
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
  }
`;

const ContractDetail = () => {
    const location = useLocation();
    const contract = location.state?.contract as ResponseItem | undefined;

    if (!contract) {
        return (
            <DetailWrapper>
                <BackLink to="/"><ArrowLeft size={16}/> Back to Dashboard</BackLink>
                <DetailHeader>Contract Not Found</DetailHeader>
                <p>Please return to the dashboard and select a contract to view.</p>
            </DetailWrapper>
        );
    }

    return (
        <DetailWrapper>
            <BackLink to="/contracts"><ArrowLeft size={16}/> Back to Contracts</BackLink>
            <DetailHeader>{contract.TITLE}</DetailHeader>
            <p style={{marginTop: '-1rem', color: '#6b7280'}}>ID: {contract.ID}</p>

            <DetailGrid>
                <DetailItem>
                    <label>Status</label>
                    <p>{contract['$3'] || 'Unknown'}</p>
                </DetailItem>
                <DetailItem>
                    <label>Vendor</label>
                    <p>{contract.CDRL_RESPONSIBILITY}</p>
                </DetailItem>
                <DetailItem>
                    <label>Keyed Event</label>
                    <p>{contract.KEYED_EVENT}</p>
                </DetailItem>
                <DetailItem>
                    <label>Due Date</label>
                    <p>{contract.CDRL_DUE_DATE ? new Date(contract.CDRL_DUE_DATE).toLocaleDateString() : 'N/A'}</p>
                </DetailItem>
                <DetailItem>
                    <label>Submit Date</label>
                    <p>{contract.CDRL_SUBMIT_DATE || 'N/A'}</p>
                </DetailItem>
                <DetailItem>
                    <label>Response Date</label>
                    <p>{contract.CDRL_RESPONSE_DATE || 'N/A'}</p>
                </DetailItem>
            </DetailGrid>
        </DetailWrapper>
    );
};

export default ContractDetail;