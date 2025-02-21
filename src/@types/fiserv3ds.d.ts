declare module "fiserv3ds" {
	export interface ProtocolVersion {
		start: string;
		end: string;
	}

	export interface ThreeDSServer {
		trans_id: string;
		status: string;
	}

	export interface ACS {
		protocol_version: ProtocolVersion;
	}

	export interface DS {
		protocol_version: ProtocolVersion;
	}

	export interface Fiserv3dsGetAuthResponse {
		three_ds_method_url: string;
		three_ds_server: ThreeDSServer;
		acs: ACS;
		device_channel: string;
		ds: DS;
		message_version: string;
	}

	export interface Account {
		number: string;
	}

	export interface Cardholder {
		acct: Account;
	}

	export interface Fiserv3dsGetAuthRequest {
		cardholder: Cardholder;
		brand_id: string;
	}
}
