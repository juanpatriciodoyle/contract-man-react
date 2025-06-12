import React, {JSX} from 'react';
import styled from 'styled-components';
import {AlertCircle, Circle, CircleCheck, Clock, Search} from 'lucide-react';

interface BadgeProps {
    status: string;
}

const STATUS_STYLES: { [key: string]: { bg: string; text: string; icon: JSX.Element } } = {
    'Approved': {bg: '#dcfce7', text: '#16a34a', icon: <CircleCheck size={14}/>},
    'Needs Review': {bg: '#fee2e2', text: '#dc2626', icon: <AlertCircle size={14}/>},
    'Pending': {bg: '#fef9c3', text: '#ca8a04', icon: <Clock size={14}/>},
    'AI Review': {bg: '#e0e7ff', text: '#4f46e5', icon: <Search size={14}/>},
    'Accepted': {bg: '#dcfce7', text: '#16a34a', icon: <CircleCheck size={14}/>},
    'Rejected': {bg: '#fee2e2', text: '#dc2626', icon: <AlertCircle size={14}/>},
    'Unknown': {bg: '#f3f4f6', text: '#4b5563', icon: <Circle size={14}/>},
};

type StatusKey = keyof typeof STATUS_STYLES;

const BadgeWrapper = styled.div<{ statusKey: StatusKey }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 500;

    background-color: ${({statusKey}) => STATUS_STYLES[statusKey].bg};
    color: ${({statusKey}) => STATUS_STYLES[statusKey].text};

    svg {
        color: ${({statusKey}) => STATUS_STYLES[statusKey].text};
    }
`;

export const StatusBadge: React.FC<BadgeProps> = ({status}) => {
    const statusKey = (status && STATUS_STYLES[status] ? status : 'Unknown') as StatusKey;

    return (
        <BadgeWrapper statusKey={statusKey}>
            {STATUS_STYLES[statusKey].icon}
            <span>{status || 'Unknown'}</span>
        </BadgeWrapper>
    );
};