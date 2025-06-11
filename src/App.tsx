import React from 'react';
import styled from 'styled-components';
import {GlobalStyle} from './styles/GlobalStyle'; // Import global styles
import {useGetTokens} from './hooks/useGetTokens';
import {useGetContracts} from './hooks/useGetContracts';
import ContractList from './components/contracts/ContractList';

const AppWrapper = styled.div`
    text-align: center;
`;

const AppHeader = styled.header`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Align to the top */
    font-size: calc(10px + 2vmin);
    padding-top: 2rem;
`;

const Hr = styled.hr`
    width: 80%;
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
                <AppHeader>
                    <h2>Authentication Status</h2>
                    <p style={{wordBreak: 'break-all', maxWidth: '90%'}}>
                        <b>Claims Token:</b> {claimsToken || "Awaiting token..."}
                    </p>

                    <Hr/>

                    <h2>Contracts Data</h2>

                    {isLoading && <p>Loading contracts...</p>}
                    {error && <p style={{color: 'red'}}>Error fetching contracts: {error}</p>}

                    {contracts && contracts.responseList.length > 0 && (
                        <ContractList items={contracts.responseList}/>
                    )}
                </AppHeader>
            </AppWrapper>
        </>
    );
}

export default App;