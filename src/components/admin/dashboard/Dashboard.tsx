import React from 'react';
import {motion} from 'framer-motion';
import styled from 'styled-components';
import KPICard from './KPICard';
import {Calendar, Check, Clock, DollarSign} from 'lucide-react';

interface KpiMetrics {
    totalValue: string;
    activeContracts: number;
    expiringCount: number;
    approvalRate: string;
}

interface DashboardProps {
    metrics: KpiMetrics;
}

const DashboardGrid = styled(motion.div)`
    width: 100%;
    margin: 0 auto;
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
`;

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

const Dashboard: React.FC<DashboardProps> = ({metrics}) => {
    const DASHBOARD_KPI_DATA = [
        {
            title: "AVG. PROCESSING TIME",
            value: "4.2 days",
            change: "-12% from last month",
            $trend: "down" as 'up' | 'down' | 'warning',
            icon: Clock,
            $color: "blue" as 'blue' | 'green' | 'yellow' | 'purple',
        },
        {
            title: "APPROVAL RATE",
            value: metrics.approvalRate,
            change: "+5% from last month",
            $trend: "up" as 'up' | 'down' | 'warning',
            icon: Check,
            $color: "green" as 'blue' | 'green' | 'yellow' | 'purple',
        },
        {
            title: "EXPIRING (30 DAYS)",
            value: String(metrics.expiringCount),
            change: "Needs attention",
            $trend: "warning" as 'up' | 'down' | 'warning',
            icon: Calendar,
            $color: "yellow" as 'blue' | 'green' | 'yellow' | 'purple',
        },
        {
            title: "TOTAL CONTRACT VALUE",
            value: metrics.totalValue,
            change: "+18% from last quarter",
            $trend: "up" as 'up' | 'down' | 'warning',
            icon: DollarSign,
            $color: "purple" as 'blue' | 'green' | 'yellow' | 'purple',
        },
    ];

    return (
        <DashboardGrid
            variants={CONTAINER_VARIANTS}
            initial="hidden"
            animate="visible"
        >
            {DASHBOARD_KPI_DATA.map((card) => (
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
        </DashboardGrid>
    );
};

export default Dashboard;