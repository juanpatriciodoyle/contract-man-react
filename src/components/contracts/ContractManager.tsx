import React, { useState, useEffect, useRef, JSX } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Edit, Trash2, Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { ResponseItem } from '../../hooks/useGetContracts';
import { StatusBadge } from './StatusBadge';
import { useNavigate } from 'react-router-dom';
import { formatValue } from '../utils';

// --- MOCK DATA ---
const MOCK_CONTRACT_EXTRAS = [
    { value: 2400000, aiScore: 78.31 },
    { value: 3200000, aiScore: 68.32 },
    { value: 750000, aiScore: 74.54 },
    { value: 950000, aiScore: 67.84 },
    { value: 1800000, aiScore: 96.06 },
    { value: null, aiScore: 55.00 },
    { value: null, aiScore: 65.00 },
    { value: null, aiScore: 75.00 },
    { value: null, aiScore: 85.00 },
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

const FilterWrapper = styled.div`
    position: relative;
`;

const FilterButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    background: white;
    border: 1px solid #d1d5db;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
`;

const DropdownMenu = styled(motion.div)`
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
    width: 200px;
    padding: 0.5rem;
    z-index: 10;
`;

const DropdownItem = styled.button<{ selected: boolean }>`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: none;
    background-color: ${({ selected }) => (selected ? '#f3f4f6' : 'transparent')};
    border-radius: 0.25rem;
    text-align: left;
    cursor: pointer;
    font-weight: ${({ selected }) => (selected ? '500' : '400')};

    &:hover {
        background-color: #f3f4f6;
    }
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

// --- CHILD COMPONENTS ---

const STATUS_OPTIONS = ["All Status", "Pending", "Approved", "Rejected", "Needs Review", "Accepted"];

const Toolbar: React.FC<{
    searchQuery: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedStatus: string;
    onStatusChange: (status: string) => void;
}> = ({ searchQuery, onSearchChange, selectedStatus, onStatusChange }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <ToolbarWrapper>
            <SearchInputWrapper>
                <Search size={18} />
                <input
                    type="text"
                    placeholder="Search contracts..."
                    value={searchQuery}
                    onChange={onSearchChange}
                />
            </SearchInputWrapper>

            <FilterWrapper ref={dropdownRef}>
                <FilterButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <SlidersHorizontal size={16} /> {selectedStatus} <ChevronDown size={16} />
                </FilterButton>

                <AnimatePresence>
                    {isDropdownOpen && (
                        <DropdownMenu
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {STATUS_OPTIONS.map(status => (
                                <DropdownItem
                                    key={status}
                                    selected={status === selectedStatus}
                                    onClick={() => {
                                        onStatusChange(status);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {status}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    )}
                </AnimatePresence>
            </FilterWrapper>
        </ToolbarWrapper>
    );
};

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
    if (parts.length > 1 && parts[0] && parts[1]) {
        return `${parts[0][0]}${parts[1][0]}`;
    }
    return name.substring(0, 2);
};

interface ContractRowProps {
    contract: ResponseItem;
    value: number | null;
    aiScore: number;
}

const ContractRow: React.FC<ContractRowProps> = ({ contract, value, aiScore }) => {
    const navigate = useNavigate();

    const handleViewClick = () => {
        navigate(`/contract/${contract.ID}`, { state: { contract } });
    };

    return (
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
            <Td><strong>{formatValue(value)}</strong></Td>
            <Td><AIScore score={aiScore} /></Td>
            <Td>{contract.CDRL_SUBMIT_DATE}</Td>
            <Td>
                <ActionIcons>
                    <ActionButton onClick={handleViewClick}><Eye size={16} /></ActionButton>
                    <ActionButton><Edit size={16} /></ActionButton>
                    <ActionButton><Trash2 size={16} /></ActionButton>
                </ActionIcons>
            </Td>
        </motion.tr>
    );
};

interface ContractsTableProps {
    items: ResponseItem[];
    mockData: { value: number | null; aiScore: number }[];
}

const ContractsTable: React.FC<ContractsTableProps> = ({ items, mockData }) => (
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
                    value={mockData[index]?.value || null}
                    aiScore={mockData[index]?.aiScore || 0}
                />
            ))}
            </tbody>
        </Table>
    </TableWrapper>
);

// --- MAIN COMPONENT ---
interface ContractManagerProps {
    items: ResponseItem[];
    mockData: { value: number | null; aiScore: number }[];
}

const ContractManager: React.FC<ContractManagerProps> = ({ items, mockData }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All Status');

    const filteredItems = items.filter(item => {
        const matchesSearch = item.TITLE.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'All Status' || item['$3'] === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <ManagerWrapper>
            <Toolbar
                searchQuery={searchQuery}
                onSearchChange={(e) => setSearchQuery(e.target.value)}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
            />
            <ContractsTable items={filteredItems} mockData={mockData} />
        </ManagerWrapper>
    );
};

export default ContractManager;