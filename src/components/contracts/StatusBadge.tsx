import styled from 'styled-components';
import { Circle, CircleCheck, AlertCircle } from 'lucide-react';
import React, {JSX} from "react";

interface BadgeProps {
    status: string;
}

const statusStyles: { [key: string]: { bg: string; text: string; icon: JSX.Element } } = {
    'Approved': { bg: '#E0F2F1', text: '#00796B', icon: <CircleCheck size={14} /> },
    'Pending': { bg: '#FFFDE7', text: '#F9A825', icon: <Circle size={14} /> },
    'Needs Review': { bg: '#FFF3E0', text: '#EF6C00', icon: <AlertCircle size={14} /> },
    'AI Review': { bg: '#E3F2FD', text: '#1565C0', icon: <Circle size={14} /> },
    'default': { bg: '#F5F5F5', text: '#616161', icon: <Circle size={14} /> }
};

const BadgeWrapper = styled.div<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 9999px; /* pill shape */
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${({ status }) => (statusStyles[status] || statusStyles.default).bg};
  color: ${({ status }) => (statusStyles[status] || statusStyles.default).text};

  svg {
    color: ${({ status }) => (statusStyles[status] || statusStyles.default).text};
  }
`;


export const StatusBadge: React.FC<BadgeProps> = ({ status }) => {
    const currentStatus = statusStyles[status] ? status : 'default';

    return (
        <BadgeWrapper status={currentStatus}>
            {statusStyles[currentStatus].icon}
            <span>{status}</span>
        </BadgeWrapper>
    )
}