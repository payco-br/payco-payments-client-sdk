// biome-ignore lint/complexity/noStaticOnlyClass: improvised type declaration of Konduto (Fiserv's anti-fraud data collection utility)
declare class Konduto {
	static getVisitorID(): string | number;
	static setCustomerID(id: string | number): boolean;
	static sendEvent(type: string, value: string): boolean;
}
