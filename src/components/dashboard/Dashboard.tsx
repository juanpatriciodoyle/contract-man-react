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
    gap: 1.5rem;

    grid-template-columns: repeat(1, 1fr);

    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

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

const Dashboard: React.FC<DashboardProps> = ({metrics}) => {
    const KPI_DATA = [
        {
            title: "AVG. PROCESSING TIME",
            value: "4.2 days",
            change: "-12% from last month",
            trend: "down",
            icon: Clock,
            color: "blue",
        },
        {
            title: "APPROVAL RATE",
            value: metrics.approvalRate,
            change: "+5% from last month",
            trend: "up",
            icon: Check,
            color: "green",
        },
        {
            title: "EXPIRING (30 DAYS)",
            value: String(metrics.expiringCount),
            change: "Needs attention",
            trend: "warning",
            icon: Calendar,
            color: "yellow",
        },
        {
            title: "TOTAL CONTRACT VALUE",
            value: metrics.totalValue,
            change: "+18% from last quarter",
            trend: "up",
            icon: DollarSign,
            color: "purple",
        },
    ];

    return (
        <DashboardGrid
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {KPI_DATA.map((card) => (
                <motion.div key={card.title} variants={itemVariants}>
                    <KPICard
                        title={card.title}
                        value={card.value}
                        change={card.change}
                        trend={card.trend as 'up' | 'down' | 'warning'}
                        icon={card.icon}
                        color={card.color as 'blue' | 'green' | 'yellow' | 'purple'}
                    />
                </motion.div>
            ))}
        </DashboardGrid>
    );
};

export default Dashboard;