import type { AxiosInstance } from "axios";

export type TokenizeCardDataInput = {
	encryptedCard: string;
	client: AxiosInstance;
};

type TokenizeCardResponse = {
	card_vault_token: string;
};

export async function tokenizeCardData({
	encryptedCard,
	client,
}: TokenizeCardDataInput) {
	try {
		const response = await client.post<TokenizeCardResponse>(
			"/api/v1/payments/card/token",
			{
				token: encryptedCard,
			},
		);
		return {
			token: response.data.card_vault_token,
		};
	} catch (error) {
		throw new Error("Error trying to tokenize card data");
	}
}
