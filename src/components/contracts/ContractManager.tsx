import React, {useCallback, useState} from 'react';
import {Edit, Eye, Trash2} from 'lucide-react';
import {ResponseItem} from '../../hooks/useGetContracts';
import {useNavigate} from 'react-router-dom';
import {formatValue} from '../utils';

import Table, {TableColumn} from '../ui/table/table';

import {Chip} from '../ui/chip';

import {
    ActionButton,
    ActionIcons,
    AIScore,
    Avatar,
    ContractTitle,
    getInitials,
    VendorCell
} from '../ui/table/tableElements';

const STATUS_OPTIONS = ["All Status", "Pending", "Approved", "Rejected", "Needs Review", "Accepted"];

interface ContractTableItem extends ResponseItem {
    value: number | null;
    aiScore: number;
}

interface ContractManagerProps {
    items: ResponseItem[];
    mockData: { value: number | null; aiScore: number }[];
}

const ContractManager: React.FC<ContractManagerProps> = ({items, mockData}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All Status');
    const navigate = useNavigate();

    const getStatusChipType = useCallback((status: string) => {
        switch (status) {
            case 'Approved':
            case 'Accepted':
                return 'approved';
            case 'Pending':
                return 'pending-review';
            case 'Rejected':
                return 'rejected';
            case 'Needs Review':
                return 'need-more-info';
            default:
                return 'unknown';
        }
    }, []);

    const combinedItems: ContractTableItem[] = items.map((item, index) => ({
        ...item,
        value: mockData[index]?.value || null,
        aiScore: mockData[index]?.aiScore || 0,
    }));

    const filteredItems = combinedItems.filter(item => {
        const matchesSearch = item.TITLE.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'All Status' || item['$3'] === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const contractColumns: TableColumn<ContractTableItem>[] = [
        {
            key: 'title',
            label: 'Contract',
            renderCell: (item) => (
                <>
                    <ContractTitle>{item.TITLE}</ContractTitle>
                    <div style={{fontSize: '0.8rem', color: '#6b7280'}}>{item.ID}</div>
                </>
            ),
        },
        {
            key: 'vendor',
            label: 'Vendor',
            renderCell: (item) => (
                <VendorCell>
                    <Avatar>{getInitials(item.CDRL_RESPONSIBILITY)}</Avatar>
                    {item.CDRL_RESPONSIBILITY}
                </VendorCell>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            renderCell: (item) => (
                <Chip type={getStatusChipType(item['$3'])}>
                    {item['$3'] || 'Unknown'}
                </Chip>
            ),
        },
        {
            key: 'value',
            label: 'Value',
            renderCell: (item) => <strong>{formatValue(item.value)}</strong>,
        },
        {
            key: 'aiScore',
            label: 'AI Score',
            renderCell: (item) => <AIScore score={item.aiScore}/>,
        },
        {
            key: 'submitDate',
            label: 'Submit Date',
            renderCell: (item) => <>{item.CDRL_SUBMIT_DATE}</>,
        },
        {
            key: 'actions',
            label: 'Actions',
            renderCell: (item) => {
                const handleViewClick = () => {
                    navigate(`/contract/${item.ID}`, {state: {contract: item}});
                };
                return (
                    <ActionIcons>
                        <ActionButton onClick={handleViewClick}><Eye size={16}/></ActionButton>
                        <ActionButton><Edit size={16}/></ActionButton>
                        <ActionButton><Trash2 size={16}/></ActionButton>
                    </ActionIcons>
                );
            },
        },
    ];

    return (
        <Table<ContractTableItem>
            columns={contractColumns}
            data={filteredItems}
            emptyMessage="No contracts found."
            showToolbar={true}
            toolbarProps={{
                searchQuery: searchQuery,
                onSearchChange: (e) => setSearchQuery(e.target.value),
                selectedFilter: selectedStatus,
                onFilterChange: setSelectedStatus,
                filterOptions: STATUS_OPTIONS,
                placeholder: "Search contracts...",
                showSearch: true,
                showFilter: true,
            }}
        />
    );
};

export default ContractManager;