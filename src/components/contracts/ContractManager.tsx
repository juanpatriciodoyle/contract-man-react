// src/components/contracts/ContractManager.tsx

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Eye, Edit, Trash2, Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { ResponseItem } from '../../hooks/useGetContracts';
import { StatusBadge } from './StatusBadge';

// --- MOCK DATA ---
const MOCK_CONTRACT_EXTRAS = [
    { value: '$2.4M', aiScore: 78.31 },
    { value: '$3.2M', aiScore: 68.32 },
    { value: '$750K', aiScore: 74.54 },
    { value: '$950K', aiScore: 67.84 },
    { value: '$1.8M', aiScore: 96.06 },
    { value: 'Unknown', aiScore: 55.00 },
    { value: 'Unknown', aiScore: 65.00 },
    { value: 'Unknown', aiScore: 75.00 },
    { value: 'Unknown', aiScore: 85.00 },
];

// --- STYLED COMPONENTS ---

const ManagerWrapper = styled.div`
    background-color: #ffffff;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07);
`;

const ToolbarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const SearchInputWrapper = styled.div`
    position: relative;
    width: 320px;
    color: #9ca3af;

    input {
        width: 100%;
        padding: 0.5rem 0.75rem 0.5rem 2.5rem;
        border-radius: 0.5rem;
        border: 1px solid #d1d5db;
        &:focus {
            outline: 2px solid #3b82f6;
            border-color: transparent;
        }
    }

    svg {
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const FilterButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: 1px solid #d1d5db;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
`;

const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    color: #1f2937;

    tbody tr:nth-child(even) {
        background-color: #f9fafb;
    }
`;

const Th = styled.th`
    padding: 0.75rem 1rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6b7280;
    border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
    padding: 1rem 1rem;
    border-bottom: 1px solid #e5e7eb;
    vertical-align: middle;
    font-size: 0.875rem;
`;

const ActionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #f3f4f6;
    border: 1px solid #e5e7eb;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: #3b82f6;
        background-color: #e5e7eb;
    }
`;

const ActionIcons = styled.div`
    display: flex;
    gap: 0.75rem;
`;

const Avatar = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #e5e7eb;
    color: #4b5563;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 0.75rem;
    text-transform: uppercase;
`;

const VendorCell = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 500;
`;

const ContractTitle = styled.div`
    font-weight: 500;
`;

// --- THIS IS THE MISSING PART ---
const AIScoreWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ScoreBar = styled.div`
    width: 80px;
    height: 8px;
    background-color: #e0e7ff;
    border-radius: 4px;
    overflow: hidden;
`;

const ScoreFill = styled.div<{ score: number }>`
    width: ${(props) => props.score}%;
    height: 100%;
    background-color: #4f46e5;
    border-radius: 4px;
`;

const ScoreText = styled.span`
    font-weight: 500;
    min-width: 50px;
    color: #4f46e5;
`;
// --- END OF MISSING PART ---


// --- CHILD COMPONENTS ---

const Toolbar = () => (
    <ToolbarWrapper>
        <SearchInputWrapper>
            <Search size={18} />
            <input type="text" placeholder="Search contracts..." />
        </SearchInputWrapper>
        <div>
            <FilterButton>
                <SlidersHorizontal size={16} /> All Status <ChevronDown size={16} />
            </FilterButton>
        </div>
    </ToolbarWrapper>
);

const AIScore: React.FC<{ score: number }> = ({ score }) => (
    <AIScoreWrapper>
        <ScoreBar>
            <ScoreFill score={score} />
        </ScoreBar>
        <ScoreText>{score.toFixed(2)}%</ScoreText>
    </AIScoreWrapper>
);

const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length > 1) {
        return `${parts[0][0]}${parts[1][0]}`;
    }
    return name.substring(0, 2);
}

const ContractRow: React.FC<{ contract: ResponseItem; value: string; aiScore: number }> = ({ contract, value, aiScore }) => (
    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Td>
            <ContractTitle>{contract.TITLE}</ContractTitle>
            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{contract.ID}</div>
        </Td>
        <Td>
            <VendorCell>
                <Avatar>{getInitials(contract.CDRL_RESPONSIBILITY)}</Avatar>
                {contract.CDRL_RESPONSIBILITY}
            </VendorCell>
        </Td>
        <Td><StatusBadge status={contract['$3']} /></Td>
        <Td><strong>{value}</strong></Td>
        <Td><AIScore score={aiScore} /></Td>
        <Td>{contract.CDRL_SUBMIT_DATE}</Td>
        <Td>
            <ActionIcons>
                <ActionButton><Eye size={16} /></ActionButton>
                <ActionButton><Edit size={16} /></ActionButton>
                <ActionButton><Trash2 size={16} /></ActionButton>
            </ActionIcons>
        </Td>
    </motion.tr>
);

const ContractsTable: React.FC<{ items: ResponseItem[] }> = ({ items }) => (
    <TableWrapper>
        <Table>
            <thead>
            <tr>
                <Th>Contract</Th>
                <Th>Vendor</Th>
                <Th>Status</Th>
                <Th>Value</Th>
                <Th>AI Score</Th>
                <Th>Submit Date</Th>
                <Th>Actions</Th>
            </tr>
            </thead>
            <tbody>
            {items.map((item, index) => (
                <ContractRow
                    key={item['@unid']}
                    contract={item}
                    value={MOCK_CONTRACT_EXTRAS[index]?.value || '$0'}
                    aiScore={MOCK_CONTRACT_EXTRAS[index]?.aiScore || 0}
                />
            ))}
            </tbody>
        </Table>
    </TableWrapper>
);

interface ContractManagerProps {
    items: ResponseItem[];
}

const ContractManager: React.FC<ContractManagerProps> = ({ items }) => {
    return (
        <ManagerWrapper>
            <Toolbar />
            <ContractsTable items={items} />
        </ManagerWrapper>
    )
}

export default ContractManager;