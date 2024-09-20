import type { AxiosInstance } from "axios";
export type GetPublicKeyInput = {
    keyId: string;
    client: AxiosInstance;
};
export type GetPublicKeyOutput = {
    publicKey: string;
};
export declare function getPublicKey({ keyId, client, }: GetPublicKeyInput): Promise<GetPublicKeyOutput>;
