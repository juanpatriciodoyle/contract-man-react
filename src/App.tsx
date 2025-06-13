import React from 'react';
import styled from 'styled-components';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';
import {GlobalStyle} from './styles/GlobalStyle';
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';
import ContractDetail from './components/admin/contracts/ContractDetail';
import ContractsPage from './components/admin/contracts/ContractsPage';
import {useGetTokens} from './hooks/useGetTokens';
import {useGetContracts} from './hooks/useGetContracts';
import VendorPortalPage from "./components/admin/vendor/VendorPortalPage";
import AIAnalyticsDashboard from './components/admin/analytics/AIAnalyticsDashboard';
import ReportsPage from './components/admin/reports/ReportsPage';
import VerificationStatusPage from './components/vendor/verification/VerificationStatusPage';
import DashboardPage from "./components/vendor/dashboard/DashboardPage";

const AppWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const AppLayout: React.FC<{ contractCount: number }> = ({contractCount}) => (
    <AppWrapper>
        <Sidebar contractCount={contractCount}/>
        <Outlet/>
    </AppWrapper>
);

const App = () => {
    const tokenResult = useGetTokens();
    const claimsToken = tokenResult?.claims_token || '';
    const {contracts, isLoading, error} = useGetContracts(claimsToken);

    const contractCount = contracts?.responseList?.length || 0;

    return (
        <BrowserRouter>
            <GlobalStyle/>
            <Routes>
                <Route element={<AppLayout contractCount={contractCount}/>}>
                    <Route
                        path="/"
                        element={<MainContent contracts={contracts}/>}
                    />
                    <Route
                        path="/contracts"
                        element={
                            <ContractsPage
                                contracts={contracts}
                                isLoading={isLoading}
                                error={error}
                            />
                        }
                    />
                    <Route
                        path="/admin-vendors"
                        element={<VendorPortalPage />}
                    />
                    <Route
                        path="/ai-analytics"
                        element={<AIAnalyticsDashboard />}
                    />
                    <Route
                        path="/reports"
                        element={<ReportsPage />}
                    />
                    <Route
                        path="/vendor-dashboard"
                        element={<DashboardPage />}
                    />
                    <Route
                        path="/verification-status"
                        element={<VerificationStatusPage />} // Updated component reference
                    />
                </Route>
                <Route path="/contract/:contractId" element={<ContractDetail/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;