import type { AxiosInstance } from "axios";
export type TokenizeCardDataInput = {
    encryptedCard: string;
    client: AxiosInstance;
    threeDs: boolean
};
export declare function tokenizeCardData({ encryptedCard, client, threeDs}: TokenizeCardDataInput): Promise<{
    token: string;
    three_ds: boolean
}>;
