import * as v from "valibot";

import { cnpj, cpf } from "cpf-cnpj-validator";

export enum CardBrand {
	Mastercard = "mastercard",
	Visa = "visa",
	Amex = "amex",
	Hipercard = "hipercard",
	Elo = "elo",
}

export const cardDataSchema = v.object({
	holderName: v.string([v.regex(/^[a-zA-Z\s]+$/), v.minLength(2)]),
	holderDocument: v.string([
		v.custom((value: string) => {
			if (cpf.isValid(value) || cnpj.isValid(value)) return true;
			return false;
		}, "invalid document, must be a valid CPF or CNPJ"),
	]),
	number: v.string([
		v.regex(/^\d{16}$/),
		v.custom((value: string) => {
			const firstDigit = value[0];
			return !value.split("").every((digit: string) => digit === firstDigit);
		}, "invalid card number, must be a valid credit card number"),
	]),
	cardBrand: v.enum_(CardBrand),
	expirationMonth: v.string([v.regex(/^(0[1-9]|1[0-2])$/)]),
	expirationYear: v.string([v.regex(/^\d{2}$/)]),
	cvv: v.string([v.regex(/^\d{3}$/)]),
});

export type CardData = v.Input<typeof cardDataSchema>;
