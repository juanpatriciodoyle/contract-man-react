import React from 'react';
import styled from 'styled-components';
import { Laptop, Heart, TrendingUp, Factory } from 'lucide-react';

const CardWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07);
`;

const CardTitle = styled.h3`
  font-weight: 600;
  color: #111827;
  margin: 0 0 1.5rem 0;
`;

const IndustryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const IndustryItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #E0E7FF;
    color: #4F46E5; 
`;

const IndustryInfo = styled.div`
  flex-grow: 1;
  margin: 0 1rem;
  text-align: left;
`;

const IndustryName = styled.p`
  margin: 0;
  font-weight: 500;
  color: #1f2937;
`;

const ContractCount = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
`;

const IndustryValue = styled.p`
  margin: 0;
  font-weight: 600;
  color: #1f2937;
`;

const INDUSTRY_DATA = [
    { name: 'Technology', count: 2, value: '$3M', icon: <Laptop size={20}/> },
    { name: 'Healthcare', count: 1, value: '$2M', icon: <Heart size={20}/> },
    { name: 'Finance', count: 1, value: '$950K', icon: <TrendingUp size={20}/> },
    { name: 'Manufacturing', count: 1, value: '$3M', icon: <Factory size={20}/> },
];

const ContractsByIndustry = () => {
    return (
        <CardWrapper>
            <CardTitle>Contracts by Industry</CardTitle>
            <IndustryList>
                {INDUSTRY_DATA.map(item => (
                    <IndustryItem key={item.name}>
                        <IconWrapper>{item.icon}</IconWrapper>
                        <IndustryInfo>
                            <IndustryName>{item.name}</IndustryName>
                            <ContractCount>{item.count} contracts</ContractCount>
                        </IndustryInfo>
                        <IndustryValue>{item.value}</IndustryValue>
                    </IndustryItem>
                ))}
            </IndustryList>
        </CardWrapper>
    );
};

export default ContractsByIndustry;