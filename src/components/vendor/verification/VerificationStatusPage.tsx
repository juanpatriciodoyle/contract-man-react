import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import {Subtitle, Title} from '../../ui/text';
import {CloudUpload, Scan, ShieldCheck, ClipboardCheck, CheckCircle} from 'lucide-react';
import ProgressSteps from '../../ui/progressSteps';
import { CardLayout } from '../../ui/CardLayout';
import { PageContainer } from '../../layout/PageContainer';


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

const ChosenFileName = styled.p`
    font-weight: 600;
    color: #4f46e5;
    margin: 0.5rem 0 0;
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

const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
const SUPPORTED_FORMATS_TEXT = 'Supported formats: PDF, JPG, JPEG, PNG (Max 10MB)';


const VerificationStatusPage: React.FC = () => {
    const CURRENT_STEP = 1;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleChooseFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (ALLOWED_FILE_TYPES.includes(file.type) && file.size <= 10 * 1024 * 1024) {
                setSelectedFile(file);
            } else {
                setSelectedFile(null);
                alert('Invalid file type or size. Please upload a PDF, JPG, JPEG, or PNG file up to 10MB.');
            }
        }
    };

    return (
        <PageContainer>
            <Title>Verification Status</Title>
            <Subtitle>Upload and process your contract with AI-powered analysis</Subtitle>

            <ProgressSteps steps={VERIFICATION_STEPS} currentStepId={CURRENT_STEP} />

            <CardLayout $marginTop="2.5rem" $padding="2.5rem">
                <h3 style={{fontSize: '1.25rem', fontWeight: 600, color: '#111827', marginBottom: '1.5rem'}}>
                    Upload Contract Document
                </h3>
                <DropArea>
                    <UploadIcon size={48}/>
                    {selectedFile ? (
                        <ChosenFileName>{selectedFile.name}</ChosenFileName>
                    ) : (
                        <UploadText>Drag and drop your contract or click to browse</UploadText>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        style={{ display: 'none' }}
                    />
                    <ChooseFileButton onClick={handleChooseFileClick}>Choose File</ChooseFileButton>
                </DropArea>
                <SupportedFormats>
                    {SUPPORTED_FORMATS_TEXT}
                </SupportedFormats>
            </CardLayout>
        </PageContainer>
    );
};

export default VerificationStatusPage;