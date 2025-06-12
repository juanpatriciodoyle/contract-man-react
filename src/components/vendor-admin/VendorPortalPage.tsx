import React from 'react';
import styled from 'styled-components';
import { Users, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import KPICard from '../dashboard/KPICard';
import { motion } from 'framer-motion';
import {Subtitle, Title} from "../ui/text";
import {Table} from "../ui/table";

const PageWrapper = styled.div`
  flex-grow: 1;
  padding: 2rem 3rem;
  height: 100vh;
  overflow-y: auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RegisterButton = styled.button`
  background-color: #4f46e5;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #4338ca;
  }
`;

const KpiGrid = styled(motion.div)`
    display: grid;
    gap: 2.5rem; /* Consistent with DashboardGrid spacing */
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

const VendorManagementSection = styled.div`
  background-color: #ffffff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07);
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1.5rem 0;
`;

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
            change: "", // No change text visible in screenshot
            trend: "up", // Default, could be 'neutral' or removed if no trend
            icon: Users,
            color: "blue",
        },
        {
            title: "VERIFIED",
            value: vendorMetrics.verified,
            change: "",
            trend: "up",
            icon: CheckCircle,
            color: "green",
        },
        {
            title: "PENDING",
            value: vendorMetrics.pending,
            change: "",
            trend: "warning",
            icon: Clock,
            color: "yellow",
        },
        {
            title: "REJECTED",
            value: vendorMetrics.rejected,
            change: "",
            trend: "down",
            icon: AlertTriangle,
            color: "purple",
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

    return (
        <PageWrapper>
            <PageHeader>
                <div>
                    <Title>Vendor Portal</Title>
                    <Subtitle>Manage vendor accounts and verification status</Subtitle>
                </div>
                <RegisterButton>
                    + Register Vendor
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
                            trend={card.trend as 'up' | 'down' | 'warning'}
                            icon={card.icon}
                            color={card.color as 'blue' | 'green' | 'yellow' | 'purple'}
                        />
                    </CardRowItem>
                ))}
            </KpiGrid>

            <VendorManagementSection>
                <SectionTitle>Vendor Management (0)</SectionTitle>
                <Table>
                    <thead>
                    <tr>
                        <th>Company</th>
                        <th>Contact</th>
                        <th>Industry</th>
                        <th>Status</th>
                        <th>Registered</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                            No vendors registered yet
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </VendorManagementSection>
        </PageWrapper>
    );
};

export default VendorPortalPage;