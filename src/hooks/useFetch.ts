import { useEffect, useState } from 'react';

type QueryParams = Record<string, string | number | boolean | null | undefined>;

export interface UseFetchOptions {
	body?: BodyInit | null;
	method?: string;
	params?: QueryParams;
}

export interface UseFetchResult<Data> {
	data: Data | null;
	error: Error | null;
	status: number | null;
	loading: boolean;
}

const buildUrl = (url: string, params?: QueryParams) => {
	const requestUrl = new URL(url, window.location.origin);

	Object.entries(params ?? {}).forEach(([key, value]) => {
		if (value !== null && value !== undefined) {
			requestUrl.searchParams.set(key, String(value));
		}
	});
	return requestUrl.toString();
};

const useFetch = <Data,>(
	url: string | null,
	{ body, method = 'GET', params }: UseFetchOptions = {},
): UseFetchResult<Data> => {
	const [data, setData] = useState<Data | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState<number | null>(null);
	const requestUrl = url ? buildUrl(url, params) : null;

	useEffect(() => {
		if (!requestUrl) {
			setData(null);
			setError(null);
			setStatus(null);
			setLoading(false);
			return;
		}

		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await fetch(requestUrl, {
					body,
					method,
				});

				if (!response.ok) {
				    setStatus(response.status);
					setError(new Error(`Request failed with status ${response.status}`));
				}else{
                    const responseData = (await response.json()) as Data;
                    setData(responseData);
                    setStatus(response.status);
                }
			} catch (requestError) {
				setError(
					requestError instanceof Error
						? requestError
						: new Error('Unable to fetch data.'),
				);
			} finally {
				setLoading(false);
			}
		};

		void fetchData();
	}, [body, method, requestUrl]);

	return { data, error, loading, status };
};

export default useFetch;
