import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Activity, AlertTriangle, Brain, CheckCircle, Clock, FileText, LineChart, Target, Zap} from 'lucide-react';
import KPICard from '../dashboard/KPICard';
import {Subtitle, Title, SectionHeader} from '../../ui/text'; // Import SectionHeader
import {Chip} from '../../ui/chip';
import StatusProgressBarChart from '../../ui/statusProgressBarChart';
import { CardLayout } from '../../ui/CardLayout';
import { PageContainer } from '../../layout/PageContainer';


const AnalyticsGrid = styled(motion.div)`
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

// SectionTitle styled component is no longer needed here,
// as it will be replaced by SectionHeader.

const RecentAnalysesList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const RecentAnalysisItem = styled.li`
    background-color: #ffffff;
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &:hover {
        transform: translateY(-4px);
        box-shadow: rgba(0, 0, 0, 0.1) 0 20px 40px;
    }
`;

const AnalysisHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
`;

const AnalysisTitle = styled.p`
    font-weight: 600;
    color: #111827;
    margin: 0;
`;

const ConfidenceText = styled.span`
    color: #4f46e5;
    font-weight: 500;
    font-size: 1.1rem;
`;

const KeyFindingsList = styled.ul`
    list-style: disc;
    padding-left: 1.25rem;
    color: #4b5563;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    margin-bottom: 0.75rem;
`;

const Recommendation = styled.p`
    color: #6b7280;
    font-size: 0.9rem;
    margin: 0;
`;

const Divider = styled.div`
    border-top: 1px solid #e5e7eb;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
`;

const ChartGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 1.5rem;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

const ChartWrapper = styled.div`
    height: fit-content;
`;

const KPI_ANALYTICS_DATA = [
    {
        title: 'TOTAL ANALYSES',
        value: '347',
        change: '+23 this week',
        $trend: 'up' as 'up' | 'down' | 'warning',
        icon: FileText,
        $color: 'blue' as 'blue' | 'green' | 'yellow' | 'purple',
    },
    {
        title: 'AVG. CONFIDENCE',
        value: '94.2%',
        change: '+2.3% this month',
        $trend: 'up' as 'up' | 'down' | 'warning',
        icon: Target,
        $color: 'green' as 'blue' | 'green' | 'yellow' | 'purple',
    },
    {
        title: 'AUTOMATION RATE',
        value: '78.5%',
        change: '+5.7% improvement',
        $trend: 'up' as 'up' | 'down' | 'warning',
        icon: Activity,
        $color: 'purple' as 'blue' | 'green' | 'yellow' | 'purple',
    },
    {
        title: 'TIME REDUCTION',
        value: '65.3%',
        change: 'vs manual review',
        $trend: 'up' as 'up' | 'down' | 'warning',
        icon: Clock,
        $color: 'yellow' as 'blue' | 'green' | 'yellow' | 'purple',
    },
];

const RISK_DISTRIBUTION_DATA = [
    {label: 'Low Risk', count: 156, percentage: 45, color: '#10B981'},
    {label: 'Medium Risk', count: 134, percentage: 39, color: '#FBBF24'},
    {label: 'High Risk', count: 57, percentage: 16, color: '#EF4444'},
];

const RECENT_ANALYSES_DATA = [
    {
        title: 'Cloud Infrastructure Services Q4',
        confidence: 96,
        risk: 'Low Risk',
        findings: ['Standard terms', 'Competitive pricing', 'Clear deliverables'],
        recommendation: 'Approve with standard review',
    },
    {
        title: 'Software License Renewal',
        confidence: 88,
        risk: 'Medium Risk',
        findings: ['Price increase noted', 'Terms change required', 'Compliance review needed'],
        recommendation: 'Request negotiation on pricing terms',
    },
    {
        title: 'Security Audit Services',
        confidence: 72,
        risk: 'High Risk',
        findings: ['Unusual liability terms', 'Missing SLA definitions', 'Unclear scope'],
        recommendation: 'Require legal review before approval',
    },
];

const AI_PERFORMANCE_TRENDS_DATA = [
    {
        title: 'Accuracy Rate',
        value: '92.4%',
        change: '-3.2% vs last month',
        $trend: 'down' as 'up' | 'down' | 'warning',
        icon: CheckCircle,
        $color: 'blue' as 'blue' | 'green' | 'yellow' | 'purple',
    },
    {
        title: 'Avg. Processing Time',
        value: '2.3 min',
        change: '-45 sec improvement',
        $trend: 'up' as 'up' | 'down' | 'warning',
        icon: Clock,
        $color: 'green' as 'blue' | 'green' | 'yellow' | 'purple',
    },
    {
        title: 'Risk Detection Rate',
        value: '98.7%',
        change: '+1.8% improvement',
        $trend: 'up' as 'up' | 'down' | 'warning',
        icon: AlertTriangle,
        $color: 'purple' as 'blue' | 'green' | 'yellow' | 'purple',
    },
];

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

const AIAnalyticsDashboard: React.FC = () => {
    return (
        <PageContainer>
            <Title>AI Analytics Dashboard</Title>
            <Subtitle>Advanced insights and automated contract analysis</Subtitle>

            <AnalyticsGrid variants={CONTAINER_VARIANTS} initial="hidden" animate="visible">
                {KPI_ANALYTICS_DATA.map((card) => (
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
            </AnalyticsGrid>

            <SectionHeader>
                <Zap size={20}/>
                AI Performance Trends
            </SectionHeader>
            <AnalyticsGrid variants={CONTAINER_VARIANTS} initial="hidden" animate="visible">
                {AI_PERFORMANCE_TRENDS_DATA.map((card) => (
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
            </AnalyticsGrid>

            <ChartGrid>
                <ChartWrapper>
                    <StatusProgressBarChart
                        title="Risk Distribution"
                        titleIcon={LineChart}
                        data={RISK_DISTRIBUTION_DATA}
                        showItemCountAndPercentage={true}
                        showItemValue={false}
                        showLeftIcon={false}
                        fontScale={1}
                    />
                </ChartWrapper>
                <CardLayout>
                    <SectionHeader>
                        <Brain size={20}/>
                        Recent AI Analyses
                    </SectionHeader>
                    <RecentAnalysesList>
                        {RECENT_ANALYSES_DATA.map((item) => (
                            <RecentAnalysisItem key={item.title}>
                                <AnalysisHeader>
                                    <AnalysisTitle>{item.title}</AnalysisTitle>
                                    <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                                        <p style={{margin: 0, fontSize: '0.9rem', color: '#4b5563'}}>
                                            Confidence: <ConfidenceText>{item.confidence}%</ConfidenceText>
                                        </p>
                                        <Chip
                                            type={item.risk === 'Low Risk' ? 'approved' : item.risk === 'Medium Risk' ? 'pending-review' : 'rejected'}
                                            showIcon={false}
                                        >
                                            {item.risk}
                                        </Chip>
                                    </div>
                                </AnalysisHeader>
                                <p style={{color: '#4b5563', fontSize: '0.9rem', marginBottom: '0.5rem'}}>Key
                                    Findings:</p>
                                <KeyFindingsList>
                                    {item.findings.map((finding, index) => (
                                        <li key={index}>{finding}</li>
                                    ))}
                                </KeyFindingsList>
                                <Divider/>
                                <Recommendation>
                                    <strong style={{fontWeight: 600}}>AI Recommendation:</strong> {item.recommendation}
                                </Recommendation>
                            </RecentAnalysisItem>
                        ))}
                    </RecentAnalysesList>
                </CardLayout>
            </ChartGrid>
        </PageContainer>
    );
};

export default AIAnalyticsDashboard;