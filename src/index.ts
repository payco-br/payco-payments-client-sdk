import type { AxiosInstance } from "axios";
import * as v from "valibot";

import { CardData, cardDataSchema } from "./schemas/card-data";

import { createClient } from "./providers/client";

import { encryptCardData } from "./functions/encrypt-card-data";
import { getDeviceInfo as getDeviceInfoFN } from "./functions/get-device-info";
import { getPublicKey } from "./functions/get-public-key";
import { installScripts } from "./functions/install-scripts";
import { tokenizeCardData } from "./functions/tokenize-card-data";

declare type InitializeInput = {
	keyId: string;
	baseURL?: string;
	orgId?: string;
	installScripts?: boolean;
	sessionId?: string;
};

declare type TokenizeInput = {
	cardData: CardData;
	verifyCard?: boolean;
};

declare global {
	// biome-ignore lint/style/noVar: __kdt **needs** to be available globally (within window or `globalThis`): https://stackoverflow.com/a/55031001
	var __kdt: { [key: string]: unknown }[];
}

export * from "./functions/anti-fraud";

export let client: AxiosInstance;
export let keyId: string;
export let sessionId: string;

globalThis.__kdt = [];

/**
 * Inicializa a integração com o SDK Payments by Payco
 * @param input Configuração do SDK
 */
export const initialize = async (input: InitializeInput) => {
	if (!input.keyId) throw new Error("keyId is required");

	const baseURL = input.baseURL || "https://api.payments.payco.com.br/open";
	client = createClient({ baseURL });
	keyId = input.keyId;
	const orgId = input.orgId || "k8vif92e";

	if (input.installScripts ?? true) {
		__kdt.push({ public_key: orgId }, { post_on_load: false });
		sessionId = installScripts({
			orgId,
			sessionId: input.sessionId,
		});
	} else {
		if (!input.sessionId) {
			throw new Error("sessionId is required when installScripts is false");
		}

		sessionId = input.sessionId;
	}
};

/**
 *
 * @param cardData Objeto com todos os dados do cartão ({@link CardData | ver fonte}) e flag `verifyCard`
 * para validar ou não o cartão quando enviado para a API realizar a tokenização
 * @returns
 */
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
