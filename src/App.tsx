import React from 'react';
import styled from 'styled-components';
import {GlobalStyle} from './styles/GlobalStyle'; // Import global styles
import {useGetTokens} from './hooks/useGetTokens';
import {useGetContracts} from './hooks/useGetContracts';
import ContractList from './components/contracts/ContractList';

const AppWrapper = styled.div`
    text-align: center;
`;

const Hr = styled.hr`
    margin: 2rem 0;
    border-color: #4a4f5a;
`;

const App = () => {
    const tokenResult = useGetTokens();
    const claimsToken = tokenResult?.claims_token || '';

    const {contracts, isLoading, error} = useGetContracts(claimsToken);

    return (
        <>
            <GlobalStyle/>
            <AppWrapper>
                <h2>Authentication Status</h2>
                <b>Claims Token:</b> {(claimsToken && "Ok") || "Awaiting token..."}

                <Hr/>

                <h2>Contracts Data</h2>

                {isLoading && <p>Loading contracts...</p>}
                {error && <p style={{color: 'red'}}>Error fetching contracts: {error}</p>}

                {contracts && contracts.responseList.length > 0 && (
                    <ContractList items={contracts.responseList}/>
                )}
            </AppWrapper>
        </>
    );
}

export default App;