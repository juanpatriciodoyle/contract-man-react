import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import KPICard from './KPICard';
import { DollarSign, Check, Calendar, Package } from 'lucide-react';

// Interface for the props our Dashboard will receive
interface KpiMetrics {
    totalValue: string;
    approvalRate: string;
    expiringCount: number;
    activeContracts: number;
}

interface DashboardProps {
    metrics: KpiMetrics;
}

// This styled-component creates our responsive grid
const DashboardGrid = styled(motion.div)`
    width: 100%;
    max-width: 80rem;
    margin: 0 auto;
    padding: 1rem;

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
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    }
};

const Dashboard: React.FC<DashboardProps> = ({ metrics }) => {
    // The KPI_DATA array is now built dynamically from the props
    const KPI_DATA = [
        {
            title: "TOTAL CONTRACT VALUE",
            value: metrics.totalValue,
            change: "+18% from last quarter",
            trend: "up",
            icon: DollarSign,
            color: "purple",
        },
        {
            title: "ACTIVE CONTRACTS",
            value: `${metrics.activeContracts}`,
            change: "All contracts",
            trend: "up",
            icon: Package,
            color: "green",
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