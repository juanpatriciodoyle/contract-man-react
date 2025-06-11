import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {ResponseItem} from '../../hooks/useGetContracts';
import ContractCard from './ContractCard';


const ListWrapper = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    margin: 20px auto;
    padding: 0 20px;
`;

const listVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

interface ContractListProps {
    items: ResponseItem[];
}

const ContractList: React.FC<ContractListProps> = ({items}) => {
    return (
        <ListWrapper
            variants={listVariants}
            initial="hidden"
            animate="visible"
        >
            {items.map((item) => (
                <ContractCard key={item['@unid']} contract={item}/>
            ))}
        </ListWrapper>
    );
};

export default ContractList;