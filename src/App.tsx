import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';
import ContractDetail from './components/contracts/ContractDetail';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContentShell = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const App = () => {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <AppWrapper>
                <Sidebar />
                <ContentShell>
                    <Routes>
                        <Route path="/" element={<MainContent />} />
                        <Route path="/contract/:contractId" element={<ContractDetail />} />
                    </Routes>
                </ContentShell>
            </AppWrapper>
        </BrowserRouter>
    );
}

export default App;