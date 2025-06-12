import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {FileText, DollarSign, Clock, Check, BarChart2} from 'lucide-react';
import KPICard from '../dashboard/KPICard';
import {Subtitle, Title} from '../ui/text';
import StatusProgressBarChart from '../ui/statusProgressBarChart';

const PAGE_WRAPPER = styled.div`
    flex-grow: 1;
    padding: 2rem 2rem;
    height: 100vh;
    overflow-y: auto;
`;

const ANALYTICS_GRID = styled(motion.div)`
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

const CHART_GRID = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 1.5rem;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

const CARD_WRAPPER = styled.div`
    background-color: #ffffff;
    height: fit-content;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07);
`;

const SECTION_TITLE = styled.h3`
    font-weight: 600;
    color: #111827;
    margin: 0 0 1.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const MONTHLY_TREND_ITEM = styled.li`
    display: flex;
    justify-content: space-between;
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

const CONTAINER_VARIANTS = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const ITEM_VARIANTS = {
    hidden: {y: 20, opacity: 0},
    visible: {
        y: 0,
        opacity: 1,
    },
};

const KPI_REPORTS_DATA = [
    {
        title: 'TOTAL CONTRACTS',
        value: '347',
        change: '+12% vs last period',
        $trend: 'up' as 'up' | 'down' | 'warning',
        icon: FileText,
        $color: 'blue' as 'blue' | 'green' | 'yellow' | 'purple',
    },
    {
        title: 'TOTAL VALUE',
        value: '$45.2M',
        change: '+18% vs last period',
        $trend: 'up' as 'up' | 'down' | 'warning',
        icon: DollarSign,
        $color: 'green' as 'blue' | 'green' | 'yellow' | 'purple',
    },
    {
        title: 'AVG. PROCESSING TIME',
        value: '3.2 days',
        change: '-15% improvement',
        $trend: 'down' as 'up' | 'down' | 'warning',
        icon: Clock,
        $color: 'yellow' as 'blue' | 'green' | 'yellow' | 'purple',
    },
    {
        title: 'APPROVAL RATE',
        value: '84.2%',
        change: '+3% vs last period',
        $trend: 'up' as 'up' | 'down' | 'warning',
        icon: Check,
        $color: 'purple' as 'blue' | 'green' | 'yellow' | 'purple',
    },
];

const MONTHLY_CONTRACT_TRENDS_DATA = [
    {month: 'Jan', contracts: 26, value: '$3.2M', approved: 24},
    {month: 'Feb', contracts: 35, value: '$4.1M', approved: 29},
    {month: 'Mar', contracts: 42, value: '$5.8M', approved: 36},
    {month: 'Apr', contracts: 38, value: '$4.9M', approved: 32},
    {month: 'May', contracts: 45, value: '$6.2M', approved: 38},
    {month: 'Jun', contracts: 52, value: '$7.3M', approved: 44},
];

const TOP_PERFORMING_VENDORS_DATA = [
    {label: 'TechCorp Solutions', count: 24, value: '$8.2M', percentage: 92, color: '#4F46E5'},
    {label: 'Global Manufacturing', count: 18, value: '$6.6M', percentage: 88, color: '#9333EA'},
    {label: 'Healthcare Partners', count: 15, value: '$5.1M', percentage: 94, color: '#059669'},
    {label: 'Innovation Labs', count: 12, value: '$3.9M', percentage: 85, color: '#D97706'},
    {label: 'Digital Services', count: 9, value: '$2.7M', percentage: 91, color: '#2563EB'},
];

const ReportsPage: React.FC = () => {
    return (
        <PAGE_WRAPPER>
            <Title>Reports & Analytics</Title>
            <Subtitle>Comprehensive insights and performance metrics</Subtitle>

            <ANALYTICS_GRID variants={CONTAINER_VARIANTS} initial="hidden" animate="visible">
                {KPI_REPORTS_DATA.map((card) => (
                    <motion.div key={card.title} variants={ITEM_VARIANTS}>
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
            </ANALYTICS_GRID>

            <CHART_GRID>
                <CARD_WRAPPER>
                    <SECTION_TITLE>
                        <BarChart2 size={20}/>
                        Monthly Contract Trends
                    </SECTION_TITLE>
                    <ul>
                        {MONTHLY_CONTRACT_TRENDS_DATA.map((item) => (
                            <MONTHLY_TREND_ITEM key={item.month}>
                                <span>{item.month}</span>
                                <span>{item.contracts} contracts</span>
                                <span>{item.value}</span>
                                <span>{item.approved} approved</span>
                            </MONTHLY_TREND_ITEM>
                        ))}
                    </ul>
                </CARD_WRAPPER>
                <StatusProgressBarChart
                    title="Top Performing Vendors"
                    data={TOP_PERFORMING_VENDORS_DATA.map(item => ({
                        label: item.label,
                        count: item.count,
                        percentage: item.percentage,
                        color: item.color,
                        value: item.value
                    }))}
                    showItemCountAndPercentage={false}
                    showItemValue={true}
                    showLeftIcon={false}
                    fontScale={0.9}
                    titleIcon={BarChart2}
                />
            </CHART_GRID>
        </PAGE_WRAPPER>
    );
};

export default ReportsPage;