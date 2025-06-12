import React from 'react';
import styled from 'styled-components';

const SidebarWrapper = styled.div`
  width: 240px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  padding: 2rem 1rem;
  height: 100vh;
`;

const Sidebar = () => {
    return (
        <SidebarWrapper>
            <h1 style={{color: '#111827', fontSize: '1.5rem'}}>My App</h1>
        </SidebarWrapper>
    );
};

export default Sidebar;