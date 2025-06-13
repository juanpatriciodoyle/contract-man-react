import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ActionButton = styled.button<{ $color?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #f3f4f6;
    border: 1px solid #e5e7eb;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: ${({ $color }) => $color ? $color : '#3b82f6'};
        background-color: #e5e7eb;
    }
`;

export const ActionIcons = styled.div`
    display: flex;
    gap: 0.75rem;
`;

export const Avatar = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #e5e7eb;
    color: #4b5563;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 0.75rem;
    text-transform: uppercase;
`;

export const VendorCell = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 500;
`;

export const ContractTitle = styled.div`
    font-weight: 500;
`;

export const AIScoreWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const ScoreBar = styled.div`
    width: 80px;
    height: 8px;
    background-color: #e0e7ff;
    border-radius: 4px;
    overflow: hidden;
`;

export const ScoreFill = styled.div<{ $score: number }>`
    width: ${({ $score }) => $score}%;
    height: 100%;
    background-color: #4f46e5;
    border-radius: 4px;
`;

export const ScoreText = styled.span`
    font-weight: 500;
    min-width: 50px;
    color: #4f46e5;
`;

export const AIScore: React.FC<{ score: number }> = ({score}) => (
    <AIScoreWrapper>
        <ScoreBar>
            <ScoreFill $score={score}/>
        </ScoreBar>
        <ScoreText>{score.toFixed(2)}%</ScoreText>
    </AIScoreWrapper>
);

export const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length > 1 && parts[0] && parts[1]) {
        return `${parts[0][0]}${parts[1][0]}`;
    }
    return name.substring(0, 2);
};

export const TableRowAnimated = styled(motion.tr)``;