import { CompactEncrypt, importSPKI } from "jose";

import type { CardData } from "@/schemas/card-data";

export type EncryptCardDataInput = {
	keyId: string;
	publicKey: string;
	verifyCard: boolean;
	card: CardData;
};

export async function encryptCardData({
	card,
	publicKey,
	keyId,
	verifyCard,
}: EncryptCardDataInput) {
	const payload = new TextEncoder().encode(
		JSON.stringify({
			card_number: card.number,
			brand: card.cardBrand,
			card_holder_name: card.holderName,
			expiration_month: card.expirationMonth,
			expiration_year: card.expirationYear,
			verify_card: verifyCard,
			security_code: card.cvv,
		}),
	);

	const keyLike = await importSPKI(
		`-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`,
		"RSA-OAEP-256",
	);

	const encryptedCard = await new CompactEncrypt(payload)
		.setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM", kid: keyId })
		.encrypt(keyLike);

	return {
		encryptedCard,
	};
}
