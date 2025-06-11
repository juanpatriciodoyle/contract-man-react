import {useEffect, useState} from 'react';
import data from '../data.json';

export interface ResultProps {
    claims_token: string;
    refresh_token: string;
}

export const useGetTokens = (): ResultProps | null => {
    const [tokens, setTokens] = useState<ResultProps | null>(null);

    useEffect(() => {
        const fetchAndSetTokens = async () => {
            try {
                const request = await fetch(data.BASE_URL + data.getTokensParams.headers.url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Voltmx-App-Key": data.getTokensParams.headers["X-Voltmx-App-Key"],
                        "X-Voltmx-App-Secret": data.getTokensParams.headers["X-Voltmx-App-Secret"],
                    },
                    body: JSON.stringify({
                        "userid": data.getTokensParams.domino_user.userid,
                        "password": data.getTokensParams.domino_user.password
                    }),
                });

                if (!request.ok) {
                    throw new Error(`HTTP error! status: ${request.status}`);
                }

                const jsonData = await request.json();

                if (jsonData.claims_token && jsonData.refresh_token) {
                    const formattedResult: ResultProps = {
                        claims_token: jsonData.claims_token.value,
                        refresh_token: jsonData.refresh_token
                    };
                    setTokens(formattedResult);
                }
            } catch (error) {
                console.error("Failed to fetch tokens:", error);
            }
        };

        fetchAndSetTokens();
        const twoHoursInMs = 2 * 60 * 60 * 1000;
        const intervalId = setInterval(fetchAndSetTokens, twoHoursInMs);
        return () => clearInterval(intervalId);

    }, []);

    return tokens;
};