import type { CardData } from "../schemas/card-data";
export type EncryptCardDataInput = {
    keyId: string;
    publicKey: string;
    verifyCard: boolean;
    card: CardData;
};
export declare function encryptCardData({ card, publicKey, keyId, verifyCard, }: EncryptCardDataInput): Promise<{
    encryptedCard: string;
}>;
