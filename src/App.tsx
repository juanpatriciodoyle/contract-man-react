import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const App = () => {
    return (
        <>
            <GlobalStyle />
            <AppWrapper>
                <Sidebar />
                <MainContent />
            </AppWrapper>
        </>
    );
}

export default App;