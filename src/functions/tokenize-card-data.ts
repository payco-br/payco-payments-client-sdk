import type { AxiosInstance } from "axios";

export type TokenizeCardDataInput = {
	encryptedCard: string;
	client: AxiosInstance;
	threeDs?: boolean;
};

type TokenizeCardResponse = {
	card_vault_token: string;
	three_ds_transaction_id?: string;
};

export async function tokenizeCardData({
	encryptedCard,
	client,
	threeDs,
}: TokenizeCardDataInput) {
	try {
		const response = await client.post<TokenizeCardResponse>(
			"/api/v1/payments/card/token",
			{
				token: encryptedCard,
				three_ds: threeDs,
			},
		);
		return {
			token: response.data.card_vault_token,
			threeDsTransactionId: response.data.three_ds_transaction_id,
		};
	} catch (error) {
		throw new Error("Error trying to tokenize card data");
	}
}
