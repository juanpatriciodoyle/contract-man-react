import {useEffect, useState} from 'react';
import data from '../data.json';

export interface ResponseItem {
    '@index': string;
    '@unid': string;
    'CDRL_RESPONSIBILITY': string;
    'APPLIES_TO': string;
    '$3': string;
    '$6': string;
    'CDRL_DUE_DATE': string;
    'KEYED_EVENT': string;
    'OFFSET': string;
    'PCN': string;
    'TITLE': string;
    '@noteid': number;
    'ID': string;
    'CDRL_SUBMIT_DATE'?: string;
    'CDRL_RESPONSE_DATE'?: string;
    'RESP_DUE_DATE'?: string;
    'Event_Date'?: string;
}

export interface ApiResponse {
    opstatus: number;
    responseList: ResponseItem[];
    httpStatusCode: number;
}

export const useGetContracts = (claimsToken: string) => {
    const [contracts, setContracts] = useState<ApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!claimsToken) {
            return;
        }

        const fetchContracts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const request = await fetch(data.BASE_URL + data.getContractsParams.headers.url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-voltmx-authorization": claimsToken,
                    },
                    body: JSON.stringify({
                        "VIEW": data.getContractsParams.body.VIEW,
                        "SCOPE": data.getContractsParams.body.SCOPE
                    }),
                });

                if (!request.ok) {
                    throw new Error(`Server responded with ${request.status} (${request.statusText})`);
                }

                const jsonData: ApiResponse = await request.json();
                setContracts(jsonData);

            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContracts();

    }, [claimsToken]);

    return {contracts, isLoading, error};
};