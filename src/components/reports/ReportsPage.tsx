import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Check, Clock, DollarSign, Download, FileText, Users} from 'lucide-react';
import KPICard from '../dashboard/KPICard';
import {Subtitle, Title} from '../ui/text';
import StatusProgressBarChart from '../ui/statusProgressBarChart';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';

const PageWrapper = styled.div`
    flex-grow: 1;
    padding: 2rem 2rem;
    height: 100vh;
    overflow-y: auto;
`;

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

const ChartGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 2.5rem;

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

const SectionTitle = styled.h3`
    font-weight: 600;
    color: #111827;
    margin: 0 0 1.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const MonthlyTrendItem = styled.li`
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

const RiskAnalysisGrid = styled(AnalyticsGrid)`
    grid-template-columns: repeat(1, 1fr);
    margin-top: 2.5rem;

    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

const RiskCategoryCard = styled(CardWrapper)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const RiskLevelRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #4b5563;
`;

const RiskLevelBarContainer = styled.div`
    flex-grow: 1;
    height: 8px;
    background-color: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
    margin: 0 0.5rem;
`;

const RiskLevelBarFill = styled.div<{ $width: string; $color: string }>`
    width: ${({$width}) => $width};
    height: 100%;
    background-color: ${({$color}) => $color};
    border-radius: 4px;
`;

const ExportOptionsContainer = styled(CardWrapper)`
    margin-top: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ExportButtons = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
`;

const ExportButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: 0.5rem;
    background-color: #f3f4f6;
    color: #4b5563;
    border: 1px solid #e5e7eb;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #e5e7eb;
        color: #111827;
    }

    svg {
        color: #6b7280;
    }
`;

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
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

const RISK_ANALYSIS_CATEGORY_DATA = [
    {
        category: 'Financial Risk',
        levels: [
            {label: 'Low', percentage: 65, color: '#10B981'},
            {label: 'Medium', percentage: 25, color: '#FBBF24'},
            {label: 'High', percentage: 10, color: '#EF4444'},
        ],
    },
    {
        category: 'Compliance Risk',
        levels: [
            {label: 'Low', percentage: 70, color: '#10B981'},
            {label: 'Medium', percentage: 20, color: '#FBBF24'},
            {label: 'High', percentage: 10, color: '#EF4444'},
        ],
    },
    {
        category: 'Operational Risk',
        levels: [
            {label: 'Low', percentage: 55, color: '#10B981'},
            {label: 'Medium', percentage: 35, color: '#FBBF24'},
            {label: 'High', percentage: 10, color: '#EF4444'},
        ],
    },
    {
        category: 'Legal Risk',
        levels: [
            {label: 'Low', percentage: 80, color: '#10B981'},
            {label: 'Medium', percentage: 15, color: '#FBBF24'},
            {label: 'High', percentage: 5, color: '#EF4444'},
        ],
    },
];

const ReportsPage: React.FC = () => {
    const handleExportPdf = async () => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;
        let cursorY = margin;

        const sectionsToExport = [
            document.getElementById('kpi-section'),
            document.getElementById('monthly-trends-section'),
            document.getElementById('top-vendors-section-wrapper'),
            document.getElementById('risk-analysis-section'),
            document.getElementById('export-options-section'),
        ];

        const addHeaderAndFooter = (pageNumber: number, totalPages: number) => {
            pdf.setFontSize(10);
            pdf.setTextColor(150);
            pdf.text("HCLSoftware - Contract Man", margin, margin);
            pdf.text(`Page ${pageNumber} of ${totalPages}`, pdfWidth - margin, margin, {align: 'right'});
        };

        let currentPage = 1;

        addHeaderAndFooter(currentPage, 0);

        for (const section of sectionsToExport) {
            if (section) {
                const canvas = await html2canvas(section, {
                    scale: 3,
                    useCORS: true,
                    logging: false,
                    scrollY: -window.scrollY,
                    windowWidth: document.documentElement.offsetWidth,
                    windowHeight: document.documentElement.offsetHeight,
                });

                const imgData = canvas.toDataURL('image/png');
                const imgWidth = pdfWidth - (2 * margin);
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                if (cursorY + imgHeight + margin > pdfHeight) {
                    pdf.addPage();
                    currentPage++;
                    cursorY = margin;
                    addHeaderAndFooter(currentPage, 0);
                }

                pdf.addImage(imgData, 'PNG', margin, cursorY, imgWidth, imgHeight);
                cursorY += imgHeight + margin;
            }
        }

        const totalPages = pdf.internal.pages.length - 1;

        for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            addHeaderAndFooter(i, totalPages);
        }

        pdf.save('ContractMan_Reports_Outstanding.pdf');
    };

    const handleExportExcel = () => {
        const workbook = XLSX.utils.book_new();

        const kpiFlatData = KPI_REPORTS_DATA.map(kpi => ({
            Title: kpi.title,
            Value: kpi.value,
            Change: kpi.change,
            Trend: kpi.$trend,
        }));
        XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(kpiFlatData), "KPI Summary");

        XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(MONTHLY_CONTRACT_TRENDS_DATA), "Monthly Trends");

        const vendorsFlatData = TOP_PERFORMING_VENDORS_DATA.map(vendor => ({
            Vendor: vendor.label,
            Count: vendor.count,
            Value: vendor.value,
            ApprovalPercentage: `${vendor.percentage}%`,
        }));
        XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(vendorsFlatData), "Top Vendors");

        const riskFlatData: any[] = [];
        RISK_ANALYSIS_CATEGORY_DATA.forEach(category => {
            category.levels.forEach(level => {
                riskFlatData.push({
                    Category: category.category,
                    Level: level.label,
                    Percentage: `${level.percentage}%`,
                });
            });
        });
        XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(riskFlatData), "Risk Analysis");

        const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
        const data = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
        FileSaver.saveAs(data, 'ContractMan_Full_Report.xlsx');
    };

    const handleExportCsv = () => {
        const allData: any[] = [];

        allData.push(['--- KPI Summary ---']);
        allData.push(['Title', 'Value', 'Change', 'Trend']);
        KPI_REPORTS_DATA.forEach(kpi => {
            allData.push([kpi.title, kpi.value, kpi.change, kpi.$trend]);
        });
        allData.push(['']);

        allData.push(['--- Monthly Contract Trends ---']);
        allData.push(['Month', 'Contracts', 'Value', 'Approved']);
        MONTHLY_CONTRACT_TRENDS_DATA.forEach(item => {
            allData.push([item.month, item.contracts, item.value, item.approved]);
        });
        allData.push(['']);

        allData.push(['--- Top Performing Vendors ---']);
        allData.push(['Vendor', 'Count', 'Value', 'ApprovalPercentage']);
        TOP_PERFORMING_VENDORS_DATA.forEach(vendor => {
            allData.push([vendor.label, vendor.count, vendor.value, `${vendor.percentage}%`]);
        });
        allData.push(['']);

        allData.push(['--- Risk Analysis by Category ---']);
        allData.push(['Category', 'Level', 'Percentage']);
        RISK_ANALYSIS_CATEGORY_DATA.forEach(category => {
            category.levels.forEach(level => {
                allData.push([category.category, level.label, `${level.percentage}%`]);
            });
        });
        allData.push(['']);

        const csvContent = allData.map(row =>
            row.map((field: any) => {
                let value = String(field);
                if (value.includes(',') || value.includes('\n') || value.includes('"')) {
                    value = `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            }).join(',')
        ).join('\n');

        const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
        FileSaver.saveAs(blob, "ContractMan_Full_Report.csv");
    };

    return (
        <PageWrapper>
            <Title>Reports & Analytics</Title>
            <Subtitle>Comprehensive insights and performance metrics</Subtitle>

            <AnalyticsGrid id="kpi-section" variants={containerVariants} initial="hidden" animate="visible">
                {KPI_REPORTS_DATA.map((card) => (
                    <motion.div key={card.title} variants={itemVariants}>
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
                <CardWrapper id="monthly-trends-section">
                    <SectionTitle>
                        Monthly Contract Trends
                    </SectionTitle>
                    <ul>
                        {MONTHLY_CONTRACT_TRENDS_DATA.map((item) => (
                            <MonthlyTrendItem key={item.month}>
                                <span>{item.month}</span>
                                <span>{item.contracts} contracts</span>
                                <span>{item.value}</span>
                                <span>{item.approved} approved</span>
                            </MonthlyTrendItem>
                        ))}
                    </ul>
                </CardWrapper>
                <div id="top-vendors-section-wrapper">
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
                        titleIcon={Users}
                    />
                </div>
            </ChartGrid>

            <SectionTitle>Risk Analysis by Category</SectionTitle>
            <RiskAnalysisGrid id="risk-analysis-section" variants={containerVariants} initial="hidden"
                              animate="visible">
                {RISK_ANALYSIS_CATEGORY_DATA.map((categoryData) => (
                    <motion.div key={categoryData.category} variants={itemVariants}>
                        <RiskCategoryCard>
                            <h4 style={{margin: 0, color: '#111827', fontWeight: 600}}>
                                {categoryData.category}
                            </h4>
                            {categoryData.levels.map((level) => (
                                <RiskLevelRow key={level.label}>
                                    <span>{level.label}</span>
                                    <RiskLevelBarContainer>
                                        <RiskLevelBarFill $width={`${level.percentage}%`} $color={level.color}/>
                                    </RiskLevelBarContainer>
                                    <span>{level.percentage}%</span>
                                </RiskLevelRow>
                            ))}
                        </RiskCategoryCard>
                    </motion.div>
                ))}
            </RiskAnalysisGrid>

            <ExportOptionsContainer id="export-options-section">
                <SectionTitle>Export Options</SectionTitle>
                <ExportButtons>
                    <ExportButton onClick={handleExportPdf}>
                        <Download size={16}/>
                        Export as PDF
                    </ExportButton>
                    <ExportButton onClick={handleExportExcel}>
                        <Download size={16}/>
                        Export as Excel
                    </ExportButton>
                    <ExportButton onClick={handleExportCsv}>
                        <Download size={16}/>
                        Export as CSV
                    </ExportButton>
                </ExportButtons>
            </ExportOptionsContainer>
        </PageWrapper>
    );
};

export default ReportsPage;