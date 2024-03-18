import type { AxiosInstance } from "axios";
import type { CardData } from "./schemas/card-data";
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
export declare let client: AxiosInstance;
export declare let keyId: string;
export declare let sessionId: string;
export declare const initialize: (input: InitializeInput) => Promise<void>;
export declare const tokenize: ({
	cardData,
	verifyCard,
}: TokenizeInput) => Promise<{
	token: string;
}>;
export declare const getDeviceInfo: () => {
	http_accept_brower_value: string;
	http_accept_content: any;
	http_browser_language: string;
	http_browser_java_enabled: boolean;
	http_browser_javascript_enabled: boolean;
	http_browser_color_depth: number;
	http_browser_screen_height: number;
	http_browser_screen_width: number;
	http_browser_time_difference: string;
	user_agent_browser_value: string;
};
