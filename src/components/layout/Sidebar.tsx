import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Bot } from 'lucide-react';

const SidebarWrapper = styled.div`
    width: 280px;
    background-color: #ffffff;
    border-right: 1px solid #e5e7eb;
    padding: 1.5rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`;

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 0.5rem;
    margin-bottom: 2.5rem;
`;

const LogoIcon = styled.div`
    width: 40px;
    height: 40px;
    background-color: #4f46e5;
    color: white;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AppTitle = styled.h1`
    color: #111827;
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
`;

const NavList = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

// --- UPDATED STYLES HERE ---
const StyledNavLink = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    color: #374151; /* Default text color for inactive link */
    text-decoration: none;
    font-weight: 500;
    transition: background-color 0.2s, color 0.2s;

    svg {
        color: #6b7280; /* Default icon color */
        transition: color 0.2s;
    }

    &:hover {
        background-color: #f3f4f6;
        color: #111827;

        svg {
            color: #111827;
        }
    }

    &:active {
        background-image: linear-gradient(to right, #4f46e5, #6366f1);
        color: #ffffff;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        svg {
            color: #ffffff;
        }

        &:hover {
            background-image: linear-gradient(to right, #4f46e5, #6366f1);
        }
    }
`;

const LinkContent = styled.span`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const NotificationBadge = styled.span`
    background-color: #ef4444;
    color: #ffffff; 
    font-size: 0.75rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 9999px;
`;

interface SidebarProps {
    contractCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ contractCount }) => {
    return (
        <SidebarWrapper>
            <LogoWrapper>
                <LogoIcon><Bot size={24} /></LogoIcon>
                <AppTitle>ContractFlow</AppTitle>
            </LogoWrapper>
            <NavList>
                <StyledNavLink to="/">
                    <LinkContent>
                        <LayoutDashboard size={20} />
                        Dashboard
                    </LinkContent>
                </StyledNavLink>
                <StyledNavLink to="/contracts">
                    <LinkContent>
                        <FileText size={20} />
                        Contracts
                    </LinkContent>
                    {contractCount > 0 && <NotificationBadge>{contractCount}</NotificationBadge>}
                </StyledNavLink>
            </NavList>
        </SidebarWrapper>
    );
};

export default Sidebar;