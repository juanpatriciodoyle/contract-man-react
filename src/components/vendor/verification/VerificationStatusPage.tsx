import React from 'react';
import styled from 'styled-components';
import {Subtitle, Title} from '../../ui/text';
import {CheckCircle, CloudUpload} from 'lucide-react';

const PageWrapper = styled.div`
    flex-grow: 1;
    padding: 2rem 2rem;
    height: 100vh;
    overflow-y: auto;
`;

const ProgressContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    position: relative;
    padding: 0 2rem;

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 2rem;
        right: 2rem;
        height: 2px;
        background-color: #e5e7eb;
        transform: translateY(-50%);
        z-index: 0;
    }
`;

const StepContainer = styled.div<{ $active: boolean; $completed: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    position: relative;
    cursor: pointer;
`;

const StepCircle = styled.div<{ $active: boolean; $completed: boolean }>`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({$active, $completed}) =>
            $completed ? '#22c55e' : $active ? '#4f46e5' : '#e5e7eb'};
    color: ${({$active, $completed}) =>
            $completed ? '#ffffff' : $active ? '#ffffff' : '#9ca3af'};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1rem;
    transition: background-color 0.3s ease, color 0.3s ease;
`;

const StepLabel = styled.p<{ $active: boolean; $completed: boolean }>`
    margin-top: 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({$active, $completed}) =>
            $completed ? '#10b981' : $active ? '#4f46e5' : '#6b7280'};
    text-align: center;
    width: 100px;
    word-wrap: break-word;
`;

const UploadSection = styled.div`
    background-color: #ffffff;
    border-radius: 0.75rem;
    padding: 2.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07);
    margin-top: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const DropArea = styled.div`
    border: 2px dashed #d1d5db;
    border-radius: 0.5rem;
    padding: 3rem 2rem;
    text-align: center;
    background-color: #f9fafb;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const UploadIcon = styled(CloudUpload)`
    color: #9ca3af;
`;

const UploadText = styled.p`
    font-weight: 500;
    color: #4b5563;
    margin: 0;
`;

const ChooseFileButton = styled.button`
    background-color: #4f46e5;
    color: #ffffff;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #4338ca;
    }
`;

const SupportedFormats = styled.p`
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 1.5rem;
`;

const VERIFICATION_STEPS = [
    {id: 1, label: 'Upload Document'},
    {id: 2, label: 'OCR Processing'},
    {id: 3, label: 'Government Verification'},
    {id: 4, label: 'Review & Submit'},
    {id: 5, label: 'Complete'},
];

const VerificationStatusPage: React.FC = () => {
    const CURRENT_STEP = 1;

    return (
        <PageWrapper>
            <Title>Verification Status</Title>
            <Subtitle>Upload and process your contract with AI-powered analysis</Subtitle>

            <ProgressContainer>
                {VERIFICATION_STEPS.map((step) => (
                    <StepContainer
                        key={step.id}
                        $active={step.id === CURRENT_STEP}
                        $completed={step.id < CURRENT_STEP}
                    >
                        <StepCircle
                            $active={step.id === CURRENT_STEP}
                            $completed={step.id < CURRENT_STEP}
                        >
                            {step.id < CURRENT_STEP ? <CheckCircle size={20}/> : step.id}
                        </StepCircle>
                        <StepLabel
                            $active={step.id === CURRENT_STEP}
                            $completed={step.id < CURRENT_STEP}
                        >
                            {step.label}
                        </StepLabel>
                    </StepContainer>
                ))}
            </ProgressContainer>

            <UploadSection>
                <h3 style={{fontSize: '1.25rem', fontWeight: 600, color: '#111827', marginBottom: '1.5rem'}}>
                    Upload Contract Document
                </h3>
                <DropArea>
                    <UploadIcon size={48}/>
                    <UploadText>Drag and drop your contract or click to browse</UploadText>
                    <ChooseFileButton>Choose File</ChooseFileButton>
                </DropArea>
                <SupportedFormats>
                    Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
                </SupportedFormats>
            </UploadSection>
        </PageWrapper>
    );
};

export default VerificationStatusPage;