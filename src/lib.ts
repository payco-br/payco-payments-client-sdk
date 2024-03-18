import type { AxiosInstance } from "axios";
import * as v from "valibot";

import { encryptCardData } from "./functions/encrypt-card-data";
import { getDeviceInfo as getDeviceInfoFN } from "./functions/get-device-info";
import { getPublicKey } from "./functions/get-public-key";
import { installScripts } from "./functions/install-scripts";
import { tokenizeCardData } from "./functions/tokenize-card-data";
import { createClient } from "./providers/client";
import { type CardData, cardDataSchema } from "./schemas/card-data";

export type InitializeInput = {
	keyId: string;
	baseURL?: string;
	orgId?: string;
	installScripts?: boolean;
	sessionId?: string;
};

export type TokenizeInput = {
	cardData: CardData;
	verifyCard?: boolean;
};

export let client: AxiosInstance;
export let keyId: string;
export let sessionId: string;

export const initialize = async (input: InitializeInput) => {
	if (!input.keyId) throw new Error("keyId is required");
	const baseURL = input.baseURL || "https://api.payments.payco.com.br/open";
	client = createClient({ baseURL });
	keyId = input.keyId;
	if (input.installScripts ?? true) {
		sessionId = installScripts({
			orgId: input.orgId || "k8vif92e",
			sessionId: input.sessionId,
		});
	} else {
		if (!input.sessionId)
			throw new Error("sessionId is required when installScripts is false");
		sessionId = input.sessionId;
	}
};

export const tokenize = async ({
	cardData,
	verifyCard = false,
}: TokenizeInput) => {
	const cardDataParsed = v.parse(cardDataSchema, cardData);
	const { publicKey } = await getPublicKey({ client, keyId });
	const { encryptedCard } = await encryptCardData({
		card: cardDataParsed,
		publicKey,
		keyId,
		verifyCard,
	});
	return await tokenizeCardData({ encryptedCard, client });
};

export const getDeviceInfo = () => {
	return getDeviceInfoFN();
};
