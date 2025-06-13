import React from 'react';
import styled from 'styled-components';
import {Subtitle, Title} from '../../ui/text';
import {CheckCircle, ClipboardCheck, CloudUpload, Scan, ShieldCheck} from 'lucide-react';
import ProgressSteps from '../../ui/ProgressSteps'; // Import the new component

const PageWrapper = styled.div`
    flex-grow: 1;
    padding: 2rem 2rem;
    height: 100vh;
    overflow-y: auto;
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
    {id: 1, label: 'Upload Document', icon: CloudUpload},
    {id: 2, label: 'OCR Processing', icon: Scan},
    {id: 3, label: 'Government Verification', icon: ShieldCheck},
    {id: 4, label: 'Review & Submit', icon: ClipboardCheck},
    {id: 5, label: 'Complete', icon: CheckCircle},
];

const VerificationStatusPage: React.FC = () => {
    const CURRENT_STEP = 1;

    return (
        <PageWrapper>
            <Title>Verification Status</Title>
            <Subtitle>Upload and process your contract with AI-powered analysis</Subtitle>

            <ProgressSteps steps={VERIFICATION_STEPS} currentStepId={CURRENT_STEP}/>

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