import type { AxiosInstance } from "axios";
import z from "zod";

import { CardBrand, CardData, cardDataSchema } from "./schemas/card-data";
export { CardBrand };

import { createClient } from "./providers/client";

import { encryptCardData } from "./functions/encrypt-card-data";
import { getDeviceInfo as getDeviceInfoFN } from "./functions/get-device-info";
import { getPublicKey } from "./functions/get-public-key";
import { installScripts } from "./functions/install-scripts";
import { tokenizeCardData } from "./functions/tokenize-card-data";

declare type InitializeInput = {
	/** Chave de integração */
	keyId: string;
	/** URL da API Payments by Payco (opcional) */
	baseURL?: string;
	/** ID do estabelecimento (opcional) */
	orgId?: string;
	/** Habilitar integração com anti-fraude (opcional) */
	installScripts?: boolean;
	/** ID de sessão, ou de um cliente cadastrado para utilizar dados de anti-fraude pré-existentes (opcional) */
	sessionId?: string;
};

declare type TokenizeInput = {
	/** Dados do cartão */
	cardData: CardData;
	/** Verificar o cartão quando enviado para a API (opcional) */
	verifyCard?: boolean;
	/** Cria uma transação 3DS junto com o vault do cartão */
	threeDs?: boolean;
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

	if (typeof window === "undefined") {
		sessionId = input.sessionId ?? crypto.randomUUID();
		return;
	}

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
 * @param payload Objeto para informar os dados do cartão e flag `verifyCard`
 * para validar ou não o cartão quando enviado para a API realizar a tokenização
 * @returns objeto com token do cartão
 */
export const tokenize = async ({
	cardData,
	verifyCard = false,
	threeDs = false,
}: TokenizeInput) => {
	const cardDataParsed = cardDataSchema.parse(cardData);
	const { publicKey } = await getPublicKey({ client, keyId });
	const { encryptedCard } = await encryptCardData({
		card: cardDataParsed,
		publicKey,
		keyId,
		verifyCard,
	});
	return await tokenizeCardData({ encryptedCard, client, threeDs: threeDs });
};

export const getDeviceInfo = () => {
	if (typeof window === "undefined") {
		throw new Error(
			"getDeviceInfo() must be called in the browser (or a window context)",
		);
	}

	return getDeviceInfoFN();
};
