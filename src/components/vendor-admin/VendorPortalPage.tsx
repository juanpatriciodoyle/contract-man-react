import React, {useState} from 'react';
import styled from 'styled-components';
import {AlertTriangle, CheckCircle, Clock, Users} from 'lucide-react';
import KPICard from '../dashboard/KPICard';
import {motion} from 'framer-motion';
import {Subtitle, Title} from "../ui/text";
import Table, {TableColumn} from '../ui/table/table';
import {Chip} from '../ui/chip';
import {ActionButton, ActionIcons} from '../ui/table/tableElements';

const PAGE_WRAPPER = styled.div`
    flex-grow: 1;
    padding: 2rem 2rem;
    height: 100vh;
    overflow-y: auto;
`;

const PAGE_HEADER = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5rem;
`;

const REGISTER_BUTTON = styled.button`
    background-color: #4f46e5;
    color: #ffffff;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #4338ca;
    }
`;

const KPI_GRID = styled(motion.div)`
    display: grid;
    gap: 2.5rem;
    grid-template-columns: repeat(1, 1fr);
    margin-bottom: 2.5rem;

    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

const CARD_ROW_ITEM = styled(motion.div)``;

const SECTION_TITLE = styled.h3`
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 1.5rem 0;
`;

interface VendorItem {
    id: string;
    company: string;
    contact: string;
    industry: string;
    status: string;
    registeredDate: string;
}

const CONTAINER_VARIANTS = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        }
    }
};

const ITEM_VARIANTS = {
    hidden: {y: 20, opacity: 0},
    visible: {
        y: 0,
        opacity: 1,
    }
};

const VendorPortalPage: React.FC = () => {
    const VENDOR_METRICS_DATA = {
        totalVendors: '0',
        verified: '0',
        pending: '0',
        rejected: '0',
    };

    const VENDOR_KPI_CARDS_DATA = [
        {
            title: "TOTAL VENDORS",
            value: VENDOR_METRICS_DATA.totalVendors,
            change: "",
            $trend: "up" as 'up' | 'down' | 'warning',
            icon: Users,
            $color: "blue" as 'blue' | 'green' | 'yellow' | 'purple',
        },
        {
            title: "VERIFIED",
            value: VENDOR_METRICS_DATA.verified,
            change: "",
            $trend: "up" as 'up' | 'down' | 'warning',
            icon: CheckCircle,
            $color: "green" as 'blue' | 'green' | 'yellow' | 'purple',
        },
        {
            title: "PENDING",
            value: VENDOR_METRICS_DATA.pending,
            change: "",
            $trend: "warning" as 'up' | 'down' | 'warning',
            icon: Clock,
            $color: "yellow" as 'blue' | 'green' | 'yellow' | 'purple',
        },
        {
            title: "REJECTED",
            value: VENDOR_METRICS_DATA.rejected,
            change: "",
            $trend: "down" as 'up' | 'down' | 'warning',
            icon: AlertTriangle,
            $color: "purple" as 'blue' | 'green' | 'yellow' | 'purple',
        },
    ];

    const VENDOR_TABLE_DATA: VendorItem[] = [];

    const getStatusChipType = (status: string) => {
        switch (status) {
            case 'verified':
                return 'approved';
            case 'pending':
                return 'pending-review';
            case 'rejected':
                return 'rejected';
            default:
                return 'unknown';
        }
    };

    const VENDOR_TABLE_COLUMNS: TableColumn<VendorItem>[] = [
        {key: 'company', label: 'Company', renderCell: (item) => <>{item.company}</>},
        {key: 'contact', label: 'Contact', renderCell: (item) => <>{item.contact}</>},
        {key: 'industry', label: 'Industry', renderCell: (item) => <>{item.industry}</>},
        {
            key: 'status',
            label: 'Status',
            renderCell: (item) => {
                return <Chip type={getStatusChipType(item.status)}>{item.status}</Chip>;
            },
        },
        {key: 'registeredDate', label: 'Registered', renderCell: (item) => <>{item.registeredDate}</>},
        {
            key: 'actions',
            label: 'Actions',
            renderCell: () => (
                <ActionIcons>
                    <ActionButton><Users size={16}/></ActionButton>
                </ActionIcons>
            ),
        },
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');

    const VENDOR_TOOLBAR_PROPS = {
        searchQuery: searchQuery,
        onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
        selectedFilter: selectedFilter,
        onFilterChange: setSelectedFilter,
        filterOptions: ["All", "Active", "Inactive"],
        placeholder: "Search vendors...",
        showSearch: true,
        showFilter: false,
    };

    return (
        <PAGE_WRAPPER>
            <PAGE_HEADER>
                <div>
                    <Title>Vendor Portal</Title>
                    <Subtitle>Manage vendor accounts and verification status</Subtitle>
                </div>
                <REGISTER_BUTTON>
                    <Users size={20} style={{marginRight: '0.5rem'}}/>
                    Register Vendor
                </REGISTER_BUTTON>
            </PAGE_HEADER>

            <KPI_GRID
                variants={CONTAINER_VARIANTS}
                initial="hidden"
                animate="visible"
            >
                {VENDOR_KPI_CARDS_DATA.map((card) => (
                    <CARD_ROW_ITEM key={card.title} variants={ITEM_VARIANTS}>
                        <KPICard
                            title={card.title}
                            value={card.value}
                            change={card.change}
                            $trend={card.$trend}
                            icon={card.icon}
                            $color={card.$color}
                        />
                    </CARD_ROW_ITEM>
                ))}
            </KPI_GRID>

            <SECTION_TITLE>Vendor Management ({VENDOR_TABLE_DATA.length})</SECTION_TITLE>
            <Table<VendorItem>
                columns={VENDOR_TABLE_COLUMNS}
                data={VENDOR_TABLE_DATA}
                emptyMessage="No vendors registered yet"
                showToolbar={false}
                toolbarProps={VENDOR_TOOLBAR_PROPS}
            />
        </PAGE_WRAPPER>
    );
};

export default VendorPortalPage;