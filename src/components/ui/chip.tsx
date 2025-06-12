// src/components/ui/chip/index.tsx (Updated)

import React, { JSX } from 'react';
import styled from 'styled-components';
import { Circle, CircleCheck, AlertCircle, Search, Clock } from 'lucide-react';

interface ChipProps {
    type: 'approved' | 'pending-review' | 'need-more-info' | 'rejected' | 'ai-review' | 'accepted' | 'unknown';
    children: React.ReactNode;
}

const CHIP_STYLES: { [key: string]: { bg: string; text: string; icon: JSX.Element } } = {
    'approved': { bg: '#dcfce7', text: '#16a34a', icon: <CircleCheck size={14} /> },
    'pending-review': { bg: '#fef9c3', text: '#ca8a04', icon: <Clock size={14} /> },
    'need-more-info': { bg: '#FEE2E2', text: '#EF4444', icon: <AlertCircle size={14} /> },
    'rejected': { bg: '#fee2e2', text: '#dc2626', icon: <AlertCircle size={14} /> },
    'ai-review': { bg: '#e0e7ff', text: '#4f46e5', icon: <Search size={14} /> },
    'accepted': { bg: '#dcfce7', text: '#16a34a', icon: <CircleCheck size={14} /> },
    'unknown': { bg: '#f3f4f6', text: '#4b5563', icon: <Circle size={14} /> },
};

type ChipKey = keyof typeof CHIP_STYLES;

// Update BadgeWrapper to accept '$chipType'
const BadgeWrapper = styled.div<{ $chipType: ChipKey }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 500;

    background-color: ${({ $chipType }) => CHIP_STYLES[$chipType].bg}; // Use $chipType
    color: ${({ $chipType }) => CHIP_STYLES[$chipType].text}; // Use $chipType

    svg {
        color: ${({ $chipType }) => CHIP_STYLES[$chipType].text}; // Use $chipType
    }
`;

export const Chip: React.FC<ChipProps> = ({ type, children }) => {
    const chipType = (type && CHIP_STYLES[type] ? type : 'unknown') as ChipKey;

    return (
        <BadgeWrapper $chipType={chipType}> {/* Pass $chipType */}
            {CHIP_STYLES[chipType].icon}
            <span>{children}</span>
        </BadgeWrapper>
    );
};