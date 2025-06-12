import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

export interface ChartDataItem {
    label: string;
    count: number;
    percentage: number;
    color: string;
    icon?: React.ElementType;
    value?: string;
}

interface StatusProgressBarChartProps {
    title: string;
    data: ChartDataItem[];
    showItemCountAndPercentage?: boolean;
    showItemValue?: boolean;
    showLeftIcon?: boolean;
    fontScale?: number;
    titleIcon?: React.ElementType;
}

const CardWrapper = styled.div`
    background-color: #ffffff;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07);
    height: 100%;
`;

const CardTitle = styled.h3`
    font-weight: 600;
    color: #111827;
    margin: 0 0 1.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const ContentWrapper = styled.div`
    display: flex;
    gap: 2rem;
    flex-direction: column; /* Changed to column for better vertical flow */
`;

const LegendItem = styled.div<{ color: string; fontScale: number }>`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: ${({fontScale}) => 0.875 * fontScale}rem;
    color: #374151;

    &::before {
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: ${(props) => props.color};
    }
`;

const BarWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

const Bar = styled.div`
    flex-grow: 1;
    height: 10px;
    background-color: #e0e7ff;
    border-radius: 5px;
    overflow: hidden;
`;

const BarFill = styled(motion.div)<{ $customColor: string }>` /* Changed to motion.div */
    height: 100%;
    background-color: ${({$customColor}) => $customColor};
    border-radius: 5px;
`;

const CountLabel = styled.span<{ fontScale: number }>`
    font-size: ${({fontScale}) => 0.875 * fontScale}rem;
    font-weight: 500;
    color: #4b5563;
    min-width: 20px;
    text-align: right;
`;

const ValueLabel = styled.p<{ fontScale: number }>`
    margin: 0;
    font-weight: 600;
    color: #1f2937;
    font-size: ${({fontScale}) => 1 * fontScale}rem;
    min-width: 50px; /* Give it a min-width to help alignment */
    text-align: right; /* Ensure text aligns to the right */
`;

const LeftIconWrapper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #E0E7FF;
    color: #4F46E5;
    flex-shrink: 0;
`;


const StatusProgressBarChart: React.FC<StatusProgressBarChartProps> = ({
                                                                           title,
                                                                           data,
                                                                           showItemCountAndPercentage = true,
                                                                           showItemValue = false,
                                                                           showLeftIcon = false,
                                                                           fontScale = 1,
                                                                           titleIcon: TitleIcon,
                                                                       }) => {

    return (
        <CardWrapper>
            <CardTitle>
                {TitleIcon && <TitleIcon size={20} style={{marginRight: '0.5rem'}}/>}
                {title}
            </CardTitle>
            <ContentWrapper>
                {data.map(item => (
                    <BarWrapper key={item.label}>
                        {showLeftIcon && item.icon && (
                            <LeftIconWrapper>
                                <item.icon size={20}/>
                            </LeftIconWrapper>
                        )}
                        <LegendItem color={item.color} fontScale={fontScale}>
                            {item.label}
                        </LegendItem>
                        <Bar>
                            <BarFill
                                $customColor={item.color}
                                initial={{width: '0%'}}
                                animate={{width: `${item.percentage}%`}}
                                transition={{duration: 0.8, ease: 'easeOut'}}
                            />
                        </Bar>
                        {showItemCountAndPercentage && (
                            <>
                                <CountLabel fontScale={fontScale}>{item.count} contracts</CountLabel>
                                <CountLabel fontScale={fontScale}>({item.percentage}%)</CountLabel>
                            </>
                        )}
                        {showItemValue && item.value && (
                            <ValueLabel fontScale={fontScale}>{item.value}</ValueLabel>
                        )}
                    </BarWrapper>
                ))}
            </ContentWrapper>
        </CardWrapper>
    );
};

export default StatusProgressBarChart;