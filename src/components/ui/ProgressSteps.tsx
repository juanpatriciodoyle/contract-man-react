import React from 'react';
import styled from 'styled-components';
import { CheckCircle, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface Step {
    id: number;
    label: string;
    icon: LucideIcon;
}

interface ProgressStepsProps {
    steps: Step[];
    currentStepId: number;
}

const ProgressStepsContainer = styled.div`
    background-color: #ffffff;
    border-radius: 0.75rem;
    padding: 2.5rem 2rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07);
    margin-bottom: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow-x: auto;
`;

const StepsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
    padding: 0 20px;
`;

const ConnectingLine = styled.div<{ $isActiveSegment: boolean }>`
    flex-grow: 1;
    height: 2px;
    background-color: ${({ $isActiveSegment }) => ($isActiveSegment ? '#4f46e5' : '#e5e7eb')};
    transition: background-color 0.3s ease;
    z-index: 0;
`;

const StepItem = styled.div<{ $active: boolean; $completed: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    cursor: pointer;
    text-align: center;
    width: 120px;
`;

const StepCircle = styled(motion.div)<{ $active: boolean; $completed: boolean }>`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({ $active, $completed }) =>
            $completed ? '#4f46e5' : $active ? '#4f46e5' : '#e5e7eb'};
    color: ${({ $active, $completed }) =>
            $active || $completed ? '#ffffff' : '#9ca3af'};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1rem;
    transition: background-color 0.3s ease, color 0.3s ease;
    border: 2px solid ${({ $active }) => ($active ? '#4f46e5' : 'transparent')};
    box-shadow: ${({ $active }) => ($active ? '0 0 0 3px rgba(79, 70, 229, 0.3)' : 'none')};
`;

const StepLabel = styled.p<{ $active: boolean; $completed: boolean }>`
    margin-top: 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ $active, $completed }) =>
            $completed ? '#4f46e5' : $active ? '#4f46e5' : '#6b7280'};
    word-wrap: break-word;
`;

const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStepId }) => {
    return (
        <ProgressStepsContainer>
            <StepsWrapper>
                {steps.map((step, index) => {
                    const isCompleted = step.id < currentStepId;
                    const isActive = step.id === currentStepId;
                    const IconComponent = step.icon;

                    return (
                        <React.Fragment key={step.id}>
                            <StepItem $active={isActive} $completed={isCompleted}>
                                <StepCircle
                                    $active={isActive}
                                    $completed={isCompleted}
                                    initial={{ scale: 0.8, opacity: 0.5 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                >
                                    {isCompleted ? <CheckCircle size={20} /> : <IconComponent size={20} />}
                                </StepCircle>
                                <StepLabel $active={isActive} $completed={isCompleted}>
                                    {step.label}
                                </StepLabel>
                            </StepItem>
                            {index < steps.length - 1 && (
                                <ConnectingLine $isActiveSegment={step.id <= currentStepId} />
                            )}
                        </React.Fragment>
                    );
                })}
            </StepsWrapper>
        </ProgressStepsContainer>
    );
};

export default ProgressSteps;