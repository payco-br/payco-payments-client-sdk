import type { AxiosInstance } from "axios";

export type GetPublicKeyInput = {
	keyId: string;
	client: AxiosInstance;
};

type GetPublicKeyResponse = {
	key_id: string;
	public_key: string;
};

export type GetPublicKeyOutput = {
	publicKey: string;
};

export async function getPublicKey({
	keyId,
	client,
}: GetPublicKeyInput): Promise<GetPublicKeyOutput> {
	try {
		const response = await client.get<GetPublicKeyResponse>(
			`api/v1/payments/card/public_key/${keyId}`,
		);
		return {
			publicKey: response.data.public_key,
		};
	} catch (error) {
		console.error("Error getting public key", error);
		throw error;
	}
}
