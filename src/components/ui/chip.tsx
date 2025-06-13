import React, { JSX } from 'react';
import styled from 'styled-components';
import { Circle, CircleCheck, AlertCircle, Search, Clock } from 'lucide-react';

export interface ChipProps {
    type: 'approved' | 'pending-review' | 'need-more-info' | 'rejected' | 'ai-review' | 'accepted' | 'unknown';
    children: React.ReactNode;
    showIcon?: boolean;
}

export const CHIP_STYLES: { [key: string]: { bg: string; text: string; icon: JSX.Element } } = {
    'approved': { bg: '#dcfce7', text: '#16a34a', icon: <CircleCheck size={14} /> },
    'pending-review': { bg: '#fef9c3', text: '#ca8a04', icon: <Clock size={14} /> },
    'need-more-info': { bg: '#FEE2E2', text: '#EF4444', icon: <AlertCircle size={14} /> },
    'rejected': { bg: '#fee2e2', text: '#dc2626', icon: <AlertCircle size={14} /> },
    'ai-review': { bg: '#e0e7ff', text: '#4f46e5', icon: <Search size={14} /> },
    'accepted': { bg: '#dcfce7', text: '#16a34a', icon: <CircleCheck size={14} /> },
    'unknown': { bg: '#f3f4f6', text: '#4b5563', icon: <Circle size={14} /> },
};

type ChipKey = keyof typeof CHIP_STYLES;

const BadgeWrapper = styled.div<{ $chipType: ChipKey }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 500;

    background-color: ${({ $chipType }) => CHIP_STYLES[$chipType].bg};
    color: ${({ $chipType }) => CHIP_STYLES[$chipType].text};

    svg {
        color: ${({ $chipType }) => CHIP_STYLES[$chipType].text};
    }
`;

export const Chip: React.FC<ChipProps> = ({ type, children, showIcon = true }) => {
    const chipType = (type && CHIP_STYLES[type] ? type : 'unknown') as ChipKey;

    return (
        <BadgeWrapper $chipType={chipType}>
            {showIcon && CHIP_STYLES[chipType].icon}
            <span>{children}</span>
        </BadgeWrapper>
    );
};