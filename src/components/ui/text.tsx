import styled from "styled-components";
import {JSX} from "react";

interface TextProps {
    size?: string;
}

interface SectionHeaderProps extends TextProps {
    as?: keyof JSX.IntrinsicElements;
}

export const Title = styled.h1<TextProps>`
    font-size: ${({ size }) => size || '2rem'};
    font-weight: 700;
    color: #111827;
    margin-top: 0;
    text-align: left;
`;

export const Subtitle = styled.p<TextProps>`
    font-size: ${({ size }) => size || '1rem'};
    color: #6b7280;
    margin-top: -0.5rem;
    margin-bottom: 2.5rem;
    text-align: left;
`;

export const BodyText = styled.p<TextProps>`
    font-size: ${({ size }) => size || '1rem'};
    color: #374151;
    line-height: 1.5;
`;

export const SmallText = styled.span<TextProps>`
    font-size: ${({ size }) => size || '0.875rem'};
    color: #6b7280;
`;

export const StrongText = styled.strong<TextProps>`
    font-weight: 600;
    color: #1f2937;
    font-size: ${({ size }) => size || '1rem'};
`;

export const SectionHeader = styled.h3<SectionHeaderProps>`
    font-size: ${({ size }) => size || '1.25rem'};
    font-weight: 600;
    color: #111827;
    margin: 0 0 1.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;