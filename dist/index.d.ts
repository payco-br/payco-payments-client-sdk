import type { AxiosInstance } from "axios";
import { CardBrand, CardData } from "./schemas/card-data";
import {inject3DSForm} from "./functions/3ds-form-script";
import { getAuthMethod } from "./functions/3ds";
export { CardBrand, inject3DSForm, getAuthMethod };
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
};
declare global {
    var __kdt: {
        [key: string]: unknown;
    }[];
}
export * from "./functions/anti-fraud";
export declare let client: AxiosInstance;
export declare let keyId: string;
export declare let sessionId: string;
/**
 * Inicializa a integração com o SDK Payments by Payco
 * @param input Configuração do SDK
 */
export declare const initialize: (input: InitializeInput) => Promise<void>;
/**
 *
 * @param payload Objeto para informar os dados do cartão e flag `verifyCard`
 * para validar ou não o cartão quando enviado para a API realizar a tokenização
 * @returns objeto com token do cartão
 */
export declare const tokenize: ({ cardData, verifyCard, }: TokenizeInput) => Promise<{
    token: string;
}>;
export declare const getDeviceInfo: () => {
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
