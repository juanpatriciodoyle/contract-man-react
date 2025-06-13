import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Subtitle, Title} from '../../ui/text';
import KPICard from '../../admin/dashboard/KPICard';
import {CheckCircle, Clock, CloudUpload, DollarSign, Edit, Eye, FileText, Trash2} from 'lucide-react';
import Table, {TableColumn} from '../../ui/table/table';
import {Chip} from '../../ui/chip';
import {ActionButton, ActionIcons, ContractTitle} from '../../ui/table/tableElements';
import {formatValue} from '../../utils';

const PageWrapper = styled.div`
    flex-grow: 1;
    padding: 2rem 2rem;
    height: 100vh;
    overflow-y: auto;
`;

const KpiGrid = styled(motion.div)`
    width: 100%;
    padding: 0;
    display: grid;
    gap: 2.5rem;
    grid-template-columns: repeat(1, 1fr);

    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
    }

    margin: 0 auto 2.5rem;
`;

const SectionTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 1.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const DashboardGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2.5rem;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

const CardWrapper = styled.div`
    background-color: #ffffff;
    height: fit-content;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07);
`;

const VerificationStatusItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px dashed #e5e7eb;

    &:last-child {
        border-bottom: none;
    }

    span {
        font-size: 0.9rem;
        color: #4b5563;
    }
`;

const QuickActionsButton = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    background-color: #f3f4f6;
    color: #4b5563;
    border: 1px solid #e5e7eb;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    justify-content: flex-start;

    &:hover {
        background-color: #e5e7eb;
        color: #111827;
    }

    svg {
        color: #6b7280;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;
`;


interface RecentContract {
    id: string;
    title: string;
    submittedDate: string;
    aiScore: number;
    status: string;
    value: number | null;
    vendor: string;
}

const VENDOR_DASHBOARD_KPI_DATA = [
    {
        title: 'TOTAL SUBMITTED',
        value: '8',
        change: '+2 this month',
        $trend: 'up' as 'up' | 'down' | 'warning',
        icon: FileText,
        $color: 'blue' as 'blue' | 'green' | 'yellow' | 'purple',
    },
    {
        title: 'APPROVED',
        value: '5',
        change: '85% approval rate',
        $trend: 'up' as 'up' | 'down' | 'warning',
        icon: CheckCircle,
        $color: 'green' as 'blue' | 'green' | 'yellow' | 'purple',
    },
    {
        title: 'TOTAL VALUE',
        value: '$12.5M',
        change: '+$3.2M this quarter',
        $trend: 'up' as 'up' | 'down' | 'warning',
        icon: DollarSign,
        $color: 'purple' as 'blue' | 'green' | 'yellow' | 'purple',
    },
    {
        title: 'AVG. APPROVAL TIME',
        value: '3.2 days',
        change: '20% faster',
        $trend: 'down' as 'up' | 'down' | 'warning',
        icon: Clock,
        $color: 'yellow' as 'blue' | 'green' | 'yellow' | 'purple',
    },
];

const RECENT_CONTRACTS_DATA: RecentContract[] = [
    {
        id: 'CON-001-Q4',
        title: 'Cloud Infrastructure Services Q4',
        submittedDate: '11/15/2024',
        aiScore: 95,
        status: 'Approved',
        value: 2400000,
        vendor: 'CloudTech Inc.'
    },
    {
        id: 'CON-002-RNL',
        title: 'Software License Renewal',
        submittedDate: '11/20/2024',
        aiScore: 88,
        status: 'Pending',
        value: 750000,
        vendor: 'SoftSol Corp.'
    },
    {
        id: 'CON-003-AUD',
        title: 'Security Audit Services',
        submittedDate: '11/22/2024',
        aiScore: 72,
        status: 'Needs Review',
        value: 320000,
        vendor: 'SecureAll Ltd.'
    },
];

const getStatusChipType = (status: string) => {
    switch (status) {
        case 'Approved':
            return 'approved';
        case 'Pending':
            return 'pending-review';
        case 'Needs Review':
            return 'need-more-info';
        case 'Rejected':
            return 'rejected';
        default:
            return 'unknown';
    }
};

const RECENT_CONTRACTS_COLUMNS: TableColumn<RecentContract>[] = [
    {
        key: 'contract',
        label: 'Contract',
        renderCell: (item: RecentContract) => (
            <>
                <ContractTitle>{item.title}</ContractTitle>
                <div style={{fontSize: '0.8rem', color: '#6b7280'}}>Submitted {item.submittedDate}</div>
                <div style={{fontSize: '0.8rem', color: '#6b7280'}}>AI Score: {item.aiScore}%</div>
            </>
        ),
        sortable: true,
        sortValue: (item: RecentContract) => item.title,
    },
    {
        key: 'status',
        label: 'Status',
        renderCell: (item: RecentContract) => (
            <Chip type={getStatusChipType(item.status)}>
                {item.status}
            </Chip>
        ),
        sortable: true,
        sortValue: (item: RecentContract) => item.status,
    },
    {
        key: 'value',
        label: 'Value',
        renderCell: (item: RecentContract) => <strong>{formatValue(item.value)}</strong>,
        sortable: true,
        sortValue: (item: RecentContract) => item.value,
    },
    {
        key: 'actions',
        label: 'Actions',
        renderCell: (item: RecentContract) => (
            <ActionIcons>
                <ActionButton onClick={() => console.log('View contract:', item.id)}><Eye size={16}/></ActionButton>
                <ActionButton onClick={() => console.log('Edit contract:', item.id)}><Edit size={16}/></ActionButton>
                <ActionButton onClick={() => console.log('Delete contract:', item.id)}><Trash2
                    size={16}/></ActionButton>
            </ActionIcons>
        ),
    },
];

const VendorDashboardPage: React.FC = () => {
    return (
        <PageWrapper>
            <Title>Vendor Dashboard</Title>
            <Subtitle>Track your contract submissions and business performance</Subtitle>

            <KpiGrid>
                {VENDOR_DASHBOARD_KPI_DATA.map((card) => (
                    <motion.div key={card.title}>
                        <KPICard
                            title={card.title}
                            value={card.value}
                            change={card.change}
                            $trend={card.$trend}
                            icon={card.icon}
                            $color={card.$color}
                        />
                    </motion.div>
                ))}
            </KpiGrid>

            <DashboardGrid>
                <CardWrapper>
                    <SectionTitle>Recent Contract Submissions</SectionTitle>
                    <Table<RecentContract>
                        columns={RECENT_CONTRACTS_COLUMNS}
                        data={RECENT_CONTRACTS_DATA}
                        emptyMessage="No recent contracts found."
                        showToolbar={false}
                    />
                    <div style={{textAlign: 'right', marginTop: '1rem'}}>
                        <button style={{
                            color: '#4f46e5',
                            fontWeight: 500,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                        }}>View All
                        </button>
                    </div>
                </CardWrapper>

                <div>
                    <CardWrapper style={{marginBottom: '2.5rem'}}>
                        <SectionTitle>Verification Status</SectionTitle>
                        <VerificationStatusItem>
                            <span>Account Status</span>
                            <Chip type="approved" showIcon={true}>Verified</Chip>
                        </VerificationStatusItem>
                        <VerificationStatusItem>
                            <span>Document Review</span>
                            <Chip type="approved" showIcon={true}>Verified</Chip>
                        </VerificationStatusItem>
                        <VerificationStatusItem>
                            <span>Compliance Check</span>
                            <Chip type="approved" showIcon={true}>Verified</Chip>
                        </VerificationStatusItem>
                        <p style={{fontSize: '0.875rem', color: '#6b7280', marginTop: '1rem', textAlign: 'center'}}>
                            Fully verified vendor <br/>
                            <span style={{fontSize: '0.75rem'}}>last updated: Nov 19, 2024</span>
                        </p>
                    </CardWrapper>

                    <CardWrapper>
                        <SectionTitle>Quick Actions</SectionTitle>
                        <ButtonGroup>
                            <QuickActionsButton>
                                <CloudUpload size={20}/> Submit New Contract
                            </QuickActionsButton>
                            <QuickActionsButton>
                                <FileText size={20}/> View Contract Templates
                            </QuickActionsButton>
                            <QuickActionsButton>
                                <Clock size={20}/> Schedule Meeting
                            </QuickActionsButton>
                            <QuickActionsButton>
                                <Eye size={20}/> Report Issue
                            </QuickActionsButton>
                        </ButtonGroup>
                    </CardWrapper>
                </div>
            </DashboardGrid>
        </PageWrapper>
    );
};

export default VendorDashboardPage;