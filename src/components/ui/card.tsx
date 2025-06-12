import styled from 'styled-components';

export const Card = styled.div`
    background-color: #ffffff;
    color: #111827;
    border-radius: 0.75rem;
    border: 1px solid #e5e7eb;

    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &:hover {
        transform: translateY(-4px);
        box-shadow: rgba(0, 0, 0, 0.1) 0 20px 40px;

    }
`;

export const CardContent = styled.div`
    padding: 1.5rem;
`;