declare module "schemas/card-data" {
    import * as v from "valibot";
    export enum CardBrand {
        Mastercard = "mastercard",
        Visa = "visa",
        Amex = "amex",
        Hipercard = "hipercard",
        Elo = "elo"
    }
    export const cardDataSchema: v.ObjectSchema<{
        /** Nome do titular */
        holderName: v.StringSchema<string>;
        /** Documento do titular (CPF ou CNPJ) */
        holderDocument: v.StringSchema<string>;
        /** Número do cartão */
        number: v.StringSchema<string>;
        /** Bandeira do cartão
         *
         * Bandeiras aceitas: MasterCard, Visa, Amex, Hipercard, Elo
         */
        cardBrand: v.EnumSchema<typeof CardBrand, CardBrand>;
        /** Mês de expiração do cartão */
        expirationMonth: v.StringSchema<string>;
        /** Ano de expiração do cartão */
        expirationYear: v.StringSchema<string>;
        /** Código de validação do cartão */
        cvv: v.StringSchema<string>;
    }, undefined, {
        number: string;
        holderName: string;
        holderDocument: string;
        cardBrand: CardBrand;
        expirationMonth: string;
        expirationYear: string;
        cvv: string;
    }>;
    export type CardData = v.Input<typeof cardDataSchema>;
}
declare module "providers/client" {
    export type ClientConfig = {
        baseURL: string;
    };
    export function createClient({ baseURL }: ClientConfig): import("axios").AxiosInstance;
}
declare module "functions/encrypt-card-data" {
    import type { CardData } from "schemas/card-data";
    export type EncryptCardDataInput = {
        keyId: string;
        publicKey: string;
        verifyCard: boolean;
        card: CardData;
    };
    export function encryptCardData({ card, publicKey, keyId, verifyCard, }: EncryptCardDataInput): Promise<{
        encryptedCard: string;
    }>;
}
declare module "functions/get-device-info" {
    export function getDeviceInfo(): {
        http_accept_browser_value: string;
        http_accept_content: string;
        http_browser_language: string;
        http_browser_java_enabled: boolean;
        http_browser_javascript_enabled: boolean;
        http_browser_color_depth: number;
        http_browser_screen_height: number;
        http_browser_screen_width: number;
        http_browser_time_difference: string;
        user_agent_browser_value: string;
    };
}
declare module "functions/get-public-key" {
    import type { AxiosInstance } from "axios";
    export type GetPublicKeyInput = {
        keyId: string;
        client: AxiosInstance;
    };
    export type GetPublicKeyOutput = {
        publicKey: string;
    };
    export function getPublicKey({ keyId, client, }: GetPublicKeyInput): Promise<GetPublicKeyOutput>;
}
declare module "functions/install-scripts" {
    export type InstallScriptsInput = {
        orgId: string;
        sessionId?: string;
    };
    export function installScripts({ orgId, sessionId }: InstallScriptsInput): string;
}
declare module "functions/tokenize-card-data" {
    import type { AxiosInstance } from "axios";
    export type TokenizeCardDataInput = {
        encryptedCard: string;
        client: AxiosInstance;
    };
    export function tokenizeCardData({ encryptedCard, client, }: TokenizeCardDataInput): Promise<{
        token: string;
    }>;
}
declare module "functions/anti-fraud" {
    /**
     * Retorna um ID gerado pelo sistema anti-fraude para identificar um visitante ou novo cliente e fazer o vínculo entre este acesso e uma futura compra.
     *
     * **Caso o cliente já tenha um identificador único gerado pela sua platatforma, utilize {@link setCustomerID}**
     * @returns Identificador único que pode ser atribuído a um visitante ou novo cliente
     */
    export function getVisitorID(): string | number;
    /**
     * Envia o identificador de um cliente (já registrado em sua plataforma) para que o sistema anti-fraude faça o vínculo entre este acesso e uma futura compra.
     *
     * @param id Identificador único do cliente
     */
    export function setCustomerID(id: string | number): boolean;
    /**
     * Opcionalmente utilizado para melhorar a análise de risco, fornecendo informações específicas sobre as diversas páginas do site.
     * @param type Tipo de página ou elemento a ser marcado
     * @param value Nome da página ou valor marcado
     *
     * @example Marcando a página de checkout
     * ```
     * SDK.addPageTag("page", "checkout")
     * SDK.addPageTag("checkout", "id=1, sku=Nome do Produto")
     * ```
     */
    export function addPageTag(type: string, value: string): void;
}
declare module "@payco-br/payco-payments-client-sdk" {
	import type { AxiosInstance } from "axios";
	import { CardData } from "schemas/card-data";
	export { CardBrand } from "schemas/card-data";
    type InitializeInput = {
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
    type TokenizeInput = {
        /** Dados do cartão */
        cardData: CardData;
        /** Verificar o cartão quando enviado para a API (opcional) */
        verifyCard?: boolean;
    };
    global {
        var __kdt: {
            [key: string]: unknown;
        }[];
    }
    export * from "functions/anti-fraud";
    export let client: AxiosInstance;
    export let keyId: string;
    export let sessionId: string;
    /**
     * Inicializa a integração com o SDK Payments by Payco
     * @param input Configuração do SDK
     */
    export const initialize: (input: InitializeInput) => Promise<void>;
    /**
     *
     * @param payload Objeto para informar os dados do cartão e flag `verifyCard`
     * para validar ou não o cartão quando enviado para a API realizar a tokenização
     * @returns objeto com token do cartão
     */
    export const tokenize: ({ cardData, verifyCard, }: TokenizeInput) => Promise<{
        token: string;
    }>;
    export const getDeviceInfo: () => {
        http_accept_browser_value: string;
        http_accept_content: string;
        http_browser_language: string;
        http_browser_java_enabled: boolean;
        http_browser_javascript_enabled: boolean;
        http_browser_color_depth: number;
        http_browser_screen_height: number;
        http_browser_screen_width: number;
        http_browser_time_difference: string;
        user_agent_browser_value: string;
    };
}
