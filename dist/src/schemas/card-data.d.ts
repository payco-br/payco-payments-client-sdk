import type * as v from "valibot";
export declare enum CardBrand {
	Mastercard = "mastercard",
	Visa = "visa",
	Amex = "amex",
	Hipercard = "hipercard",
	Elo = "elo",
}
export declare const cardDataSchema: v.ObjectSchema<
	{
		holderName: v.StringSchema<string>;
		holderDocument: v.StringSchema<string>;
		number: v.StringSchema<string>;
		cardBrand: v.EnumSchema<typeof CardBrand, CardBrand>;
		expirationMonth: v.StringSchema<string>;
		expirationYear: v.StringSchema<string>;
		cvv: v.StringSchema<string>;
	},
	undefined,
	{
		number: string;
		holderName: string;
		holderDocument: string;
		cardBrand: CardBrand;
		expirationMonth: string;
		expirationYear: string;
		cvv: string;
	}
>;
export type CardData = v.Input<typeof cardDataSchema>;
