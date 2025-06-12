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
  flex-shrink: 0; /* Prevents sidebar from shrinking */
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

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: space-between; /* To push badge to the right */
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #f3f4f6;
    color: #111827;
  }

  &:active {
    background-color: #f3f4f6;
    color: #111827;
  }
`;

const LinkContent = styled.span`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const NotificationBadge = styled.span`
    background-color: #e0e7ff;
    color: #4338ca;
    font-size: 0.75rem;
    font-weight: 500;
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