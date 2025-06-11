import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {ResponseItem} from '../../hooks/useGetContracts';

const CardWrapper = styled(motion.div)`
    background-color: #3a3f4a;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid #4a4f5a;
`;

const CardTitle = styled.h3`
    margin-top: 0;
    color: #a6d8ff;
    font-size: 1.2rem;
    border-bottom: 1px solid #4a4f5a;
    padding-bottom: 10px;
    margin-bottom: 15px;
`;

const CardId = styled.p`
    font-family: monospace;
    font-size: 0.8rem;
    color: #8c92a1;
    margin-bottom: 15px;
`;

const CardDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 0.9rem;

    span {
        color: #d1d5db;
    }

    strong {
        color: #8c92a1;
        margin-right: 5px;
    }
`;


const cardVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {duration: 0.5}}
};


interface ContractCardProps {
    contract: ResponseItem;
}

const ContractCard: React.FC<ContractCardProps> = ({contract}) => {
    return (
        <CardWrapper variants={cardVariants}>
            <CardTitle>{contract.TITLE}</CardTitle>
            <CardId>ID: {contract.ID}</CardId>
            <CardDetails>
                <span><strong>Event:</strong> {contract.KEYED_EVENT}</span>
                <span><strong>Assigned to:</strong> {contract.CDRL_RESPONSIBILITY}</span>
                <span><strong>Due:</strong> {new Date(contract.CDRL_DUE_DATE).toLocaleDateString()}</span>
            </CardDetails>
        </CardWrapper>
    );
};

export default ContractCard;