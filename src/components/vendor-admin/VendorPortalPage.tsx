import React, {useState} from 'react';
import styled from 'styled-components';
import {AlertTriangle, CheckCircle, Clock, Users} from 'lucide-react';
import KPICard from '../dashboard/KPICard';
import {motion} from 'framer-motion';
import {Subtitle, Title} from "../ui/text";
import Table, {TableColumn} from '../ui/table/table';
import {Chip} from '../ui/chip';
import {ActionButton, ActionIcons} from '../ui/table/tableElements';

const PageWrapper = styled.div`
    flex-grow: 1;
    padding: 2rem 2rem;
    height: 100vh;
    overflow-y: auto;
`;

const PageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5rem;
`;

const RegisterButton = styled.button`
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

const KpiGrid = styled(motion.div)`
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

const CardRowItem = styled(motion.div)``;

const SectionTitle = styled.h3`
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

const VendorPortalPage: React.FC = () => {
    const vendorMetrics = {
        totalVendors: '0',
        verified: '0',
        pending: '0',
        rejected: '0',
    };

    const KPI_DATA = [
        {
            title: "TOTAL VENDORS",
            value: vendorMetrics.totalVendors,
            change: "",
            $trend: "up",
            icon: Users,
            $color: "blue", // Use $color
        },
        {
            title: "VERIFIED",
            value: vendorMetrics.verified,
            change: "",
            $trend: "up",
            icon: CheckCircle,
            $color: "green", // Use $color
        },
        {
            title: "PENDING",
            value: vendorMetrics.pending,
            change: "",
            $trend: "warning",
            icon: Clock,
            $color: "yellow", // Use $color
        },
        {
            title: "REJECTED",
            value: vendorMetrics.rejected,
            change: "",
            $trend: "down",
            icon: AlertTriangle,
            $color: "purple", // Use $color
        },
    ];

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            }
        }
    };

    const itemVariants = {
        hidden: {y: 20, opacity: 0},
        visible: {
            y: 0,
            opacity: 1,
        }
    };

    const vendorTableData: VendorItem[] = [];

    const vendorColumns: TableColumn<VendorItem>[] = [
        {key: 'company', label: 'Company', renderCell: (item) => <>{item.company}</>},
        {key: 'contact', label: 'Contact', renderCell: (item) => <>{item.contact}</>},
        {key: 'industry', label: 'Industry', renderCell: (item) => <>{item.industry}</>},
        {
            key: 'status',
            label: 'Status',
            renderCell: (item) => {
                let chipType: 'approved' | 'pending-review' | 'need-more-info' | 'rejected' | 'ai-review' | 'accepted' | 'unknown' = 'unknown';
                if (item.status === 'verified') chipType = 'approved';
                else if (item.status === 'pending') chipType = 'pending-review';
                else if (item.status === 'rejected') chipType = 'rejected';

                return <Chip type={chipType}>{item.status}</Chip>;
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

    const toolbarProps = {
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
        <PageWrapper>
            <PageHeader>
                <div>
                    <Title>Vendor Portal</Title>
                    <Subtitle>Manage vendor accounts and verification status</Subtitle>
                </div>
                <RegisterButton>
                    <Users size={20} style={{marginRight: '0.5rem'}}/>
                    Register Vendor
                </RegisterButton>
            </PageHeader>

            <KpiGrid
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {KPI_DATA.map((card) => (
                    <CardRowItem key={card.title} variants={itemVariants}>
                        <KPICard
                            title={card.title}
                            value={card.value}
                            change={card.change}
                            $trend={card.$trend as 'up' | 'down' | 'warning'}
                            icon={card.icon}
                            $color={card.$color as 'blue' | 'green' | 'yellow' | 'purple'} // Pass $color
                        />
                    </CardRowItem>
                ))}
            </KpiGrid>

            <SectionTitle>Vendor Management ({vendorTableData.length})</SectionTitle>
            <Table<VendorItem>
                columns={vendorColumns}
                data={vendorTableData}
                emptyMessage="No vendors registered yet"
                showToolbar={false}
                toolbarProps={toolbarProps}
            />
        </PageWrapper>
    );
};

export default VendorPortalPage;