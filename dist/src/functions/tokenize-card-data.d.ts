import type { AxiosInstance } from "axios";
export type TokenizeCardDataInput = {
	encryptedCard: string;
	client: AxiosInstance;
};
export declare function tokenizeCardData({
	encryptedCard,
	client,
}: TokenizeCardDataInput): Promise<{
	token: string;
}>;
