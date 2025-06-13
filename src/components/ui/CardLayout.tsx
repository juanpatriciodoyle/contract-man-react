import styled from 'styled-components';
import {motion} from 'framer-motion';

interface CardLayoutProps {
    $padding?: string;
    $marginTop?: string;
}

export const CardLayout = styled(motion.div)<CardLayoutProps>`
    background-color: #ffffff;
    border-radius: 0.75rem;
    padding: ${({ $padding }) => $padding || '1.5rem'};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07);
    margin-top: ${({ $marginTop }) => $marginTop || '0'};
    align-items: center;
`;