export type ClientConfig = {
	baseURL: string;
};
export declare function createClient({
	baseURL,
}: ClientConfig): import("axios").AxiosInstance;
